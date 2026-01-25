import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

test.describe("ThemeSelector - E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Limpar localStorage antes de cada teste
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test.describe("Renderização e UI", () => {
    test("deve exibir o botão de temas", async ({ page }) => {
      await page.goto("/");

      const themeButton = page.getByRole("button", { name: "Temas" });
      await expect(themeButton).toBeVisible();
    });

    test("deve abrir o drawer quando o botão é clicado", async ({ page }) => {
      await page.goto("/");

      // Clicar no botão de temas
      await page.getByRole("button", { name: "Temas" }).click();

      // Verificar se o drawer está visível
      const drawer = page.locator(".drawer-side");
      await expect(drawer).toBeVisible();

      // Verificar se a lista de temas está visível
      const menu = page.locator(".menu");
      await expect(menu).toBeVisible();
    });

    test("deve fechar o drawer quando o overlay é clicado", async ({
      page,
    }) => {
      await page.goto("/");

      // Abrir o drawer
      await page.getByRole("button", { name: "Temas" }).click();

      // Clicar no overlay
      await page.locator(".drawer-overlay").click();

      // Verificar se o drawer foi fechado
      const drawerToggle = page.locator("#theme-drawer");
      await expect(drawerToggle).not.toBeChecked();
    });

    test("deve exibir todos os 33 temas disponíveis", async ({ page }) => {
      await page.goto("/");

      // Abrir o drawer
      await page.getByRole("button", { name: "Temas" }).click();

      // Contar os radio buttons
      const themeRadios = page.locator('input[name="theme-dropdown"]');
      await expect(themeRadios).toHaveCount(33);
    });
  });

  test.describe("Funcionalidade de troca de tema", () => {
    test("deve iniciar com tema light por padrão", async ({ page }) => {
      await page.goto("/");

      // Verificar atributo data-theme no html
      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("light");

      // Verificar localStorage
      const savedTheme = await page.evaluate(() =>
        localStorage.getItem("theme"),
      );
      expect(savedTheme).toBe("light");
    });

    test("deve mudar para tema dark e persistir", async ({ page }) => {
      await page.goto("/");

      // Abrir drawer
      await page.getByRole("button", { name: "Temas" }).click();

      // Selecionar tema dark
      await page.getByRole("radio", { name: "Dark" }).click();

      // Aguardar aplicação do tema
      await page.waitForTimeout(100);

      // Verificar se o tema foi aplicado
      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("dark");

      // Verificar se foi salvo no localStorage
      const savedTheme = await page.evaluate(() =>
        localStorage.getItem("theme"),
      );
      expect(savedTheme).toBe("dark");

      // Recarregar a página e verificar persistência
      await page.reload();

      const htmlThemeAfterReload = await page
        .locator("html")
        .getAttribute("data-theme");
      expect(htmlThemeAfterReload).toBe("dark");
    });

    test("deve mudar entre múltiplos temas corretamente", async ({ page }) => {
      await page.goto("/");

      const themesToTest = [
        { name: "Cyberpunk", value: "cyberpunk" },
        { name: "Dracula", value: "dracula" },
        { name: "Retro", value: "retro" },
        { name: "Forest", value: "forest" },
      ];

      for (const theme of themesToTest) {
        // Abrir drawer
        await page.getByRole("button", { name: "Temas" }).click();

        // Selecionar tema
        await page.getByRole("radio", { name: theme.name }).click();

        // Aguardar aplicação
        await page.waitForTimeout(100);

        // Verificar tema aplicado
        const htmlTheme = await page.locator("html").getAttribute("data-theme");
        expect(htmlTheme).toBe(theme.value);

        // Verificar localStorage
        const savedTheme = await page.evaluate(() =>
          localStorage.getItem("theme"),
        );
        expect(savedTheme).toBe(theme.value);

        // Fechar drawer
        await page.locator(".drawer-overlay").click();
      }
    });

    test("deve marcar o tema correto como selecionado", async ({ page }) => {
      await page.goto("/");

      // Abrir drawer
      await page.getByRole("button", { name: "Temas" }).click();

      // Selecionar tema cupcake
      await page.getByRole("radio", { name: "Cupcake" }).click();

      // Fechar e reabrir drawer
      await page.locator(".drawer-overlay").click();
      await page.getByRole("button", { name: "Temas" }).click();

      // Verificar se cupcake está marcado
      const cupcakeRadio = page.getByRole("radio", { name: "Cupcake" });
      await expect(cupcakeRadio).toBeChecked();
    });
  });

  test.describe("Temas específicos", () => {
    const testTheme = async (
      page: Page,
      themeName: string,
      themeValue: string,
    ) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Temas" }).click();
      await page.getByRole("radio", { name: themeName }).click();
      await page.waitForTimeout(100);

      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe(themeValue);
    };

    test("deve aplicar tema synthwave", async ({ page }) => {
      await testTheme(page, "Synthwave", "synthwave");
    });

    test("deve aplicar tema halloween", async ({ page }) => {
      await testTheme(page, "Halloween", "halloween");
    });

    test("deve aplicar tema winter", async ({ page }) => {
      await testTheme(page, "Winter", "winter");
    });

    test("deve aplicar tema sunset", async ({ page }) => {
      await testTheme(page, "Sunset", "sunset");
    });

    test("deve aplicar tema purplewind", async ({ page }) => {
      await testTheme(page, "Purplewind", "purplewind");
    });
  });

  test.describe("Persistência entre navegações", () => {
    test("deve manter tema selecionado após recarregar a página", async ({
      page,
    }) => {
      await page.goto("/");

      // Selecionar tema
      await page.getByRole("button", { name: "Temas" }).click();
      await page.getByRole("radio", { name: "Emerald" }).click();
      await page.waitForTimeout(100);

      // Recarregar
      await page.reload();

      // Verificar se tema persiste
      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("emerald");
    });

    test("deve manter tema selecionado ao navegar entre páginas", async ({
      page,
    }) => {
      await page.goto("/");

      // Selecionar tema
      await page.getByRole("button", { name: "Temas" }).click();
      await page.getByRole("radio", { name: "Luxury" }).click();
      await page.waitForTimeout(100);

      // Navegar para a mesma página novamente
      await page.goto("/");

      // Verificar se tema persiste
      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("luxury");
    });
  });

  test.describe("Acessibilidade", () => {
    test("deve ter labels acessíveis para todos os temas", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Temas" }).click();

      // Verificar alguns temas têm aria-label
      const lightRadio = page.getByRole("radio", { name: "Light" });
      await expect(lightRadio).toHaveAttribute("aria-label", "Light");

      const darkRadio = page.getByRole("radio", { name: "Dark" });
      await expect(darkRadio).toHaveAttribute("aria-label", "Dark");
    });

    test("deve ser navegável por teclado", async ({ page }) => {
      await page.goto("/");

      // Focar no botão de temas usando Tab
      await page.keyboard.press("Tab");

      // Verificar se o botão está focado
      const themeButton = page.getByRole("button", { name: "Temas" });
      await expect(themeButton).toBeFocused();

      // Abrir drawer com Enter
      await page.keyboard.press("Enter");

      // Verificar se drawer abriu
      const drawer = page.locator(".drawer-side");
      await expect(drawer).toBeVisible();
    });

    test("deve ter role correto para elementos interativos", async ({
      page,
    }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Temas" }).click();

      // Verificar se os inputs têm role de radio
      const radios = page.locator('input[type="radio"]');
      const count = await radios.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe("Responsividade", () => {
    test("deve funcionar em mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");

      // Verificar se botão está visível
      const themeButton = page.getByRole("button", { name: "Temas" });
      await expect(themeButton).toBeVisible();

      // Abrir drawer
      await themeButton.click();

      // Verificar se drawer está visível
      const menu = page.locator(".menu");
      await expect(menu).toBeVisible();

      // Selecionar tema
      await page.getByRole("radio", { name: "Dark" }).click();

      // Verificar aplicação
      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("dark");
    });

    test("deve funcionar em tablet", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/");

      const themeButton = page.getByRole("button", { name: "Temas" });
      await expect(themeButton).toBeVisible();

      await themeButton.click();
      await page.getByRole("radio", { name: "Retro" }).click();

      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("retro");
    });

    test("deve funcionar em desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto("/");

      const themeButton = page.getByRole("button", { name: "Temas" });
      await expect(themeButton).toBeVisible();

      await themeButton.click();
      await page.getByRole("radio", { name: "Cyberpunk" }).click();

      const htmlTheme = await page.locator("html").getAttribute("data-theme");
      expect(htmlTheme).toBe("cyberpunk");
    });
  });
});
