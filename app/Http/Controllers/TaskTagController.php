<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Tag;
use App\Models\Task;
use App\Services\PostHogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TaskTagController extends Controller
{
    /**
     * Attach a tag to a task (create tag if needed and attach it).
     */
    public function attach(Request $request, Board $board, Task $task, PostHogService $posthog)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tag = $board->tags()->firstOrCreate([
            'name' => $validated['name'],
        ]);

        // Attach tag to task if not already attached
        if (! $task->tags()->where('tag_id', $tag->id)->exists()) {
            $task->tags()->attach($tag->id);
        }

        $posthog->capture(Auth::id(), 'tag_added', [
            'board_id' => $board->id,
            'task_id' => $task->id,
            'tag_name' => $validated['name'],
        ]);

        return response()->json($tag, 201);
    }

    /**
     * Update a tag within the current board.
     */
    public function update(Request $request, Board $board, Task $task, Tag $tag)
    {
        if ($tag->board_id !== $board->id) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tags', 'name')
                    ->where('board_id', $board->id)
                    ->ignore($tag->id),
            ],
        ]);

        $tag->update($validated);

        return response()->json($tag);
    }

    /**
     * Detach a tag from a task.
     */
    public function detach(Board $board, Task $task, Tag $tag)
    {
        if ($tag->board_id !== $board->id) {
            abort(404);
        }

        $task->tags()->detach($tag->id);

        return response()->json(null, 204);
    }
}
