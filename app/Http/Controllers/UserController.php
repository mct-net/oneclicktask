<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get the currently authenticated user
     */
    public function current(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Get all users who are members of the specified board
     */
    public function index(Board $board)
    {
        // Get all members (including owner)
        $members = $board->members()->get(['users.id', 'name', 'email']);

        // Also include the owner if they're not already in the members list
        $owner = $board->owner()->get(['users.id', 'name', 'email']);

        // Merge and deduplicate
        $users = $members->merge($owner)->unique('id')->values();

        return response()->json($users);
    }
}
