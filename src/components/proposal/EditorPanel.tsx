import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  FileDown,
  Plus,
  Upload,
  X,
} from "lucide-react";
import {
  addDaysIso,
  fmtDateLong,
  FONT_PAIRS,
  newId,
  SECTION_LABELS,
  THEMES,
  useProposals,
  type Proposal,
} from "@/lib/proposal";

function Group({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t" style={{ borderColor: "var(--border-soft)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold">{title}</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && <div className="px-4 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export function EditorPanel({
  p,
  onExport,
}: {
  p: Proposal;
  onExport: () => void;
}) {
  const update = useProposals((s) => s.update);
  const patch = (v: Partial<Proposal>) => update(p.id, v);

  const onLogo = (file: File) => {
    const r = new FileReader();
    r.onload = () => patch({ logoDataUrl: r.result as string });
    r.readAsDataURL(file);
  };

  const moveSection = (i: number, dir: -1 | 1) => {
    const next = [...p.sections];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    patch({ sections: next });
  };

  return (
    <aside
      className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-r"
      style={{ borderColor: "var(--border-soft)", background: "var(--paper)" }}
    >
      <div
        className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b backdrop-blur"
        style={{ borderColor: "var(--border-soft)", background: "color-mix(in oklab, var(--paper) 85%, transparent)" }}
      >
        <Link to="/" className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-dim)" }}>
          <ArrowLeft size={14} /> Nova proposta
        </Link>
        <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
          Auto-salvo
        </span>
      </div>

      <div className="p-4 border-b" style={{ borderColor: "var(--border-soft)" }}>
        <button onClick={onExport} className="btn btn-primary w-full justify-center">
          <FileDown size={16} /> Exportar PDF
        </button>
      </div>

      <Group title="A · Sua marca" defaultOpen>
        <Field label="Nome da empresa">
          <input className="field" value={p.company} onChange={(e) => patch({ company: e.target.value })} />
        </Field>
        <Field label="Logo (PNG/SVG)">
          <label className="btn cursor-pointer w-full justify-center">
            <Upload size={14} /> {p.logoDataUrl ? "Trocar logo" : "Enviar logo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onLogo(e.target.files[0])}
            />
          </label>
        </Field>
        <Field label="Cor de destaque">
          <input
            type="color"
            className="field h-10 p-1"
            value={p.accent}
            onChange={(e) => patch({ accent: e.target.value })}
          />
        </Field>
        <div>
          <div className="field-label">Tema</div>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => patch({ theme: t.id })}
                className="btn justify-center"
                style={{
                  borderColor: p.theme === t.id ? "var(--accent)" : undefined,
                  background: p.theme === t.id ? "color-mix(in oklab, var(--accent) 15%, transparent)" : undefined,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="field-label">Fonte</div>
          <div className="grid grid-cols-2 gap-2">
            {FONT_PAIRS.map((f) => (
              <button
                key={f.id}
                onClick={() => patch({ fontPair: f.id })}
                className="btn justify-start text-left flex-col items-start"
                style={{
                  borderColor: p.fontPair === f.id ? "var(--accent)" : undefined,
                  background: p.fontPair === f.id ? "color-mix(in oklab, var(--accent) 15%, transparent)" : undefined,
                }}
              >
                <span className="text-sm font-semibold">{f.label}</span>
                <span className="text-[10px]" style={{ color: "var(--ink-dim)" }}>
                  {f.sample}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Group>

      <Group title="B · Cliente">
        <Field label="Nome do contato">
          <input className="field" value={p.clientName} onChange={(e) => patch({ clientName: e.target.value })} />
        </Field>
        <Field label="Empresa do cliente">
          <input className="field" value={p.clientCompany} onChange={(e) => patch({ clientCompany: e.target.value })} />
        </Field>
      </Group>

      <Group title="C · Proposta">
        <Field label="Nome da oferta">
          <input className="field" value={p.offer} onChange={(e) => patch({ offer: e.target.value })} />
        </Field>
        <Field label="Data">
          <input
            type="date"
            className="field"
            value={p.proposalDate}
            onChange={(e) => patch({ proposalDate: e.target.value })}
          />
        </Field>
        <Field label="Validade (dias)">
          <input
            type="number"
            className="field"
            value={p.validityDays}
            onChange={(e) => patch({ validityDays: Number(e.target.value) })}
          />
        </Field>
        <div className="text-xs" style={{ color: "var(--ink-dim)" }}>
          Válida até {fmtDateLong(addDaysIso(p.proposalDate, p.validityDays))}
        </div>
        <Field label="Consultor">
          <input className="field" value={p.consultant} onChange={(e) => patch({ consultant: e.target.value })} />
        </Field>
        <Field label="Cargo">
          <input
            className="field"
            value={p.consultantRole}
            onChange={(e) => patch({ consultantRole: e.target.value })}
          />
        </Field>
      </Group>

      <Group title="D · Seções do documento">
        {p.sections.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={s.enabled}
              onChange={(e) => {
                const next = [...p.sections];
                next[i] = { ...s, enabled: e.target.checked };
                patch({ sections: next });
              }}
            />
            <span className="flex-1 text-sm">{SECTION_LABELS[s.id]}</span>
            <button className="btn px-2 py-1" onClick={() => moveSection(i, -1)}>↑</button>
            <button className="btn px-2 py-1" onClick={() => moveSection(i, 1)}>↓</button>
          </div>
        ))}
      </Group>

      <Group title="Capa">
        <Field label="Eyebrow">
          <input className="field" value={p.coverEyebrow} onChange={(e) => patch({ coverEyebrow: e.target.value })} />
        </Field>
        <Field label="Headline">
          <textarea
            className="field"
            rows={3}
            value={p.coverHeadline}
            onChange={(e) => patch({ coverHeadline: e.target.value })}
          />
        </Field>
        <Field label="Subtítulo">
          <textarea
            className="field"
            rows={2}
            value={p.coverSubtitle}
            onChange={(e) => patch({ coverSubtitle: e.target.value })}
          />
        </Field>
      </Group>

      <Group title="Diagnóstico">
        <Field label="Texto do diagnóstico">
          <textarea
            className="field"
            rows={5}
            value={p.diagnosisText}
            onChange={(e) => patch({ diagnosisText: e.target.value })}
          />
        </Field>
        <Field label="Custo mensal da dor (R$) — 0 desativa">
          <input
            type="number"
            className="field"
            value={p.monthlyPainCost}
            onChange={(e) => patch({ monthlyPainCost: Number(e.target.value) })}
          />
        </Field>
      </Group>

      <Group title="O Método">
        <Field label="Nome do método">
          <input className="field" value={p.methodName} onChange={(e) => patch({ methodName: e.target.value })} />
        </Field>
        <Field label="Intro">
          <textarea
            className="field"
            rows={3}
            value={p.methodIntro}
            onChange={(e) => patch({ methodIntro: e.target.value })}
          />
        </Field>

        <div className="field-label mt-2">Pilares</div>
        {p.methodSteps.map((s, i) => (
          <div key={s.id} className="flex gap-2">
            <input
              className="field flex-1"
              value={s.title}
              onChange={(e) => {
                const next = [...p.methodSteps];
                next[i] = { ...s, title: e.target.value };
                patch({ methodSteps: next });
              }}
            />
            <button
              className="btn px-2"
              onClick={() => patch({ methodSteps: p.methodSteps.filter((_, j) => j !== i) })}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          className="btn"
          onClick={() => patch({ methodSteps: [...p.methodSteps, { id: newId(), title: "Novo pilar" }] })}
        >
          <Plus size={14} /> Adicionar pilar
        </button>

        <div className="field-label mt-2">Marcos</div>
        {p.milestones.map((m, i) => (
          <div key={m.id} className="flex gap-2">
            <input
              className="field flex-1"
              value={m.title}
              onChange={(e) => {
                const next = [...p.milestones];
                next[i] = { ...m, title: e.target.value };
                patch({ milestones: next });
              }}
            />
            <button
              className="btn px-2"
              onClick={() => patch({ milestones: p.milestones.filter((_, j) => j !== i) })}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          className="btn"
          onClick={() => patch({ milestones: [...p.milestones, { id: newId(), title: "Novo marco" }] })}
        >
          <Plus size={14} /> Adicionar marco
        </button>
      </Group>

      <Group title="Value Stack">
        {p.deliverables.map((d, i) => (
          <div
            key={d.id}
            className="rounded-lg p-3 space-y-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-soft)" }}
          >
            <div className="flex justify-between items-start gap-2">
              <input
                className="field flex-1"
                value={d.title}
                onChange={(e) => {
                  const n = [...p.deliverables];
                  n[i] = { ...d, title: e.target.value };
                  patch({ deliverables: n });
                }}
              />
              <button
                className="btn px-2"
                onClick={() => patch({ deliverables: p.deliverables.filter((_, j) => j !== i) })}
              >
                <X size={14} />
              </button>
            </div>
            <textarea
              className="field"
              rows={2}
              value={d.desc}
              onChange={(e) => {
                const n = [...p.deliverables];
                n[i] = { ...d, desc: e.target.value };
                patch({ deliverables: n });
              }}
            />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="field flex-1"
                value={d.value}
                onChange={(e) => {
                  const n = [...p.deliverables];
                  n[i] = { ...d, value: Number(e.target.value) };
                  patch({ deliverables: n });
                }}
              />
              <label className="text-xs flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!d.bonus}
                  onChange={(e) => {
                    const n = [...p.deliverables];
                    n[i] = { ...d, bonus: e.target.checked };
                    patch({ deliverables: n });
                  }}
                />
                Bônus
              </label>
            </div>
          </div>
        ))}
        <button
          className="btn"
          onClick={() =>
            patch({
              deliverables: [
                ...p.deliverables,
                { id: newId(), title: "Novo entregável", desc: "", value: 0 },
              ],
            })
          }
        >
          <Plus size={14} /> Adicionar entregável
        </button>
      </Group>

      <Group title="Prova e autoridade">
        <Field label="Bio">
          <textarea className="field" rows={3} value={p.bioText} onChange={(e) => patch({ bioText: e.target.value })} />
        </Field>
        <Field label="Credenciais">
          <input
            className="field"
            value={p.bioCredentials}
            onChange={(e) => patch({ bioCredentials: e.target.value })}
          />
        </Field>
        <Field label="Métrica">
          <textarea
            className="field"
            rows={2}
            value={p.metricsLine}
            onChange={(e) => patch({ metricsLine: e.target.value })}
          />
        </Field>
        <div className="field-label mt-2">Depoimentos</div>
        {p.testimonials.map((t, i) => (
          <div
            key={t.id}
            className="rounded-lg p-3 space-y-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-soft)" }}
          >
            <div className="flex gap-2">
              <input
                className="field flex-1"
                placeholder="Nome"
                value={t.name}
                onChange={(e) => {
                  const n = [...p.testimonials];
                  n[i] = { ...t, name: e.target.value };
                  patch({ testimonials: n });
                }}
              />
              <button
                className="btn px-2"
                onClick={() => patch({ testimonials: p.testimonials.filter((_, j) => j !== i) })}
              >
                <X size={14} />
              </button>
            </div>
            <input
              className="field"
              placeholder="Empresa"
              value={t.company}
              onChange={(e) => {
                const n = [...p.testimonials];
                n[i] = { ...t, company: e.target.value };
                patch({ testimonials: n });
              }}
            />
            <input
              className="field"
              placeholder="Resultado (ex: 3x em 90 dias)"
              value={t.result}
              onChange={(e) => {
                const n = [...p.testimonials];
                n[i] = { ...t, result: e.target.value };
                patch({ testimonials: n });
              }}
            />
            <textarea
              className="field"
              rows={2}
              placeholder="Depoimento"
              value={t.text}
              onChange={(e) => {
                const n = [...p.testimonials];
                n[i] = { ...t, text: e.target.value };
                patch({ testimonials: n });
              }}
            />
          </div>
        ))}
        {p.testimonials.length < 3 && (
          <button
            className="btn"
            onClick={() =>
              patch({
                testimonials: [
                  ...p.testimonials,
                  { id: newId(), name: "", company: "", result: "", text: "" },
                ],
              })
            }
          >
            <Plus size={14} /> Adicionar depoimento
          </button>
        )}
      </Group>

      <Group title="Investimento">
        <div className="flex gap-2">
          {(["cartao", "pix", "boleto"] as const).map((m) => (
            <label key={m} className="btn flex-1 justify-center cursor-pointer" style={{
              borderColor: p.payMode === m ? "var(--accent)" : undefined,
              background: p.payMode === m ? "color-mix(in oklab, var(--accent) 15%, transparent)" : undefined,
            }}>
              <input
                type="radio"
                className="hidden"
                checked={p.payMode === m}
                onChange={() => patch({ payMode: m })}
              />
              {m}
            </label>
          ))}
        </div>
        {p.payMode === "cartao" && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Nº parcelas">
              <input
                type="number"
                className="field"
                value={p.cardCount}
                onChange={(e) => patch({ cardCount: Number(e.target.value) })}
              />
            </Field>
            <Field label="Valor parcela">
              <input
                type="number"
                className="field"
                value={p.cardInstallment}
                onChange={(e) => patch({ cardInstallment: Number(e.target.value) })}
              />
            </Field>
          </div>
        )}
        {p.payMode === "pix" && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Valor à vista">
              <input
                type="number"
                className="field"
                value={p.pixValue}
                onChange={(e) => patch({ pixValue: Number(e.target.value) })}
              />
            </Field>
            <Field label="Desconto %">
              <input
                type="number"
                className="field"
                value={p.pixDiscount}
                onChange={(e) => patch({ pixDiscount: Number(e.target.value) })}
              />
            </Field>
          </div>
        )}
        {p.payMode === "boleto" && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Nº boletos">
              <input
                type="number"
                className="field"
                value={p.boletoCount}
                onChange={(e) => patch({ boletoCount: Number(e.target.value) })}
              />
            </Field>
            <Field label="Valor boleto">
              <input
                type="number"
                className="field"
                value={p.boletoInstallment}
                onChange={(e) => patch({ boletoInstallment: Number(e.target.value) })}
              />
            </Field>
          </div>
        )}
        <label className="text-xs flex items-center gap-2">
          <input
            type="checkbox"
            checked={p.guaranteeEnabled}
            onChange={(e) => patch({ guaranteeEnabled: e.target.checked })}
          />
          Ativar garantia
        </label>
        <Field label="Texto da garantia">
          <textarea
            className="field"
            rows={2}
            value={p.guaranteeText}
            onChange={(e) => patch({ guaranteeText: e.target.value })}
          />
        </Field>
        <Field label="Urgência (por quê agora)">
          <input
            className="field"
            value={p.urgencyReason}
            onChange={(e) => patch({ urgencyReason: e.target.value })}
          />
        </Field>
        <Field label="Preço cheio (âncora)">
          <input
            className="field"
            value={p.fullPriceText}
            onChange={(e) => patch({ fullPriceText: e.target.value })}
          />
        </Field>
      </Group>

      <Group title="Fechamento">
        <Field label="Mensagem de fechamento">
          <textarea
            className="field"
            rows={3}
            value={p.closingMessage}
            onChange={(e) => patch({ closingMessage: e.target.value })}
          />
        </Field>
        <Field label="Texto do CTA">
          <input className="field" value={p.ctaText} onChange={(e) => patch({ ctaText: e.target.value })} />
        </Field>
      </Group>
    </aside>
  );
}
