import React, { useState, useMemo } from 'react';
import {
  Search,
  Layout,
  Mail,
  Globe,
  X,
  ArrowRight,
  Stethoscope,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

const COMPANY_NAME = "MEDICLOUD SAC";
const CONTACT_EMAIL = "team@medicloud.pe";
const YEAR = "2026";

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

const apps = [
  {
    id: 1,
    title: "App SSOMA Maestra",
    summary: "Plataforma integral SSOMA con módulos de EMOs, KPIs, documentación y capacitaciones.",
    description: "Sistema central de gestión de Seguridad, Salud Ocupacional y Medio Ambiente. Unifica el control de Exámenes Médicos Ocupacionales, indicadores clave de desempeño, documentación normativa y seguimiento de participación en capacitaciones, todo en un solo dashboard inteligente y escalable.",
    category: "Salud Ocupacional",
    modules: [
      "Gestión de EMOs (Exámenes Médicos Ocupacionales)",
      "Gestión de KPIs e indicadores",
      "Gestión documentaria",
      "Gestión de participación en capacitaciones"
    ],
    industries: ["Construcción", "Hidroeléctrico", "Eléctrico", "Industrial", "Retail", "Servicios"],
    image: "https://i.postimg.cc/jqzbgp9n/Captura-de-pantalla-2026-05-08-a-la%28s%29-9-33-24-a-m.png",
  },
 {
  id: 2,
  title: "Portal de Gestión de Proveedores",
  summary: "Centraliza y automatiza el ciclo de cumplimiento de proveedores con trazabilidad total.",
  description: "Portal integral que automatiza el ciclo completo de cumplimiento de proveedores. Los administradores crean servicios y auditan documentos con flujos de aprobación o rechazo vía email; los proveedores cargan facturas y evidencias de forma segura; y el área de finanzas ejecuta pagos con todos los registros y archivos organizados en Google Sheets y Drive para una trazabilidad total.",
  category: "Compliance",
  modules: [
    "Supplier Portal — carga de facturas y evidencias",
    "Admin Dashboard — gestión y auditoría de servicios",
    "Finance View — ejecución y control de pagos",
    "Integración nativa con Google Sheets y Drive"
  ],
  industries: ["Compras", "Mantenimiento", "Coordinación con proveedores", "Finanzas", "Proveedores externos"],
  image: "https://i.postimg.cc/DwBJ1mLc/Whats-App-Image-2026-05-08-at-10-04-55.jpg",
},
  {
    id: 3,
    title: "Inventario Médico Inteligente",
    summary: "Gestión de insumos críticos con alertas de reabastecimiento por IA.",
    description: "Control de stock para clínicas y hospitales que predice la demanda de insumos médicos, reduciendo el desperdicio y asegurando disponibilidad.",
    category: "Logística",
    industries: ["Clínicas", "Hospitales", "Centros médicos ocupacionales"],
    image: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Portal del Colaborador",
    summary: "Autogestión de RRHH, boletas de pago y certificados de salud.",
    description: "Digitalizamos la relación laboral. Los empleados pueden acceder a sus documentos, solicitar vacaciones y ver sus resultados de exámenes médicos de forma segura.",
    category: "RRHH",
    industries: ["Corporativo", "Industria", "Servicios", "Retail"],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "BI & Analytics Financiero",
    summary: "Visualización avanzada de rentabilidad y salud financiera corporativa.",
    description: "Dashboard centralizado para la toma de decisiones gerenciales, conectando datos de ventas, costos operativos y proyecciones de inversión.",
    category: "Finanzas",
    industries: ["Corporativo", "Holding", "PyMEs"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Capacitación Normativa SSO",
    summary: "LMS especializado en seguridad y salud en el trabajo.",
    description: "Plataforma de e-learning para cumplimiento legal. Seguimiento de asistencia, evaluaciones automatizadas y emisión de certificados digitales.",
    category: "Educación",
    industries: ["Construcción", "Minería", "Industria", "Servicios"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    title: "Sistema de Citas Médicas Pro",
    summary: "Agenda inteligente con recordatorios automáticos multicanal.",
    description: "Optimiza la ocupación de consultorios mediante un sistema de reserva online y confirmaciones vía WhatsApp y correo electrónico.",
    category: "Salud",
    industries: ["Clínicas", "Consultorios", "Centros ocupacionales"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    title: "Auditoría de Cumplimiento",
    summary: "Gestor de inspecciones y hallazgos en campo para seguridad.",
    description: "App móvil para auditores que permite reportar incidentes, adjuntar fotos y generar planes de acción inmediatos para cumplimiento de normas ISO.",
    category: "Gestión Operativa",
    industries: ["Construcción", "Hidroeléctrico", "Industria", "Retail"],
    image: "https://images.unsplash.com/photo-1454165833767-027eeef1593e?auto=format&fit=crop&q=80&w=800",
  }
];

const App = () => {
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedApp, setSelectedApp]     = useState(null);
  const [showTop, setShowTop]             = useState(false);

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
    return (
      (app.title.toLowerCase().includes(q) || app.summary.toLowerCase().includes(q)) &&
      (selectedCategory === 'Todas' || app.category === selectedCategory)
    );
  }), [searchTerm, selectedCategory]);

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
              <p className="text-[10px] text-blue-600 uppercase tracking-[0.2em] font-bold">Technology & Health Solutions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 md:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar solución digital..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <span className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-400 whitespace-nowrap">
              {filteredApps.length} soluciones
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-16 relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1 bg-blue-500/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-400/30">
              Ecosistema Digital {YEAR}
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Software que impulsa la <span className="text-blue-400">Salud Corporativa</span>
            </h2>
            <p className="text-lg text-blue-100/80 mb-8 leading-relaxed">
              En {COMPANY_NAME}, diseñamos ecosistemas digitales robustos que transforman la gestión de salud ocupacional y procesos operativos en activos estratégicos para su empresa.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 select-none">
                Contactar ahora <Mail className="w-5 h-5" />
              </div>
              <div className="border border-white/30 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 select-none">
                {apps.length} soluciones disponibles
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <Layout className="w-full h-full -rotate-12 translate-x-12 translate-y-12" />
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Filtrar por:</span>
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
              {cat}
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
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-lg shadow-md border ${CATEGORY_COLORS[app.category] ?? 'bg-white text-blue-700 border-blue-100'}`}>
                      {app.category}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{app.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{app.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.industries.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-md">{t}</span>
                    ))}
                    {app.industries.length > 3 && (
                      <span className="text-[10px] font-bold text-slate-400 px-1 py-1">+{app.industries.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                    <span className="text-blue-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Detalles de Solución <ArrowRight className="w-4 h-4" />
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
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Sin resultados</h3>
            <p className="text-slate-500">Pruebe con otros filtros o términos de búsqueda.</p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white mt-20 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Stethoscope className="text-white w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black tracking-tight">{COMPANY_NAME}</h3>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 mx-auto md:mx-0">
              Líderes en el desarrollo de software a medida para el sector corporativo y de salud en el Perú.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="p-4 bg-slate-800 rounded-2xl"><Mail className="w-6 h-6 text-slate-300" /></div>
              <div className="p-4 bg-slate-800 rounded-2xl"><Globe className="w-6 h-6 text-slate-300" /></div>
            </div>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700/50">
            <h4 className="text-xl font-bold mb-4">¿Requiere una solución personalizada?</h4>
            <p className="text-slate-400 mb-6 text-sm">Contáctenos hoy para una consultoría técnica sobre cómo optimizar sus procesos de salud y gestión.</p>
            <div className="w-full text-center bg-blue-600 text-white font-bold py-4 rounded-2xl select-all">{CONTACT_EMAIL}</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© {YEAR} {COMPANY_NAME}. Todos los derechos reservados.</p>
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
                  <img src={selectedApp.image} alt={selectedApp.title} className="w-full h-full object-contain rounded-2xl shadow-md" />
                </div>
                <div className="w-full lg:w-5/12 p-8 lg:p-10 overflow-y-auto bg-white">
                  <div className="mb-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${CATEGORY_COLORS[selectedApp.category] ?? 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                      {selectedApp.category}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-5 leading-tight">{selectedApp.title}</h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Descripción</h4>
                      <p className="text-slate-600 leading-relaxed text-base">{selectedApp.description}</p>
                    </div>
                    {selectedApp.modules && (
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Módulos del Sistema</h4>
                        <ul className="space-y-2">
                          {selectedApp.modules.map(m => (
                            <li key={m} className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Industrias / Áreas Aplicables</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApp.industries.map(t => (
                          <span key={t} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                      <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 select-none">Solicitar Presentación</div>
                      <div className="px-6 py-3 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 text-slate-600 select-none">Contactar TI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-40 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1" aria-label="Volver arriba">
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
