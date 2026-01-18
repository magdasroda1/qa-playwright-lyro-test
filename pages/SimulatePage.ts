import { Page, expect } from "@playwright/test";

export class SimulatePage {
  readonly page: Page;
  readonly inboxSection;
  readonly simulateConversationButton; 
  readonly simulateVisitorInputMessage;
  readonly chatWithUsButton;
  
  constructor(page: Page) {
    this.page = page;
    this.inboxSection = page.getByRole("heading", { name: "Inbox" });
    this.simulateConversationButton = page.getByRole("button", { name: "Simulate a conversation" });
    this.simulateVisitorInputMessage = page.getByTestId("newMessageTextarea");
    this.chatWithUsButton = page.locator('button:has-text("Chat with us")');
  }
}