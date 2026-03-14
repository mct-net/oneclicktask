<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Tag;
use App\Models\Task;
use App\Services\PostHogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        $tag = Tag::firstOrCreate(['name' => $validated['name']]);

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
     * Update a tag's name (this updates the global tag).
     */
    public function update(Request $request, Board $board, Task $task, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,'.$tag->id,
        ]);

        $tag->update($validated);

        return response()->json($tag);
    }

    /**
     * Detach a tag from a task.
     */
    public function detach(Board $board, Task $task, Tag $tag)
    {
        $task->tags()->detach($tag->id);

        return response()->json(null, 204);
    }
}
