import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
let usernameInput: ReturnType<Page['getByPlaceholder']>;
let passwordInput: ReturnType<Page['getByPlaceholder']>;
let loginButton: ReturnType<Page['getByRole']>;

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  usernameInput = page.getByPlaceholder('Username');
  passwordInput = page.getByPlaceholder('Password');
  loginButton = page.getByRole('button', { name: 'Login' });
});

test('Verify login page elements on SauceDemo', async () => {
  await Promise.all([
    expect(usernameInput).toBeVisible(),
    expect(passwordInput).toBeVisible(),
    expect(loginButton).toBeVisible(),
  ]);
});

test('Verify error message on invalid login', async ({ page }) => {
  await Promise.all([
    usernameInput.fill('wrong_username'),
    passwordInput.fill('wrong_password'),
  ]);
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/invalid-login-error.png' });
});

test('Verify successful login with valid credentials', async ({ page }) => {
  await Promise.all([
    usernameInput.fill('standard_user'),
    passwordInput.fill('secret_sauce'),
  ]);
  await loginButton.click();

  await expect(page).toHaveURL(`${BASE_URL}inventory.html`);
  await page.screenshot({ path: 'screenshots/successful-login.png' });
});

test('Verify error message for locked-out user', async ({ page }) => {
  await Promise.all([
    usernameInput.fill('locked_out_user'),
    passwordInput.fill('secret_sauce'),
  ]);
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/locked-out-error.png' });
});

test('Verify error message when username and password are empty', async ({ page }) => {
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username is required');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/empty-fields-error.png' });
});

test('Verify error message when password is empty', async ({ page }) => {
  await usernameInput.fill('standard_user');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Password is required');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/empty-password-error.png' });
});

test('Verify error message when username is empty', async ({ page }) => {
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username is required');
  await expect(errorMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/empty-username-error.png' });
});

test('Verify password input is masked', async ({ page }) => {
  await expect(passwordInput).toHaveAttribute('type', 'password');
  await page.screenshot({ path: 'screenshots/password-masked.png' });
});

test('Verify error message dismissal', async ({ page }) => {
  await Promise.all([
    usernameInput.fill('wrong_username'),
    passwordInput.fill('wrong_password'),
  ]);
  await loginButton.click();

  const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(errorMessage).toBeVisible();

  const dismissButton = page.getByRole('button', { name: 'Close' });
  await dismissButton.click();

  await expect(errorMessage).not.toBeVisible();
  await page.screenshot({ path: 'screenshots/error-dismissed.png' });
});