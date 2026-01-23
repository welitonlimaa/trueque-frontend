import { ReactNode } from 'react';

export default function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm border">
      {children}
    </div>
  );
}