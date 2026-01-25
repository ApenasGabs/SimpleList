/**
 * Resumo e referência rápida de todos os componentes base
 */

export interface ComponentReference {
  name: string;
  description: string;
  variants: Record<string, string[]>;
  file: string;
}

export const COMPONENTS_REFERENCE: ComponentReference[] = [
  {
    name: "Button",
    description: "Botão interativo com múltiplas variantes",
    variants: {
      variant: ["primary", "secondary", "accent", "ghost"],
      size: ["sm", "md", "lg"],
    },
    file: "Button/Button.tsx",
  },
  {
    name: "Badge",
    description: "Etiqueta para destacar informações",
    variants: {
      variant: [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ],
      size: ["sm", "md", "lg"],
    },
    file: "Badge/Badge.tsx",
  },
  {
    name: "Input",
    description: "Campo de entrada com validação",
    variants: {
      variant: ["bordered", "filled", "faded"],
      size: ["sm", "md", "lg"],
    },
    file: "Input/Input.tsx",
  },
  {
    name: "Textarea",
    description: "Área de texto multilinhas",
    variants: {
      variant: ["bordered", "filled", "faded"],
      size: ["sm", "md", "lg"],
    },
    file: "Textarea/Textarea.tsx",
  },
  {
    name: "Checkbox",
    description: "Caixa de seleção",
    variants: {
      color: [
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ],
      size: ["sm", "md", "lg"],
    },
    file: "Checkbox/Checkbox.tsx",
  },
  {
    name: "Radio",
    description: "Botão de opção",
    variants: {
      color: [
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ],
      size: ["sm", "md", "lg"],
    },
    file: "Radio/Radio.tsx",
  },
  {
    name: "Label",
    description: "Rótulo para inputs",
    variants: {
      size: ["sm", "md", "lg"],
    },
    file: "Label/Label.tsx",
  },
  {
    name: "Progress",
    description: "Barra de progresso",
    variants: {
      variant: [
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ],
      size: ["sm", "md", "lg"],
    },
    file: "Progress/Progress.tsx",
  },
  {
    name: "Loading",
    description: "Indicador de carregamento",
    variants: {
      variant: ["spinner", "dots", "bars", "ring"],
      size: ["sm", "md", "lg"],
      color: [
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ],
    },
    file: "Loading/Loading.tsx",
  },
  {
    name: "Alert",
    description: "Componente de alerta",
    variants: {
      type: ["info", "success", "warning", "error"],
    },
    file: "Alert/Alert.tsx",
  },
  {
    name: "Divider",
    description: "Divisor horizontal ou vertical",
    variants: {
      variant: ["horizontal", "vertical"],
    },
    file: "Divider/Divider.tsx",
  },
  {
    name: "Card",
    description: "Container para conteúdo",
    variants: {},
    file: "Card/Card.tsx",
  },
  {
    name: "Navbar",
    description: "Barra de navegação",
    variants: {},
    file: "Navbar/Navbar.tsx",
  },
  {
    name: "Footer",
    description: "Rodapé da aplicação",
    variants: {},
    file: "Footer/Footer.tsx",
  },
];

export const getComponentStats = (): Record<string, number> => {
  return {
    totalComponents: COMPONENTS_REFERENCE.length,
    totalVariants: COMPONENTS_REFERENCE.reduce(
      (sum, component) =>
        sum +
        Object.values(component.variants).reduce(
          (variantSum, variantArray) => variantSum + variantArray.length,
          0,
        ),
      0,
    ),
    componentsWithVariants: COMPONENTS_REFERENCE.filter(
      (c) => Object.keys(c.variants).length > 0,
    ).length,
  };
};
