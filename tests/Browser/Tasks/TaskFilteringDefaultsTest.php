<?php

use App\Models\Board;
use App\Models\User;

describe('Feature: Task Filtering Defaults', function () {
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

            // Create tasks with all possible statuses
            boardPage()
                ->createTask('In Progress Task', 'In progress')
                ->createTask('Backlog Task', 'Backlog')
                ->createTask('Failed Task', 'Failed / Duplicate')
                ->createTask('Done Task', 'Done')
                ->createTask('Trashed Task', 'Trashed');
        };
    });

    test('Users can filter failed tasks', function () {
        ($this->setupBoardPage)();

        boardPage()->toggleStatusFilter('Failed / Duplicate');

        $visibleTasks = boardPage()->getVisibleTaskNames();
        expect($visibleTasks)->toContain('Failed Task');
    });

    test('Users can filter done tasks', function () {
        ($this->setupBoardPage)();

        boardPage()->toggleStatusFilter('Done');

        $visibleTasks = boardPage()->getVisibleTaskNames();
        expect($visibleTasks)->toContain('Done Task');
    });

    test('Users can filter trashed tasks', function () {
        ($this->setupBoardPage)();

        boardPage()->toggleStatusFilter('Trashed');

        $visibleTasks = boardPage()->getVisibleTaskNames();
        expect($visibleTasks)->toContain('Trashed Task');
    });

    test('By default, only In Progress and Backlog tasks are visible', function () {
        ($this->setupBoardPage)();

        $visibleTasks = boardPage()->getVisibleTaskNames();

        expect($visibleTasks)
            ->toContain('In Progress Task')
            ->toContain('Backlog Task')
            ->not->toContain('Failed Task')
            ->not->toContain('Done Task')
            ->not->toContain('Trashed Task');

        boardPage()->search('a');
        $searchResults = boardPage()->getSearchResultsContent();

        expect($searchResults)
            ->toContain('In Progress Task')
            ->toContain('Backlog Task')
            ->not->toContain('Failed Task')
            ->not->toContain('Done Task')
            ->not->toContain('Trashed Task');
    });

    test('Selected task should be affected by filters', function () {
        ($this->setupBoardPage)();

        boardPage()
            ->createTask('Read book', 'In progress')
            ->selectRecentTask('Read book');

        boardPage()->toggleStatusFilter('Failed / Duplicate');

        $visibleTasks = boardPage()->getVisibleTaskNames();
        expect($visibleTasks)->not->toContain('Read book');
    });
});
