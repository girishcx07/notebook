import { expect, test } from "@playwright/test";

test.describe("web shell", () => {
  test.skip(
    !process.env.PLAYWRIGHT_BASE_URL,
    "Set PLAYWRIGHT_BASE_URL to a running web deployment before executing E2E tests.",
  );

  test("renders the public shell", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", {
        name: /smart notebook/i,
      }),
    ).toBeVisible();
  });
});
