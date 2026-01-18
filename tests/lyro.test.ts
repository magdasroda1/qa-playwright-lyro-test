import { expect, test } from "@playwright/test";
import dotenv from 'dotenv';
import { randomString } from "../utils/functions.js";

dotenv.config();

test.describe("Lyro AI tests", () => {
  test.use({ storageState: "auth.json" });
  test("Test Lyro added data source", async ({ page }) => {
    await test.step("Open dashboard (authenticated)", async () => {
      await page.goto(
        `https://${process.env.DOMAIN}/panel/?project_public_key=${process.env.PROJECT_PUBLIC_KEY}&api_token=${process.env.API_TOKEN}`
      );
      //await page.goto("https://www.tidio.com/panel/login");
      await page.getByRole("textbox", { name: "Email input field" }).fill(process.env.LYRO_USER || "");
      await page.getByRole("textbox", { name: "Password input field" }).fill(process.env.LYRO_PASS || "");
      await page.getByRole("button", { name: "Log in" }).nth(0).click();
      await expect(
        page.getByRole("heading", { name: "Dashboard" })
      ).toBeInViewport();
    });
    await test.step("Test from data sources section", async () => {
      const testLyroInputMessage = page.getByTestId("newMessageTextarea");
      const randomMessage = randomString(8);

      await page.goto(
        `https://${process.env.DOMAIN}/panel/lyro-ai/data-sources/added`
      );
      await expect(
        page.locator("#app-content-header").getByText("Lyro AI Agent")
      ).toBeInViewport();
      await expect(page.getByRole("heading", { name: "Data sources" })
      ).toBeInViewport();
      await page.getByRole("button", { name: "Test Lyro" }).click();

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
      const simulateVisitorInputMessage = page.getByTestId("newMessageTextarea");
      const simulateVisitorRandomMessage = randomString(7);

      await page.locator('[data-test-id="inbox-section-button"]').click();
      await expect(
        page.getByRole("heading", { name: "Inbox" })
      ).toBeInViewport();
      
      const [simulateVisitorPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("button", { name: "Simulate a conversation" }).click(),
      ]);
      
      await simulateVisitorPage.waitForLoadState();
      await expect(simulateVisitorPage)
      .toHaveURL("https://www.tidio.com/panel/simulateVisitor?projectPublicKey=b7exsgtovbxc3jyuceg2nzn8jrq4rkcz");
      
      if (!(await simulateVisitorInputMessage.isVisible())) {
        await page.locator('button:has-text("Chat with us")').click();
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
