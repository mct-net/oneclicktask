<?php

use App\Models\Board;
use App\Models\User;

describe('Feature: Postpone and Advance Task Flow', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
        $this->board = Board::factory()->create(['owner_id' => $this->user->id]);
        $this->board->members()->attach($this->user->id, ['role' => 'admin']);
    });

    test('Postponing a task hides it from the urgent task list', function () {
        $this->actingAs($this->user);
        $this->page = visit("/boards/{$this->board->id}");
        boardPage()->isReady();

        boardPage()
            ->createTask('Read a book')
            ->createTask('Write a report')
            ->createTask('Schedule meeting');

        boardPage()->selectUrgentTask('Read a book');
        $content = boardPage()->getSelectedTaskContent();
        expect($content)->toContain('Read a book');

        boardPage()->postponeSelectedTask('+5m');

        $taskList = boardPage()->getUrgentTaskList();
        expect($taskList)->toContain('Write a report')
            ->and($taskList)->not->toContain('Read a book');
    });

    test('Postponing the selected task selects the next urgent task', function () {
        $this->actingAs($this->user);
        $this->page = visit("/boards/{$this->board->id}");
        boardPage()->isReady();

        boardPage()
            ->createTask('Read a book')
            ->createTask('Write a report')
            ->createTask('Schedule meeting');

        boardPage()->selectUrgentTask('Read a book');
        $content = boardPage()->getSelectedTaskContent();
        expect($content)->toContain('Read a book');

        boardPage()->postponeSelectedTask('+5m');

        $content = boardPage()->getSelectedTaskContent();
        expect($content)->toContain('Write a report')
            ->and($content)->not->toContain('Read a book');
    });

    test('Postponing the last urgent task clears the task detail area', function () {
        $this->actingAs($this->user);
        $this->page = visit("/boards/{$this->board->id}");
        boardPage()->isReady();

        boardPage()
            ->createTask('Read a book')
            ->createTask('Write a report')
            ->createTask('Schedule meeting');

        boardPage()->selectRecentTask('Read a book');
        boardPage()->postponeSelectedTask('+5m');
        boardPage()->postponeSelectedTask('+5m');

        $tasks = boardPage()->getUrgentTaskList();
        expect($tasks)->toContain('Schedule meeting')
            ->and(count($tasks))->toBe(1);

        boardPage()->postponeSelectedTask('+5m');

        $content = boardPage()->getSelectedTaskCardContent();
        expect($content)->toContain('No task selected');

        $url = page()->url();
        expect($url)->toEndWith('/boards/1');
    });
});
