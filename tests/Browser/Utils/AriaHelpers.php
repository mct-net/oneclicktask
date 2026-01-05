<?php

namespace Tests\Browser\Utils;

/**
 * ARIA accessibility helpers for parsing and extracting semantic element information
 */
class AriaHelpers
{
    /**
     * Parse an ARIA snapshot output and extract listitem text content.
     * This is used to validate task list contents based on accessibility tree.
     *
     * @param  array<string>  $list  The list items from ARIA snapshot
     * @return array<string> Rendered text content from list items
     */
    public static function renderedAriaList(array $list): array
    {
        $result = [];

        foreach ($list as $item) {
            // Extract the text content from ARIA list items
            // Handle nested structure where items may contain role and name attributes
            if (is_string($item)) {
                $result[] = trim($item);
            }
        }

        return $result;
    }

    /**
     * Get accessible name from an element based on ARIA attributes
     *
     * @param  mixed  $element  The element to get the accessible name from
     * @return string The accessible name
     */
    public static function getAccessibleName($element): string
    {
        if (is_array($element) && isset($element['name'])) {
            return $element['name'];
        }

        return '';
    }
}
