<?php

use App\Models\Board;
use App\Models\Tag;
use App\Models\Task;
use App\Models\User;

it('creates same-named tags separately per board', function () {
    $user = User::factory()->create();

    $firstBoard = Board::factory()->create(['owner_id' => $user->id]);
    $secondBoard = Board::factory()->create(['owner_id' => $user->id]);

    $firstTask = Task::create([
        'board_id' => $firstBoard->id,
        'author_id' => $user->id,
        'name' => 'First task',
        'color' => '#111111',
        'status' => 'backlog',
    ]);

    $secondTask = Task::create([
        'board_id' => $secondBoard->id,
        'author_id' => $user->id,
        'name' => 'Second task',
        'color' => '#222222',
        'status' => 'backlog',
    ]);

    $this->actingAs($user)
        ->postJson(route('boards.tasks.tags.attach', [
            'board' => $firstBoard,
            'task' => $firstTask,
        ]), [
            'name' => 'urgent',
        ])
        ->assertCreated();

    $this->actingAs($user)
        ->postJson(route('boards.tasks.tags.attach', [
            'board' => $secondBoard,
            'task' => $secondTask,
        ]), [
            'name' => 'urgent',
        ])
        ->assertCreated();

    expect(Tag::where('name', 'urgent')->count())->toBe(2);
    expect(Tag::where('board_id', $firstBoard->id)->where('name', 'urgent')->exists())->toBeTrue();
    expect(Tag::where('board_id', $secondBoard->id)->where('name', 'urgent')->exists())->toBeTrue();
});

it('renames tags only within the current board scope', function () {
    $user = User::factory()->create();

    $firstBoard = Board::factory()->create(['owner_id' => $user->id]);
    $secondBoard = Board::factory()->create(['owner_id' => $user->id]);

    $firstTag = Tag::create([
        'board_id' => $firstBoard->id,
        'name' => 'urgent',
    ]);

    $secondTag = Tag::create([
        'board_id' => $secondBoard->id,
        'name' => 'urgent',
    ]);

    $task = Task::create([
        'board_id' => $firstBoard->id,
        'author_id' => $user->id,
        'name' => 'Task',
        'color' => '#333333',
        'status' => 'backlog',
    ]);

    $task->tags()->attach($firstTag->id);

    $this->actingAs($user)
        ->putJson(route('boards.tasks.tags.update', [
            'board' => $firstBoard,
            'task' => $task,
            'tag' => $firstTag,
        ]), [
            'name' => 'renamed',
        ])
        ->assertOk();

    expect($firstTag->fresh()->name)->toBe('renamed');
    expect($secondTag->fresh()->name)->toBe('urgent');
});
