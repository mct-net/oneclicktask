<?php

use App\Models\Board;
use App\Models\User;

describe('Feature: Task Auto-Save', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
        $this->board = Board::factory()->create(['owner_id' => $this->user->id]);
        $this->board->members()->attach($this->user->id, ['role' => 'admin']);
    });

    test('User can safely refresh without losing task changes', function () {
        $this->actingAs($this->user);
        $this->page = visit("/boards/{$this->board->id}");

        boardPage()->isReady();

        boardPage()
            ->createTask('Sample Task', 'In progress')
            ->addTagToSelectedTask('Sample Tag');

        boardPage()
            ->selectRecentTask('Sample Task')
            ->editSelectedTask('name', 'Updated Task Name')
            ->editSelectedTask('status', 'Done')
            ->editSelectedTask('description', 'Updated description')
            ->editSelectedTask('assignee', $this->user->name);

        // Refresh the page and reset the cached BoardPage instance
        page()->navigate("/boards/{$this->board->id}");
        $this->boardPage = null; // Reset cached BoardPage to create a new one
        boardPage()->isReady();

        boardPage()->toggleStatusFilter('Done');

        $visibleTasks = boardPage()->getVisibleTaskNames();
        expect($visibleTasks)->toContain('Updated Task Name')
            ->and($visibleTasks)->not->toContain('Sample Task');

        $selectedContent = boardPage()->getSelectedTaskContent();
        expect($selectedContent)
            ->toContain('Updated Task Name')
            ->toContain('Updated description')
            ->toContain('Sample Tag')
            ->toContain($this->user->name)
            ->not->toContain('Sample Task');
    });
});
