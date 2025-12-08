import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { UserDataRequestDTO } from '../types/api';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (data: UserDataRequestDTO) => {
    setLoading(true);
    setError('');
    try {
      await register(data); // chama a função do auth.ts
      navigate('/login');   // redireciona para login após sucesso
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm
        loading={loading}
        error={error}
        onSubmit={handleRegister}
      />
    </div>
  );
}
