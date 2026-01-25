import { expect, test } from "@playwright/test";

test.describe("SimpleList - Tarefas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("deve criar uma nova tarefa", async ({ page }) => {
    const input = page.getByTestId("input-new-task");
    const addBtn = page.getByTestId("btn-add-task");

    // Adicionar tarefa
    await input.fill("Comprar leite");
    await addBtn.click();

    // Verificar se a tarefa foi adicionada
    const taskList = page.getByTestId("task-list");
    await expect(taskList).toContainText("Comprar leite");

    // Verificar contador
    const taskCount = page.getByTestId("task-count");
    await expect(taskCount).toContainText("1 abertas");
  });

  test("deve marcar tarefa como completa", async ({ page }) => {
    // Criar tarefa
    await page.getByTestId("input-new-task").fill("Tarefa teste");
    await page.getByTestId("btn-add-task").click();

    // Esperar tarefa aparecer e pegar o checkbox
    const taskRow = page.locator('[data-testid^="task-row-"]').first();
    await expect(taskRow).toBeVisible();

    const checkbox = taskRow.locator('[data-testid^="task-toggle-"]');
    await checkbox.click();

    // Verificar se o checkbox está marcado
    await expect(checkbox).toBeChecked();

    // Verificar contador atualizado
    const taskCount = page.getByTestId("task-count");
    await expect(taskCount).toContainText("0 abertas");
  });

  test("deve alternar entre ordenação por criação e alfabética", async ({ page }) => {
    // Criar algumas tarefas
    await page.getByTestId("input-new-task").fill("Zebra");
    await page.getByTestId("btn-add-task").click();

    await page.getByTestId("input-new-task").fill("Apple");
    await page.getByTestId("btn-add-task").click();

    // Verificar ordenação por criação (padrão)
    const sortCreated = page.getByTestId("sort-created");
    await expect(sortCreated).toHaveClass(/tab-active/);

    // Mudar para ordenação alfabética
    const sortAlpha = page.getByTestId("sort-alpha");
    await sortAlpha.click();

    // Verificar se a aba está ativa
    await expect(sortAlpha).toHaveClass(/tab-active/);

    // Verificar se as tarefas estão em ordem alfabética
    const tasks = page.locator('[data-testid^="task-title-"]');
    await expect(tasks.first()).toContainText("Apple");
  });

  test("deve deletar uma tarefa", async ({ page }) => {
    // Criar tarefa
    await page.getByTestId("input-new-task").fill("Tarefa para deletar");
    await page.getByTestId("btn-add-task").click();

    // Esperar tarefa aparecer
    const taskRow = page.locator('[data-testid^="task-row-"]').first();
    await expect(taskRow).toBeVisible();

    // Clicar no botão de deletar
    const deleteBtn = taskRow.locator('[data-testid^="task-delete-"]');
    await deleteBtn.click();

    // Aguardar modal de confirmação aparecer
    await page.locator("dialog[open]").waitFor({ state: "visible" });

    // Procurar e clicar no botão de confirmar no modal
    const confirmBtn = page
      .locator("dialog[open] button")
      .filter({ hasText: /deletar|confirmar|sim/i })
      .first();
    await confirmBtn.click();

    // Aguardar a tarefa ser removida
    await page.getByTestId("empty-state").waitFor({ state: "visible" });

    // Verificar se voltou ao estado vazio
    await expect(page.getByTestId("empty-state")).toBeVisible();
  });
});
