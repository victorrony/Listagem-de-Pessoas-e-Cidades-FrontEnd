import { createContext, useCallback, useState, useMemo, useEffect, useContext } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
  register: (name: string, email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const accessTokenFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    try {
      if (accessTokenFromStorage) {
        setAccessToken(JSON.parse(accessTokenFromStorage));
        console.log(accessTokenFromStorage);
      } else {
        setAccessToken(null);
      }
    } catch (error) {
      console.error("Failed to parse access token:", error);
      setAccessToken(null);
    }
  }, []);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await AuthService.entrar(email, password);
        if (result instanceof Error) {
          return result.message;
        } else {
          localStorage.setItem(
            LOCAL_STORAGE_KEY__ACCESS_TOKEN,
            JSON.stringify(result.accessToken)
          );
          setAccessToken(result.accessToken);
        }
      } catch (error) {
        console.error("Failed to login:", error);
        return "Erro ao realizar o login";
      }
    },
    [setAccessToken]
  );

  const handleRegister = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const result = await AuthService.register(name, email, password);
        if (result instanceof Error) {
          return result.message;
        } else {
          localStorage.setItem(
            LOCAL_STORAGE_KEY__ACCESS_TOKEN,
            JSON.stringify(result.accessToken)
          );
          setAccessToken(result.accessToken);
          console.log(accessToken);
        }
      } catch (error) {
        console.error("Failed to register:", error);
        return "Erro ao realizar o cadastro";
      }
    },
    [setAccessToken]
  );

  const handleLogout = useCallback(() => {
    const confirmDelete = window.confirm("Deseja realmente sair ?");
    if (confirmDelete) {
      localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
      setAccessToken(null);
    }
  }, [setAccessToken]);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout, register: handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
