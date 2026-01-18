import { Page, expect } from "@playwright/test";

export class DataSourcesPage {
  readonly page: Page;
  readonly appContentHeader;
  readonly dataSourcesSection;
  readonly testLyroButton;
  readonly testLyroInputMessage;
  readonly chatButton;
  

  constructor(page: Page) {
    this.page = page;
    this.appContentHeader = page.locator("#app-content-header");
    this.dataSourcesSection = page.getByRole("heading", { name: "Data sources" });
    this.testLyroButton = page.getByRole("button", { name: "Test Lyro" });
    this.testLyroInputMessage = page.getByTestId("newMessageTextarea");
    this.chatButton = page.locator('button:has-text("Chat with us")');
  }
}
