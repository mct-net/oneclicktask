<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBoardMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $board = $request->route('board');
        $task = $request->route('task');
        $comment = $request->route('comment');
        $file = $request->route('file');

        // Check if user has access to the board
        if ($board && ! $board->hasMember($request->user())) {
            abort(403, 'You do not have access to this board.');
        }

        // Verify task belongs to board
        if ($task && $board && $task->board_id !== $board->id) {
            abort(404);
        }

        // Verify comment belongs to task
        if ($comment && $task && $comment->task_id !== $task->id) {
            abort(404);
        }

        // Verify file belongs to task
        if ($file && $task && $file->task_id !== $task->id) {
            abort(404);
        }

        return $next($request);
    }
}
