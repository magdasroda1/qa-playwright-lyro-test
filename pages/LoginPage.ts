import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginEmailInput;
  readonly loginPasswordInput;
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    this.loginEmailInput = page.getByRole("textbox", { name: "Email input field" });
    this.loginPasswordInput = page.getByRole("textbox", { name: "Password input field" });
    this.loginButton = page.getByRole("button", { name: "Log in" }).nth(0);

  }
}