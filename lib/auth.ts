import { ADMIN_PASSWORD } from './constants';

export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  const session = localStorage.getItem('adminSession');
  if (!session) return false;
  
  try {
    const { authenticated, timestamp } = JSON.parse(session);
    // Session expires after 24 hours
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
    return authenticated && !isExpired;
  } catch {
    return false;
  }
};

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('adminSession', JSON.stringify({
      authenticated: true,
      timestamp: Date.now(),
    }));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('adminSession');
};
