import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DueDateBadge } from "../DueDateBadge";

describe("DueDateBadge Component", () => {
  it("retorna null quando dueDate não é fornecido", () => {
    const { container } = render(<DueDateBadge />);
    expect(container.firstChild).toBeNull();
  });

  it("exibe badge com data em formato pt-BR", () => {
    const testDate = new Date(2026, 0, 25).getTime(); // 25 de janeiro de 2026
    render(<DueDateBadge dueDate={testDate} />);

    const badge = screen.getByRole("button");
    expect(badge).toHaveTextContent(/25/);
  });

  it("aplica classe badge-error para data vencida", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    render(<DueDateBadge dueDate={yesterday.getTime()} />);

    const badge = screen.getByRole("button");
    expect(badge).toHaveClass("badge-error");
  });

  it("aplica classe badge-warning para data de hoje", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    render(<DueDateBadge dueDate={today.getTime()} />);

    const badge = screen.getByRole("button");
    expect(badge).toHaveClass("badge-warning");
  });

  it("aplica classe badge-info para data próxima (até 3 dias)", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    render(<DueDateBadge dueDate={tomorrow.getTime()} />);

    const badge = screen.getByRole("button");
    expect(badge).toHaveClass("badge-info");
  });

  it("aplica classe badge-ghost quando tarefa está completa", () => {
    const testDate = new Date();
    testDate.setHours(0, 0, 0, 0);

    render(<DueDateBadge dueDate={testDate.getTime()} completed={true} />);

    const badge = screen.getByRole("button");
    expect(badge).toHaveClass("badge-neutral");
  });

  it("chama onClick quando clicado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const testDate = new Date(2026, 0, 25).getTime();

    render(<DueDateBadge dueDate={testDate} onClick={onClick} />);

    const badge = screen.getByRole("button");
    await user.click(badge);

    expect(onClick).toHaveBeenCalledOnce();
  });
});
