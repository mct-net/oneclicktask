<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\FileAttachment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileAttachmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board, Task $task)
    {
        $files = $task->files()->get();

        return response()->json($files);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board, Task $task)
    {
        $validated = $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'name' => 'nullable|string|max:255',
        ]);

        $file = $request->file('file');
        $path = $file->store('task-attachments', 'public');

        $fileAttachment = $task->files()->create([
            'name' => $validated['name'] ?? $file->getClientOriginalName(),
            'path' => $path,
            'url' => Storage::url($path),
            'type' => $file->getMimeType(),
        ]);

        return response()->json($fileAttachment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board, Task $task, FileAttachment $file)
    {
        return Storage::disk('public')->download($file->path, $file->name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Task $task, FileAttachment $file)
    {
        Storage::disk('public')->delete($file->path);

        $file->delete();

        return response()->json(null, 204);
    }
}
