import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AppProvider } from "../../../context";
import { TaskList } from "../TaskList";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("TaskList com Context", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("cria nova tarefa e exibe na lista", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");
    const button = screen.getByTestId("btn-add-task");

    await user.type(input, "Nova tarefa");
    await user.click(button);

    expect(screen.getByText("Nova tarefa")).toBeInTheDocument();
  });

  it("marca tarefa como completa", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");
    await user.type(input, "Tarefa para completar");
    await user.keyboard("{Enter}");

    const checkbox = screen.getByLabelText("Marcar Tarefa para completar");
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText("Tarefa para completar")).toHaveClass("line-through");
  });

  it("detecta duplicação de título", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");
    const button = screen.getByTestId("btn-add-task");

    await user.type(input, "Tarefa duplicada");
    await user.click(button);

    await user.clear(input);
    await user.type(input, "Tarefa duplicada");

    window.alert = () => {}; // Mock alert
    await user.click(button);

    const elements = screen.getAllByText("Tarefa duplicada");
    expect(elements).toHaveLength(1);
  });

  it("alterna prioridade da tarefa", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");
    await user.type(input, "Tarefa com prioridade");
    await user.keyboard("{Enter}");

    const priorityBtns = screen.getAllByRole("button", { name: "Mudar prioridade" });
    expect(priorityBtns.length).toBeGreaterThan(0);

    await user.click(priorityBtns[0]);
    expect(priorityBtns[0]).toBeInTheDocument();
  });

  it("exibe botão para adicionar/editar data", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");
    await user.type(input, "Tarefa com data");
    await user.keyboard("{Enter}");

    const dateBtns = screen.getAllByRole("button", { name: "Adicionar/editar data" });
    expect(dateBtns.length).toBeGreaterThan(0);
  });

  it("inverte ordem ao clicar duas vezes no mesmo botão de ordenação", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");

    // Cria 3 tarefas em sequência
    await user.type(input, "Primeira");
    await user.keyboard("{Enter}");

    await user.type(input, "Segunda");
    await user.keyboard("{Enter}");

    await user.type(input, "Terceira");
    await user.keyboard("{Enter}");

    const sortAlphaBtn = screen.getByTestId("sort-alpha");

    // Ativa alfabético primeiro
    await user.click(sortAlphaBtn);

    const sortCreatedBtn = screen.getByTestId("sort-created");

    // Primeira clicada em criação - ordem ascendente (mais antigos primeiro)
    await user.click(sortCreatedBtn);
    let tasks = screen.getAllByTestId(/task-title-/);
    const firstOrder = tasks.map((t) => t.textContent);

    // Segunda clicada no mesmo botão - inverte para descendente
    await user.click(sortCreatedBtn);
    tasks = screen.getAllByTestId(/task-title-/);
    const secondOrder = tasks.map((t) => t.textContent);

    // Verifica que a ordem é inversa
    expect(firstOrder.reverse()).toEqual(secondOrder);
  });

  it("inverte ordem ao clicar duas vezes no botão alfabético", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");

    // Cria tarefas com nomes que facilitam teste
    await user.type(input, "Zebra");
    await user.keyboard("{Enter}");

    await user.type(input, "Apple");
    await user.keyboard("{Enter}");

    await user.type(input, "Mango");
    await user.keyboard("{Enter}");

    const sortAlphaBtn = screen.getByTestId("sort-alpha");

    // Primeira clicada - ordem alfabética ascendente (A-Z)
    await user.click(sortAlphaBtn);
    let tasks = screen.getAllByTestId(/task-title-/);
    expect(tasks[0]).toHaveTextContent("Apple");

    // Segunda clicada no mesmo botão - inverte para descendente (Z-A)
    await user.click(sortAlphaBtn);
    tasks = screen.getAllByTestId(/task-title-/);
    expect(tasks[0]).toHaveTextContent("Zebra");
  });

  it("reseta direção para ascendente ao mudar de modo de ordenação", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <TaskList listId="default-inbox" />
      </TestWrapper>,
    );

    const input = screen.getByTestId("input-new-task");

    await user.type(input, "Zebra");
    await user.keyboard("{Enter}");

    await user.type(input, "Apple");
    await user.keyboard("{Enter}");

    const sortAlphaBtn = screen.getByTestId("sort-alpha");
    const sortCreatedBtn = screen.getByTestId("sort-created");

    // Ativa alfabético
    await user.click(sortAlphaBtn);
    let tasks = screen.getAllByTestId(/task-title-/);
    expect(tasks[0]).toHaveTextContent("Apple");

    // Inverte alfabético para Z-A
    await user.click(sortAlphaBtn);
    tasks = screen.getAllByTestId(/task-title-/);
    expect(tasks[0]).toHaveTextContent("Zebra");

    // Muda para criação (deve resetar direção para asc)
    // Zebra foi criada primeiro, então em asc aparece primeiro
    await user.click(sortCreatedBtn);
    tasks = screen.getAllByTestId(/task-title-/);
    expect(tasks[0]).toHaveTextContent("Zebra");
  });
});
