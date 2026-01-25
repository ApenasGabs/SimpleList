import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppProvider } from "../../../context";
import { TaskList } from "../TaskList.v2";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("TaskList (v2) com Context", () => {
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
});
