
import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Gift,
  Users,
  ArrowRight,
  MessageSquareQuote,
  BrainCircuit,
  Stethoscope,
  Briefcase,
  Gavel,
  Linkedin,
  Award,
  Navigation,
  Loader2,
  MessageCircle,
  BellRing,
  Sparkles
} from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import louisiImage from './assets/Louisi.png';
import advogadoImage from './assets/Advogado.png';
import valeriaImage from './assets/Dra Valéria.png';
import guilhermeImage from './assets/Guilherme engenheiro.png';
import heroBg from './assets/hero-bg.png';


const expectancyComments = [
  {
    name: "Carlos Alberto",
    role: "Diretor de RH",
    comment: "Minha maior preocupação hoje é como documentar corretamente os riscos psicossociais e investir na saúde mental da minha equipe. Esse evento parece ser a resposta que buscamos."
  },
  {
    name: "Juliana Mendes",
    role: "Engenheira de Segurança",
    comment: "O foco na prática é o que falta no mercado. Precisamos saber como a fiscalização interpreta a norma no dia a dia, não apenas a teoria."
  },
  {
    name: "Roberto Silva",
    role: "Proprietário de Indústria",
    comment: "O valor da multa por inadequação assusta qualquer empresário. Investir 1h30 em conhecimento preventivo é o melhor seguro que posso ter hoje."
  }
];

