import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai';
type Size = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: Props) {
  const base =
    'w-full inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';

  const variants: Record<Variant, string> = {
    primary:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 disabled:bg-green-300',
    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    ghost:
      'text-green-600 hover:bg-green-50 focus:ring-green-600',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    ai:
      'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-600',
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}
