import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppProvider } from "../../../context";
import { TodayView } from "../TodayView";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe("TodayView", () => {
  it("exibe mensagem quando não há tarefas para hoje ou atrasadas", () => {
    render(
      <TestWrapper>
        <TodayView />
      </TestWrapper>,
    );

    expect(screen.getByTestId("all-clear-message")).toBeInTheDocument();
    expect(screen.getByText(/Você está em dia/i)).toBeInTheDocument();
  });

  it("exibe título e data atual", () => {
    render(
      <TestWrapper>
        <TodayView />
      </TestWrapper>,
    );

    expect(screen.getByTestId("today-view-title")).toHaveTextContent("📅 Hoje");

    // Verifica que existe um texto com informação de data
    const todaySection = screen.getByTestId("today-view-title").parentElement;
    expect(todaySection).toBeInTheDocument();
  });

  it("conta corretamente o número total de tarefas", () => {
    render(
      <TestWrapper>
        <TodayView />
      </TestWrapper>,
    );

    const count = screen.getByTestId("total-tasks-count");
    expect(count).toBeInTheDocument();
    expect(count).toHaveTextContent("0 tarefas");
  });
});
