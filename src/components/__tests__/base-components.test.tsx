import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "../Alert/Alert";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Card, CardBody, CardTitle } from "../Card/Card";
import { Checkbox } from "../Checkbox/Checkbox";
import { Divider } from "../Divider/Divider";
import { ExternalLink } from "../ExternalLink/ExternalLink";
import { FeatureCard } from "../FeatureCard/FeatureCard";
import { Footer } from "../Footer/Footer";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { Loading } from "../Loading/Loading";
import { Navbar } from "../Navbar/Navbar";
import { Progress } from "../Progress/Progress";
import { Radio } from "../Radio/Radio";
import { Textarea } from "../Textarea/Textarea";
import { ToolItem } from "../ToolItem/ToolItem";

describe("Badge Component", () => {
  it("renders with children", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("badge-primary");
  });

  it("applies size classes", () => {
    const { container } = render(<Badge size="lg">Large</Badge>);
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("badge");
  });
});

describe("Button Component", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Button variant="secondary">Test</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("btn-secondary");
  });

  it("applies size classes", () => {
    const { container } = render(<Button size="lg">Large</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("btn-lg");
  });

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled") as HTMLButtonElement;
    expect(button).toBeDisabled();
  });
});

describe("Checkbox Component", () => {
  it("renders checkbox input", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Checkbox label="Disabled" disabled />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeDisabled();
  });
});

describe("Input Component", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<Input helperText="Help text here" />);
    expect(screen.getByText("Help text here")).toBeInTheDocument();
  });
});

describe("Progress Component", () => {
  it("renders progress bar", () => {
    render(<Progress value={50} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });

  it("clamps value to max", () => {
    render(<Progress value={150} max={100} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });
});

describe("Alert Component", () => {
  it("renders with default info type", () => {
    render(<Alert>Info alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("alert-info");
    expect(screen.getByText("Info alert")).toBeInTheDocument();
  });

  it("applies custom type and testId", () => {
    render(
      <Alert type="success" testId="alert-test">
        Success alert
      </Alert>,
    );
    const alert = screen.getByTestId("alert-test");
    expect(alert).toHaveClass("alert-success");
  });
});

describe("Card Component", () => {
  it("renders card with children and custom class", () => {
    render(
      <Card className="custom" testId="card">
        <span>Content</span>
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveTextContent("Content");
    expect(card).toHaveClass("custom");
  });

  it("renders CardBody centered when flag is true", () => {
    render(
      <CardBody centered>
        <span>Body</span>
      </CardBody>,
    );
    const body = screen.getByText("Body").parentElement;
    expect(body).toHaveClass("items-center");
  });

  it("renders CardTitle with class", () => {
    render(<CardTitle className="extra">Title</CardTitle>);
    const title = screen.getByText("Title");
    expect(title).toHaveClass("extra");
  });
});

describe("Divider Component", () => {
  it("renders horizontal divider without content", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
  });

  it("renders horizontal divider with content", () => {
    render(<Divider>Texto</Divider>);
    expect(screen.getByText("Texto")).toBeInTheDocument();
  });

  it("renders vertical divider", () => {
    render(<Divider variant="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });
});

describe("ExternalLink Component", () => {
  it("renders link with target and rel", () => {
    render(<ExternalLink href="https://example.com">Link</ExternalLink>);
    const link = screen.getByText("Link") as HTMLAnchorElement;
    expect(link.href).toContain("https://example.com");
    expect(link.target).toBe("_blank");
    expect(link.rel).toBe("noreferrer");
  });
});

describe("FeatureCard Component", () => {
  it("renders feature content and variant", () => {
    render(
      <FeatureCard
        title="React"
        description="UI library"
        version="19"
        href="https://react.dev"
        variant="primary"
        testId="feature-card"
      />,
    );
    const card = screen.getByTestId("feature-card");
    expect(card).toHaveTextContent("React");
    expect(card).toHaveClass("bg-primary");
  });
});

describe("Footer Component", () => {
  it("renders footer text and link", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "Template React + TypeScript + Vite + Tailwind CSS + daisyUI",
      ),
    ).toBeInTheDocument();
    const link = screen.getByText("ApenasGabs") as HTMLAnchorElement;
    expect(link.href).toContain("github.com/apenasgabs");
  });
});

describe("Label Component", () => {
  it("renders required indicator and size class", () => {
    render(
      <Label required size="lg">
        Nome
      </Label>,
    );
    const label = screen.getByText("Nome").closest("label");
    expect(label).toHaveClass("text-base");
    expect(screen.getByText("*")).toHaveClass("text-error");
  });

  it("applies disabled styles", () => {
    render(<Label disabled>Disabled</Label>);
    const label = screen.getByText("Disabled").closest("label");
    expect(label).toHaveClass("cursor-not-allowed");
  });
});

describe("Loading Component", () => {
  it("renders spinner with label", () => {
    render(<Loading label="Carregando" color="secondary" />);
    expect(screen.getByLabelText("Carregando")).toHaveClass("text-secondary");
    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });

  it("supports different variants", () => {
    render(<Loading variant="dots" />);
    expect(screen.getByRole("status")).toHaveClass("loading-dots");
  });
});

describe("Navbar Component", () => {
  it("renders title and children", () => {
    render(
      <Navbar title="Dashboard">
        <span>Child</span>
      </Navbar>,
    );
    expect(screen.getByTestId("navbar-title")).toHaveTextContent("Dashboard");
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});

describe("Radio Component", () => {
  it("renders radio with label and color", () => {
    render(<Radio label="Opt" color="success" />);
    const radio = screen.getByRole("radio");
    expect(radio).toHaveClass("radio-success");
    expect(screen.getByText("Opt")).toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<Radio size="lg" />);
    expect(screen.getByRole("radio")).toHaveClass("radio-lg");
  });
});

describe("Textarea Component", () => {
  it("renders with label and helper text", () => {
    render(<Textarea label="Mensagem" helperText="Helper" />);
    expect(screen.getByText("Mensagem")).toBeInTheDocument();
    expect(screen.getByText("Helper")).toBeInTheDocument();
  });

  it("renders error state and variant", () => {
    render(<Textarea error="Obrigatório" variant="filled" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("textarea-filled");
    expect(screen.getByText("Obrigatório")).toBeInTheDocument();
  });
});

describe("ToolItem Component", () => {
  it("renders icon, name and version", () => {
    render(<ToolItem icon="🚀" name="Vite" version="5" />);
    expect(screen.getByText("🚀")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();
    expect(screen.getByText("v5")).toBeInTheDocument();
  });
});
