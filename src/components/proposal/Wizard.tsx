import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Code2,
  Rocket,
  Scale,
  Stethoscope,
  Target,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import { useProposals } from "@/lib/proposal";
import { fromTemplate, TEMPLATES, type TemplateKey } from "@/lib/templates";

const ICONS: Record<string, typeof Target> = {
  TrendingUp,
  Target,
  Scale,
  Stethoscope,
  Code2,
  Rocket,
};

export function Wizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [tpl, setTpl] = useState<TemplateKey>("consultoria");
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState<string | undefined>();
  const [accent, setAccent] = useState("#d9a94a");
  const [consultant, setConsultant] = useState("");
  const [role, setRole] = useState("");
  const create = useProposals((s) => s.create);
  const navigate = useNavigate();

  const finish = (templateKey: TemplateKey = tpl) => {
    const p = fromTemplate(templateKey, {
      company: company || "Sua Empresa",
      logoDataUrl: logo,
      accent,
      consultant: consultant || "Você",
      consultantRole: role || "Fundador",
    });
    create(p);
    navigate({ to: "/editor/$id", params: { id: p.id } });
  };

  const onLogo = (f: File) => {
    const r = new FileReader();
    r.onload = () => setLogo(r.result as string);
    r.readAsDataURL(f);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-2xl rounded-2xl p-8 relative" style={{ background: "var(--paper)", border: "1px solid var(--border-soft)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-sm" style={{ color: "var(--ink-dim)" }}>
          <X size={20} />
        </button>

        <div className="flex gap-1 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full"
              style={{ background: i <= step ? "var(--accent)" : "var(--border-soft)" }}
            />
          ))}
        </div>

        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Qual o seu segmento?
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--ink-dim)" }}>
              Vamos pré-preencher com uma proposta pronta que você só precisa ajustar.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((t) => {
                const Icon = ICONS[t.iconKey] || Target;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTpl(t.key)}
                    className="btn p-4 flex-col items-start text-left h-auto"
                    style={{
                      borderColor: tpl === t.key ? "var(--accent)" : undefined,
                      background: tpl === t.key ? "color-mix(in oklab, var(--accent) 12%, transparent)" : undefined,
                    }}
                  >
                    <Icon size={20} color="var(--accent)" />
                    <div className="mt-2 text-sm font-semibold">{t.label}</div>
                    <div className="text-xs mt-1" style={{ color: "var(--ink-dim)" }}>
                      {t.description}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-6">
              <button className="text-xs underline" style={{ color: "var(--ink-dim)" }} onClick={() => finish("consultoria")}>
                Pular e começar do zero
              </button>
              <button className="btn btn-primary" onClick={() => setStep(1)}>
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Sua marca
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--ink-dim)" }}>
              Como quer aparecer na capa da proposta?
            </p>
            <div className="space-y-4">
              <label className="block">
                <span className="field-label">Nome da empresa</span>
                <input className="field" value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
              <label className="block">
                <span className="field-label">Logo</span>
                <label className="btn cursor-pointer w-full justify-center">
                  <Upload size={14} /> {logo ? "Trocar logo" : "Enviar logo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && onLogo(e.target.files[0])}
                  />
                </label>
              </label>
              <label className="block">
                <span className="field-label">Cor de destaque</span>
                <input type="color" className="field h-10 p-1" value={accent} onChange={(e) => setAccent(e.target.value)} />
              </label>
            </div>
            <div className="flex justify-between mt-6">
              <button className="btn" onClick={() => setStep(0)}>Voltar</button>
              <button className="btn btn-primary" onClick={() => setStep(2)}>Continuar</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Quem propõe?
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--ink-dim)" }}>
              Isso aparece na página de prova e assinatura.
            </p>
            <div className="space-y-4">
              <label className="block">
                <span className="field-label">Seu nome</span>
                <input className="field" value={consultant} onChange={(e) => setConsultant(e.target.value)} />
              </label>
              <label className="block">
                <span className="field-label">Cargo</span>
                <input className="field" value={role} onChange={(e) => setRole(e.target.value)} />
              </label>
            </div>
            <div className="flex justify-between mt-6">
              <button className="btn" onClick={() => setStep(1)}>Voltar</button>
              <button className="btn btn-primary" onClick={() => finish()}>Criar proposta</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { ICONS };
