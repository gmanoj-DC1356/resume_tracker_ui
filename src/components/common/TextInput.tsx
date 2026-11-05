import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export function Field({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="mt-2 mb-1 block text-xs text-brand-muted" {...props}>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-md border border-brand-line bg-white px-3 py-2 text-sm text-brand-text focus-visible:outline-2 focus-visible:outline-brand-accent"
      {...props}
    />
  );
}
