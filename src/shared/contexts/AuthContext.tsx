import { createContext, useCallback, useState, useMemo, useEffect, useContext } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
   isAuthenticated: boolean;
   logout: () => void;
   login: (email: string, senha: string) => Promise<string | void>;
   cadastrar: (email: string, senha: string, nome: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

interface IAuthProviderProps {
   children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
   const [accessToken, setAccessToken] = useState<string>();

   useEffect(() => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

      if (accessToken && accessToken !== "undefined") {
         try {
            setAccessToken(JSON.parse(accessToken));
         } catch (error) {
            console.log("invalid access token: ", error);
            setAccessToken(undefined);
         }
      }
   }, []);

   const handleLogin = useCallback(async (email: string, senha: string) => {
      try {
         const result = await AuthService.auth(email, senha);
         if (result instanceof Error) {
            return result.message;
         } else {
            localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
            setAccessToken(result.accessToken);
         }
      } catch (error) {
         console.log(`error logging in: ${error}`);
         return "An error occurred while logging in.";
      }
   }, []);

   const handleRegister = useCallback(async (nome: string, email: string, senha: string) => {
      try {
         const result = await AuthService.register(nome, email, senha);
         if (result instanceof Error) {
            return result.message;
         } else {
            localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
            setAccessToken(result.accessToken);
         }
      } catch (error) {
         console.log(`error registering: ${error}`);
         return "An error occurred while registering.";
      }
   }, []);

   const handleLogout = useCallback(() => {
      const confirmLogout = window.confirm("Deseja realmente sair ?");
      if (confirmLogout) {
         localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
      }
      setAccessToken(undefined);
   }, []);

   const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

   return (
      <AuthContext.Provider
         value={{ isAuthenticated, login: handleLogin, cadastrar: handleRegister, logout: handleLogout }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuthContext = () => useContext(AuthContext);
