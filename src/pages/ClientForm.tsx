import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types';
import { Input, Select } from '../components/FormFields';
import { ProponentSection } from '../components/ProponentSection';

export default function ClientForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const hasP2 = watch('hasP2');
  const usedFgts = watch('usedFgts');
  const ownsProperty = watch('ownsProperty');
  const useFgts = watch('useFgts');

  const onSubmit = (data: FormData) => {
    // Generate an ID and timestamp
    const fullData = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('fourcred_submissions') || '[]');
    existing.push(fullData);
    localStorage.setItem('fourcred_submissions', JSON.stringify(existing));
    
    alert('Ficha cadastral enviada com sucesso!');
    window.location.reload(); // Simple reset
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-[#12100E] text-[#F3EFE0] min-h-full">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight text-white">Nova Ficha <span className="text-amber-500 font-bold">Cadastral</span></h1>
          <p className="mt-2 text-sm text-amber-100/50 uppercase tracking-wider">Preencha os dados abaixo para iniciar sua análise de crédito</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Proponent 1 */}
          <ProponentSection prefix="p1" title="1. Dados do Primeiro Proponente" register={register} errors={errors} watch={watch} />

          {/* Proponent 2 Selector */}
          <div className="bg-[#1A1613] border border-[#3D342E] p-6 rounded-2xl shadow-sm">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest border-b border-[#3D342E] pb-3 mb-5">2. Segundo Proponente</h2>
            <div className="flex items-center mb-5">
              <input
                type="checkbox"
                id="hasP2"
                {...register('hasP2')}
                className="h-5 w-5 text-amber-500 focus:ring-amber-500 bg-[#12100E] border-[#3D342E] rounded transition-colors"
              />
              <label htmlFor="hasP2" className="ml-3 block text-sm font-medium text-white">
                Adicionar Segundo Proponente?
              </label>
            </div>
            
            {hasP2 && (
              <Select 
                label="Relacionamento com o 1º Proponente" 
                name="p2Relationship" 
                register={register} 
                errors={errors} 
                options={[
                  { label: 'Cônjuge', value: 'conjuge' },
                  { label: 'União Estável', value: 'uniao_estavel' },
                  { label: 'Noivo(a)', value: 'noivo' },
                  { label: 'Outros', value: 'outros' }
                ]}
                required={hasP2}
              />
            )}
          </div>

          {/* Proponent 2 Fields */}
          {hasP2 && (
             <ProponentSection prefix="p2" title="Dados do Segundo Proponente" register={register} errors={errors} watch={watch} />
          )}

          {/* Credit Analysis */}
          <div className="bg-[#1A1613] border border-[#3D342E] p-6 rounded-2xl shadow-sm space-y-5">
             <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest border-b border-[#3D342E] pb-3">3. Análise de Crédito</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Select label="Já utilizou recursos do FGTS para aquisição?" name="usedFgts" register={register} errors={errors} options={[{label:'Sim', value:'sim'}, {label:'Não', value:'nao'}]} required />
                <Select label="Já foi beneficiado com subsídio do FGTS?" name="fgtsSubsidy" register={register} errors={errors} options={[{label:'Sim', value:'sim'}, {label:'Não', value:'nao'}]} required />
                
                <Select label="É proprietário de imóvel ou fração?" name="ownsProperty" register={register} errors={errors} options={[{label:'Sim', value:'sim'}, {label:'Não', value:'nao'}]} required />
                {ownsProperty === 'sim' && (
                  <>
                    <Input label="Endereço do Imóvel" name="propertyAddress" register={register} errors={errors} />
                    <Input label="% da Fração" name="propertyFraction" type="number" register={register} errors={errors} />
                  </>
                )}

                <Input label="Outros Bens (Aplicações, Ações, Empresas...)" name="otherAssets" register={register} errors={errors} className="md:col-span-2" />
                
                <Input label="Endereço do Imóvel Pretendido" name="targetPropertyAddress" register={register} errors={errors} required />
                <Input label="Nº de Vagas de Garagem" name="parkingSpaces" type="number" register={register} errors={errors} required />
             </div>
          </div>

          {/* Operation Values */}
          <div className="bg-[#1A1613] border border-[#3D342E] p-6 rounded-2xl shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest border-b border-[#3D342E] pb-3">4. Valores da Operação</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Input label="Valor de Venda (R$)" name="saleValue" type="number" step="0.01" register={register} errors={errors} required />
              <Input label="Entrada - Recursos Próprios (R$)" name="downPayment" type="number" step="0.01" register={register} errors={errors} required />
              <Select label="Utilizará FGTS?" name="useFgts" register={register} errors={errors} options={[{label:'Sim', value:'sim'}, {label:'Não', value:'nao'}]} required />
              {useFgts === 'sim' && <Input label="Valor FGTS a Utilizar (R$)" name="fgtsValue" type="number" step="0.01" register={register} errors={errors} />}
              
              <Input label="Valor do Financiamento (R$)" name="financingValue" type="number" step="0.01" register={register} errors={errors} required />
              <Input label="Prazo (Anos)" name="termYears" type="number" register={register} errors={errors} required />
              <Select label="Sistema de Amortização" name="amortizationSystem" register={register} errors={errors} options={[{label:'Tabela Price', value:'price'}, {label:'SAC', value:'sac'}]} required />
            </div>
          </div>

          {/* Terms */}
          <div className="bg-[#1A1613] border border-[#3D342E] p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="acceptedTerms"
                  type="checkbox"
                  {...register('acceptedTerms', { required: 'Você deve aceitar os termos para prosseguir' })}
                  className="w-5 h-5 text-amber-500 bg-[#12100E] border-[#3D342E] rounded focus:ring-amber-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptedTerms" className="font-medium text-white">Termos e Condições <span className="text-amber-500">*</span></label>
                <p className="text-neutral-400 mt-1">Declaro que as informações prestadas são verdadeiras e autorizo a Fourcred a buscar informações cadastrais nos Órgãos de Proteção ao Crédito (SPC, Serasa, etc).</p>
                {errors.acceptedTerms && <p className="text-red-400 mt-1">{(errors.acceptedTerms as any).message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 pb-8">
            <button
              type="submit"
              className="px-8 py-3 bg-amber-600 text-white font-bold rounded-lg uppercase tracking-wider text-xs shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#12100E] focus:ring-amber-500"
            >
              Enviar Ficha Cadastral
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
