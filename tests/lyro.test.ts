import { expect, test } from "@playwright/test";

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
      await page.goto(
        `https://${process.env.DOMAIN}/panel/lyro-ai/data-sources/added`
      );
      await expect(
        page.locator("#app-content-header").getByText("Lyro AI Agent")
      ).toBeInViewport();
      await expect(
        page.getByRole("heading", { name: "Data sources" })
      ).toBeInViewport();
      await page.getByRole("button", { name: "Test Lyro" }).click();
      //TODO
    });
    await test.step("Simulate visitor and test from widget side", async () => {
      await page.locator('[data-test-id="inbox-section-button"]').click();
      await expect(
        page.getByRole("heading", { name: "Inbox" })
      ).toBeInViewport();
      await page
        .getByRole("button", { name: "Simulate a conversation" })
        .click();
      //TODO
    });
  });
});
