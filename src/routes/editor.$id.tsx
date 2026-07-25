import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { EditorPanel } from "@/components/proposal/EditorPanel";
import { ProposalPreview } from "@/components/proposal/ProposalPreview";
import { slug, useProposals } from "@/lib/proposal";

export const Route = createFileRoute("/editor/$id")({
  head: () => ({
    meta: [
      { title: "Editor · Gerador de Propostas Comerciais" },
      { name: "description", content: "Edite sua proposta com preview A4 em tempo real e exporte em PDF." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useParams();
  const p = useProposals((s) => s.proposals[id]);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [exporting, setExporting] = useState(false);

  if (!p) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Proposta não encontrada
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--ink-dim)" }}>
            Ela pode ter sido apagada do seu navegador.
          </p>
          <Link to="/" className="btn btn-primary">Criar nova proposta</Link>
        </div>
      </div>
    );
  }

  const exportPdf = async () => {
    setExporting(true);
    try {
      const pages = Array.from(document.querySelectorAll<HTMLElement>(".a4-page"));
      document.body.classList.add("pdf-exporting");
      await document.fonts?.ready;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      for (let i = 0; i < pages.length; i++) {
        const dataUrl = await toPng(pages[i], {
          pixelRatio: 2.5,
          cacheBust: true,
          backgroundColor: getComputedStyle(pages[i]).backgroundColor,
        });
        if (i > 0) pdf.addPage("a4", "portrait");
        pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST");
      }
      pdf.save(`proposta-${slug(p.clientCompany)}.pdf`);
    } finally {
      document.body.classList.remove("pdf-exporting");
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" data-theme={p.theme} style={{ ["--accent" as string]: p.accent }}>
      <div className="lg:hidden sticky top-0 z-20 flex border-b" style={{ borderColor: "var(--border-soft)", background: "var(--paper)" }}>
        {(["edit", "preview"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMobileView(m)}
            className="flex-1 py-3 text-sm font-semibold"
            style={{
              color: mobileView === m ? "var(--accent)" : "var(--ink-dim)",
              borderBottom: mobileView === m ? "2px solid var(--accent)" : "none",
            }}
          >
            {m === "edit" ? "Editar" : "Ver preview"}
          </button>
        ))}
      </div>

      <div className={mobileView === "edit" ? "block" : "hidden lg:block"}>
        <EditorPanel p={p} onExport={exportPdf} />
      </div>

      <div className={`flex-1 overflow-x-auto ${mobileView === "preview" ? "block" : "hidden lg:block"}`}>
        <div className="p-4 md:p-10 flex justify-center" style={{ background: "var(--app-bg)" }}>
          <div>
            <ProposalPreview p={p} />
          </div>
        </div>
      </div>

      {exporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.75)" }}>
          <div
            className="rounded-2xl p-8 text-center max-w-sm"
            style={{ background: "var(--paper)", border: "1px solid var(--border-soft)" }}
          >
            <div className="text-lg font-semibold mb-2">Gerando PDF</div>
            <div className="text-sm" style={{ color: "var(--ink-dim)" }}>
              Renderizando páginas com cores e fundos preservados…
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
