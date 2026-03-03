<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Task;
use App\Services\PostHogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
        $tasks = $board->tasks()
            ->with(['author', 'assignee', 'tags', 'files', 'comments.user'])
            ->latest()
            ->get();

        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board, PostHogService $posthog)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
            'assignee_id' => 'nullable|exists:users,id',
            'color' => 'nullable|string|max:50',
            'due_date' => 'nullable|date',
            'is_starred' => 'boolean',
            'is_important' => 'boolean',
            'status' => 'nullable|string|max:50',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Validate assignee is a member of the board
        if (isset($validated['assignee_id'])) {
            $assignee = \App\Models\User::find($validated['assignee_id']);
            if (! $board->hasMember($assignee)) {
                return response()->json(['message' => 'Assignee must be a member of this board.'], 422);
            }
        }

        $task = $board->tasks()->create([
            ...$validated,
            'author_id' => Auth::id(),
        ]);

        if (isset($validated['tags'])) {
            $task->tags()->sync($validated['tags']);
        }

        $task->load(['author', 'assignee', 'tags']);

        $posthog->capture(Auth::id(), 'task_created', [
            'board_id' => $board->id,
            'task_id' => $task->id,
            'has_assignee' => isset($validated['assignee_id']),
            'has_due_date' => isset($validated['due_date']),
            'has_tags' => ! empty($validated['tags']),
        ]);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board, Task $task)
    {
        $task->load(['board', 'author', 'assignee', 'tags', 'comments.user', 'files']);

        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board, Task $task, PostHogService $posthog)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
            'assignee_id' => 'nullable|exists:users,id',
            'color' => 'nullable|string|max:50',
            'due_date' => 'nullable|date',
            'last_postponed_at' => 'nullable|date',
            'is_starred' => 'boolean',
            'is_important' => 'boolean',
            'status' => 'nullable|string|max:50',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Validate assignee is a member of the board
        if (isset($validated['assignee_id'])) {
            $assignee = \App\Models\User::find($validated['assignee_id']);
            if (! $board->hasMember($assignee)) {
                return response()->json(['message' => 'Assignee must be a member of this board.'], 422);
            }
        }

        $snapshot = [
            'name' => $task->name,
            'content' => $task->content,
            'assignee_id' => $task->assignee_id,
            'color' => $task->color,
            'due_date' => $task->due_date?->toISOString(),
            'last_postponed_at' => $task->last_postponed_at?->toISOString(),
            'is_starred' => $task->is_starred,
            'is_important' => $task->is_important,
            'status' => $task->status,
            'tags' => $task->tags()->orderBy('tags.id')->pluck('tags.id')->toArray(),
        ];

        $task->update($validated);

        if (isset($validated['tags'])) {
            $task->tags()->sync($validated['tags']);
        }

        $task->load(['author', 'assignee', 'tags']);

        $this->trackUpdate($posthog, $board, $task, $validated, $snapshot);

        return response()->json($task);
    }

    private function trackUpdate(PostHogService $posthog, Board $board, Task $task, array $validated, array $snapshot): void
    {
        $trackableFields = ['name', 'content', 'assignee_id', 'color', 'due_date', 'is_starred', 'is_important', 'status'];

        $changedFields = array_keys(array_filter(
            array_intersect_key($validated, array_flip($trackableFields)),
            fn ($value, $key) => $snapshot[$key] != $value,
            ARRAY_FILTER_USE_BOTH,
        ));

        $newTags = $task->tags()->orderBy('tags.id')->pluck('tags.id')->toArray();
        if ($snapshot['tags'] !== $newTags) {
            $changedFields[] = 'tags';
        }

        $posthog->capture(Auth::id(), 'task_edited', [
            'board_id' => $board->id,
            'task_id' => $task->id,
            'changed_fields' => $changedFields,
        ]);

        if (isset($validated['status']) && $snapshot['status'] !== $validated['status']) {
            $posthog->capture(Auth::id(), 'task_status_changed', [
                'board_id' => $board->id,
                'task_id' => $task->id,
                'old_status' => $snapshot['status'],
                'new_status' => $validated['status'],
            ]);
        }

        if (array_key_exists('assignee_id', $validated) && $snapshot['assignee_id'] != $validated['assignee_id']) {
            $posthog->capture(Auth::id(), 'task_assigned', [
                'board_id' => $board->id,
                'task_id' => $task->id,
                'assignee_id' => $validated['assignee_id'],
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Task $task, PostHogService $posthog)
    {
        $taskId = $task->id;
        $task->delete();

        $posthog->capture(Auth::id(), 'task_deleted', [
            'board_id' => $board->id,
            'task_id' => $taskId,
        ]);

        return response()->json(null, 204);
    }
}
