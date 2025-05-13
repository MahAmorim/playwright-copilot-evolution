import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

const login = async (page: Page, username: string, password: string) => {
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
};

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { timeout: 60000 }); // Increased timeout
    await page.waitForLoadState('domcontentloaded');
});

test.afterEach(async ({ page }, testInfo) => {
    if (page) { // Ensure page is valid
        await page.screenshot({ path: `screenshots/after-${testInfo.title.replace(/\s+/g, '_')}.png` });
    }
});

test.describe('Login Page Tests', () => {
    test('Verify all login elements are visible', async ({ page }) => {
        const usernameInput = page.getByPlaceholder('Username');
        const passwordInput = page.getByPlaceholder('Password');
        const loginButton = page.getByRole('button', { name: 'Login' });

        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    test('Invalid credentials show error message', async ({ page }) => {
        await login(page, 'invalid_user', 'wrong_password');
        const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
        await expect(errorMessage).toBeVisible();
    });

    test('Valid login redirects to inventory page', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
        await expect(page).toHaveURL(`${BASE_URL}inventory.html`);
    });

    test('Locked-out user shows error message', async ({ page }) => {
        await login(page, 'locked_out_user', 'secret_sauce');
        const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
        await expect(errorMessage).toBeVisible();
    });

    test.describe('Error Handling', () => {
        test('Empty username and password show error message', async ({ page }) => {
            const loginButton = page.getByRole('button', { name: 'Login' });
            await loginButton.click();
            const errorMessage = page.getByText('Epic sadface: Username is required');
            await expect(errorMessage).toBeVisible();
        });

        test('Empty password shows error message', async ({ page }) => {
            await login(page, 'standard_user', '');
            const errorMessage = page.getByText('Epic sadface: Password is required');
            await expect(errorMessage).toBeVisible();
        });

        test('Empty username shows error message', async ({ page }) => {
            await login(page, '', 'secret_sauce');
            const errorMessage = page.getByText('Epic sadface: Username is required');
            await expect(errorMessage).toBeVisible();
        });

        test('Dismiss error message', async ({ page }) => {
            await login(page, 'invalid_user', 'wrong_password');
            const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
            await expect(errorMessage).toBeVisible();

            const dismissButton = page.locator('.error-button');
            await dismissButton.click();
            await expect(errorMessage).not.toBeVisible();
        });
    });

    test.describe('Usability', () => {
        test('Password field is masked', async ({ page }) => {
            const passwordInput = page.getByPlaceholder('Password');
            await expect(passwordInput).toHaveAttribute('type', 'password');
            await page.screenshot({ path: 'screenshots/password-field-masked.png' });
        });
    });

    test.skip('Verify session persistence after refreshing the page', async ({ page }) => {
        // Suggested by prompt: validate that user remains logged in after refresh
    });

    test.skip('Test logout functionality and redirection to login page', async ({ page }) => {
        // Suggested by prompt: validate logout action and redirection to login screen
    });

    test.skip('Test responsiveness on different devices', async ({ page }) => {
        // Suggested by prompt: run login flow on mobile and tablet using Playwright devices
    });
});