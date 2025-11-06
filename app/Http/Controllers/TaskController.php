<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Task;
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
            ->with(['author', 'assignee', 'tags'])
            ->latest()
            ->get();

        return inertia('Tasks', [
            'board' => $board,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board)
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
                return back()->withErrors(['assignee_id' => 'Assignee must be a member of this board.']);
            }
        }

        $task = $board->tasks()->create([
            ...$validated,
            'author_id' => Auth::id(),
        ]);

        if (isset($validated['tags'])) {
            $task->tags()->sync($validated['tags']);
        }

        return redirect()->route('boards.tasks.show', [$board, $task])
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board, Task $task)
    {
        $task->load(['board', 'author', 'assignee', 'tags', 'comments.user', 'files']);

        return inertia('Tasks', [
            'board' => $board,
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board, Task $task)
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
                return back()->withErrors(['assignee_id' => 'Assignee must be a member of this board.']);
            }
        }

        $task->update($validated);

        if (isset($validated['tags'])) {
            $task->tags()->sync($validated['tags']);
        }

        return redirect()->route('boards.tasks.show', [$board, $task])
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Task $task)
    {
        $task->delete();

        return redirect()->route('boards.tasks.index', $board)
            ->with('success', 'Task deleted successfully.');
    }
}
