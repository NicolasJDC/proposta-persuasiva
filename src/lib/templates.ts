import {
  DEFAULT_SECTIONS,
  newId,
  todayIso,
  type Proposal,
} from "./proposal";

export type TemplateKey =
  | "agencia"
  | "consultoria"
  | "juridico"
  | "saude"
  | "tech"
  | "infoproduto";

export interface Template {
  key: TemplateKey;
  label: string;
  iconKey: string;
  description: string;
  build: (overrides?: Partial<Proposal>) => Proposal;
}

const base = (overrides: Partial<Proposal> = {}): Proposal => ({
  id: newId(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  company: "Sua Empresa",
  accent: "#d9a94a",
  theme: "dark-gold",
  fontPair: "modern",
  clientName: "Nome do Cliente",
  clientCompany: "Empresa Cliente",
  offer: "Projeto sob medida",
  proposalDate: todayIso(),
  validityDays: 7,
  consultant: "Você",
  consultantRole: "Fundador",
  sections: DEFAULT_SECTIONS.map((s) => ({ ...s })),
  coverEyebrow: "Proposta Comercial · Confidencial",
  coverHeadline: "",
  coverSubtitle: "",
  diagnosisText: "",
  monthlyPainCost: 0,
  methodName: "Método",
  methodIntro: "",
  methodSteps: [],
  milestones: [],
  deliverables: [],
  bioText: "",
  bioCredentials: "",
  metricsLine: "",
  testimonials: [],
  payMode: "cartao",
  cardInstallment: 997,
  cardCount: 12,
  pixValue: 9700,
  pixDiscount: 10,
  boletoInstallment: 1997,
  boletoCount: 6,
  guaranteeEnabled: true,
  guaranteeText: "Garantia incondicional de 14 dias. Se não fizer sentido, devolvemos 100%.",
  urgencyReason: "Trabalhamos com no máximo 4 clientes por trimestre.",
  fullPriceText: "R$ 24.900",
  closingMessage: "",
  ctaText: "Vamos começar",
  ...overrides,
});

export const TEMPLATES: Template[] = [
  {
    key: "agencia",
    label: "Agência de Marketing",
    iconKey: "TrendingUp",
    description: "Aquisição, tráfego pago e geração de leads previsível.",
    build: (o) =>
      base({
        offer: "Sprint de Aquisição 90 dias",
        coverHeadline: "O caminho para 3x mais leads qualificados em 90 dias, sem depender da sorte do algoritmo.",
        coverSubtitle: "Um plano completo de aquisição pago, com criativos, funil e mensuração desenhados para o seu ICP.",
        diagnosisText: "Hoje a operação de marketing gera leads de forma inconsistente, sem previsibilidade semanal e com CAC subindo a cada trimestre. Esse cenário custa em média R$ 45.000 por mês em orçamento desperdiçado, leads frios e oportunidades perdidas. Em 12 meses, isso representa R$ 540.000 que não voltam para o caixa.",
        monthlyPainCost: 45000,
        methodName: "Growth Loop 3F",
        methodIntro: "A maioria das agências entrega mídia sem entender o funil e falha porque otimiza clique, não receita. O Growth Loop 3F é diferente: partimos do LTV, desenhamos o funil ao contrário e só então acionamos tráfego.",
        methodSteps: [
          { id: newId(), title: "Fundação: ICP, oferta e mensuração" },
          { id: newId(), title: "Funil: criativos, páginas e nutrição" },
          { id: newId(), title: "Fluxo: mídia paga com CAC controlado" },
        ],
        milestones: [
          { id: newId(), title: "Semana 2 · Diagnóstico entregue" },
          { id: newId(), title: "Semana 4 · Campanhas no ar" },
          { id: newId(), title: "Semana 8 · Primeira otimização" },
          { id: newId(), title: "Semana 12 · Relatório de ROI" },
        ],
        deliverables: [
          { id: newId(), title: "Diagnóstico estratégico completo", desc: "Auditoria de canais, funil e ICP atual.", value: 4500 },
          { id: newId(), title: "Gestão de mídia em Meta e Google", desc: "Setup, criativos e otimização contínua.", value: 12000 },
          { id: newId(), title: "Produção de 40 criativos/mês", desc: "Estáticos e vídeos curtos prontos para publicar.", value: 8000 },
          { id: newId(), title: "Landing pages otimizadas", desc: "Até 3 páginas com CRO e testes A/B.", value: 6000 },
          { id: newId(), title: "Dashboard de resultados semanal", desc: "Visibilidade real de CAC, CPL e ROAS.", value: 3500 },
          { id: newId(), title: "Bônus · Workshop com o time comercial", desc: "Alinhamento de qualificação e SLA de leads.", value: 3900, bonus: true },
        ],
        bioText: "Ajudamos empresas B2B e DTC a construir aquisição previsível há 8 anos. Mais de 120 marcas atendidas.",
        bioCredentials: "Meta Business Partner · Google Premier · +R$ 80M em mídia gerenciada",
        metricsLine: "Média de 2.7x em leads qualificados e queda de 34% no CAC nos primeiros 90 dias.",
        testimonials: [
          { id: newId(), name: "Ana Beatriz Souza", company: "Loft Móveis", result: "CAC -41% em 90 dias", text: "Finalmente enxergamos o funil inteiro. Em três meses saímos do escuro para uma máquina de receita." },
          { id: newId(), name: "Rafael Menezes", company: "SaaSPro", result: "3.2x em MQLs", text: "Estrutura, criativos e mensuração no mesmo lugar. A previsibilidade mudou nosso planejamento anual." },
        ],
        cardInstallment: 4900,
        cardCount: 12,
        pixValue: 48000,
        pixDiscount: 12,
        fullPriceText: "R$ 92.400",
        closingMessage: "Essa proposta foi desenhada sob medida para a sua operação. O próximo passo é um só: confirmar de acordo abaixo e agendar o kickoff da Sprint.",
      }),
  },
  {
    key: "consultoria",
    label: "Consultoria",
    iconKey: "Target",
    description: "Diagnóstico, estratégia e execução guiada.",
    build: (o) =>
      base({
        offer: "Consultoria Estratégica 6 meses",
        coverHeadline: "O caminho para um plano de crescimento executável em 6 meses, sem consultoria que só entrega PDF.",
        coverSubtitle: "Diagnóstico profundo, decisões prioritárias e acompanhamento semanal do time de liderança.",
        diagnosisText: "Hoje a empresa tem visão, mas falta clareza sobre onde alocar tempo e capital nos próximos trimestres. Esse cenário custa em média R$ 30.000 por mês em iniciativas paralelas que não movem o ponteiro. Em 12 meses, isso representa R$ 360.000 em execução dispersa.",
        monthlyPainCost: 30000,
        methodName: "Blueprint 6M",
        methodIntro: "A maioria das consultorias entrega um deck e some. O Blueprint 6M é diferente: entramos junto no ritmo do C-level, com decisões tomadas dentro das reuniões, não depois delas.",
        methodSteps: [
          { id: newId(), title: "Diagnóstico 360º" },
          { id: newId(), title: "Prioridades e OKRs" },
          { id: newId(), title: "Execução assistida" },
        ],
        milestones: [
          { id: newId(), title: "Mês 1 · Diagnóstico e roadmap" },
          { id: newId(), title: "Mês 2 · OKRs implantados" },
          { id: newId(), title: "Mês 4 · Revisão de meio de ciclo" },
          { id: newId(), title: "Mês 6 · Plano para o próximo ano" },
        ],
        deliverables: [
          { id: newId(), title: "Diagnóstico com C-level e times", desc: "Entrevistas, análise financeira e de operações.", value: 15000 },
          { id: newId(), title: "Roadmap estratégico priorizado", desc: "Iniciativas com esforço, impacto e sequência.", value: 12000 },
          { id: newId(), title: "Cerimônia semanal de execução", desc: "1h por semana com a liderança, por 6 meses.", value: 24000 },
          { id: newId(), title: "Framework de OKRs implantado", desc: "Cascata de metas por área com revisão mensal.", value: 8000 },
          { id: newId(), title: "Bônus · Acesso à comunidade de founders", desc: "Encontros mensais com outros líderes.", value: 3600, bonus: true },
        ],
        bioText: "Consultor com 12 anos ajudando empresas de R$ 5M a R$ 200M a estruturar crescimento sustentável.",
        bioCredentials: "MBA Insper · +40 empresas atendidas · Autor do livro Crescer com Foco",
        metricsLine: "Clientes crescem em média 62% em receita nos 12 meses seguintes ao Blueprint.",
        testimonials: [
          { id: newId(), name: "Camila Ferreira", company: "Vertex Retail", result: "+58% receita em 12m", text: "Pela primeira vez tivemos um plano que a diretoria seguiu sem se perder no operacional." },
        ],
        cardInstallment: 3500,
        cardCount: 12,
        pixValue: 36000,
        pixDiscount: 10,
        fullPriceText: "R$ 62.600",
        closingMessage: "Essa proposta foi desenhada sob medida para a sua realidade. O próximo passo é um só: confirmar de acordo abaixo e agendar a semana de imersão.",
      }),
  },
  {
    key: "juridico",
    label: "Serviços Jurídicos",
    iconKey: "Scale",
    description: "Contratos, compliance e assessoria continuada.",
    build: (o) =>
      base({
        offer: "Assessoria Jurídica Empresarial",
        coverHeadline: "O caminho para um jurídico ativo que protege receita em 60 dias, sem contratos genéricos.",
        coverSubtitle: "Revisão contratual, política de compliance e atendimento consultivo dedicado ao seu time.",
        diagnosisText: "Hoje o jurídico é acionado só quando o problema já explodiu, gerando disputas caras e contratos que não protegem a empresa. Esse cenário custa em média R$ 25.000 por mês em riscos não mitigados. Em 12 meses, isso representa R$ 300.000 em exposição desnecessária.",
        monthlyPainCost: 25000,
        methodName: "Escudo Legal",
        methodIntro: "A maioria dos escritórios cobra por hora e trata a empresa como caso avulso. O Escudo Legal é diferente: antecipamos riscos, padronizamos contratos e ficamos ao lado do time no dia a dia.",
        methodSteps: [
          { id: newId(), title: "Auditoria contratual" },
          { id: newId(), title: "Padronização e políticas" },
          { id: newId(), title: "Consultivo contínuo" },
        ],
        milestones: [
          { id: newId(), title: "Semana 2 · Auditoria entregue" },
          { id: newId(), title: "Semana 4 · Modelos padronizados" },
          { id: newId(), title: "Semana 8 · Compliance implantado" },
        ],
        deliverables: [
          { id: newId(), title: "Auditoria completa de contratos", desc: "Análise de riscos, cláusulas críticas e brechas.", value: 8000 },
          { id: newId(), title: "Biblioteca de contratos padrão", desc: "Modelos para vendas, fornecedores e trabalhistas.", value: 12000 },
          { id: newId(), title: "Atendimento consultivo ilimitado", desc: "Time jurídico dedicado dentro do horário comercial.", value: 18000 },
          { id: newId(), title: "Programa de compliance e LGPD", desc: "Políticas, treinamentos e adequação regulatória.", value: 15000 },
          { id: newId(), title: "Bônus · Análise mensal de riscos", desc: "Relatório executivo com alertas e recomendações.", value: 4800, bonus: true },
        ],
        bioText: "Escritório boutique com foco em empresas de crescimento acelerado. 15 anos evitando processos e destravando negócios.",
        bioCredentials: "OAB/SP · Especialistas em M&A, LGPD e Direito Empresarial",
        metricsLine: "Reduzimos em média 71% o volume de disputas contratuais dos clientes no primeiro ano.",
        testimonials: [
          { id: newId(), name: "Pedro Alcântara", company: "Núcleo Tech", result: "0 disputas em 12m", text: "Passamos a fechar contratos em dias, não semanas, e sem risco escondido." },
        ],
        cardInstallment: 2500,
        cardCount: 12,
        pixValue: 26000,
        pixDiscount: 10,
        fullPriceText: "R$ 44.800",
        closingMessage: "Essa proposta foi desenhada sob medida para a sua operação. O próximo passo é um só: confirmar de acordo abaixo para iniciarmos a auditoria.",
      }),
  },
  {
    key: "saude",
    label: "Saúde e Clínicas",
    iconKey: "Stethoscope",
    description: "Gestão, agendamento e captação para clínicas.",
    build: (o) =>
      base({
        offer: "Escala para Clínicas 90 dias",
        coverHeadline: "O caminho para uma agenda cheia com pacientes ideais em 90 dias, sem descontos que corroem margem.",
        coverSubtitle: "Marketing local, jornada do paciente e operação de agendamento redesenhados juntos.",
        diagnosisText: "Hoje a clínica atrai pacientes desorganizados, com no-show alto e ticket médio abaixo do potencial. Esse cenário custa em média R$ 35.000 por mês em cadeiras vazias. Em 12 meses, isso representa R$ 420.000 de receita perdida.",
        monthlyPainCost: 35000,
        methodName: "Consultório Cheio",
        methodIntro: "A maioria das agências trata clínica como e-commerce e falha porque paciente não decide por preço. O Consultório Cheio é diferente: atacamos autoridade, jornada e recall no mesmo tempo.",
        methodSteps: [
          { id: newId(), title: "Posicionamento e autoridade" },
          { id: newId(), title: "Captação local qualificada" },
          { id: newId(), title: "Retenção e recall" },
        ],
        milestones: [
          { id: newId(), title: "Semana 3 · Novo posicionamento no ar" },
          { id: newId(), title: "Semana 6 · Campanhas locais ativas" },
          { id: newId(), title: "Semana 12 · Recall automatizado" },
        ],
        deliverables: [
          { id: newId(), title: "Rebranding da comunicação", desc: "Identidade, tom de voz e materiais de captação.", value: 7500 },
          { id: newId(), title: "Campanhas de mídia local", desc: "Meta, Google e parcerias geolocalizadas.", value: 9000 },
          { id: newId(), title: "Redesenho da jornada do paciente", desc: "Do primeiro clique ao pós-consulta.", value: 6500 },
          { id: newId(), title: "Automação de agendamento e recall", desc: "WhatsApp e e-mail com lembretes inteligentes.", value: 5500 },
          { id: newId(), title: "Bônus · Treinamento da recepção", desc: "Script de atendimento que aumenta conversão.", value: 2900, bonus: true },
        ],
        bioText: "Especialistas em crescimento de clínicas de estética, odontologia e saúde integrativa há 6 anos.",
        bioCredentials: "+90 clínicas atendidas · Parceiros oficiais Doctoralia",
        metricsLine: "Aumento médio de 47% em consultas realizadas nos primeiros 90 dias.",
        testimonials: [
          { id: newId(), name: "Dra. Marina Rocha", company: "Clínica Vitalis", result: "+52% consultas em 90d", text: "Saímos do improviso. A agenda agora é planejada com meses de antecedência." },
        ],
        cardInstallment: 1997,
        cardCount: 12,
        pixValue: 19800,
        pixDiscount: 10,
        fullPriceText: "R$ 34.900",
        closingMessage: "Essa proposta foi desenhada sob medida para a sua clínica. O próximo passo é um só: confirmar de acordo abaixo para iniciarmos o rebranding.",
      }),
  },
  {
    key: "tech",
    label: "Tecnologia / Software",
    iconKey: "Code2",
    description: "Desenvolvimento de produto, MVP e squads.",
    build: (o) =>
      base({
        theme: "dark-indigo",
        fontPair: "tech",
        accent: "#7075f0",
        offer: "Squad Dedicada · MVP em 12 semanas",
        coverHeadline: "O caminho para lançar seu MVP validado em 12 semanas, sem escopo travar antes do primeiro release.",
        coverSubtitle: "Squad completa (produto, design e engenharia) trabalhando ao lado do fundador, semana a semana.",
        diagnosisText: "Hoje a ideia está madura, mas ciclos longos de contratação e freelancers desalinhados atrasam o go-to-market. Esse cenário custa em média R$ 60.000 por mês em oportunidade de mercado. Em 12 meses, isso representa R$ 720.000 de janela desperdiçada.",
        monthlyPainCost: 60000,
        methodName: "Ship Fast Squad",
        methodIntro: "A maioria das softhouses entrega escopo fechado que nasce velho. O Ship Fast Squad é diferente: entregas semanais, decisões em conjunto e código com qualidade de produto de longo prazo.",
        methodSteps: [
          { id: newId(), title: "Discovery em 2 semanas" },
          { id: newId(), title: "Sprints de 1 semana com entrega" },
          { id: newId(), title: "Release público em 12 semanas" },
        ],
        milestones: [
          { id: newId(), title: "Semana 2 · Escopo priorizado" },
          { id: newId(), title: "Semana 6 · Beta fechado" },
          { id: newId(), title: "Semana 12 · Lançamento público" },
        ],
        deliverables: [
          { id: newId(), title: "Discovery de produto", desc: "Entrevistas, protótipos e escopo priorizado.", value: 18000 },
          { id: newId(), title: "Squad completa dedicada", desc: "PM, designer, 2 devs full-stack e QA.", value: 96000 },
          { id: newId(), title: "Infra e DevOps prontos para escala", desc: "CI/CD, observabilidade e segurança básica.", value: 12000 },
          { id: newId(), title: "Design system enxuto", desc: "Componentes e tokens reutilizáveis desde o dia 1.", value: 9000 },
          { id: newId(), title: "Bônus · Handover técnico completo", desc: "Documentação e onboarding do time interno.", value: 6000, bonus: true },
        ],
        bioText: "Estúdio de produto liderado por engenheiros que já saíram do zero em 30+ startups.",
        bioCredentials: "Ex-Nubank · Ex-Loft · +30 MVPs entregues no prazo",
        metricsLine: "94% dos MVPs entregues chegam ao mercado dentro da janela combinada de 12 semanas.",
        testimonials: [
          { id: newId(), name: "Luiz Andrade", company: "Fluxo Health", result: "MVP em 11 semanas", text: "Time senior, ritual bem definido e código que aguentou o crescimento pós-seed." },
        ],
        cardInstallment: 14900,
        cardCount: 12,
        pixValue: 148000,
        pixDiscount: 8,
        fullPriceText: "R$ 260.000",
        closingMessage: "Essa proposta foi desenhada sob medida para o seu produto. O próximo passo é um só: confirmar de acordo abaixo e agendar o kickoff da squad.",
      }),
  },
  {
    key: "infoproduto",
    label: "Infoproduto / Curso",
    iconKey: "Rocket",
    description: "Lançamento, comunidade e recorrência.",
    build: (o) =>
      base({
        theme: "light-editorial",
        fontPair: "editorial",
        accent: "#a37918",
        offer: "Lançamento Perpétuo · 90 dias",
        coverHeadline: "O caminho para transformar sua expertise em receita recorrente em 90 dias, sem depender de lançamentos esgotantes.",
        coverSubtitle: "Estrutura completa de oferta, funil evergreen e comunidade que retém alunos além do primeiro mês.",
        diagnosisText: "Hoje o infoproduto depende de lançamentos pontuais que consomem energia e caem drasticamente entre um e outro. Esse cenário custa em média R$ 20.000 por mês em receita não capturada. Em 12 meses, isso representa R$ 240.000 que ficam na mesa.",
        monthlyPainCost: 20000,
        methodName: "Perpétuo com Alma",
        methodIntro: "A maioria dos lançamentos perpétuos falha porque é frio e mecânico. O Perpétuo com Alma é diferente: mantém a intensidade do lançamento, mas com previsibilidade de assinatura.",
        methodSteps: [
          { id: newId(), title: "Oferta central redesenhada" },
          { id: newId(), title: "Funil evergreen com prova social" },
          { id: newId(), title: "Comunidade e retenção" },
        ],
        milestones: [
          { id: newId(), title: "Semana 3 · Oferta e página no ar" },
          { id: newId(), title: "Semana 6 · Funil evergreen ativo" },
          { id: newId(), title: "Semana 12 · Retenção acima de 80%" },
        ],
        deliverables: [
          { id: newId(), title: "Reposicionamento de oferta", desc: "Nome, promessa, mecanismo único e preço.", value: 6500 },
          { id: newId(), title: "Funil evergreen completo", desc: "VSL, páginas, e-mails e testes contínuos.", value: 12000 },
          { id: newId(), title: "Estrutura de comunidade", desc: "Espaço, rituais e programa de rede interna.", value: 7500 },
          { id: newId(), title: "Playbook de retenção", desc: "Onboarding, marcos e reativação automatizada.", value: 5500 },
          { id: newId(), title: "Bônus · Consultoria de conteúdo orgânico", desc: "Estratégia mensal de posts e vídeos.", value: 3600, bonus: true },
        ],
        bioText: "Trabalhamos com criadores brasileiros que faturam de R$ 500k a R$ 20M por ano em infoprodutos.",
        bioCredentials: "+70 criadores atendidos · Parceiros Hotmart e Kiwify",
        metricsLine: "Média de 3.1x em receita mensal recorrente nos primeiros 6 meses de operação evergreen.",
        testimonials: [
          { id: newId(), name: "Isabela Prado", company: "Escola Nova Ótica", result: "3.4x MRR em 6m", text: "Saí do stress dos lançamentos e agora acordo com vendas todo dia. É outra vida." },
        ],
        cardInstallment: 2497,
        cardCount: 12,
        pixValue: 24900,
        pixDiscount: 12,
        fullPriceText: "R$ 42.500",
        closingMessage: "Essa proposta foi desenhada sob medida para o seu produto e comunidade. O próximo passo é um só: confirmar de acordo abaixo para iniciarmos o reposicionamento.",
      }),
  },
];

export function fromTemplate(key: TemplateKey, overrides: Partial<Proposal> = {}): Proposal {
  const tpl = TEMPLATES.find((t) => t.key === key) || TEMPLATES[1];
  return { ...tpl.build(), ...overrides, id: newId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
}
