import { describe, expect, it } from "vitest";

describe("Exemplo de teste", () => {
  it("deve somar dois números corretamente", () => {
    expect(1 + 1).toBe(2);
  });

  it("deve concatenar strings", () => {
    const resultado = "Hello" + " " + "World";
    expect(resultado).toBe("Hello World");
  });
});
