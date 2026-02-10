<?php

namespace Tests\Browser\Pages;

use Pest\Browser\Api\PendingAwaitablePage;
use Pest\Browser\Api\Webpage;

/**
 * Page Object Model for the task board page
 * Provides reusable methods for interacting with the board and tasks
 */
class BoardPage
{
    protected Webpage|PendingAwaitablePage $page;

    // Selectors - defined once, used everywhere
    protected string $searchInput = 'input[aria-label="Find or create..."]';

    protected string $filtersBar = '[role="group"][aria-label="Filters Bar"]';

    protected string $emptyState = '[data-testid="empty-state"]';

    // Task detail area
    protected string $taskDetailArea = 'article[aria-label="Selected task area"]';

    protected string $taskNameInput = '[role="textbox"][aria-label^="Task name:"]';

    protected string $taskDescriptionRegion = '[role="region"][aria-label="Task description"]:visible';

    protected string $taskStatusButton = 'button[aria-label^="Task status: "]';

    protected string $taskStatusMenu = '[role="menu"][aria-label="Task status options"]';

    protected string $postponeButton = 'button[label="Postpone task"]';

    protected string $postponeArea = '[role="group"][aria-label="Postpone task area"]';

    // Tags
    protected string $tagsRegion = '[role="region"][aria-label="Tags"]';

    protected string $addTagButton = 'button[aria-label="Manage tags"]';

    // Assignee
    protected string $assigneeButton = '[aria-label="Set assignee"]';

    protected string $assigneeSearchInput = 'input[aria-label="Search user..."]';

    protected string $assigneeList = '[aria-label="User list"]';

    // Task lists
    protected string $urgentList = '[role="listbox"][aria-label="Five most urgent tasks"]';

    protected string $recentList = '[role="listbox"][aria-label="Five most recent tasks"]';

    protected string $resultsList = '[role="listbox"][aria-label="Search results"]';

    // Deselection area
    protected string $deselectionArea = '[data-testid="deselection-area"]';

    public function __construct(Webpage|PendingAwaitablePage $page)
    {
        $this->page = $page;
    }

    /**
     * Navigate to the board
     */
    public function visit(int $boardId): self
    {
        $this->page->visit("/boards/{$boardId}");

        return $this;
    }

    /**
     * Wait for the board page to be ready
     */
    public function isReady(): self
    {
        $this->page->assertVisible($this->emptyState);

        return $this;
    }

    /**
     * Create a new task
     */
    public function createTask(string $taskName, ?string $status = null): self
    {
        $this->page
            ->fill($this->searchInput, $taskName)
            ->keys($this->searchInput, 'Enter');
        $this->page->assertSee($taskName, 5);

        if ($status && $status != 'Backlog') {
            $this->changeTaskStatus($status);
        }

        return $this;
    }

    /**
     * Search for tasks
     */
    public function search(string $query): self
    {
        $this->page->click($this->searchInput)
            ->clear($this->searchInput)
            ->type($this->searchInput, $query);

        return $this;
    }

    /**
     * Clear the search field
     */
    public function clearSearch(): self
    {
        $this->page->clear($this->searchInput);

        return $this;
    }

    /**
     * Select a task from the urgent tasks list
     */
    public function selectUrgentTask(string $taskName): self
    {
        $this->page->click("{$this->urgentList} [role=\"listitem\"][aria-label=\"{$taskName}\"]");

        return $this;
    }

    /**
     * Select a task from the recent tasks list
     */
    public function selectRecentTask(string $taskName): self
    {
        $this->page->click("{$this->recentList} [role=\"listitem\"][aria-label=\"{$taskName}\"]");

        return $this;
    }

    /**
     * Get all visible task names from task lists
     */
    public function getVisibleTaskNames(): string
    {
        return $this->page->text($this->recentList);
    }

    /**
     * Get all urgent task names
     *
     * @return array<int, string>
     */
    public function getUrgentTaskList(): array
    {
        return locator($this->page, "{$this->urgentList} [aria-label=\"Task name\"]");
    }

    /**
     * Toggle a task status filter
     */
    public function toggleStatusFilter(string $status): self
    {
        $this->page->click("{$this->filtersBar} button[title=\"{$status}\"]");

        return $this;
    }

