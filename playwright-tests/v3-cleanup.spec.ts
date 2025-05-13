import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
let usernameInput: ReturnType<Page['getByPlaceholder']>;
let passwordInput: ReturnType<Page['getByPlaceholder']>;
let loginButton: ReturnType<Page['getByRole']>;

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL, { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded');
  usernameInput = page.getByPlaceholder('Username');
  passwordInput = page.getByPlaceholder('Password');
  loginButton = page.getByRole('button', { name: 'Login' });
});

test('Verify login page elements are visible', async () => {
  await Promise.all([
    expect(usernameInput).toBeVisible(),
    expect(passwordInput).toBeVisible(),
    expect(loginButton).toBeVisible(),
  ]);
});

test('Invalid login credentials show error message', async ({ page }) => {
  await usernameInput.fill('invalid_user');
  await passwordInput.fill('wrong_password');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/invalid-login.png' });
});

test('Successful login redirects to inventory page', async ({ page }) => {
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  await expect(page).toHaveURL(`${BASE_URL}inventory.html`);
  await page.screenshot({ path: 'screenshots/successful-login.png' });
});

test('Locked-out user shows error message', async ({ page }) => {
  await usernameInput.fill('locked_out_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/locked-out-user.png' });
});

test('Empty username and password fields show error message', async ({ page }) => {
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username is required');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/empty-fields.png' });
});

test('Empty password shows error message', async ({ page }) => {
  await usernameInput.fill('standard_user');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Password is required');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/empty-password.png' });
});

test('Empty username shows error message', async ({ page }) => {
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username is required');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/empty-username.png' });
});

test('Password input field is masked', async () => {
  await expect(passwordInput).toHaveAttribute('type', 'password');
});

test('Dismiss error message', async ({ page }) => {
  await usernameInput.fill('invalid_user');
  await passwordInput.fill('wrong_password');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(errorMessage).toBeVisible();

  const dismissButton = page.locator('.error-button'); // Adjusted locator
  await dismissButton.click();

  await expect(errorMessage).not.toBeVisible();
  await page.screenshot({ path: 'screenshots/dismiss-error.png' });
});

test.afterEach(async ({ page }) => {
  await page.screenshot({ path: 'screenshots/before-each-error.png' });
});