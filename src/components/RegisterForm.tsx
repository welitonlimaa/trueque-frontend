import React, { useState } from 'react';
import { UserDataRequestDTO } from '../types/api';
import StateCitySelect from './StateCitySelect';
import FormCard from './ui/FormCard';
import InputField from './ui/InputField';
import Button from './ui/Button';

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

  const isFormValid = formData.name &&
                      formData.email &&
                      formData.password &&
                      formData.phone &&
                      formData.city &&
                      formData.state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <FormCard>
        <h1 className="mb-6 text-xl font-semibold text-center">Criar conta</h1>

        {error && (
          <p className="mb-4 text-sm text-red-500">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField name="name" placeholder="Nome" value={formData.name} onChange={handleChange} />
          <InputField name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <InputField name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
          <InputField name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} />

          <StateCitySelect
            state={formData.state}
            city={formData.city}
            onChange={({ state, city }) =>
              setFormData((prev) => ({ ...prev, state, city }))
            }
          />

          <Button
            type="submit"
            loading={loading}
            isFormValid={Boolean(isFormValid)}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>
      </FormCard>
    </div>
  );
}
