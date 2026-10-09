'use client';

import { useState } from 'react';
import { LoginUseCase } from '../../presentation/use-cases/LoginUseCase';
import { RegisterUseCase } from '../../presentation/use-cases/RegisterUseCase';

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 text-black">

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {showRegister ? (
          <>
            <RegisterUseCase setShowRegister={setShowRegister} />
          </>
        ) : (
          <>
            <LoginUseCase setShowRegister={setShowRegister} />
          </>
        )}
      </main>
    </div>
  );
}
