type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const base =
    'w-full rounded-md px-4 py-2 text-sm font-medium transition';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}