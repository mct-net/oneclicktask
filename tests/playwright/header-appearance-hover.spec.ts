import { expect, test } from 'playwright/test';

test('theme toggle appears when hovering the header breadcrumb area', async ({
    page,
}, testInfo) => {
    const suffix = Date.now();

    await page.goto('/register');
    await page.locator('input[name="name"]').fill(`Header Hover ${suffix}`);
    await page
        .locator('input[name="email"]')
        .fill(`header-hover-${suffix}@example.com`);
    await page.locator('input[name="password"]').fill('password');
    await page.locator('input[name="password_confirmation"]').fill('password');
    await page.getByRole('button', { name: 'Create account' }).click();

    await page.waitForURL(/\/boards\/\d+/);

    const analyticsDialog = page.getByRole('dialog', { name: 'A small favor' });
    if (await analyticsDialog.isVisible()) {
        await page.getByRole('button', { name: 'Maybe later' }).click();
        await expect(analyticsDialog).toBeHidden();
    }

    const header = page.getByTestId('app-header');
    const breadcrumbRow = page.getByTestId('app-header-breadcrumbs');
    const toggle = page.getByTestId('appearance-toggle');

    await expect(header).toBeVisible();
    await expect(breadcrumbRow).toBeVisible();
    await expect(toggle).toHaveCSS('opacity', '0');

    await breadcrumbRow.hover();
    await expect(toggle).toHaveCSS('opacity', '1');

    await header.screenshot({
        path: testInfo.outputPath('header-appearance-hover.png'),
    });
});
