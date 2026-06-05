import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ label, name, register, errors, type = 'text', className = '', ...rest }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <label className="text-xs font-semibold text-amber-500/70 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="px-3 py-2 bg-[#12100E] border border-[#3D342E] rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
      {...rest}
    />
    {errors[name] && <span className="text-xs text-red-400">{(errors[name] as any)?.message || 'Campo inválido'}</span>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ label, name, options, register, errors, className = '', ...rest }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <label className="text-xs font-semibold text-amber-500/70 uppercase tracking-widest">{label}</label>
    <select
      {...register(name)}
      className="px-3 py-2 bg-[#12100E] border border-[#3D342E] rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
      {...rest}
    >
      <option value="">Selecione...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {errors[name] && <span className="text-xs text-red-500">{(errors[name] as any)?.message || 'Campo inválido'}</span>}
  </div>
);
