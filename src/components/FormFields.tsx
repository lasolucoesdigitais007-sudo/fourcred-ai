import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, name, register, errors, type = 'text', className = '', icon, rightElement, ...rest }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-[11px] font-bold text-[#b5aa9d]">{label}</label>
    <div className="relative flex items-center">
      {icon && <div className="absolute left-3.5 flex items-center text-white/40">{icon}</div>}
      <input
        type={type}
        {...register(name)}
        className={`w-full px-3.5 py-2.5 bg-[#14110F] border border-[#2A2420] rounded-md text-[13px] font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#ECA118]/50 focus:border-[#ECA118] transition-colors placeholder:text-[#4a4036] ${icon ? 'pl-9' : ''} ${rightElement ? 'pr-[140px]' : ''}`}
        {...rest}
      />
      {rightElement && <div className="absolute right-0 top-0 bottom-0 flex items-center">{rightElement}</div>}
    </div>
    {errors[name] && <span className="text-[11px] font-semibold text-red-500 mt-1">{(errors[name] as any)?.message || 'Campo inválido'}</span>}
  </div>
);

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, name, register, errors, className = '', rows = 3, ...rest }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-[11px] font-bold text-[#b5aa9d]">{label}</label>
    <textarea
      {...register(name)}
      rows={rows}
      className="px-3.5 py-2.5 bg-[#14110F] border border-[#2A2420] rounded-md text-[13px] font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#ECA118]/50 focus:border-[#ECA118] transition-colors placeholder:text-[#4a4036] resize-none"
      {...rest}
    ></textarea>
    {errors[name] && <span className="text-[11px] font-semibold text-red-500 mt-1">{(errors[name] as any)?.message || 'Campo inválido'}</span>}
  </div>
);

export const SimNaoButtons: React.FC<{ label: string; sublabel?: string; name: string; register: UseFormRegister<any>; watch: UseFormWatch<any>; setValue: UseFormSetValue<any> }> = ({ label, sublabel, name, register, watch, setValue }) => {
  const value = watch(name);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#3D342E] last:border-0 gap-4">
      <div>
        <h3 className="text-sm font-bold text-white tracking-wide">{label}</h3>
        {sublabel && <p className="text-[13px] text-white/50 mt-1">{sublabel}</p>}
      </div>
      <div className="flex bg-[#14110F] border border-[#2A2420] rounded-lg p-1 shrink-0 w-fit">
        <button
          type="button"
          onClick={() => setValue(name, 'sim', { shouldValidate: true })}
          className={`px-8 py-1.5 text-[13px] font-bold rounded-md transition-colors ${value === 'sim' ? 'bg-[#ECA118] text-[#422006]' : 'text-white/50 hover:text-white'}`}
        >
          Sim
        </button>
        <button
          type="button"
          onClick={() => setValue(name, 'nao', { shouldValidate: true })}
          className={`px-8 py-1.5 text-[13px] font-bold rounded-md transition-colors ${value === 'nao' || !value ? 'bg-[#ECA118] text-[#422006]' : 'text-white/50 hover:text-white'}`}
        >
          Não
        </button>
      </div>
      <input type="hidden" {...register(name, { required: 'Selecione uma opção' })} />
    </div>
  );
};

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  label: string;
  name: string;
  options: { label: string; value: string | number }[];
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const Select: React.FC<SelectProps> = ({ label, name, options, register, errors, className = '', ...rest }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-[11px] font-bold text-[#b5aa9d]">{label}</label>
    <select
      {...register(name)}
      className="px-3.5 py-2.5 bg-[#14110F] border border-[#2A2420] rounded-md text-[13px] font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#ECA118]/50 focus:border-[#ECA118] transition-colors"
      {...rest}
    >
      <option value="">Selecione...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {errors[name] && <span className="text-[11px] font-semibold text-red-500 mt-1">{(errors[name] as any)?.message || 'Campo inválido'}</span>}
  </div>
);
