type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:bg-gray-100 disabled:text-gray-400
      ${className}`}
    />
  );
}