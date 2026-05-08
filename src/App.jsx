import React, { useState, useMemo } from 'react';
import {
  Search, Layout, Mail, Globe, X, ArrowRight,
  Stethoscope, ChevronUp, CheckCircle2, Languages
} from 'lucide-react';

const COMPANY_NAME = "MEDICLOUD SAC";
const CONTACT_EMAIL = "team@medicloud.pe";
const YEAR = "2026";

const LANGS = ['es', 'en', 'zh'];
const LANG_LABELS = { es: 'ES', en: 'EN', zh: '中文' };

const ui = {
  search:        { es: "Buscar solución digital...", en: "Search digital solution...", zh: "搜索数字解决方案..." },
  heroBadge:     { es: `Ecosistema Digital ${YEAR}`, en: `Digital Ecosystem ${YEAR}`, zh: `${YEAR} 数字生态系统` },
  heroTitleA:    { es: "Software que impulsa la", en: "Software that powers", zh: "驱动" },
  heroTitleB:    { es: "Salud Corporativa", en: "Corporate Health", zh: "企业健康的软件" },
  heroDesc:      {
    es: `En ${COMPANY_NAME}, diseñamos ecosistemas digitales robustos que transforman la gestión de salud ocupacional y procesos operativos en activos estratégicos para su empresa.`,
    en: `At ${COMPANY_NAME}, we design robust digital ecosystems that transform occupational health management and operational processes into strategic assets for your company.`,
    zh: `在 ${COMPANY_NAME},我们设计强大的数字生态系统,将职业健康管理和运营流程转化为贵公司的战略资产。`
  },
  contactNow:    { es: "Contactar ahora", en: "Contact us now", zh: "立即联系" },
  available:     { es: "soluciones disponibles", en: "solutions available", zh: "个可用解决方案" },
  filterBy:      { es: "Filtrar por:", en: "Filter by:", zh: "筛选:" },
  all:           { es: "Todas", en: "All", zh: "全部" },
  details:       { es: "Detalles de Solución", en: "View Details", zh: "查看详情" },
  noResults:     { es: "Sin resultados", en: "No results", zh: "无结果" },
  tryOther:      { es: "Pruebe con otros filtros o términos de búsqueda.", en: "Try other filters or search terms.", zh: "请尝试其他筛选条件或搜索词。" },
  description:   { es: "Descripción", en: "Description", zh: "描述" },
  modules:       { es: "Módulos del Sistema", en: "System Modules", zh: "系统模块" },
  industries:    { es: "Industrias / Áreas Aplicables", en: "Industries / Applicable Areas", zh: "适用行业 / 领域" },
  requestDemo:   { es: "Solicitar Presentación", en: "Request Demo", zh: "申请演示" },
  contactIT:     { es: "Contactar TI", en: "Contact IT", zh: "联系IT部门" },
  footerLead:    {
    es: "Líderes en el desarrollo de software a medida para el sector corporativo y de salud en el Perú.",
    en: "Leaders in custom software development for the corporate and health sector in Peru.",
    zh: "秘鲁企业及医疗行业定制软件开发的领导者。"
  },
  needCustom:    { es: "¿Requiere una solución personalizada?", en: "Need a custom solution?", zh: "需要定制解决方案?" },
  contactToday:  {
    es: "Contáctenos hoy para una consultoría técnica sobre cómo optimizar sus procesos de salud y gestión.",
    en: "Contact us today for technical consulting on how to optimize your health and management processes.",
    zh: "今天联系我们,获取关于如何优化您的健康和管理流程的技术咨询。"
  },
  rights:        { es: "Todos los derechos reservados.", en: "All rights reserved.", zh: "版权所有。" },
  backToTop:     { es: "Volver arriba", en: "Back to top", zh: "返回顶部" },
  tagline:       { es: "Technology & Health Solutions", en: "Technology & Health Solutions", zh: "技术与健康解决方案" }
};

const CATEGORY_COLORS = {
  "Salud Ocupacional": "bg-blue-50 text-blue-700 border-blue-100",
  "Salud":            "bg-teal-50 text-teal-700 border-teal-100",
  "Logística":        "bg-green-50 text-green-700 border-green-100",
  "RRHH":             "bg-orange-50 text-orange-700 border-orange-100",
  "Finanzas":         "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Educación":        "bg-pink-50 text-pink-700 border-pink-100",
  "Gestión Operativa":"bg-cyan-50 text-cyan-700 border-cyan-100",
  "Compliance":       "bg-purple-50 text-purple-700 border-purple-100",
};

