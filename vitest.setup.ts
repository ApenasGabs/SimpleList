import "@testing-library/jest-dom";

// Mock HTMLDialogElement methods
if (typeof HTMLDialogElement === "function") {
  HTMLDialogElement.prototype.showModal = function showModal(): void {
    this.open = true;
  };

  HTMLDialogElement.prototype.close = function close(): void {
    this.open = false;
  };
}
