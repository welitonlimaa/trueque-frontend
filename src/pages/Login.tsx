import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';


export default function Login() {
const { register, handleSubmit } = useForm();


async function onSubmit(data: any) {
try {
const res = await login(data);
localStorage.setItem('token', res.token);
window.location.href = '/';
} catch (err) {
alert('Erro ao logar');
}
}


return (
<div className="max-w-md mx-auto mt-20">
<h1 className="text-2xl font-bold">Entrar</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
<input {...register('email')} placeholder="Email" className="input" />
<input {...register('password')} type="password" placeholder="Senha" className="input" />
<button className="btn">Entrar</button>
</form>
</div>
);
}