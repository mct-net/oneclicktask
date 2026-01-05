<?php

use App\Models\Board;
use App\Models\User;

describe('Feature: Clearable Task Detail Display', function () {
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
        $this->setupBoardWithTasks = function () {
            $this->actingAs($this->user);
            $this->page = visit("/boards/{$this->board->id}");

            boardPage()->isReady();

            boardPage()
                ->createTask('Read a book')
                ->createTask('Write a report');

            boardPage()->selectRecentTask('Read a book');
            $content = boardPage()->getSelectedTaskContent();
            expect($content)->toContain('Read a book');
        };
    });

    test('Clicking outside the detail card cleans it', function () {
        ($this->setupBoardWithTasks)();

        boardPage()->clickOutsideTask();

        boardPage()->assertInDetailCard('No task selected');
        boardPage()->assertNotInDetailCard('Read a book');

        $url = page()->url();
        expect($url)->toEndWith('/boards/1');
    });

    test('The detail card is hidden when searching', function () {
        ($this->setupBoardWithTasks)();

        boardPage()->search('report');

        $isVisible = boardPage()->isTaskDetailsAreaVisible();
        expect($isVisible)->toBeFalsy();

        boardPage()->clearSearch();

        $isVisible = boardPage()->isTaskDetailsAreaVisible();
        expect($isVisible)->toBeTruthy();

        $content = boardPage()->getSelectedTaskContent();
        expect($content)->toContain('Read a book');
    });
});
