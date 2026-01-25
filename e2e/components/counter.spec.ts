import { expect, test } from "@playwright/test";

test.describe("Counter Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display counter card", async ({ page }) => {
    // Verificar se o card do contador está visível
    const card = page.getByTestId("counter-card");
    await expect(card).toBeVisible();
  });

  test("should increment counter when button is clicked", async ({ page }) => {
    // Localizar o botão do contador
    const counterButton = page.getByTestId("counter-button");

    // Verificar valor inicial (0)
    await expect(counterButton).toContainText("Contagem: 0");

    // Clicar no botão
    await counterButton.click();

    // Verificar se incrementou para 1
    await expect(counterButton).toContainText("Contagem: 1");

    // Clicar novamente
    await counterButton.click();

    // Verificar se incrementou para 2
    await expect(counterButton).toContainText("Contagem: 2");
  });

  test("should display counter hint badge", async ({ page }) => {
    // Verificar se o badge com dica está visível
    const badge = page.getByTestId("counter-hint");
    await expect(badge).toBeVisible();
    await expect(badge).toContainText("Clique no botão para incrementar");
  });

  test("should display counter button with primary style", async ({ page }) => {
    // Verificar se o botão tem as classes corretas
    const counterButton = page.getByTestId("counter-button");

    // Verificar classes
    const classes = await counterButton.getAttribute("class");
    expect(classes).toContain("btn-primary");
    expect(classes).toContain("btn-lg");
  });
});
