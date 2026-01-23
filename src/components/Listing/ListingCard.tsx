import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ListingCard({ children, className = '' }: Props) {
  return (
    <div
      className={`
        flex gap-4
        rounded-lg border border-gray-200
        bg-white p-4
        transition
        hover:shadow-sm hover:border-gray-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}