import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ListingCard({ children, className = '' }: Props) {
  return (
    <div
      className={`h-1 w-1 border rounded p-4 flex gap-4 bg-white ${className}`}
    >
      {children}
    </div>
  );
}