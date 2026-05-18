<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\FileAttachment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileAttachmentController extends Controller
{
    private const DISK = 'attachments';

    /**
     * Display a listing of the resource.
     */
    public function index(Board $board, Task $task)
    {
        $files = $task->files()
            ->get()
            ->map(fn (FileAttachment $file) => $this->serializeFile($file, $board, $task));

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
        $path = $file->store('task-attachments', self::DISK);

        $fileAttachment = $task->files()->create([
            'name' => $validated['name'] ?? $file->getClientOriginalName(),
            'path' => $path,
            'url' => '',
            'type' => $file->getMimeType(),
        ]);

        $fileAttachment->update([
            'url' => route('boards.tasks.files.show', [
                'board' => $board,
                'task' => $task,
                'file' => $fileAttachment,
            ]),
        ]);

        return response()->json(
            $this->serializeFile($fileAttachment->fresh(), $board, $task),
            201,
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board, Task $task, FileAttachment $file)
    {
        $disk = $this->resolveDisk($file);

        abort_unless($disk !== null, 404);

        return Storage::disk($disk)->download($file->path, $file->name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Task $task, FileAttachment $file)
    {
        foreach ([self::DISK, 'public'] as $disk) {
            Storage::disk($disk)->delete($file->path);
        }

        $file->delete();

        return response()->json(null, 204);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeFile(FileAttachment $file, Board $board, Task $task): array
    {
        return [
            ...$file->toArray(),
            'url' => route('boards.tasks.files.show', [
                'board' => $board,
                'task' => $task,
                'file' => $file,
            ]),
        ];
    }

    private function resolveDisk(FileAttachment $file): ?string
    {
        if (Storage::disk(self::DISK)->exists($file->path)) {
            return self::DISK;
        }

        if (Storage::disk('public')->exists($file->path)) {
            return 'public';
        }

        return null;
    }
}
