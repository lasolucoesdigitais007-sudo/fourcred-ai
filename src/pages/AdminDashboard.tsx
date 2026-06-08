import React, { useEffect, useState } from 'react';
import { FormData } from '../types';
import { generatePDF } from '../lib/pdf';
import { Layers, RotateCw, Users, BadgeDollarSign, Activity, TrendingUp, Search, Download, FileText, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('fourcred_submissions') || '[]');
    // Sort descending by date
    data.sort((a: FormData, b: FormData) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    setSubmissions(data);
  }, []);

  const handleDownload = (data: FormData) => {
    generatePDF(data);
  };

  const clearData = () => {
    if (window.confirm('Tem certeza que deseja apagar todos os cadastros?')) {
      localStorage.removeItem('fourcred_submissions');
      setSubmissions([]);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter !== 'Todos') {
       // Mocking the filter logic as we don't have "status" property in the form yet.
       // We'll just show them all in this MVP.
    }
    if (searchTerm) {
      return (
        sub.p1.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.p1.cpf.includes(searchTerm) ||
        sub.id.includes(searchTerm)
      );
    }
    return true;
  });

  const totalVolume = submissions.reduce((acc, sub) => acc + Number(sub.financingValue || 0), 0);
  const avgTicket = submissions.length > 0 ? (totalVolume / submissions.length) : 0;
  
  const sacCount = submissions.filter(s => s.amortizationSystem === 'sac').length;
  const priceCount = submissions.filter(s => s.amortizationSystem === 'price').length;
  const indexAmortization = sacCount >= priceCount ? 'SAC' : 'PRICE';

  return (
    <div className="pb-12 px-4 sm:px-6 lg:px-8 bg-[#0F172A] min-h-full flex-1">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#1E293B] to-[#0F172A] p-8 rounded-2xl shadow-xl border border-[#334155]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#F26522] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(242,101,34,0.3)]">Mesa de Crédito — Área de Gestão</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Estúdio Fourcred de Operações</h1>
            <p className="text-sm text-slate-400 mt-2">Controle de inscrições digitais e conversão em ficha física regulatória.</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 md:mt-0 flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-white hover:bg-white/10 rounded-lg border border-[#334155] transition-colors bg-[#020617]"
          >
            <RotateCw className="w-4 h-4" />
            Atualizar Inscrições
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#F26522]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] text-white/50 uppercase tracking-widest font-bold">Inscrições Totais</span>
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/50 border border-[#334155]">
                  <Users className="w-5 h-5" />
               </div>
            </div>
            <div>
               <h2 className="text-4xl font-bold text-white">{submissions.length}</h2>
               <p className="text-[11px] text-[#F26522] font-medium mt-2">{submissions.length > 0 ? '1 aguardando revisão' : 'Sem movimento'}</p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#F26522]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] text-white/50 uppercase tracking-widest font-bold">Volume Total Financiado</span>
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <BadgeDollarSign className="w-5 h-5" />
               </div>
            </div>
            <div>
               <h2 className="text-4xl font-bold text-white tracking-tight">
                  <span className="text-xl align-top mr-1 font-medium text-white/40">R$</span>
                  {totalVolume.toLocaleString('pt-BR')}
               </h2>
               <p className="text-[11px] text-emerald-500 font-medium mt-2">Propostas ativas na carteira</p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#F26522]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] text-white/50 uppercase tracking-widest font-bold">Média por Contrato</span>
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#005C97] shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <TrendingUp className="w-5 h-5" />
               </div>
            </div>
            <div>
               <h2 className="text-4xl font-bold text-white tracking-tight">
                  <span className="text-xl align-top mr-1 font-medium text-white/40">R$</span>
                  {Math.round(avgTicket).toLocaleString('pt-BR')}
               </h2>
               <p className="text-[11px] text-white/40 font-medium mt-2">Ticket médio da praça</p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#F26522]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] text-white/50 uppercase tracking-widest font-bold">Índice Amortização</span>
               <div className="w-10 h-10 bg-orange-100/10 rounded-xl flex items-center justify-center text-[#F26522]">
                  <Layers className="w-5 h-5" />
               </div>
            </div>
            <div>
               <h2 className="text-4xl font-bold text-white">{indexAmortization}</h2>
               <p className="text-[11px] text-white/40 font-medium mt-2">{sacCount} SAC vs {priceCount} Price</p>
            </div>
          </div>

        </div>

        {/* Data Table Section */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-xl flex flex-col">
          
          <div className="p-6 border-b border-[#334155] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0F172A]">
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Pesquisar por cliente, CPF..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#020617] border border-[#334155] rounded-lg py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#F26522] placeholder:text-white/30"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {['Todos', 'Pendente', 'Em Análise', 'Aprovado', 'Recusado'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-colors ${filter === f ? 'bg-[#F26522] text-white' : 'bg-[#1E293B] text-slate-300 border border-[#334155] hover:bg-white/10'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="p-16 text-center text-white/40 text-sm flex flex-col items-center">
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                Nenhuma ficha cadastral encontrada.
              </div>
            ) : (
              <table className="w-full text-left text-sm text-white">
                <thead>
                  <tr className="text-[10px] text-white/40 uppercase tracking-widest font-bold border-b border-[#334155] bg-[#020617]">
                    <th className="px-6 py-4 whitespace-nowrap">ID / Envio</th>
                    <th className="px-6 py-4 whitespace-nowrap">Titular Principal</th>
                    <th className="px-6 py-4 whitespace-nowrap">Coonjuge (P2)?</th>
                    <th className="px-6 py-4 whitespace-nowrap">Imóvel Valor</th>
                    <th className="px-6 py-4 whitespace-nowrap">Financiado</th>
                    <th className="px-6 py-4 whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 whitespace-nowrap text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#334155]">
                  {filteredSubmissions.map((sub, idx) => (
                    <tr key={sub.id} className="hover:bg-white/5 cursor-pointer bg-transparent transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="font-bold text-white text-xs">#{sub.id}</div>
                        <div className="text-[10px] opacity-40 mt-1">
                          {new Date(sub.submittedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="font-bold text-white">{sub.p1.fullName}</div>
                        <div className="text-xs text-white/40 font-mono mt-1">{sub.p1.cpf}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-[#0F172A]">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${sub.hasP2 ? 'bg-white' : 'bg-[#1E293B] text-white/50 border border-[#334155]'}`}>
                          {sub.hasP2 ? 'Sim (Cônjuge)' : 'Não'}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap font-bold text-white">
                        R$ {Number(sub.saleValue).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="font-bold text-[#F26522]">R$ {Number(sub.financingValue).toLocaleString('pt-BR')}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{sub.termYears} anos • {sub.amortizationSystem}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                         <div className="flex items-center gap-2 bg-[#020617] border border-[#334155] px-3 py-1.5 rounded-lg w-max">
                            <span className="w-2 h-2 rounded-full bg-[#F26522]"></span>
                            <span className="text-xs font-bold text-slate-300">Em Análise</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                           <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#F26522] text-[#F26522] hover:bg-[#F26522] hover:text-white rounded-md text-[10px] uppercase font-bold tracking-wider transition-colors">
                              Detalhes
                           </button>
                           <button
                             onClick={(e) => { e.stopPropagation(); handleDownload(sub); }}
                             className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F26522] text-white rounded-md text-[10px] uppercase font-bold tracking-wider hover:bg-[#F47920] transition-colors shadow-lg shadow-[#F26522]/20"
                           >
                             <Download className="w-3 h-3" />
                             PDF
                           </button>
                           <button
                             onClick={(e) => { e.stopPropagation(); clearData() }}
                             className="w-8 h-8 flex items-center justify-center border border-[#334155] hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 rounded-md text-white/40 transition-colors"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
