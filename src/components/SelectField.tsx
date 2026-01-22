import { SelectOption } from "../types/common";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options?: SelectOption[];
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
      className={`w-full border p-2 rounded ${className}`}
    >
      {placeholder && (
        <option value="">
          {placeholder}
        </option>
      )}

      {options.map((opt) => (
        <option key={opt.code} value={opt.code}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}