const categoryNames = {
  "Salud Ocupacional": { es: "Salud Ocupacional", en: "Occupational Health", zh: "职业健康" },
  "Salud":             { es: "Salud", en: "Health", zh: "健康" },
  "Logística":         { es: "Logística", en: "Logistics", zh: "物流" },
  "RRHH":              { es: "RRHH", en: "HR", zh: "人力资源" },
  "Finanzas":          { es: "Finanzas", en: "Finance", zh: "金融" },
  "Educación":         { es: "Educación", en: "Education", zh: "教育" },
  "Gestión Operativa": { es: "Gestión Operativa", en: "Operations", zh: "运营管理" },
  "Compliance":        { es: "Compliance", en: "Compliance", zh: "合规" },
};

const apps = [
  {
    id: 1,
    title: { es: "App SSOMA Maestra", en: "SSOMA Master App", zh: "SSOMA 主应用" },
    summary: {
      es: "Plataforma integral SSOMA con módulos de EMOs, KPIs, documentación y capacitaciones.",
      en: "Comprehensive SSOMA platform with modules for medical exams, KPIs, documentation and training.",
      zh: "综合 SSOMA 平台,包含职业体检、KPI、文档和培训模块。"
    },
    description: {
      es: "Sistema central de gestión de Seguridad, Salud Ocupacional y Medio Ambiente. Unifica el control de Exámenes Médicos Ocupacionales, indicadores clave de desempeño, documentación normativa y seguimiento de participación en capacitaciones, todo en un solo dashboard inteligente y escalable.",
      en: "Central management system for Safety, Occupational Health and Environment. Unifies the control of Occupational Medical Examinations, key performance indicators, regulatory documentation and tracking of participation in training, all in a single intelligent and scalable dashboard.",
      zh: "安全、职业健康与环境管理的中央系统。在一个智能可扩展的仪表板中,统一管理职业体检、关键绩效指标、法规文件和培训参与跟踪。"
    },
    category: "Salud Ocupacional",
    modules: [
      { es: "Gestión de EMOs (Exámenes Médicos Ocupacionales)", en: "Medical Exam Management (EMOs)", zh: "职业体检管理" },
      { es: "Gestión de KPIs e indicadores", en: "KPI and indicator management", zh: "KPI 与指标管理" },
      { es: "Gestión documentaria", en: "Document management", zh: "文档管理" },
      { es: "Gestión de participación en capacitaciones", en: "Training participation tracking", zh: "培训参与管理" }
    ],
    industries: [
      { es: "Construcción", en: "Construction", zh: "建筑" },
      { es: "Hidroeléctrico", en: "Hydroelectric", zh: "水电" },
      { es: "Eléctrico", en: "Electrical", zh: "电力" },
      { es: "Industrial", en: "Industrial", zh: "工业" },
      { es: "Retail", en: "Retail", zh: "零售" },
      { es: "Servicios", en: "Services", zh: "服务业" }
    ],
    image: "https://i.postimg.cc/jqzbgp9n/Captura-de-pantalla-2026-05-08-a-la(s)-9-33-24-a-m.png",
  },
  {
    id: 2,
    title: { es: "Portal de Gestión de Proveedores", en: "Supplier Management Portal", zh: "供应商管理门户" },
    summary: {
      es: "Centraliza y automatiza el ciclo de cumplimiento de proveedores con trazabilidad total.",
      en: "Centralizes and automates the supplier compliance cycle with full traceability.",
      zh: "集中并自动化供应商合规周期,实现全程可追溯。"
    },
    description: {
      es: "Portal integral que automatiza el ciclo completo de cumplimiento de proveedores. Los administradores crean servicios y auditan documentos con flujos de aprobación o rechazo vía email; los proveedores cargan facturas y evidencias de forma segura; y el área de finanzas ejecuta pagos con todos los registros y archivos organizados en Google Sheets y Drive para una trazabilidad total.",
      en: "Comprehensive portal that automates the entire supplier compliance cycle. Administrators create services and audit documents with email-based approval or rejection workflows; suppliers securely upload invoices and evidence; and the finance team executes payments with all records and files organized in Google Sheets and Drive for full traceability.",
      zh: "全面门户,自动化整个供应商合规周期。管理员创建服务并通过邮件审批/拒绝工作流审核文件;供应商安全上传发票和证据;财务部门执行付款,所有记录和文件均整理在 Google Sheets 和 Drive 中,实现完整可追溯性。"
    },
    category: "Compliance",
    modules: [
      { es: "Supplier Portal — carga de facturas y evidencias", en: "Supplier Portal — invoice and evidence upload", zh: "供应商门户 — 发票和证据上传" },
      { es: "Admin Dashboard — gestión y auditoría de servicios", en: "Admin Dashboard — service management and auditing", zh: "管理面板 — 服务管理与审核" },
      { es: "Finance View — ejecución y control de pagos", en: "Finance View — payment execution and control", zh: "财务视图 — 付款执行与控制" },
      { es: "Integración nativa con Google Sheets y Drive", en: "Native integration with Google Sheets and Drive", zh: "与 Google Sheets 和 Drive 原生集成" }
    ],
    industries: [
      { es: "Compras", en: "Procurement", zh: "采购" },
      { es: "Mantenimiento", en: "Maintenance", zh: "维护" },
      { es: "Coordinación con proveedores", en: "Supplier Coordination", zh: "供应商协调" },
      { es: "Finanzas", en: "Finance", zh: "财务" },
      { es: "Proveedores externos", en: "External Suppliers", zh: "外部供应商" }
    ],
    image: "https://i.postimg.cc/DwBJ1mLc/Whats-App-Image-2026-05-08-at-10-04-55.jpg",
  },
  {
    id: 3,
    title: { es: "Portal de Requerimientos Internos", en: "Internal Requirements Portal", zh: "内部需求门户" },
    summary: {
      es: "Sistema interno que centraliza y automatiza el flujo de compras y requerimientos.",
      en: "Internal system that centralizes and automates the procurement and requirements flow.",
      zh: "集中并自动化采购与需求流程的内部系统。"
    },
    description: {
      es: "Plataforma de gestión de requerimientos diseñada para centralizar y automatizar el flujo interno de compras. Permite a los colaboradores generar solicitudes, adjuntar cotizaciones y documentos, establecer fechas límite y monitorear el estado de cada ticket en tiempo real, reemplazando por completo el uso de correos electrónicos.",
      en: "Requirements management platform designed to centralize and automate the internal procurement flow. It allows employees to generate requests, attach quotes and documents, set deadlines and monitor the status of each ticket in real time, completely replacing email-based workflows.",
      zh: "需求管理平台,旨在集中并自动化内部采购流程。允许员工生成申请、附加报价单和文件、设置截止日期并实时监控每个工单的状态,完全替代电子邮件流程。"
    },
    category: "Gestión Operativa",
    modules: [
      { es: "Generación y seguimiento de tickets", en: "Ticket generation and tracking", zh: "工单生成与跟踪" },
      { es: "Adjunto de cotizaciones y documentos", en: "Attachment of quotes and documents", zh: "报价单与文件附件" },
      { es: "Gestión de fechas límite", en: "Deadline management", zh: "截止日期管理" },
      { es: "Monitoreo de estado en tiempo real", en: "Real-time status monitoring", zh: "实时状态监控" },
      { es: "Reemplazo total del flujo por correo", en: "Full replacement of email-based flow", zh: "完全替代邮件流程" }
    ],
    industries: [
      { es: "Compras", en: "Procurement", zh: "采购" },
      { es: "Áreas internas con requerimientos", en: "Internal areas with requirements", zh: "有需求的内部部门" },
      { es: "Supervisores", en: "Supervisors", zh: "主管" },
      { es: "Logística", en: "Logistics", zh: "物流" }
    ],
    image: "https://i.postimg.cc/VkL9xxFL/Whats-App-Image-2026-05-08-at-10-16-10-(1).jpg",
  },
  {
    id: 4,
    title: { es: "Caracterización de Riesgos Laborales", en: "Occupational Risk Characterization", zh: "职业风险特征评估" },
    summary: {
      es: "Evaluación integral de riesgos, herramientas y monitoreo ambiental por puesto de trabajo.",
      en: "Comprehensive risk assessment, tool inventory and environmental monitoring per workstation.",
      zh: "按工作岗位进行的综合风险评估、工具清单和环境监测。"
    },
    description: {
      es: "Sistema especializado en la caracterización y evaluación de riesgos laborales por puesto de trabajo. Permite identificar peligros, evaluar herramientas e instrumentos, gestionar el monitoreo ambiental ocupacional y mantener una matriz IPERC dinámica para el cumplimiento normativo en SST.",
      en: "Specialized system for the characterization and assessment of occupational risks per workstation. Identifies hazards, evaluates tools and instruments, manages occupational environmental monitoring and maintains a dynamic IPERC matrix for OSH regulatory compliance.",
      zh: "按岗位进行职业风险特征评估的专业系统。识别危险、评估工具和仪器、管理职业环境监测,并维护动态 IPERC 矩阵以满足职业安全健康法规要求。"
    },
    category: "Salud Ocupacional",
    modules: [
      { es: "Evaluación de riesgos por puesto de trabajo", en: "Risk assessment by workstation", zh: "按岗位进行风险评估" },
      { es: "Inventario de herramientas e instrumentos", en: "Tools and instruments inventory", zh: "工具与仪器清单" },
      { es: "Monitoreo ambiental ocupacional", en: "Occupational environmental monitoring", zh: "职业环境监测" },
      { es: "Matriz IPERC dinámica", en: "Dynamic IPERC matrix", zh: "动态 IPERC 矩阵" }
    ],
    industries: [
      { es: "Salud Ocupacional", en: "Occupational Health", zh: "职业健康" }
    ],
    image: "https://i.postimg.cc/sDghnpct/Captura-de-pantalla-2026-05-08-a-la(s)-11-12-25-a-m.png",
  },
  {
    id: 5,
    title: { es: "Presupuesto de Exámenes Médicos", en: "Medical Exams Budget", zh: "体检预算" },
    summary: {
      es: "Proyecciones de costos de exámenes médicos ocupacionales por perfil y tipo.",
      en: "Cost projections for occupational medical examinations by profile and type.",
      zh: "按档案和类型预测职业体检成本。"
    },
    description: {
      es: "Sistema diseñado para comparar y proyectar costos de exámenes médicos ocupacionales según perfiles, tipos de evaluación y proveedores médicos. Facilita la planificación financiera anual del programa SST y la negociación con clínicas y centros médicos ocupacionales.",
      en: "System designed to compare and project costs of occupational medical examinations by profiles, evaluation types and medical providers. Facilitates annual financial planning for the OSH program and negotiations with clinics and occupational medical centers.",
      zh: "用于按档案、评估类型和医疗供应商比较和预测职业体检成本的系统。便于职业安全健康计划的年度财务规划及与诊所和职业医疗中心的谈判。"
    },
    category: "Salud Ocupacional",
    industries: [
      { es: "Salud Ocupacional", en: "Occupational Health", zh: "职业健康" }
    ],
    image: "https://i.postimg.cc/rsrFbwdX/Captura-de-pantalla-2026-05-08-a-la(s)-11-25-11-a-m.png",
  },
  {
    id: 6,
    title: { es: "Capacitación Normativa SSO", en: "OSH Regulatory Training", zh: "职业安全健康法规培训" },
    summary: {
      es: "LMS especializado en seguridad y salud en el trabajo.",
      en: "LMS specialized in occupational safety and health.",
      zh: "专注于职业安全与健康的学习管理系统。"
    },
    description: {
      es: "Plataforma de e-learning para cumplimiento legal. Seguimiento de asistencia, evaluaciones automatizadas y emisión de certificados digitales.",
      en: "E-learning platform for legal compliance. Attendance tracking, automated assessments and digital certificate issuance.",
      zh: "用于法规合规的在线学习平台。出勤跟踪、自动化评估和数字证书颁发。"
    },
    category: "Educación",
    industries: [
      { es: "Construcción", en: "Construction", zh: "建筑" },
      { es: "Minería", en: "Mining", zh: "矿业" },
      { es: "Industria", en: "Industry", zh: "工业" },
      { es: "Servicios", en: "Services", zh: "服务业" }
    ],
    image: "https://i.postimg.cc/HkY189Qh/Captura-de-pantalla-2026-05-08-a-la(s)-11-46-03-a-m.png",
  },
  {
    id: 7,
    title: { es: "Sistema de Citas Médicas Pro", en: "Medical Appointments Pro", zh: "医疗预约专业版" },
    summary: {
      es: "Agenda inteligente con recordatorios automáticos multicanal.",
      en: "Smart scheduling with automated multi-channel reminders.",
      zh: "智能排程,支持多渠道自动提醒。"
    },
    description: {
      es: "Optimiza la ocupación de consultorios mediante un sistema de reserva online y confirmaciones vía WhatsApp y correo electrónico.",
      en: "Optimizes office occupancy through an online booking system with WhatsApp and email confirmations.",
      zh: "通过在线预约系统及 WhatsApp 和电子邮件确认,优化诊室使用率。"
    },
    category: "Salud",
    industries: [
      { es: "Clínicas", en: "Clinics", zh: "诊所" },
      { es: "Consultorios", en: "Medical Offices", zh: "诊室" },
      { es: "Centros ocupacionales", en: "Occupational Centers", zh: "职业中心" }
    ],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    title: { es: "Monitoreo de Flota de Transportes", en: "Fleet Monitoring", zh: "车队监控" },
    summary: {
      es: "Registro, inspección y monitoreo de vehículos disponibles.",
      en: "Registration, inspection and monitoring of available vehicles.",
      zh: "可用车辆的登记、检查和监控。"
    },
    description: {
      es: "Sistema de monitoreo de flota que permite registrar vehículos, ejecutar inspecciones técnicas periódicas y monitorear en tiempo real el estado y disponibilidad de cada unidad de transporte.",
      en: "Fleet monitoring system that allows vehicle registration, periodic technical inspections, and real-time monitoring of the status and availability of each transport unit.",
      zh: "车队监控系统,可登记车辆、执行定期技术检查,并实时监控每辆运输车辆的状态和可用性。"
    },
    category: "Gestión Operativa",
    industries: [
      { es: "Construcción", en: "Construction", zh: "建筑" },
      { es: "Hidroeléctrico", en: "Hydroelectric", zh: "水电" },
      { es: "Industria", en: "Industry", zh: "工业" },
      { es: "Retail", en: "Retail", zh: "零售" }
    ],
    image: "https://i.postimg.cc/Y2v6k5T0/Captura-de-pantalla-2026-05-08-a-la(s)-11-53-17-a-m.png",
  }
];

