import { expect, test } from "@playwright/test";
import dotenv from 'dotenv';
import { randomString } from "../utils/functions.js";

dotenv.config();

test.describe("Lyro AI tests", () => {
  test("Test Lyro added data source", async ({ page }) => {
    await test.step("Login to project", async () => {
      await page.goto(
        `https://${process.env.DOMAIN}/panel/?project_public_key=${process.env.PROJECT_PUBLIC_KEY}&api_token=${process.env.API_TOKEN}`
      );
      await expect(
        page.getByRole("heading", { name: "Dashboard" })
      ).toBeInViewport();
    });

    await test.step("Test from data sources section", async () => {
      const randomMessage = randomString(8);
      const appContentHeader = page.locator("#app-content-header");
      const dataSourcesSection = page.getByRole("heading", { name: "Data sources" });
      const testLyroButton = page.getByRole("button", { name: "Test Lyro" });
      const testLyroChatFrame = page.frameLocator('iframe[title="Tidio Chat code"]');
      
      await page.goto(`https://${process.env.DOMAIN}/panel/lyro-ai/data-sources/added`);
      await expect(appContentHeader.getByText("Lyro AI Agent")).toBeInViewport();
      await expect(dataSourcesSection).toBeInViewport();
      await testLyroButton.click();

      const testLyroMessageInput = testLyroChatFrame.getByTestId('newMessageTextarea');
      await testLyroMessageInput.click();
      await testLyroMessageInput.fill("What Magda did on 17th of January 2026?");
      await testLyroMessageInput.press("Enter");
      await expect(page.getByText("On January 17, 2026, Magda Środa made the initial commit")).toBeInViewport();

      await testLyroMessageInput.fill(randomMessage);
      await testLyroMessageInput.press("Enter");
      await expect(page.getByText("I'm not sure what you're trying to ask. Could you please share your question so I can assist you better? ")).toBeInViewport();
    });

    await test.step("Simulate visitor and test from widget side", async () => {
      const simulateVisitorRandomMessage = randomString(7);
      const inboxSection = page.getByRole("heading", { name: "Inbox" });
      const simulateConversationButton = page.getByRole("button", { name: "Simulate a conversation" });
      const chatWithUsButton = page.locator('button:has-text("Chat with us")');
      const chat = page.frameLocator('iframe[title="Tidio Chat code"]');
      
      await page.locator('[data-test-id="inbox-section-button"]').click();
      await expect(inboxSection).toBeInViewport();
      
      const [simulateVisitorPage] = await Promise.all([page.waitForEvent("popup"),simulateConversationButton.click(),]);
      
      await simulateVisitorPage.waitForLoadState();
      await expect(simulateVisitorPage)
      .toHaveURL("https://www.tidio.com/panel/simulateVisitor?projectPublicKey=b7exsgtovbxc3jyuceg2nzn8jrq4rkcz");
      
      const simulateVisitorInputMessage = chat.getByTestId('newMessageTextarea');
      if (!(await simulateVisitorInputMessage.isVisible())) {
        await chatWithUsButton.click();
        await expect(simulateVisitorInputMessage).toBeVisible({ timeout: 5000 });
      } else {
        await expect(simulateVisitorInputMessage).toBeVisible();
      }

      await simulateVisitorInputMessage.click();
      await simulateVisitorInputMessage.fill("What Magda did on 17th of January 2026?");
      await simulateVisitorInputMessage.press("Enter");
      await expect(page.getByText("On January 17, 2026, Magda Środa made the initial commit"))
      .toBeInViewport();

      await simulateVisitorInputMessage.fill(simulateVisitorRandomMessage);
      await simulateVisitorInputMessage.press("Enter");
      await expect(
        page.getByText("I'm not sure what you're trying to ask. Could you please share your question so I can assist you better? ")
      ).toBeInViewport();
    });
  });
});
