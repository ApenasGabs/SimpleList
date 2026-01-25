import { expect, test } from "@playwright/test";

test.describe("Feature Cards", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display all three feature cards", async ({ page }) => {
    // Localizar todos os cards com features
    const featureCards = page.getByTestId("feature-cards");
    await expect(featureCards).toBeVisible();

    // Verificar se os 3 cards estão presentes
    const viteCard = page.getByTestId("vite-card");
    const tailwindCard = page.getByTestId("tailwind-card");
    const daisyCard = page.getByTestId("daisyui-card");

    await expect(viteCard).toBeVisible();
    await expect(tailwindCard).toBeVisible();
    await expect(daisyCard).toBeVisible();
  });

  test("should display Vite card with correct content", async ({ page }) => {
    // Verificar card do Vite
    const viteCard = page.getByTestId("vite-card");
    await expect(viteCard).toBeVisible();
    await expect(viteCard).toContainText("Vite");
    await expect(viteCard).toContainText("Build rápido e HMR instantâneo");
  });

  test("should display Tailwind CSS card with correct content", async ({
    page,
  }) => {
    // Verificar card do Tailwind
    const tailwindCard = page.getByTestId("tailwind-card");
    await expect(tailwindCard).toBeVisible();
    await expect(tailwindCard).toContainText("Tailwind CSS");
    await expect(tailwindCard).toContainText("Utility-first CSS framework");
  });

  test("should display daisyUI card with correct content", async ({ page }) => {
    // Verificar card do daisyUI
    const daisyCard = page.getByTestId("daisyui-card");
    await expect(daisyCard).toBeVisible();
    await expect(daisyCard).toContainText("daisyUI");
    await expect(daisyCard).toContainText("Componentes prontos para uso");
  });

  test("should display info alert", async ({ page }) => {
    // Verificar alert info
    const alert = page.getByTestId("info-alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText("src/App.tsx");
  });

  test("should display tools section", async ({ page }) => {
    // Verificar se a seção de ferramentas está visível
    const toolsSection = page.getByTestId("tools-section");
    await expect(toolsSection).toBeVisible();
    await expect(toolsSection).toContainText("React");
    await expect(toolsSection).toContainText("TypeScript");
    await expect(toolsSection).toContainText("Vitest");
    await expect(toolsSection).toContainText("Playwright");
  });
});
