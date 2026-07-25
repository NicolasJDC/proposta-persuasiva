import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, Sparkles } from "lucide-react";
import { Wizard, ICONS } from "@/components/proposal/Wizard";
import { TEMPLATES, fromTemplate } from "@/lib/templates";
import { useProposals } from "@/lib/proposal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Propostas Comerciais — Ferramenta gratuita open source" },
      {
        name: "description",
        content:
          "Monte em minutos uma proposta comercial premium e persuasiva, com preview A4 em tempo real e download em PDF. Sem cadastro, sem backend.",
      },
      { property: "og:title", content: "Gerador de Propostas Comerciais" },
      {
        property: "og:description",
        content:
          "Templates persuasivos, preview A4 em tempo real e exportação PDF. Grátis e open source.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const create = useProposals((s) => s.create);
  const navigate = useNavigate();

  const startTemplate = (key: (typeof TEMPLATES)[number]["key"]) => {
    const p = fromTemplate(key);
    create(p);
    navigate({ to: "/editor/$id", params: { id: p.id } });
  };

  return (
    <div className="min-h-screen">
      <header className="border-b" style={{ borderColor: "var(--border-soft)" }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={20} color="var(--accent)" />
            <span className="wordmark text-lg">Propostas</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
          >
            Open source
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="paper-radial rounded-3xl p-10 md:p-16"
          style={{ border: "1px solid var(--border-soft)" }}
        >
          <span className="chip chip-accent mb-6">Grátis · Sem cadastro · Roda no navegador</span>
          <h1
            className="mt-6 font-bold max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px, 6vw, 60px)", lineHeight: 1.03, letterSpacing: "-0.03em" }}
          >
            Gere uma proposta comercial premium em minutos.
          </h1>
          <p className="mt-5 text-lg max-w-2xl" style={{ color: "var(--ink-dim)" }}>
            Escolha um template do seu segmento, edite com preview A4 em tempo real e exporte um PDF impecável — pronto para fechar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={() => setWizardOpen(true)}>
              <Sparkles size={16} /> Nova proposta
            </button>
            <button className="btn" onClick={() => setWizardOpen(true)}>
              Prefiro o wizard guiado
            </button>
          </div>

          <div className="mt-14">
            <div
              className="text-[11px] uppercase tracking-widest mb-4"
              style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
            >
              Ou comece por um template
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEMPLATES.map((t) => {
                const Icon = ICONS[t.iconKey];
                return (
                  <button
                    key={t.key}
                    onClick={() => startTemplate(t.key)}
                    className="p-5 rounded-2xl text-left transition hover:scale-[1.01]"
                    style={{ background: "var(--paper-2)", border: "1px solid var(--border-soft)" }}
                  >
                    <Icon size={22} color="var(--accent)" />
                    <div className="mt-3 text-base font-semibold">{t.label}</div>
                    <div className="text-sm mt-1" style={{ color: "var(--ink-dim)" }}>
                      {t.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="text-center text-xs mt-16" style={{ color: "var(--ink-dim)" }}>
          Feito com React, Tailwind e muito café. Nada é enviado para servidores — sua proposta fica só no seu navegador.
        </footer>
      </main>

      {wizardOpen && <Wizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}
