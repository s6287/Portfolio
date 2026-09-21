/** Theme tokens for the storefront-edition demo. One storefront, restyled per event by swapping CSS variables. */

export type EditionId = "default" | "diwali" | "holi" | "christmas";

export type Edition = {
  name: string;
  tagline: string;
  window: string;
  tokens: {
    "--ed-bg": string;
    "--ed-ink": string;
    "--ed-accent": string;
    "--ed-accent-ink": string;
    "--ed-soft": string;
  };
};

export const editionIds: EditionId[] = ["default", "diwali", "holi", "christmas"];

export const editions: Record<EditionId, Edition> = {
  default: {
    name: "Everyday",
    tagline: "The full catalogue, all year round.",
    window: "Always on",
    tokens: { "--ed-bg": "#eef1f8", "--ed-ink": "#141a3c", "--ed-accent": "#2f5bea", "--ed-accent-ink": "#ffffff", "--ed-soft": "#d9dff2" },
  },
  diwali: {
    name: "Diwali",
    tagline: "Festive hampers and gifting sets, ready to order in bulk.",
    window: "Autumn",
    tokens: { "--ed-bg": "#2a1238", "--ed-ink": "#fff4d6", "--ed-accent": "#ffb81c", "--ed-accent-ink": "#2a1238", "--ed-soft": "#4a2560" },
  },
  holi: {
    name: "Holi",
    tagline: "Colour-first picks for the spring campaign.",
    window: "Spring",
    tokens: { "--ed-bg": "#fff7ec", "--ed-ink": "#3a1d4f", "--ed-accent": "#e0218a", "--ed-accent-ink": "#ffffff", "--ed-soft": "#ffe0f0" },
  },
  christmas: {
    name: "Christmas",
    tagline: "Year-end corporate gifting, packed and shipped on time.",
    window: "Winter",
    tokens: { "--ed-bg": "#0f3d2e", "--ed-ink": "#f4f1e6", "--ed-accent": "#d9342b", "--ed-accent-ink": "#ffffff", "--ed-soft": "#1c5a45" },
  },
};
