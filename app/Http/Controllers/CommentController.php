<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Comment;
use App\Models\Task;
use App\Services\PostHogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board, Task $task)
    {
        $comments = $task->comments()->with('user')->latest()->get();

        return response()->json($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board, Task $task, PostHogService $posthog)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $task->comments()->create([
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);

        $comment->load('user');

        $posthog->capture(Auth::id(), 'comment_added', [
            'board_id' => $board->id,
            'task_id' => $task->id,
            'comment_id' => $comment->id,
        ]);

        return response()->json($comment, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board, Task $task, Comment $comment)
    {
        // Only the comment author can update
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'You can only edit your own comments.');
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update($validated);

        return response()->json($comment, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Task $task, Comment $comment)
    {
        // Only the comment author can delete
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'You can only delete your own comments.');
        }

        $comment->delete();

        return response()->json(null, 204);
    }
}
