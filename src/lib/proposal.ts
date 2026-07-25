import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type ThemeId = "dark-gold" | "dark-indigo" | "light-editorial" | "minimal-mono";
export type FontPairId = "modern" | "editorial" | "classic" | "tech" | "minimal" | "serif-bold";
export type PayMode = "cartao" | "pix" | "boleto";
export type SectionId =
  | "diagnostico"
  | "metodo"
  | "valuestack"
  | "prova"
  | "investimento"
  | "fechamento";

export interface Section {
  id: SectionId;
  enabled: boolean;
}

export interface MethodStep {
  id: string;
  title: string;
}
export interface Milestone {
  id: string;
  title: string;
}
export interface Deliverable {
  id: string;
  title: string;
  desc: string;
  value: number;
  bonus?: boolean;
}
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  result: string;
  text: string;
}

export interface Proposal {
  id: string;
  createdAt: string;
  updatedAt: string;

  company: string;
  logoDataUrl?: string;
  accent: string;
  theme: ThemeId;
  fontPair: FontPairId;

  clientName: string;
  clientCompany: string;

  offer: string;
  proposalDate: string;
  validityDays: number;
  consultant: string;
  consultantRole: string;

  sections: Section[];

  coverEyebrow: string;
  coverHeadline: string;
  coverSubtitle: string;

  diagnosisText: string;
  monthlyPainCost: number;

  methodName: string;
  methodIntro: string;
  methodSteps: MethodStep[];
  milestones: Milestone[];

  deliverables: Deliverable[];

  bioText: string;
  bioCredentials: string;
  metricsLine: string;
  testimonials: Testimonial[];

  payMode: PayMode;
  cardInstallment: number;
  cardCount: number;
  pixValue: number;
  pixDiscount: number;
  boletoInstallment: number;
  boletoCount: number;
  guaranteeEnabled: boolean;
  guaranteeText: string;
  urgencyReason: string;
  fullPriceText: string;

  closingMessage: string;
  ctaText: string;
}

/* -------------------- utils -------------------- */
export const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n || 0);

export const fmtDateLong = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

export const todayIso = () => new Date().toISOString().slice(0, 10);

export const addDaysIso = (iso: string, days: number) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const valueStackSum = (p: Proposal) =>
  p.deliverables.reduce((s, d) => s + (d.value || 0), 0);

export const realPrice = (p: Proposal) => {
  if (p.payMode === "cartao") return p.cardInstallment * p.cardCount;
  if (p.payMode === "boleto") return p.boletoInstallment * p.boletoCount;
  return Math.max(0, p.pixValue - (p.pixValue * (p.pixDiscount || 0)) / 100);
};

export const pricePerDay = (p: Proposal) => realPrice(p) / 365;

export const slug = (s: string) =>
  (s || "cliente")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const newId = () => nanoid(10);

/* -------------------- store -------------------- */
interface State {
  proposals: Record<string, Proposal>;
  create: (p: Proposal) => string;
  update: (id: string, patch: Partial<Proposal>) => void;
  remove: (id: string) => void;
}

export const useProposals = create<State>()(
  persist(
    (set) => ({
      proposals: {},
      create: (p) => {
        set((s) => ({ proposals: { ...s.proposals, [p.id]: p } }));
        return p.id;
      },
      update: (id, patch) =>
        set((s) => {
          const cur = s.proposals[id];
          if (!cur) return s;
          return {
            proposals: {
              ...s.proposals,
              [id]: { ...cur, ...patch, updatedAt: new Date().toISOString() },
            },
          };
        }),
      remove: (id) =>
        set((s) => {
          const next = { ...s.proposals };
          delete next[id];
          return { proposals: next };
        }),
    }),
    { name: "proposals-v1" }
  )
);

export const DEFAULT_SECTIONS: Section[] = [
  { id: "diagnostico", enabled: true },
  { id: "metodo", enabled: true },
  { id: "valuestack", enabled: true },
  { id: "prova", enabled: true },
  { id: "investimento", enabled: true },
  { id: "fechamento", enabled: true },
];

export const SECTION_LABELS: Record<SectionId, string> = {
  diagnostico: "Diagnóstico",
  metodo: "O Método",
  valuestack: "Value Stack",
  prova: "Prova e autoridade",
  investimento: "Investimento",
  fechamento: "Fechamento",
};

export const THEMES: { id: ThemeId; label: string }[] = [
  { id: "dark-gold", label: "Dark Gold" },
  { id: "dark-indigo", label: "Dark Indigo" },
  { id: "light-editorial", label: "Light Editorial" },
  { id: "minimal-mono", label: "Minimal Mono" },
];

export const FONT_PAIRS: { id: FontPairId; label: string; sample: string }[] = [
  { id: "modern", label: "Modern", sample: "Space Grotesk + Inter" },
  { id: "editorial", label: "Editorial", sample: "Fraunces + Inter" },
  { id: "classic", label: "Classic", sample: "Playfair + Lora" },
  { id: "tech", label: "Tech", sample: "Manrope + JetBrains" },
  { id: "minimal", label: "Minimal", sample: "Inter + Inter" },
  { id: "serif-bold", label: "Serif Bold", sample: "DM Serif + DM Sans" },
];
