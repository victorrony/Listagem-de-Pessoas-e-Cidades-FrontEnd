"use client";
import { useState } from "react";
import { Box, Card, CardContent, CardActions, Button, Typography, TextField, CircularProgress } from "@mui/material";
import { useAuthContext } from "../../shared/contexts";
// import { AxiosError } from "axios";
// import Cookies from "js-cookie";

interface AuthPageProps {
   children: React.ReactNode;
}

export const AuthPage: React.FC<AuthPageProps> = ({ children }) => {
   const { isAuthenticated, login, cadastrar } = useAuthContext();
   const [isLoginMode, setIsLoginMode] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
   const [errorMessage, setErrorMessage] = useState("");

   const handleToggleMode = () => {
      setIsLoginMode(!isLoginMode);
      setFormData({ nome: "", email: "", senha: "" });
      setErrorMessage("");
   };

   const handleLogin = async (email: string, senha: string) => {
      if (isLoading) return;
      setIsLoading(true);
      setErrorMessage("");

      try {
         await login(email, senha);
      } catch (error) {
         console.error(error);
         setErrorMessage("Email ou senha inválidos");
      }
      setIsLoading(false);
   };
   const handleRegister = async (nome: string, email: string, senha: string) => {
      if (isLoading) return;

      setIsLoading(true);
      setErrorMessage("");

      try {
         await cadastrar(nome, email, senha);

      } catch (error: any) {
         console.error(error);
         if (error.response?.status === 400 && error.response?.data?.message === "Email is not available") {
            setErrorMessage("Email already exists. Please use a different email.");
         } else {
            setErrorMessage("Registration failed. Please try again.");
         }
      }
      setIsLoading(false);
   };

   const handleSubmit = async () => {
      if (isLoginMode) {
         handleLogin(formData.email, formData.senha);
      } else {
         handleRegister(formData.nome, formData.email, formData.senha);
      }
   };

   if (isAuthenticated) {
      return <>{children}</>;
   }

   return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
         <Card>
            <CardContent>
               <Box display="flex" flexDirection="column" gap={2} width={250}>
                  <Typography variant="h6" align="center">
                     {isLoginMode ? "Sign In" : "Sign Up"}
                  </Typography>

                  {!isLoginMode && (
                     <TextField
                        fullWidth
                        label="Name"
                        value={formData.nome}
                        disabled={isLoading}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                     />
                  )}

                  <TextField
                     fullWidth
                     type="email"
                     label="Email"
                     value={formData.email}
                     disabled={isLoading}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <TextField
                     fullWidth
                     type="senha"
                     label="Senha"
                     value={formData.senha}
                     disabled={isLoading}
                     onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  />

                  <Typography variant="body2" align="center">
                     {isLoginMode ? "Não possui uma conta?" : "Já tem uma conta?"}
                     <Button size="small" onClick={handleToggleMode}>
                        {isLoginMode ? "Crie uma agora" : "Faça login"}
                     </Button>
                  </Typography>
               </Box>
            </CardContent>

            <CardActions>
               <Box width="100%" display="flex" justifyContent="center">
                  <Button
                     variant="contained"
                     onClick={handleSubmit}
                     disabled={isLoading}
                     endIcon={isLoading && <CircularProgress color="inherit" size={20} />}
                  >
                     {isLoginMode ? "Entrar" : "Registrar"}
                  </Button>
               </Box>
            </CardActions>
         </Card>
      </Box>
   );
};
