import { expect, test } from "@playwright/test";

test.describe("notes flow", () => {
  test.skip(
    !process.env.PLAYWRIGHT_BASE_URL,
    "Set PLAYWRIGHT_BASE_URL to a running web deployment before executing E2E tests.",
  );

  test("creates, updates, archives, and deletes a note", async ({ page }) => {
    const email = `notes-${Date.now()}@example.com`;
    const password = "password123";
    const createdTitle = `Biology note ${Date.now()}`;
    const updatedTitle = `${createdTitle} updated`;

    await page.goto("/register");

    await page.getByLabel(/full name/i).fill("Notes Tester");
    await page.getByLabel(/email address/i).fill(email);
    await page.getByLabel(/^password$/i).fill(password);
    await page.getByRole("button", { name: /create account/i }).click();

    await page.goto("/notes");

    await expect(
      page.getByRole("heading", { name: /create note/i }),
    ).toBeVisible();

    await page.getByLabel(/^title$/i).fill(createdTitle);
    await page
      .getByLabel(/^content$/i)
      .fill(
        "Cells divide, DNA replicates, and mitosis follows a predictable order.",
      );
    await page.getByLabel(/^visibility$/i).selectOption("PUBLIC");
    await page.getByRole("button", { name: /create note/i }).click();

    await expect(page).toHaveURL(/\/notes\/.+/);
    await expect(page.locator('input[name="title"]')).toHaveValue(createdTitle);

    await page.getByLabel(/^title$/i).fill(updatedTitle);
    await page.getByRole("button", { name: /save changes/i }).click();
    await expect(page.locator('input[name="title"]')).toHaveValue(updatedTitle);

    await page.getByRole("link", { name: /back to notes/i }).click();
    await expect(
      page.getByRole("link", { name: new RegExp(updatedTitle, "i") }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: new RegExp(updatedTitle, "i") })
      .click();
    await page.getByRole("button", { name: /archive note/i }).click();
    await page.getByRole("link", { name: /back to notes/i }).click();

    await page.getByRole("button", { name: /archived/i }).click();
    await expect(
      page.getByRole("link", { name: new RegExp(updatedTitle, "i") }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: new RegExp(updatedTitle, "i") })
      .click();
    await page.getByRole("button", { name: /delete note/i }).click();

    await expect(page).toHaveURL(/status=deleted/);
    await expect(
      page.getByRole("link", { name: new RegExp(updatedTitle, "i") }),
    ).toBeVisible();
  });
});
