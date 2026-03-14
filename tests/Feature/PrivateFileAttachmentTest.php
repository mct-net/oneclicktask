<?php

use App\Models\Board;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('stores task attachments on the private attachments disk', function () {
    Storage::fake('attachments');
    Storage::fake('public');

    $user = User::factory()->create();
    $board = Board::factory()->create(['owner_id' => $user->id]);

    $task = Task::create([
        'board_id' => $board->id,
        'author_id' => $user->id,
        'name' => 'Task with file',
        'color' => '#444444',
        'status' => 'backlog',
    ]);

    $response = $this->actingAs($user)->post(route('boards.tasks.files.store', [
        'board' => $board,
        'task' => $task,
    ]), [
        'file' => UploadedFile::fake()->create('example.txt', 10),
    ]);

    $response->assertCreated();

    $attachment = $task->files()->firstOrFail();

    Storage::disk('attachments')->assertExists($attachment->path);
    Storage::disk('public')->assertMissing($attachment->path);

    expect($attachment->url)->toContain("/boards/{$board->id}/tasks/{$task->id}/files/{$attachment->id}");
});