    /**
     * Edit the selected task's name
     */
    public function editSelectedTask(string $field, string $value, ?string $newValue = null): self
    {
        if ($field === 'name') {
            $this->page->clear($this->taskNameInput)
                ->fill($this->taskNameInput, $value);
        }

        if ($field === 'status') {
            $this->changeTaskStatus($value);
        }

        if ($field === 'description') {
            $this->page->click("{$this->taskDescriptionRegion} p:visible")
                ->fill("{$this->taskDescriptionRegion} p:visible", $value);
        }

        if ($field === 'assignee') {
            $this->changeSelectedTaskAssignee($value);
        }

        return $this;
    }

    /**
     * Add a new tag to the selected task via the tag popover
     */
    public function addTagToSelectedTask(string $tag): self
    {
        $this->page->click($this->addTagButton);
        $this->page->fill('input[placeholder="Search tag..."]', $tag);
        $this->page->keys('input[placeholder="Search tag..."]', 'Enter');

        return $this;
    }

    /**
     * Change the task status
     */
    public function changeTaskStatus(string $status): self
    {
        // Use :visible to handle mobile/desktop versions
        $this->page->hover("{$this->taskDetailArea} {$this->taskStatusButton}:visible");
        $this->page->click("{$this->taskStatusMenu} button[title='{$status}']:visible");

        return $this;
    }

    /**
     * Get the current task status
     */
    public function getTaskStatus(): string
    {
        // Use :visible to handle mobile/desktop versions
        return $this->page->attribute("{$this->taskDetailArea} {$this->taskStatusButton}:visible", 'aria-label') ?? '';
    }

    /**
     * Change the assignee of the selected task
     */
    public function changeSelectedTaskAssignee(string $name): self
    {
        $this->page->click($this->assigneeButton);
        $this->page->type($this->assigneeSearchInput, $name);
        $this->page->click("{$this->assigneeList} li:first-child");

        return $this;
    }

    /**
     * Postpone the selected task
     */
    public function postponeSelectedTask(string $option): self
    {
        $this->page->hover($this->postponeArea);
        $this->page->click($this->postponeButton);
        $this->page->click("{$this->postponeArea} button:has-text('{$option}')");

        return $this;
    }

    /**
     * Click outside the task detail to deselect
     */
    public function clickOutsideTask(): self
    {
        $this->page->click($this->deselectionArea);
        $this->page->assertSeeIn($this->taskDetailArea, 'No task selected.');

        return $this;
    }

    /**
     * Check if task detail area is visible
     */
    public function isTaskDetailsAreaVisible(): bool
    {
        $results = locator($this->page, $this->taskDetailArea);

        return count($results);
    }

    /**
     * Get the selected task's content
     */
    public function getSelectedTaskContent(): string
    {
        $detailArea = $this->getSelectedTaskCardContent();
        $descriptionRegion = $this->page->text($this->taskDescriptionRegion);

        return $detailArea."\n".$descriptionRegion;
    }

    /**
     * Get card content from the task detail area
     */
    public function getSelectedTaskCardContent(): string
    {
        /*
            Note: We would ideally use Playwrights aria snapshot,
            but Pest Browser doesn't support it yet. That's why we
            manually combine the aria labels and the visible text
            of the detail area.
        */

        $visibleText = $this->page->text($this->taskDetailArea);
        $ariaLabels = getAriaLabels($this->page, "{$this->taskDetailArea}");
        $searchableContent = $visibleText.' '.implode(' ', $ariaLabels);

        return $searchableContent;
    }

    /**
     * Get content from the results list
     */
    public function getSearchResultsContent(): string
    {
        /*
            Note: We would ideally use Playwrights aria snapshot,
            but Pest Browser doesn't support it yet. That's why we
            manually combine the aria labels and the visible text.
        */

        $visibleText = $this->page->text($this->resultsList);
        $ariaLabels = getAriaLabels($this->page, "{$this->resultsList}");
        $foundContent = $visibleText.' '.implode(' ', $ariaLabels);

        return $foundContent;
    }

    public function assertInDetailCard(string $string)
    {
        $this->page->assertSeeIn($this->taskDetailArea, $string);
    }

    public function assertNotInDetailCard(string $string)
    {
        $this->page->assertDontSeeIn($this->taskDetailArea, $string);
    }

    /**
     * Assert that text is visible
     */
    public function assertSee(string $text): self
    {
        $this->page->assertSee($text);

        return $this;
    }

    /**
     * Assert that text is not visible
     */
    public function assertDontSee(string $text): self
    {
        $this->page->assertDontSee($text);

        return $this;
    }
}
