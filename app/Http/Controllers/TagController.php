<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of tags used in the board.
     */
    public function index(Board $board)
    {
        $tags = $board->tags()
            ->withCount('tasks')
            ->orderBy('name')
            ->get();

        return response()->json($tags);
    }

    /**
     * Store a new tag (or return existing if it already exists).
     */
    public function store(Request $request, Board $board)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tag = $board->tags()->firstOrCreate([
            'name' => $validated['name'],
        ]);

        return response()->json($tag, 201);
    }
}
