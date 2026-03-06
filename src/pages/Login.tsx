import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import { login } from '../api/auth';

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<LoginForm>({
    mode: "onChange"
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(data: LoginForm) {
    try {
      const res = await login(data);

      localStorage.setItem('token', res.token);

      navigate('/');
    } catch {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <FormCard>
        <h1 className="mb-6 text-xl font-semibold text-center">Login</h1>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">
            Erro ao logar
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            {...register('email', { required: true })}
            placeholder="Email"
            type="email"
          />

          <InputField
            {...register('password', { required: true })}
            placeholder="Senha"
            type="password"
          />

          <Button type="submit" disabled={!isValid}>
            Entrar
          </Button>
        </form>
      </FormCard>
    </div>
  );
}