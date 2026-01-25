import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TaskList } from "../TaskList";

const getTaskTitlesInOrder = (): string[] =>
  screen.getAllByTestId(/task-title-/).map((node) => (node.textContent ?? "").trim());

describe("TaskList", () => {
  it("mantém concluídos no final e atualiza posição ao concluir", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    expect(getTaskTitlesInOrder()).toEqual([
      "Pagar conta de luz",
      "Comprar pão integral",
      "Ligar para o médico às 15h",
      "Revisão do projeto",
    ]);

    await user.click(screen.getByTestId("task-toggle-task-2"));

    expect(getTaskTitlesInOrder()).toEqual([
      "Pagar conta de luz",
      "Ligar para o médico às 15h",
      "Revisão do projeto",
      "Comprar pão integral",
    ]);
  });

  it("devolve item reaberto para posição correta conforme ordenação", async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.click(screen.getByTestId("sort-alpha"));

    expect(getTaskTitlesInOrder()).toEqual([
      "Comprar pão integral",
      "Ligar para o médico às 15h",
      "Pagar conta de luz",
      "Revisão do projeto",
    ]);

    await user.click(screen.getByTestId("task-toggle-task-1"));

    expect(getTaskTitlesInOrder()).toEqual([
      "Comprar pão integral",
      "Ligar para o médico às 15h",
      "Revisão do projeto",
      "Pagar conta de luz",
    ]);

    await user.click(screen.getByTestId("task-toggle-task-1"));

    expect(getTaskTitlesInOrder()).toEqual([
      "Comprar pão integral",
      "Ligar para o médico às 15h",
      "Pagar conta de luz",
      "Revisão do projeto",
    ]);
  });
});
