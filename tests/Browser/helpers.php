<?php

use Pest\Browser\Api\PendingAwaitablePage;
use Pest\Browser\Api\Webpage;

/**
 * Query elements by selector and extract their text content.
 *
 * @return array<int, string>
 */
function locator(Webpage|PendingAwaitablePage $page, string $selector): array
{
    /** @var array<int, string> $items */
    $items = $page->script(<<<JS
        () => {
            return Array.from(document.querySelectorAll('$selector')).map(el => el.textContent?.trim() || '');
        }
    JS);

    return $items;
}
