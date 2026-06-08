import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ClientForm from './pages/ClientForm';
import AdminDashboard from './pages/AdminDashboard';

function Navigation() {
  const location = useLocation();
  const isForm = location.pathname === '/';
  
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#334155] bg-[#1E293B]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#F26522] rounded-lg flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(242,101,34,0.3)] text-white">4C</div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">FOURCRED <span className="text-[#F26522] font-light">Digital Hub</span></h1>
          <p className="text-[10px] text-[#F26522]/80 uppercase tracking-[0.2em] font-bold">Financiamento Imobiliário</p>
        </div>
      </div>
      <nav className="flex gap-6 text-sm font-medium">
        <Link to="/" className={isForm ? "text-[#F26522]" : "text-slate-400 hover:text-slate-200 transition-colors"}>
          Formulários
        </Link>
        <Link to="/admin" className={!isForm ? "text-[#F26522]" : "text-slate-400 hover:text-slate-200 transition-colors"}>
          Dashboard
        </Link>
      </nav>
      <div className="flex items-center gap-4 hidden sm:flex">
        <div className="text-right">
          <p className="text-xs font-semibold text-white">LA Soluções</p>
          <p className="text-[10px] text-[#F26522]/80 font-bold">Admin Gestor</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F26522] to-[#B33E0B]"></div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="px-8 py-3 bg-[#020617] border-t border-[#334155] flex justify-between items-center mt-auto">
      <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">© 2024 Fourcred Financeira — Gestão de Ativos</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] text-emerald-500/80 font-mono hidden sm:inline">Sincronizado com LocalStorage</span>
        </div>
        <span className="text-[10px] text-white/20 hidden sm:inline">MVP v1.0.4 - App Router Ready</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans flex flex-col">
        <Navigation />
        <main className="flex-1 w-full bg-[#0F172A]">
          <Routes>
            <Route path="/" element={<ClientForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

