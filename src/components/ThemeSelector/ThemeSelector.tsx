import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_THEME = "light";

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    return localStorage.getItem("theme") || DEFAULT_THEME;
  });

  const applyTheme = (theme: string) => {
    // daisyUI aceita tanto data-theme quanto class na raiz
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme;
    document.body.setAttribute("data-theme", theme);
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  };

  const toggleDrawer = useCallback((): void => {
    const drawerToggle = document.getElementById(
      "theme-drawer",
    ) as HTMLInputElement | null;

    if (!drawerToggle) return;

    drawerToggle.checked = !drawerToggle.checked;
    drawerToggle.dispatchEvent(new Event("change", { bubbles: true }));
  }, []);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const ThemeList = [
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

  const ThemeOptions = ThemeList.map((theme) => (
    <li key={theme}>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
        value={theme}
        checked={currentTheme === theme}
        onChange={() => setCurrentTheme(theme)}
        data-testid={`theme-option-${theme}`}
      />
    </li>
  ));

  return (
    <div className="text-xl" data-testid="theme-selector">
      <div className="drawer drawer-end">
        <input
          id="theme-drawer"
          type="checkbox"
          className="drawer-toggle"
          data-testid="theme-drawer-toggle"
          tabIndex={-1}
        />
        <div className="drawer-content">
          <label
            htmlFor="theme-drawer"
            className="btn btn-sm btn-ghost text-xl"
            role="button"
            aria-label="Temas"
            data-testid="theme-button"
            tabIndex={0}
            onKeyDown={(event: KeyboardEvent<HTMLLabelElement>) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleDrawer();
              }
            }}
          >
            Temas
          </label>
        </div>
        <div className="drawer-side z-1">
          <label
            htmlFor="theme-drawer"
            className="drawer-overlay"
            data-testid="theme-drawer-overlay"
          ></label>
          <ul
            className="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-10"
            data-testid="theme-menu"
          >
            {ThemeOptions}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
