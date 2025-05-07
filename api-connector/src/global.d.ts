// src/global.d.ts
export {};

declare global {
  interface Window {
    openModal?: (id: string) => void;
    closeModal?: (id: string) => void;
  }
}
