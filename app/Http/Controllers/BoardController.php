<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    public function index()
    {
        $boards = Auth::user()->allBoards()
            ->with(['owner', 'members'])
            ->withCount('tasks')
            ->latest()
            ->get();

        if ($boards->count() === 1) {
            return redirect()->route('boards.show', $boards->first());
        }

        return inertia('Boards/Index', [
            'boards' => $boards,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:50',
        ]);

        $board = Board::create([
            ...$validated,
            'owner_id' => Auth::id(),
        ]);

        return redirect()->route('boards.show', $board)
            ->with('success', 'Board created successfully.');
    }

    public function show(Board $board)
    {
        $board->load(['owner', 'members', 'tasks.author', 'tasks.assignee', 'tasks.tags']);

        return inertia('Board', [
            'board' => $board,
        ]);
    }

    public function update(Request $request, Board $board)
    {

        if ($board->owner_id !== Auth::id()) {
            abort(403, 'Only the board owner can edit the board.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:50',
        ]);

        $board->update($validated);

        return redirect()->route('boards.show', $board)
            ->with('success', 'Board updated successfully.');
    }

    public function destroy(Board $board)
    {

        if ($board->owner_id !== Auth::id()) {
            abort(403, 'Only the board owner can delete the board.');
        }

        $board->delete();

        return redirect()->route('boards.index')
            ->with('success', 'Board deleted successfully.');
    }

    public function inviteMember(Request $request, Board $board)
    {

        if ($board->owner_id !== Auth::id()) {
            $userRole = $board->members()->where('user_id', Auth::id())->first()?->pivot->role;
            if ($userRole !== 'admin') {
                abort(403, 'Only the board owner or admins can invite members.');
            }
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'nullable|string|in:member,admin',
        ]);

        if ($board->hasMember(\App\Models\User::find($validated['user_id']))) {
            return back()->withErrors(['user_id' => 'User is already a member of this board.']);
        }

        $board->members()->attach($validated['user_id'], [
            'role' => $validated['role'] ?? 'member',
        ]);

        return back()->with('success', 'Member invited successfully.');
    }

    public function removeMember(Request $request, Board $board)
    {

        if ($board->owner_id !== Auth::id()) {
            $userRole = $board->members()->where('user_id', Auth::id())->first()?->pivot->role;
            if ($userRole !== 'admin') {
                abort(403, 'Only the board owner or admins can remove members.');
            }
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validated['user_id'] == $board->owner_id) {
            return back()->withErrors(['user_id' => 'Cannot remove the board owner.']);
        }

        $board->members()->detach($validated['user_id']);

        return back()->with('success', 'Member removed successfully.');
    }

    public function updateMemberRole(Request $request, Board $board)
    {

        if ($board->owner_id !== Auth::id()) {
            abort(403, 'Only the board owner can update member roles.');
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|string|in:member,admin',
        ]);

        $board->members()->updateExistingPivot($validated['user_id'], [
            'role' => $validated['role'],
        ]);

        return back()->with('success', 'Member role updated successfully.');
    }
}
