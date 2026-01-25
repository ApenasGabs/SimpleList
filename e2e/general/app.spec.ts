import { expect, test } from "@playwright/test";

test.describe("SimpleList - App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("deve carregar a aplicação com sucesso", async ({ page }) => {
    // Verificar se o navbar está visível
    const navbar = page.getByTestId("navbar-title");
    await expect(navbar).toBeVisible();
    await expect(navbar).toContainText("SimpleList");

    // Verificar se as abas estão visíveis
    const tabLists = page.getByTestId("tab-lists");
    const tabToday = page.getByTestId("tab-today");
    await expect(tabLists).toBeVisible();
    await expect(tabToday).toBeVisible();
  });

  test("deve exibir lista Inbox por padrão", async ({ page }) => {
    // Verificar se o input de nova tarefa está visível
    const input = page.getByTestId("input-new-task");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("placeholder", "Adicionar tarefa");

    // Verificar se o botão de adicionar está visível
    const addBtn = page.getByTestId("btn-add-task");
    await expect(addBtn).toBeVisible();
  });

  test("deve exibir estado vazio quando não há tarefas", async ({ page }) => {
    // Verificar mensagem de estado vazio
    const emptyState = page.getByTestId("empty-state");
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText("Nenhuma tarefa");
  });

  test("deve alternar entre abas Listas e Hoje", async ({ page }) => {
    // Clicar na aba "Hoje"
    const tabToday = page.getByTestId("tab-today");
    await tabToday.click();

    // Verificar se a aba está ativa
    await expect(tabToday).toHaveClass(/tab-active/);

    // Voltar para aba "Listas"
    const tabLists = page.getByTestId("tab-lists");
    await tabLists.click();

    // Verificar se a aba está ativa
    await expect(tabLists).toHaveClass(/tab-active/);
  });
});