const App = () => {
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedApp, setSelectedApp]     = useState(null);
  const [showTop, setShowTop]             = useState(false);
  const [lang, setLang]                   = useState('es');

  const tx = (obj) => (obj && typeof obj === 'object' && !Array.isArray(obj))
    ? (obj[lang] ?? obj.es ?? '')
    : (obj ?? '');

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = selectedApp ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedApp]);

  const categories = ['Todas', ...new Set(apps.map(a => a.category))];

  const filteredApps = useMemo(() => apps.filter(app => {
    const q = searchTerm.toLowerCase();
    const titleStr   = (app.title?.[lang] ?? app.title?.es ?? '').toLowerCase();
    const summaryStr = (app.summary?.[lang] ?? app.summary?.es ?? '').toLowerCase();
    return (
      (titleStr.includes(q) || summaryStr.includes(q)) &&
      (selectedCategory === 'Todas' || app.category === selectedCategory)
    );
  }), [searchTerm, selectedCategory, lang]);

  const catLabel = (catKey) => {
    if (catKey === 'Todas') return tx(ui.all);
    return tx(categoryNames[catKey]) || catKey;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2 rounded-xl">
              <Stethoscope className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{COMPANY_NAME}</h1>
              <p className="text-[10px] text-blue-600 uppercase tracking-[0.2em] font-bold">{tx(ui.tagline)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 md:max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder={tx(ui.search)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 flex-shrink-0">
              <Languages className="w-4 h-4 text-slate-400 ml-1.5 hidden sm:block" />
              {LANGS.map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    lang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-blue-600'
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-16 relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1 bg-blue-500/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-400/30">
              {tx(ui.heroBadge)}
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {tx(ui.heroTitleA)} <span className="text-blue-400">{tx(ui.heroTitleB)}</span>
            </h2>
            <p className="text-lg text-blue-100/80 mb-8 leading-relaxed">{tx(ui.heroDesc)}</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 select-none">
                {tx(ui.contactNow)} <Mail className="w-5 h-5" />
              </div>
              <div className="border border-white/30 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 select-none">
                {apps.length} {tx(ui.available)}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <Layout className="w-full h-full -rotate-12 translate-x-12 translate-y-12" />
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">{tx(ui.filterBy)}</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm'
              }`}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>

        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map(app => (
              <div
                key={app.id}
                className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col cursor-pointer shadow-sm"
                onClick={() => setSelectedApp(app)}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={app.image} alt={tx(app.title)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-lg shadow-md border ${CATEGORY_COLORS[app.category] ?? 'bg-white text-blue-700 border-blue-100'}`}>
                      {tx(categoryNames[app.category])}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{tx(app.title)}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{tx(app.summary)}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.industries.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-md">{tx(t)}</span>
                    ))}
                    {app.industries.length > 3 && (
                      <span className="text-[10px] font-bold text-slate-400 px-1 py-1">+{app.industries.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                    <span className="text-blue-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      {tx(ui.details)} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-300">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 border border-slate-100">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{tx(ui.noResults)}</h3>
            <p className="text-slate-500">{tx(ui.tryOther)}</p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white mt-20 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="bg-blue-600 p-2 rounded-xl"><Stethoscope className="text-white w-8 h-8" /></div>
              <h3 className="text-3xl font-black tracking-tight">{COMPANY_NAME}</h3>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 mx-auto md:mx-0">{tx(ui.footerLead)}</p>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="p-4 bg-slate-800 rounded-2xl"><Mail className="w-6 h-6 text-slate-300" /></div>
              <div className="p-4 bg-slate-800 rounded-2xl"><Globe className="w-6 h-6 text-slate-300" /></div>
            </div>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700/50">
            <h4 className="text-xl font-bold mb-4">{tx(ui.needCustom)}</h4>
            <p className="text-slate-400 mb-6 text-sm">{tx(ui.contactToday)}</p>
            <div className="w-full text-center bg-blue-600 text-white font-bold py-4 rounded-2xl select-all">{CONTACT_EMAIL}</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© {YEAR} {COMPANY_NAME}. {tx(ui.rights)}</p>
        </div>
      </footer>

      {selectedApp && (
        <>
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md" style={{ animation: 'fadeIn 0.2s ease' }} onClick={() => setSelectedApp(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <div className="bg-white rounded-[2.5rem] w-full max-w-6xl max-h-[92vh] overflow-hidden relative shadow-2xl flex flex-col pointer-events-auto" style={{ animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <button className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full transition-all shadow-lg" onClick={() => setSelectedApp(null)}>
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-7/12 bg-slate-100 flex items-center justify-center p-4 lg:p-6 max-h-[60vh] lg:max-h-[92vh]">
                  <img src={selectedApp.image} alt={tx(selectedApp.title)} className="w-full h-full object-contain rounded-2xl shadow-md" />
                </div>
                <div className="w-full lg:w-5/12 p-8 lg:p-10 overflow-y-auto bg-white">
                  <div className="mb-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${CATEGORY_COLORS[selectedApp.category] ?? 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                      {tx(categoryNames[selectedApp.category])}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-5 leading-tight">{tx(selectedApp.title)}</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{tx(ui.description)}</h4>
                      <p className="text-slate-600 leading-relaxed text-base">{tx(selectedApp.description)}</p>
                    </div>
                    {selectedApp.modules && (
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{tx(ui.modules)}</h4>
                        <ul className="space-y-2">
                          {selectedApp.modules.map((m, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{tx(m)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{tx(ui.industries)}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApp.industries.map((t, i) => (
                          <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">{tx(t)}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                      <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 select-none">{tx(ui.requestDemo)}</div>
                      <div className="px-6 py-3 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 text-slate-600 select-none">{tx(ui.contactIT)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-40 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1" aria-label={tx(ui.backToTop)}>
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.92) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;