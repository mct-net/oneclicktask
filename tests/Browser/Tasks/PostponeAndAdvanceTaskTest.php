<?php

use App\Models\Board;
use App\Models\User;

describe('Feature: Postpone and Advance Task Flow', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
        $this->board = Board::factory()->create(['owner_id' => $this->user->id]);
        $this->board->members()->attach($this->user->id, ['role' => 'admin']);

        /*
            Note: We use a closure here instead of calling visit() directly
            in beforeEach because Pest's browser testing requires the WebSocket
            connection to be established within the test itself, not in setup
            methods. Calling visit() in beforeEach results in "WebSocket client
            is not connected" errors.
        */
        $this->setupBoardPage = function () {
            $this->actingAs($this->user);
            $this->page = visit("/boards/{$this->board->id}");

            boardPage()->isReady();

            boardPage()
                ->createTask('Read a book')
                ->createTask('Write a report')
                ->createTask('Schedule meeting');
        };
    });

    test('Postponing a task hides it from the urgent task list', function () {
        ($this->setupBoardPage)();

        boardPage()->selectUrgentTask('Read a book');
        boardPage()->assertInDetailCard('Read a book');

        boardPage()->postponeSelectedTask('+5m');

        $taskList = boardPage()->getUrgentTaskList();
        expect($taskList)->toContain('Write a report')
            ->and($taskList)->not->toContain('Read a book');
    });

    test('Postponing the selected task selects the next urgent task', function () {
        ($this->setupBoardPage)();

        boardPage()->selectUrgentTask('Read a book');
        boardPage()->assertInDetailCard('Read a book');

        boardPage()->postponeSelectedTask('+5m');

        boardPage()->assertInDetailCard('Write a report');
        boardPage()->assertNotInDetailCard('Read a book');
    });

    test('Postponing the last urgent task clears the task detail area', function () {
        ($this->setupBoardPage)();

        boardPage()->selectRecentTask('Read a book');
        boardPage()->postponeSelectedTask('+5m');
        boardPage()->postponeSelectedTask('+5m');

        $tasks = boardPage()->getUrgentTaskList();
        expect($tasks)->toContain('Schedule meeting')
            ->and(count($tasks))->toBe(1);

        boardPage()->postponeSelectedTask('+5m');

        boardPage()->assertInDetailCard('No task selected.');

        $url = page()->url();
        expect($url)->toEndWith('/boards/1');
    });
});