const CountdownWidget = ({ targetDate, compact = false, darkBackground = false }: { targetDate: string, compact?: boolean, darkBackground?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className={`flex flex-col items-center justify-center 
      ${compact ? 'px-1.5 py-1 min-w-[40px] md:min-w-[48px]' : 'px-3 py-2 min-w-[70px]'} 
      ${darkBackground ? 'bg-indigo-600' : 'bg-slate-900'} 
      rounded-lg border border-white/10 shadow-sm transition-all`}>
      <span className={`${compact ? 'text-sm md:text-base' : 'text-2xl md:text-3xl'} font-black text-white leading-none`}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className={`${compact ? 'text-[7px] md:text-[8px]' : 'text-[10px]'} uppercase tracking-wider font-bold text-white/70 mt-0.5`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className={`flex items-center justify-center space-x-1 md:space-x-1.5 ${!compact ? 'my-8' : ''}`}>
      <TimeUnit value={timeLeft.days} label="Dias" />
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

const NR1LandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    quantidade_funcionarios: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    // Capture UTM parameters
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || ''
    }));

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'https://webhook.med4growautomacao.com.br/webhook/bb949295-1846-4464-b189-e22b59f3c4d6';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          origem: 'Landing Page NR1 na Prática',
          data_inscricao: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Erro ao enviar dados');
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      alert('Houve um problema ao processar sua inscrição. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('registration-section');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakers = [
    {
      name: "Louisiane Aurora",
      role: "Psicóloga Organizacional CRP 04/59645",
      bio: "Psicóloga Organizacional certificada pelo MEC como Implementadora de Saúde Mental Corporativa (NR1). Especialista em Gestão de Pessoas e atendimento clínico focado em Estresse e Burnout. Experiência prática em estruturação de RH e adequação de empresas à nova NR1.",
      image: louisiImage,
      icon: <BrainCircuit className="text-white" size={24} />,
      accent: "bg-indigo-600",
      linkedin: "https://www.linkedin.com/in/louisiane-aurora-0a6514b6/"
    },
    {
      name: "Dra. Valeria Lima Salles",
      role: "Médica do Trabalho CRM:46403",
      bio: "Especialista pela ANAMT/ AMB em Medicina Ocupacional e Gestão de Saúde. Atua na linha de frente da prevenção de doenças laborais e na interface entre o eSocial e a saúde do trabalhador, garantindo conformidade técnica e médica às empresas. Proprietária da Clínica de Saúde Ocupacional WeCare.",
      image: valeriaImage,
      icon: <Stethoscope className="text-white" size={24} />,
      accent: "bg-blue-600",
      linkedin: "https://www.linkedin.com/in/valeria-lima-salles-a63a3b14a/"
    },
    {
      name: "Guilherme (...)",
      role: "Engenheiro de Segurança",
      bio: "Especialista em Engenharia de Segurança do Trabalho e Auditor de Sistemas de Gestão. Expertise profunda em elaboração de PGR e implantação da nova NR1 em indústrias de alto risco, focando em redução de custos operacionais e acidentes.",
      image: guilhermeImage,
      icon: <Briefcase className="text-white" size={24} />,
      accent: "bg-slate-700",
      linkedin: "#"
    },
    {
      name: "Dr. (...)",
      role: "Advogado Trabalhista",
      bio: "Especializado em Direito do Trabalho com foco em defesa empresarial e compliance. Atua em ações trabalhistas de alta complexidade, ajudando empresas a blindarem seu patrimônio contra passivos decorrentes de não-conformidade normativa.",
      image: advogadoImage,
      icon: <Gavel className="text-white" size={24} />,
      accent: "bg-amber-600",
      linkedin: "#"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-xl w-full bg-white rounded-[48px] shadow-2xl p-8 md:p-14 text-center border border-white/20 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-emerald-500/40 transform -rotate-6 animate-bounce">
                <CheckCircle size={52} />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 border-4 border-white shadow-lg">
                <Sparkles size={20} fill="currentColor" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">
            SUA VAGA ESTÁ <br />
            <span className="text-indigo-600">PRÉ-RESERVADA!</span>
          </h2>

          <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
            <p className="text-slate-700 text-lg font-bold leading-relaxed mb-4">
              Para garantir sua vaga oficial e receber os detalhes do local, você precisa entrar no <span className="text-indigo-600">Grupo VIP de Inscritos</span>.
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-slate-600 font-medium text-sm">
                <BellRing className="text-amber-500 mr-3 shrink-0" size={18} />
                <span>Grupo Silencioso (apenas avisos críticos)</span>
              </div>
              <div className="flex items-center text-slate-600 font-medium text-sm">
                <MessageCircle className="text-emerald-500 mr-3 shrink-0" size={18} />
                <span>Plantão de Dúvidas aberto 1 dia antes</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <a
              href="https://chat.whatsapp.com/I4HMunAeKgf4L2erac7Zgc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-2xl rounded-3xl transition-all shadow-2xl shadow-green-500/40 flex flex-col items-center justify-center group transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center">
                <MessageCircle className="mr-3" size={32} />
                <span>QUERO GARANTIR MINHA VAGA</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] mt-1 opacity-80">Clique para entrar no WhatsApp</span>
            </a>

            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              ⚠️ Aviso: Se você não entrar no grupo, sua vaga poderá ser liberada para a lista de espera em 24h.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 gap-6">
            <div className="text-left">
              <div className="flex items-center text-indigo-600 mb-1">
                <Calendar size={14} className="mr-1.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">QUANDO</span>
              </div>
              <p className="text-slate-800 font-black text-lg">28 Jan</p>
            </div>
            <div className="text-left">
              <div className="flex items-center text-indigo-600 mb-1">
                <MapPin size={14} className="mr-1.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">ONDE</span>
              </div>
              <p className="text-slate-800 font-black text-lg">KF Safety</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-sans text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 grid grid-cols-3 items-center">
          <div className={`font-extrabold text-xl md:text-2xl tracking-tighter transition-colors ${scrolled ? 'text-indigo-700' : 'text-white'}`}>
            NR1<span className="font-light">naPrática</span>
          </div>
          <div className="flex justify-center">
            <CountdownWidget targetDate="2026-01-28T19:30:00" compact={true} darkBackground={!scrolled} />
          </div>
          <div className="flex justify-end">
            <button
              onClick={scrollToForm}
              className={`px-4 md:px-6 py-2 rounded-full font-bold text-[10px] md:text-sm uppercase transition-all shadow-sm ${scrolled ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-900'}`}
            >
              Garantir Vaga
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-32 pb-20 md:pt-48 md:pb-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Segurança do trabalho e conformidade"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/75 to-slate-900/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-400">
              Evento Presencial e Gratuito
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Como evitar <span className="text-indigo-400">multas,</span> ações trabalhistas e ainda cuidar da saúde mental de seus colaboradores
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
              Entenda na prática a principal atualização da NR1: a obrigatoriedade de gerenciar riscos psicossociais no ambiente de trabalho.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                <Calendar className="text-indigo-400" />
                <span className="font-bold">28/01</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                <MapPin className="text-indigo-400" />
                <span className="font-bold">KF Fire Safety</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                <Clock className="text-indigo-400" />
                <span className="font-bold">19:00 (1h30)</span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-indigo-500/40 inline-flex items-center"
            >
              GARANTIR VAGA GRATUITA
              <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Content Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000"
            alt="Riscos Psicossociais e Saúde Mental"
            className="w-full h-full object-cover opacity-[0.07]"
          />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
                  alt="Pessoas em reunião"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl">
                  <div className="flex items-center text-indigo-700 font-black mb-3 text-lg">
                    <BrainCircuit className="mr-3" size={28} />
                    Gestão Humana e NR1
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    A nova NR1 traz o foco para os <strong>Riscos Psicossociais</strong>. Descubra como gerenciar a saúde mental sem burocracia excessiva.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="text-indigo-600 font-black uppercase tracking-widest text-sm">O QUE VOCÊ VAI APRENDER NA PRÁTICA</span>
                <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-900">
                  Proteja seu <span className="text-indigo-600">Negócio</span> e sua <span className="text-indigo-600">Equipe</span>
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                Não é apenas sobre evitar multas ou passivos trabalhistas, é sobre construir uma cultura de segurança física e psicológica onde a produtividade e o bem-estar andam juntos.
              </p>
              <div className="grid grid-cols-1 gap-y-5">
                {[
                  "Impactos reais da NR1 no seu negócio em 2026",
                  "O que a fiscalização realmente cobra (sem surpresas)",
                  "Riscos psicossociais explicados sem juridiquês",
                  "Metodologias de avaliação e programas de intervenção",
                  "Responsabilidades: quem assina e quem responde?",
                  "Como fortalecer sua marca empregadora e atrair melhores candidatos se adequando à NR1?"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start bg-white/80 p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md">
                    <CheckCircle className="text-emerald-500 mr-4 mt-1 flex-shrink-0" size={26} />
                    <span className="text-slate-800 font-bold text-lg leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bonus Card */}
              <div className="bg-indigo-900 text-white p-10 rounded-[40px] relative overflow-hidden mt-10 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                  alt="Pessoa meditando no escritório"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700"
                />
                <div className="relative z-10">
                  <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[12px] font-black uppercase tracking-wider mb-5">
                    <Gift size={16} className="mr-2" />
                    Bônus Exclusivo
                  </div>
                  <h3 className="text-3xl font-black mb-3 leading-tight">Manejo da Ansiedade</h3>
                  <p className="text-indigo-100 text-lg font-medium">
                    Treinamento prático que vai direto ao ponto: técnicas para equilibrar a saúde mental da sua equipe e aumentar a retenção de talentos com a psicóloga Louisiane Aurora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expectancy Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Expectativa de quem já garantiu vaga</h2>
            <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expectancyComments.map((comment, index) => (
              <div key={index} className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100 transition-all hover:-translate-y-2 relative group">
                <div className="absolute top-6 right-8 text-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MessageSquareQuote size={64} />
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed relative z-10 text-lg font-medium">"{comment.comment}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black mr-4 text-xl">
                    {comment.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{comment.name}</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{comment.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Speakers */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center space-x-2 bg-indigo-100 px-6 py-2.5 rounded-full text-indigo-800 text-sm font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <Award size={20} />
              <span>Conhecimento que transforma</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Especialistas que estarão com você</h2>
            <div className="h-2 w-32 bg-indigo-600 mx-auto rounded-full mt-8"></div>
          </div>

          <div className="space-y-12 md:space-y-0">
            {speakers.map((s, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-10 md:gap-24 py-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className={`absolute inset-0 ${s.accent} rounded-[50px] transform rotate-3 scale-105 opacity-10 group-hover:rotate-0 transition-transform duration-500`}></div>
                  <div className="relative rounded-[50px] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[1/1.2] border-[12px] border-white">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 flex space-x-3">
                      <div className={`${s.accent} p-4 rounded-2xl shadow-2xl border-2 border-white/20`}>
                        {s.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-8">
                  <div className="space-y-3">
                    <span className={`text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-lg inline-block ${s.accent} bg-opacity-10 ${s.accent.replace('bg-', 'text-')}`}>
                      {s.role}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                      {s.name}
                    </h3>
                  </div>
                  <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
                  <p className="text-slate-600 text-xl leading-relaxed font-medium">
                    {s.bio}
                  </p>
                  <div className="pt-4 flex items-center space-x-6">
                    <a
                      href={s.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold group"
                    >
                      <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
                      <span className="text-base">LinkedIn Profissional</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration-section" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row bg-white rounded-[40px] shadow-2xl overflow-hidden">
            <div className="lg:w-1/2 relative bg-indigo-700 text-white p-12 flex flex-col justify-center">
              <img
                src="https://images.unsplash.com/photo-1581092921461-7d65507b73c3?auto=format&fit=crop&q=80&w=1200"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">Faça sua inscrição e tenha Clareza e Segurança para sua empresa</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 text-white"><Users size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Vagas Limitadas</h4>
                      <p className="text-indigo-100 text-sm font-medium">Reserva por ordem de inscrição para garantir o networking presencial.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 text-white"><ShieldCheck size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Sem Juridiquês</h4>
                      <p className="text-indigo-100 text-sm font-medium">Explicação clara do que você realmente precisa fazer amanhã.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 text-white"><MessageSquareQuote size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Tira Dúvidas</h4>
                      <p className="text-indigo-100 text-sm font-medium">Especialistas habilitados para tirarem todas as suas dúvidas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-12">
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-black text-slate-900 mb-2">Inscrição Gratuita</h3>
                <div className="flex justify-center items-center text-emerald-600 font-bold bg-emerald-50 py-2 px-4 rounded-full inline-flex mx-auto">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse mr-2"></div>
                  12 Vagas Restantes
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    required
                    disabled={isLoading}
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Nome e Sobrenome"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">E-mail de Trabalho</label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@trabalho.com"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    name="telefone"
                    required
                    disabled={isLoading}
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Quantidade de Funcionários</label>
                  <select
                    name="quantidade_funcionarios"
                    required
                    disabled={isLoading}
                    value={formData.quantidade_funcionarios}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium disabled:opacity-50 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="0-4">0-4 funcionários</option>
                    <option value="5-19">5-19 funcionários</option>
                    <option value="20-99">20-99 funcionários</option>
                    <option value="100-199">100-199 funcionários</option>
                    <option value="200+">200+ funcionários</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl transition-all shadow-xl shadow-emerald-500/30 active:scale-[0.98] mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={24} />
                      PROCESSANDO...
                    </>
                  ) : (
                    'GARANTIR MINHA VAGA'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            <div className="lg:w-1/3 flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 text-indigo-600 font-black uppercase tracking-widest text-sm mb-4">
                <Navigation size={18} />
                <span>Como Chegar</span>
              </div>
              <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Onde será o evento?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-indigo-600 mr-4 mt-1" size={28} />
                  <div>
                    <h4 className="font-black text-slate-900 text-lg">KF Fire Safety</h4>
                    <p className="text-slate-600 font-medium">Av. Geraldo Martins Costa, 3300</p>
                    <p className="text-slate-500 text-sm">Bortolan Sul, Poços de Caldas - MG</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="text-indigo-600 mr-4 mt-1" size={28} />
                  <div>
                    <h4 className="font-black text-slate-900 text-lg">Data e Horário</h4>
                    <p className="text-slate-600 font-medium">28 de Janeiro, às 19:30</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  O evento ocorrerá em nossa sede administrativa em Poços de Caldas. Local de fácil acesso e com estacionamento no local para participantes.
                </p>
              </div>
            </div>

            <div className="lg:w-2/3 h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-[10px] border-slate-100 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.812328406159!2d-46.6433583!3d-21.802119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9735d487299f1%3A0x8673322d64a09a56!2sAv.%20Geraldo%20Martins%20Costa%2C%203300%20-%20Bortolan%2C%20Po%C3%A7os%20de%20Caldas%20-%20MG%2C%2037706-306!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização KF Fire Safety Poços de Caldas"
                className="grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute top-6 right-6">
                <a
                  href="https://www.google.com/maps/dir//Av.+Geraldo+Martins+Costa,+3300+-+Bortolan+Sul,+Po%C3%A7os+de+Caldas+-+MG,+37706-306/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-black text-sm shadow-xl flex items-center space-x-2 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-105"
                >
                  <MapPin size={18} />
                  <span>TRAÇAR ROTA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="font-black text-3xl text-white mb-8 tracking-tighter">
            NR1<span className="font-light">naPrática</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Sobre o Evento</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">KF Fire Safety</a>
          </div>
          <p className="text-xs opacity-50 text-slate-600">© 2024 KF Fire Safety - Poços de Caldas, MG.</p>
        </div>
      </footer>

      {/* Floating Action Button for Mobile */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-4 z-40">
        <button
          onClick={scrollToForm}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl flex items-center justify-center text-lg"
        >
          GARANTIR MINHA VAGA <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
            <h1 className="text-4xl font-black mb-4">Aurora PSC</h1>
            <p className="text-xl text-slate-400">Em breve: Página Principal da Aurora PSC.</p>
            <a href="/nr1napratica" className="mt-8 px-6 py-3 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition-all">
              Ver NR1 na Prática
            </a>
          </div>
        } />
        <Route path="/nr1napratica" element={<NR1LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

