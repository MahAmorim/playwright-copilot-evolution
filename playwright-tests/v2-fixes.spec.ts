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

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png` });
  }
});

test('Verify login page elements are visible', async () => {
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();
});

test('Invalid login credentials show error message', async ({ page }) => {
  await usernameInput.fill('invalid_user');
  await passwordInput.fill('wrong_password');
  await loginButton.click();
  const errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(errorMessage).toBeVisible();
});

test('Successful login redirects to inventory page', async ({ page }) => {
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  await expect(page).toHaveURL(`${BASE_URL}inventory.html`);
});

test('Locked-out user shows error message', async ({ page }) => {
  await usernameInput.fill('locked_out_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
  await expect(errorMessage).toBeVisible();
});

test('Empty username and password fields show error message', async ({ page }) => {
  await loginButton.click();
  const errorMessage = page.getByText('Epic sadface: Username is required');
  await expect(errorMessage).toBeVisible();
});

test('Empty password shows error message', async ({ page }) => {
  await usernameInput.fill('standard_user');
  await loginButton.click();
  const errorMessage = page.getByText('Epic sadface: Password is required');
  await expect(errorMessage).toBeVisible();
});

test('Empty username shows error message', async ({ page }) => {
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  const errorMessage = page.getByText('Epic sadface: Username is required');
  await expect(errorMessage).toBeVisible();
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
  const dismissButton = page.locator('.error-button');
  await dismissButton.click();
  await expect(errorMessage).not.toBeVisible();
});