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

/**
 * Query elements by selector and extract all aria-label attribute values
 * from the elements and their children.
 *
 * @return array<int, string>
 */
function getAriaLabels(Webpage|PendingAwaitablePage $page, string $selector): array
{
    /** @var string $html */
    $html = $page->script(<<<JS
        () => {
            return Array.from(document.querySelectorAll('$selector')).map(el => el.outerHTML).join('');
        }
    JS);

    preg_match_all('/aria-label=["\']([^"\']*)["\']/', $html, $matches);

    return $matches[1] ?? [];
}
