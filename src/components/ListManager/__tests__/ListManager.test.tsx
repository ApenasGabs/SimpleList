import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppProvider } from "../../../context";
import { ListManager } from "../ListManager";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("ListManager (Issue #4)", () => {
  it("exibe lista padrão (Inbox) ao carregar", () => {
    render(
      <TestWrapper>
        <ListManager />
      </TestWrapper>,
    );

    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("cria nova lista com modal", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ListManager />
      </TestWrapper>,
    );

    const createBtn = screen.getByText("+ Nova Lista");
    await user.click(createBtn);

    // Modal deve aparecer
    const input = screen.getByTestId("list-title-input");
    expect(input).toBeInTheDocument();

    // Digita o nome da lista
    await user.type(input, "Minha Nova Lista");

    // Clica em criar
    const confirmBtn = screen.getByTestId("confirm-create-list");
    await user.click(confirmBtn);

    // Lista deve aparecer na navegação
    expect(screen.getByText("Minha Nova Lista")).toBeInTheDocument();
  });

  it("navega entre listas ao clicar", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ListManager />
      </TestWrapper>,
    );

    window.prompt = () => "Lista 1";
    const createBtn = screen.getByText("+ Nova Lista");
    await user.click(createBtn);

    const listBtns = screen.getAllByTestId(/list-btn-/);
    const lastBtn = listBtns[listBtns.length - 1];
    await user.click(lastBtn);

    expect(lastBtn.closest("div")).toHaveClass("bg-primary");
  });

  it("não permite deletar lista Inbox", () => {
    render(
      <TestWrapper>
        <ListManager />
      </TestWrapper>,
    );

    const inboxContainer = screen.getByText("Inbox").closest("div");
    const deleteBtn = inboxContainer?.querySelector('[data-testid^="delete-list"]');

    expect(deleteBtn).not.toBeInTheDocument();
  });
});
