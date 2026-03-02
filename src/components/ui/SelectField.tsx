import { SelectOption } from "../../types/common";

type Option = {
  code: string;
  name: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onOpen?: () => void;
};

export default function SelectField({
  value,
  onChange,
  options = [],
  placeholder,
  disabled,
  className = '',
  onOpen,
}: Props) {
  return (
    <select
      value={value}
      disabled={disabled}
      onClick={onOpen}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-green-500
      disabled:bg-gray-100 ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}

      {options.map((opt: SelectOption) => (
        <option key={opt.code} value={opt.code}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}