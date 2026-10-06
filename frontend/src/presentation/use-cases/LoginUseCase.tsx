'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../../core/application/services/auth.service';
import { useAuthContext } from '../providers/AuthTokenProvider';
import { LoginView } from '../views/LoginView';

interface LoginUseCaseProps {
  setShowRegister: (show: boolean) => void;
}

export function LoginUseCase({ setShowRegister }: LoginUseCaseProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuthContext();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      login(response.token, response.user.name, response.user.role);
      if (response.user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      isLoading={isLoading}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      setShowRegister={setShowRegister}
    />
  );
}
