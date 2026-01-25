import { expect, test } from "@playwright/test";

test.describe("App - Page Load", () => {
  test("should load the app successfully", async ({ page }) => {
    await page.goto("/");

    // Verificar se o título está visível
    const title = page.getByTestId("main-title");
    await expect(title).toBeVisible();
    await expect(title).toContainText("Vite + React + TypeScript");
  });

  test("should display navbar with correct title", async ({ page }) => {
    await page.goto("/");

    // Verificar navbar
    const navbarTitle = page.getByTestId("navbar-title");
    await expect(navbarTitle).toBeVisible();
    await expect(navbarTitle).toContainText("Apenas Template");
  });

  test("should display hero section content", async ({ page }) => {
    await page.goto("/");

    // Verificar se as imagens do Vite e React estão visíveis
    const viteImg = page.getByTestId("vite-logo");
    const reactImg = page.getByTestId("react-logo");
    await expect(viteImg).toBeVisible();
    await expect(reactImg).toBeVisible();

    // Verificar descrição
    const description = page.getByTestId("main-description");
    await expect(description).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await page.goto("/");

    // Verificar footer
    const footer = page.locator(".footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(
      "Template React + TypeScript + Vite + Tailwind CSS + daisyUI",
    );
  });
});
