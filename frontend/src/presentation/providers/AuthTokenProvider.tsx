'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteSessionCookies } from '../../infraestructure/cookies/CookieService';
import { CookieEnum } from '../../infraestructure/enums/cookieEnum';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userName: string | null;
  userRole: string | null;
  login: (newToken: string, name?: string, role?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let globalToken: string | null = null;

export function getAuthToken(): string | null {
  return globalToken;
}

export function AuthTokenProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getCookie<string>(CookieEnum.Token);
      const storedName = await getCookie<string>(CookieEnum.Usuario);
      const storedRole = await getCookie<string>(CookieEnum.Role);
      
      if (storedToken) {
        setToken(storedToken);
        globalToken = storedToken;
        setUserName(storedName || null);
        setUserRole(storedRole || null);
        setIsAuthenticated(true);
      }
      setIsLoaded(true);
    };
    initAuth();
  }, []);

  const login = async (newToken: string, name?: string, role?: string) => {
    await setCookie(CookieEnum.Token, newToken);
    if (name) await setCookie(CookieEnum.Usuario, name);
    if (role) await setCookie(CookieEnum.Role, role);
    
    setToken(newToken);
    globalToken = newToken;
    setUserName(name || null);
    setUserRole(role || null);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await deleteSessionCookies();
    
    setToken(null);
    globalToken = null;
    setUserName(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  if (!isLoaded) return null; // Previene hydration mismatch y parpadeos en render

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userName, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext debe usarse dentro de un AuthTokenProvider');
  }
  return context;
}
