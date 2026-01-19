import { expect, test } from "@playwright/test";
import dotenv from 'dotenv';
import { LoginPage } from "../pages/LoginPage.ts";
import { DataSourcesPage } from "../pages/DataSourcesPage.ts";
import { SimulatePage } from "../pages/SimulatePage.ts";
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
      const dataSourcesPage = new DataSourcesPage(page);
      const appContentHeader = dataSourcesPage.appContentHeader;
      const dataSourcesSection = dataSourcesPage.dataSourcesSection;
      const testLyroButton = dataSourcesPage.testLyroButton;
      const testLyroInputMessage = dataSourcesPage.testLyroInputMessage;
      const randomMessage = randomString(8);

      await page.goto(
        `https://${process.env.DOMAIN}/panel/lyro-ai/data-sources/added`
      );
      await expect(appContentHeader.getByText("Lyro AI Agent")).toBeInViewport();
      await expect(dataSourcesSection).toBeInViewport();
      await testLyroButton.click();

      await expect(
        page.getByText("Hello, how can I help you?", { exact: false })
      ).toBeInViewport();
      await expect(testLyroInputMessage).toBeVisible();
      await testLyroInputMessage.click();
      await testLyroInputMessage.fill("What Magda did on 17th of January 2026?");
      await testLyroInputMessage.press("Enter");
      await expect(page.getByText("On January 17, 2026, Magda Środa made the initial commit")
    ).toBeInViewport();

      await testLyroInputMessage.fill(randomMessage);
      await testLyroInputMessage.press("Enter");
      await expect(
        page.getByText("I'm not sure what you're trying to ask. Could you please share your question so I can assist you better? ")
      ).toBeInViewport();
    });

    await test.step("Simulate visitor and test from widget side", async () => {
      const simulatePage = new SimulatePage(page);
      const inboxSection = simulatePage.inboxSection;
      const simulateConversationButton = simulatePage.simulateConversationButton;
      const simulateVisitorInputMessage = simulatePage.simulateVisitorInputMessage;
      const chatWithUsButton = simulatePage.chatWithUsButton;
      const simulateVisitorRandomMessage = randomString(7);

      await page.locator('[data-test-id="inbox-section-button"]').click();
      await expect(inboxSection).toBeInViewport();
      
      const [simulateVisitorPage] = await Promise.all([
        page.waitForEvent("popup"),simulateConversationButton.click(),
      ]);
      
      await simulateVisitorPage.waitForLoadState();
      await expect(simulateVisitorPage)
      .toHaveURL("https://www.tidio.com/panel/simulateVisitor?projectPublicKey=b7exsgtovbxc3jyuceg2nzn8jrq4rkcz");
      
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
