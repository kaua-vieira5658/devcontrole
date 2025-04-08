"use client";
import { InputHTMLAttributes } from "react";
import { InputMask, InputMaskProps } from "@react-input/mask";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
}

interface CustomInputMaskProps extends InputMaskProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
}

export function Input({ label, name, register, error, ...rest }: InputProps) {
  return (
    <div className="flex flex-col mt-6">
      <label className="mb-1">{label}</label>
      <input
        {...register(name)}
        {...rest}
        className="w-full border-2 border-slate-300 rounded-md h-11 px-2 outline-0"
        id={name}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </div>
  );
}

export function InputWithMask({
  label,
  name,
  register,
  error,
  ...rest
}: CustomInputMaskProps) {
  return (
    <div className="flex flex-col mt-6">
      <label className="mb-1">{label}</label>
      <InputMask
        {...register(name)}
        {...rest}
        className="w-full border-2 border-slate-300 rounded-md h-11 px-2 outline-0"
        id={name}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </div>
  );
}
