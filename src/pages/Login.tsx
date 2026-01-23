import { useForm } from 'react-hook-form';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import { login } from '../api/auth';

export default function Login() {
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.token);
      window.location.href = '/';
    } catch {
      alert('Erro ao logar');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <FormCard>
        <h1 className="mb-6 text-xl font-semibold">Entrar</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            {...register('email')}
            placeholder="Email"
            type="email"
          />

          <InputField
            {...register('password')}
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Entrar</Button>
        </form>
      </FormCard>
    </div>
  );
}