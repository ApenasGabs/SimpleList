import { fireEvent, screen, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ThemeSelector from "../ThemeSelector";

describe("ThemeSelector", () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear();
    // Limpar atributos do DOM
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.className = "";
    document.body.removeAttribute("data-theme");
    document.body.className = "";
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("Renderização", () => {
    it("deve renderizar o componente ThemeSelector", () => {
      render(<ThemeSelector />);
      const themeSelector = screen.getByTestId("theme-selector");
      expect(themeSelector).toBeInTheDocument();
    });

    it("deve renderizar o botão de temas", () => {
      render(<ThemeSelector />);
      const button = screen.getByTestId("theme-button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Temas");
    });

    it("deve renderizar o drawer toggle", () => {
      render(<ThemeSelector />);
      const drawerToggle = screen.getByTestId("theme-drawer-toggle");
      expect(drawerToggle).toBeInTheDocument();
      expect(drawerToggle).toHaveAttribute("type", "checkbox");
    });

    it("deve renderizar o menu de temas", () => {
      render(<ThemeSelector />);
      const menu = screen.getByTestId("theme-menu");
      expect(menu).toBeInTheDocument();
    });

    it("deve renderizar todos os 33 temas disponíveis", () => {
      render(<ThemeSelector />);

      const themeList = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
        "purplewind",
      ];

      themeList.forEach((theme) => {
        const themeOption = screen.getByTestId(`theme-option-${theme}`);
        expect(themeOption).toBeInTheDocument();
      });
    });
  });

  describe("Tema padrão", () => {
    it("deve iniciar com tema light quando não há tema salvo", () => {
      render(<ThemeSelector />);

      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
      expect(document.body.getAttribute("data-theme")).toBe("light");
      expect(localStorage.getItem("theme")).toBe("light");
    });

    it("deve carregar tema salvo do localStorage", () => {
      localStorage.setItem("theme", "dark");

      render(<ThemeSelector />);

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
      expect(document.body.getAttribute("data-theme")).toBe("dark");
    });

    it("deve marcar o tema light como checked por padrão", () => {
      render(<ThemeSelector />);

      const lightTheme = screen.getByTestId(
        "theme-option-light",
      ) as HTMLInputElement;
      expect(lightTheme.checked).toBe(true);
    });
  });

  describe("Seleção de tema", () => {
    it("deve mudar o tema quando um radio button é selecionado", async () => {
      render(<ThemeSelector />);

      // Selecionar o tema dark
      const darkTheme = screen.getByTestId("theme-option-dark");
      fireEvent.click(darkTheme);

      await waitFor(() => {
        expect(document.documentElement.getAttribute("data-theme")).toBe(
          "dark",
        );
        expect(document.body.getAttribute("data-theme")).toBe("dark");
        expect(localStorage.getItem("theme")).toBe("dark");
      });
    });

    it("deve atualizar a classe do documento quando tema é alterado", async () => {
      render(<ThemeSelector />);

      // Selecionar o tema cyberpunk
      const cyberpunkTheme = screen.getByTestId("theme-option-cyberpunk");
      fireEvent.click(cyberpunkTheme);

      await waitFor(() => {
        expect(document.documentElement.className).toBe("cyberpunk");
        expect(document.body.className).toBe("cyberpunk");
      });
    });

    it("deve marcar o tema correto como checked", () => {
      localStorage.setItem("theme", "retro");

      render(<ThemeSelector />);

      const retroTheme = screen.getByTestId(
        "theme-option-retro",
      ) as HTMLInputElement;
      expect(retroTheme.checked).toBe(true);
    });

    it("deve desmarcar tema anterior ao selecionar novo tema", async () => {
      render(<ThemeSelector />);

      const lightTheme = screen.getByTestId(
        "theme-option-light",
      ) as HTMLInputElement;
      const darkTheme = screen.getByTestId(
        "theme-option-dark",
      ) as HTMLInputElement;

      // Light deve estar marcado inicialmente
      expect(lightTheme.checked).toBe(true);
      expect(darkTheme.checked).toBe(false);

      // Selecionar dark
      fireEvent.click(darkTheme);

      await waitFor(() => {
        expect(lightTheme.checked).toBe(false);
        expect(darkTheme.checked).toBe(true);
      });
    });
  });

  describe("Persistência", () => {
    it("deve salvar o tema selecionado no localStorage", async () => {
      render(<ThemeSelector />);

      // Selecionar vários temas
      const themes = ["dracula", "forest", "winter"];

      for (const theme of themes) {
        const themeElement = screen.getByTestId(`theme-option-${theme}`);
        fireEvent.click(themeElement);

        await waitFor(() => {
          expect(localStorage.getItem("theme")).toBe(theme);
        });
      }
    });

    it("deve persistir tema entre re-renderizações", async () => {
      const { unmount } = render(<ThemeSelector />);

      // Selecionar tema
      const emeraldTheme = screen.getByTestId("theme-option-emerald");
      fireEvent.click(emeraldTheme);

      await waitFor(() => {
        expect(localStorage.getItem("theme")).toBe("emerald");
      });

      // Desmontar e renderizar novamente
      unmount();
      render(<ThemeSelector />);

      // Verificar se tema persiste
      const emeraldThemeAfter = screen.getByTestId(
        "theme-option-emerald",
      ) as HTMLInputElement;
      expect(emeraldThemeAfter.checked).toBe(true);
    });
  });

  describe("Interação do drawer", () => {
    it("deve ter um checkbox para controlar o drawer", () => {
      render(<ThemeSelector />);

      const drawerToggle = screen.getByTestId("theme-drawer-toggle");
      expect(drawerToggle).toHaveAttribute("type", "checkbox");
      expect(drawerToggle).toHaveAttribute("id", "theme-drawer");
    });

    it("deve ter overlay do drawer", () => {
      render(<ThemeSelector />);

      const drawerOverlay = screen.getByTestId("theme-drawer-overlay");
      expect(drawerOverlay).toBeInTheDocument();
    });
  });

  describe("Acessibilidade", () => {
    it("deve ter labels apropriadas para todos os temas", () => {
      render(<ThemeSelector />);

      const radioButtons = screen.getAllByRole("radio");
      radioButtons.forEach((radio: HTMLElement) => {
        expect(radio).toHaveAttribute("aria-label");
        expect(radio.getAttribute("aria-label")).not.toBe("");
      });
    });

    it("deve ter name consistente para grupo de radio buttons", () => {
      render(<ThemeSelector />);

      const radioButtons = screen.getAllByRole("radio");
      radioButtons.forEach((radio: HTMLElement) => {
        expect(radio).toHaveAttribute("name", "theme-dropdown");
      });
    });

    it("deve ter valores únicos para cada tema", () => {
      render(<ThemeSelector />);

      const radioButtons = screen.getAllByRole("radio") as HTMLInputElement[];
      const values = radioButtons.map((radio) => radio.value);
      const uniqueValues = new Set(values);

      expect(uniqueValues.size).toBe(radioButtons.length);
    });
  });

  describe("Capitalização de labels", () => {
    it("deve capitalizar corretamente os nomes dos temas", () => {
      render(<ThemeSelector />);

      // Verificar alguns temas específicos
      const lightTheme = screen.getByTestId("theme-option-light");
      expect(lightTheme).toHaveAttribute("aria-label", "Light");

      const darkTheme = screen.getByTestId("theme-option-dark");
      expect(darkTheme).toHaveAttribute("aria-label", "Dark");

      const cyberpunkTheme = screen.getByTestId("theme-option-cyberpunk");
      expect(cyberpunkTheme).toHaveAttribute("aria-label", "Cyberpunk");

      const purplewindTheme = screen.getByTestId("theme-option-purplewind");
      expect(purplewindTheme).toHaveAttribute("aria-label", "Purplewind");
    });
  });

  describe("Aplicação de tema", () => {
    it("deve aplicar tema no documentElement e body", async () => {
      render(<ThemeSelector />);

      const synthwaveTheme = screen.getByTestId("theme-option-synthwave");
      fireEvent.click(synthwaveTheme);

      await waitFor(() => {
        expect(document.documentElement.getAttribute("data-theme")).toBe(
          "synthwave",
        );
        expect(document.documentElement.className).toBe("synthwave");
        expect(document.body.getAttribute("data-theme")).toBe("synthwave");
        expect(document.body.className).toBe("synthwave");
      });
    });

    it("deve aplicar múltiplos temas sequencialmente", async () => {
      render(<ThemeSelector />);

      const themes = ["halloween", "valentine", "coffee"];

      for (const theme of themes) {
        const themeElement = screen.getByTestId(`theme-option-${theme}`);
        fireEvent.click(themeElement);

        await waitFor(() => {
          expect(document.documentElement.getAttribute("data-theme")).toBe(
            theme,
          );
          expect(document.body.getAttribute("data-theme")).toBe(theme);
        });
      }
    });
  });
});
