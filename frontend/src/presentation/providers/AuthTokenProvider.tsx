'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteSessionCookies } from '../../infraestructure/cookies/CookieService';
import { CookieEnum } from '../../infraestructure/enums/cookieEnum';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: number | null;
  userName: string | null;
  userRole: string | null;
  userEmail: string | null;
  userDni: string | null;
  userCiudad: string | null;
  login: (newToken: string, name?: string, role?: string, id?: number, email?: string, dni?: string, ciudad?: string) => void;
  logout: () => void;
  updateProfileData: (dni: string, ciudad: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let globalToken: string | null = null;

export function getAuthToken(): string | null {
  return globalToken;
}

export function AuthTokenProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userDni, setUserDni] = useState<string | null>(null);
  const [userCiudad, setUserCiudad] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getCookie<string>(CookieEnum.Token);
      const storedName = await getCookie<string>(CookieEnum.Usuario);
      const storedRole = await getCookie<string>(CookieEnum.Role);
      const storedId = await getCookie<string>('userId');
      const storedEmail = await getCookie<string>('userEmail');
      const storedDni = await getCookie<string>('userDni');
      const storedCiudad = await getCookie<string>('userCiudad');
      
      if (storedToken) {
        setToken(storedToken);
        globalToken = storedToken;
        setUserName(storedName || null);
        setUserRole(storedRole || null);
        setUserId(storedId ? Number(storedId) : null);
        setUserEmail(storedEmail || null);
        setUserDni(storedDni || null);
        setUserCiudad(storedCiudad || null);
        setIsAuthenticated(true);
      }
      setIsLoaded(true);
    };
    initAuth();
  }, []);

  const login = async (newToken: string, name?: string, role?: string, id?: number, email?: string, dni?: string, ciudad?: string) => {
    await setCookie(CookieEnum.Token, newToken);
    if (name) await setCookie(CookieEnum.Usuario, name);
    if (role) await setCookie(CookieEnum.Role, role);
    if (id) await setCookie('userId', id.toString());
    if (email) await setCookie('userEmail', email);
    if (dni) await setCookie('userDni', dni);
    if (ciudad) await setCookie('userCiudad', ciudad);
    
    setToken(newToken);
    globalToken = newToken;
    setUserName(name || null);
    setUserRole(role || null);
    setUserId(id || null);
    setUserEmail(email || null);
    setUserDni(dni || null);
    setUserCiudad(ciudad || null);
    setIsAuthenticated(true);
  };

  const updateProfileData = async (dni: string, ciudad: string) => {
    await setCookie('userDni', dni);
    await setCookie('userCiudad', ciudad);
    setUserDni(dni);
    setUserCiudad(ciudad);
  };

  const logout = async () => {
    await deleteSessionCookies();
    await setCookie('userId', '', { maxAge: -1 });
    await setCookie('userEmail', '', { maxAge: -1 });
    await setCookie('userDni', '', { maxAge: -1 });
    await setCookie('userCiudad', '', { maxAge: -1 });
    
    setToken(null);
    globalToken = null;
    setUserName(null);
    setUserRole(null);
    setUserId(null);
    setUserEmail(null);
    setUserDni(null);
    setUserCiudad(null);
    setIsAuthenticated(false);
  };

  if (!isLoaded) return null; // Previene hydration mismatch y parpadeos en render

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, userName, userRole, userEmail, userDni, userCiudad, login, logout, updateProfileData }}>
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
