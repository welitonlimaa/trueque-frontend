import React, { useState } from 'react';
import { UserDataRequestDTO } from '../types/api';

interface Props {
  loading: boolean;
  error: string;
  onSubmit: (data: UserDataRequestDTO) => void;
}

export default function RegisterForm({ loading, error, onSubmit }: Props) {
  const [formData, setFormData] = useState<UserDataRequestDTO>({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: '',
    profilePicture: '',
    googleId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">Registrar</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <input type="text" name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <input type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <input type="text" name="state" placeholder="Estado" value={formData.state} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />

      <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
}
