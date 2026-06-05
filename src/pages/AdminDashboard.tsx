import React, { useEffect, useState } from 'react';
import { FormData } from '../types';
import { generatePDF } from '../lib/pdf';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<FormData[]>([]);

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

  const totalVolume = submissions.reduce((acc, sub) => acc + Number(sub.financingValue || 0), 0);
  const avgTicket = submissions.length > 0 ? (totalVolume / submissions.length) : 0;

  return (
    <div className="p-6 bg-[#12100E] min-h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center bg-[#1A1613] p-6 rounded-2xl shadow-sm border border-[#3D342E]">
          <div>
            <h1 className="text-2xl font-light text-white tracking-tight">Painel do <span className="text-amber-500 font-bold">Gestor</span></h1>
            <p className="text-sm text-amber-100/40 uppercase tracking-widest mt-1">Visão geral e fichas cadastrais</p>
          </div>
          <button 
            onClick={clearData}
            className="px-4 py-2 text-[10px] uppercase tracking-wider font-bold text-red-400 hover:bg-red-500/10 rounded-lg border border-red-500/30 transition-colors"
          >
            Limpar Base
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Stats Box 1 */}
          <div className="col-span-1 md:col-span-4 bg-[#1A1613] border border-[#3D342E] rounded-2xl p-5 flex flex-col justify-between min-h-[140px]">
            <span className="text-xs text-amber-500/70 uppercase tracking-widest font-semibold">Total de Fichas</span>
            <div className="flex items-end justify-between mt-auto">
              <h2 className="text-5xl font-light text-white">{submissions.length}</h2>
              <div className="text-emerald-500 text-xs mb-1 font-mono">Cadastros Recebidos</div>
            </div>
            <div className="h-1 w-full bg-[#2A2420] rounded-full overflow-hidden mt-4">
              <div className="h-full bg-amber-600" style={{ width: submissions.length > 0 ? '100%' : '0%' }}></div>
            </div>
          </div>

          {/* Stats Box 2 */}
          <div className="col-span-1 md:col-span-8 bg-[#1A1613] border border-[#3D342E] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-amber-500/70 uppercase tracking-widest font-semibold">Volume Financiado Solicitado</span>
            <div className="flex items-end justify-between mt-auto">
              <h2 className="text-4xl font-light text-white italic truncate">
                <span className="text-xl align-top mr-1">R$</span>
                {totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <p className="text-[10px] text-amber-100/40 mt-4 uppercase tracking-widest">Ticket médio: R$ {avgTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>

          {/* Table */}
          <div className="col-span-1 md:col-span-12 bg-[#1A1613] border border-[#3D342E] rounded-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[#3D342E] flex justify-between items-center bg-[#211C18]">
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Recentes Recebidos</h3>
            </div>
            <div className="flex-1 overflow-x-auto">
              {submissions.length === 0 ? (
                <div className="p-12 text-center text-amber-100/40 text-sm">
                  Nenhuma ficha cadastral recebida ainda.
                </div>
              ) : (
                <table className="w-full text-left text-xs text-white">
                  <thead>
                    <tr className="text-amber-500/50 uppercase tracking-tighter border-b border-[#3D342E]">
                      <th className="px-5 py-3 font-normal whitespace-nowrap">Data</th>
                      <th className="px-5 py-3 font-normal whitespace-nowrap">Proponente Principal</th>
                      <th className="px-5 py-3 font-normal whitespace-nowrap">CPF</th>
                      <th className="px-5 py-3 font-normal whitespace-nowrap">Imóvel Pretendido (Venda)</th>
                      <th className="px-5 py-3 font-normal whitespace-nowrap text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3D342E]">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 cursor-pointer bg-white/[0.02]">
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="text-[10px] opacity-40 italic">
                            {new Date(sub.submittedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-white">{sub.p1.fullName}</div>
                          <div className="text-[10px] opacity-40 italic">{sub.hasP2 ? 'Com 2º Proponente' : 'Apenas 1 Proponente'}</div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap font-mono text-amber-100/70">
                          {sub.p1.cpf}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-mono text-white">R$ {Number(sub.saleValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                          <div className="text-[9px] uppercase tracking-wider text-amber-500/50">{sub.amortizationSystem} / {sub.termYears} Anos</div>
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDownload(sub)}
                            className="text-amber-500 underline decoration-amber-500/30 text-[10px] uppercase tracking-wider font-bold hover:text-amber-400 transition-colors"
                          >
                            Baixar PDF
                          </button>
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
    </div>
  );
}
