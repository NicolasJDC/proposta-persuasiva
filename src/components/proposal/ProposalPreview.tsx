import type * as React from "react";
import { ShieldCheck } from "lucide-react";
import {
  fmtBRL,
  fmtDateLong,
  addDaysIso,
  valueStackSum,
  realPrice,
  pricePerDay,
  type Proposal,
  type SectionId,
} from "@/lib/proposal";

function SectionHeader({ kicker, number, title }: { kicker: string; number: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
        <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--ink-dim)" }}>
          {kicker}
        </span>
        <span className="text-[11px]" style={{ color: "var(--accent)" }}>
          — {number}
        </span>
      </div>
      <h2
        className="text-[40px] leading-[1.05] font-bold"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
    </div>
  );
}

function Cover({ p }: { p: Proposal }) {
  return (
    <section className="a4-page paper-radial">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {p.logoDataUrl ? (
            <img src={p.logoDataUrl} alt={p.company} className="h-9 w-9 rounded object-contain" />
          ) : (
            <div
              className="h-9 w-9 rounded flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              {(p.company[0] || "P").toUpperCase()}
            </div>
          )}
          <span className="wordmark text-lg">{p.company}</span>
        </div>
        <span className="chip">Confidencial</span>
      </div>

      <div className="mt-24">
        <span className="chip chip-accent mb-6">{p.coverEyebrow}</span>
        <h1
          className="mt-6 font-bold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "52px",
            lineHeight: 1.03,
            letterSpacing: "-0.03em",
          }}
        >
          {p.coverHeadline}
        </h1>
        <p className="mt-6 text-lg max-w-[42em]" style={{ color: "var(--ink-dim)" }}>
          {p.coverSubtitle}
        </p>
      </div>

      <div
        className="absolute left-[20mm] right-[20mm] bottom-[22mm] grid grid-cols-4 gap-6 pt-6 border-t"
        style={{ borderColor: "var(--border-soft)" }}
      >
        {[
          { k: "Preparado para", v: p.clientName },
          { k: "Empresa", v: p.clientCompany },
          { k: "Data", v: fmtDateLong(p.proposalDate) },
          { k: "Válida até", v: fmtDateLong(addDaysIso(p.proposalDate, p.validityDays)) },
        ].map((c) => (
          <div key={c.k}>
            <div
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
            >
              {c.k}
            </div>
            <div className="text-sm font-medium">{c.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Diagnostico({ p }: { p: Proposal }) {
  const m = p.monthlyPainCost;
  return (
    <section className="a4-page paper">
      <SectionHeader kicker="Onde estamos" number="01" title="Diagnóstico" />
      <p className="text-[15px] leading-relaxed max-w-[46em]" style={{ color: "var(--ink)" }}>
        {p.diagnosisText}
      </p>
      {m > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { k: "Custo por mês", v: m, hi: false },
            { k: "Em 6 meses", v: m * 6, hi: false },
            { k: "Em 12 meses", v: m * 12, hi: true },
          ].map((c) => (
            <div
              key={c.k}
              className="rounded-2xl p-6 no-break"
              style={{
                background: "var(--paper-2)",
                border: c.hi
                  ? "1.5px solid var(--accent)"
                  : "1px solid var(--border-soft)",
              }}
            >
              <div
                className="text-[10px] uppercase tracking-widest mb-3"
                style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
              >
                {c.k}
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: c.hi ? "var(--accent)" : "var(--ink)",
                }}
              >
                {fmtBRL(c.v)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Metodo({ p }: { p: Proposal }) {
  return (
    <section className="a4-page paper">
      <SectionHeader kicker="Como resolvemos" number="02" title="O Método" />
      <div
        className="text-[26px] font-bold mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
      >
        {p.methodName}
      </div>
      <p className="text-[15px] leading-relaxed max-w-[46em]" style={{ color: "var(--ink)" }}>
        {p.methodIntro}
      </p>
      {p.methodSteps.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-8">
          {p.methodSteps.map((s, i) => (
            <span key={s.id} className="chip chip-accent">
              {String(i + 1).padStart(2, "0")} · {s.title}
            </span>
          ))}
        </div>
      )}
      {p.milestones.length > 0 && (
        <div className="mt-14">
          <div
            className="text-[11px] uppercase tracking-widest mb-6"
            style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
          >
            Marcos ao longo do caminho
          </div>
          <div className="relative pt-2">
            <div
              className="absolute left-0 right-0 top-4 h-[2px]"
              style={{ background: "color-mix(in oklab, var(--accent) 40%, transparent)" }}
            />
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${p.milestones.length}, minmax(0,1fr))` }}>
              {p.milestones.map((m) => (
                <div key={m.id} className="relative">
                  <div
                    className="h-4 w-4 rounded-full mb-3"
                    style={{ background: "var(--accent)", boxShadow: "0 0 0 4px var(--paper)" }}
                  />
                  <div className="text-sm font-medium leading-tight">{m.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ValueStack({ p }: { p: Proposal }) {
  const main = p.deliverables.filter((d) => !d.bonus);
  const bonuses = p.deliverables.filter((d) => d.bonus);
  const total = valueStackSum(p);
  return (
    <section className="a4-page paper">
      <SectionHeader kicker="O que você recebe" number="03" title="Value Stack" />
      <div className="space-y-5">
        {main.map((d) => (
          <div key={d.id} className="no-break">
            <div className="flex items-end">
              <div className="flex-1">
                <div className="text-[15px] font-semibold gold-check">{d.title}</div>
                <div className="text-[13px] mt-1 pl-6" style={{ color: "var(--ink-dim)" }}>
                  {d.desc}
                </div>
              </div>
              <div className="dot-lead" />
              <span className="chip chip-accent">{fmtBRL(d.value)}</span>
            </div>
          </div>
        ))}
      </div>

      {bonuses.length > 0 && (
        <div className="mt-10 space-y-4">
          {bonuses.map((d) => (
            <div key={d.id} className="bonus-card p-5 no-break">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
                  >
                    Bônus exclusivo
                  </div>
                  <div className="text-[15px] font-semibold">{d.title}</div>
                  <div className="text-[13px] mt-1" style={{ color: "var(--ink-dim)" }}>
                    {d.desc}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through" style={{ color: "var(--ink-dim)" }}>
                    {fmtBRL(d.value)}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                    Incluso nesta proposta
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 pt-6 border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div
          className="text-[11px] uppercase tracking-widest"
          style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
        >
          Valor total se contratado separadamente
        </div>
        <div
          className="text-5xl font-bold mt-2 line-through"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-dim)" }}
        >
          {fmtBRL(total)}
        </div>
      </div>
    </section>
  );
}

function Prova({ p }: { p: Proposal }) {
  return (
    <section className="a4-page paper">
      <SectionHeader kicker="Quem entrega" number="04" title="Prova e autoridade" />
      <div className="flex items-start gap-5">
        <div
          className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
          style={{ background: "var(--accent)", color: "#000", fontFamily: "var(--font-display)" }}
        >
          {(p.consultant[0] || "?").toUpperCase()}
        </div>
        <div>
          <div className="text-xl font-semibold">{p.consultant}</div>
          <div className="text-sm" style={{ color: "var(--ink-dim)" }}>
            {p.consultantRole}
          </div>
          <p className="text-[14px] mt-3 max-w-[40em]">{p.bioText}</p>
          <div
            className="text-[11px] uppercase tracking-widest mt-3"
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          >
            {p.bioCredentials}
          </div>
        </div>
      </div>

      {p.metricsLine && (
        <div
          className="mt-10 rounded-2xl p-6"
          style={{ background: "var(--paper-2)", border: "1px solid var(--border-soft)" }}
        >
          <div
            className="text-[10px] uppercase tracking-widest mb-2"
            style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
          >
            Métrica média com clientes
          </div>
          <div className="text-lg font-semibold">{p.metricsLine}</div>
        </div>
      )}

      {p.testimonials.length > 0 && (
        <div className="mt-8 space-y-4">
          {p.testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="rounded-2xl p-5 no-break"
              style={{ background: "var(--paper-2)", border: "1px solid var(--border-soft)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--ink-dim)" }}>
                    {t.company}
                  </div>
                </div>
                <span className="chip chip-accent">{t.result}</span>
              </div>
              <p className="text-[13px] italic" style={{ color: "var(--ink)" }}>
                “{t.text}”
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Investimento({ p }: { p: Proposal }) {
  const price = realPrice(p);
  const perDay = pricePerDay(p);
  let mainLabel = "";
  if (p.payMode === "cartao") mainLabel = `${p.cardCount}x de ${fmtBRL(p.cardInstallment)}`;
  else if (p.payMode === "boleto") mainLabel = `${p.boletoCount}x de ${fmtBRL(p.boletoInstallment)}`;
  else mainLabel = `${fmtBRL(price)} à vista`;

  return (
    <section className="a4-page paper-radial">
      <SectionHeader kicker="O investimento" number="05" title="Investimento" />
      <div className="text-center mb-4">
        <div
          className="text-[11px] uppercase tracking-widest"
          style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
        >
          Valor cheio
        </div>
        <div
          className="text-4xl font-bold line-through mt-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-dim)" }}
        >
          {p.fullPriceText}
        </div>
      </div>

      <div className="invest-card p-10 text-center">
        <div
          className="text-[11px] uppercase tracking-widest mb-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          Sua condição
        </div>
        <div
          className="text-[56px] font-bold leading-none"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          {mainLabel}
        </div>
        {p.payMode !== "pix" && (
          <div className="text-sm mt-3" style={{ color: "var(--ink-dim)" }}>
            Total: {fmtBRL(price)}
          </div>
        )}
        {p.payMode === "pix" && p.pixDiscount > 0 && (
          <div className="text-sm mt-3" style={{ color: "var(--ink-dim)" }}>
            Desconto de {p.pixDiscount}% no pix
          </div>
        )}
        <div className="mt-6 inline-flex">
          <span className="chip chip-accent">Menos de {fmtBRL(perDay)} por dia</span>
        </div>
      </div>

      {p.guaranteeEnabled && (
        <div
          className="mt-8 rounded-2xl p-5 flex items-start gap-4 no-break"
          style={{ background: "var(--paper-2)", border: "1px solid var(--border-soft)" }}
        >
          <ShieldCheck className="shrink-0 mt-1" size={28} color="var(--accent)" />
          <div>
            <div className="text-sm font-semibold mb-1">Garantia</div>
            <div className="text-[13px]" style={{ color: "var(--ink-dim)" }}>
              {p.guaranteeText}
            </div>
          </div>
        </div>
      )}

      <div
        className="mt-6 rounded-2xl p-5 grid grid-cols-2 gap-4 no-break"
        style={{ background: "var(--paper-2)", border: "1px solid var(--border-soft)" }}
      >
        <div>
          <div
            className="text-[10px] uppercase tracking-widest mb-1"
            style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
          >
            Válida até
          </div>
          <div className="text-sm font-semibold">
            {fmtDateLong(addDaysIso(p.proposalDate, p.validityDays))}
          </div>
        </div>
        <div>
          <div
            className="text-[10px] uppercase tracking-widest mb-1"
            style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}
          >
            Por que agora
          </div>
          <div className="text-sm font-semibold">{p.urgencyReason}</div>
        </div>
      </div>
    </section>
  );
}

function Fechamento({ p }: { p: Proposal }) {
  return (
    <section className="a4-page paper-radial">
      <SectionHeader kicker="O próximo passo" number="06" title="Vamos começar" />
      <p className="text-[16px] leading-relaxed max-w-[42em]">{p.closingMessage}</p>

      <div className="mt-10">
        <span
          className="inline-block px-8 py-4 rounded-2xl text-lg font-bold"
          style={{ background: "var(--accent)", color: "#000", fontFamily: "var(--font-display)" }}
        >
          {p.ctaText}
        </span>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-10">
        <div>
          <div
            className="border-t pt-3"
            style={{ borderColor: "var(--ink-dim)" }}
          />
          <div className="text-sm font-semibold">{p.consultant}</div>
          <div className="text-xs" style={{ color: "var(--ink-dim)" }}>
            Pela {p.company}
          </div>
        </div>
        <div>
          <div
            className="border-t pt-3"
            style={{ borderColor: "var(--ink-dim)" }}
          />
          <div className="text-sm font-semibold">{p.clientName}</div>
          <div className="text-xs" style={{ color: "var(--ink-dim)" }}>
            De acordo · {p.clientCompany}
          </div>
        </div>
      </div>

      <div
        className="absolute left-[20mm] right-[20mm] bottom-[22mm] flex items-center justify-between pt-4 border-t"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <span className="wordmark">{p.company}</span>
        <span className="text-xs" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}>
          Válida até {fmtDateLong(addDaysIso(p.proposalDate, p.validityDays))}
        </span>
      </div>
    </section>
  );
}

const RENDERERS: Record<SectionId, (props: { p: Proposal }) => React.ReactElement> = {
  diagnostico: Diagnostico,
  metodo: Metodo,
  valuestack: ValueStack,
  prova: Prova,
  investimento: Investimento,
  fechamento: Fechamento,
};

export function ProposalPreview({ p }: { p: Proposal }) {
  return (
    <div id="print-root" data-theme={p.theme} data-font={p.fontPair} style={{ ["--accent" as string]: p.accent }}>
      <Cover p={p} />
      {p.sections
        .filter((s) => s.enabled)
        .map((s) => {
          const C = RENDERERS[s.id];
          return <C key={s.id} p={p} />;
        })}
    </div>
  );
}
