import { useState } from "react";
import { useAuthContext } from "../../contexts";
import { Box, CardContent, Card, CardActions, Button, Typography, TextField, CircularProgress } from "@mui/material";
import * as yup from "yup";

const loginSchema = yup.object().shape({
   email: yup.string().email().required(),
   password: yup.string().min(5).required(),
});

const registerSchema = yup.object().shape({
   name: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().min(5).required(),
   // confirmPassword: yup
   //    .string()
   //    .oneOf([yup.ref("password"), undefined], "Passwords must match")
   //    .required(),
});

interface ILoginProps {
   children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
   const { isAuthenticated, login, register } = useAuthContext();

   const [isLoading, setIsLoading] = useState(false);
   const [isRegister, setIsRegister] = useState(false);

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   // const [confirmPassword, setConfirmPassword] = useState("");

   const [nameError, setNameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   // const [confirmPasswordError, setConfirmPasswordError] = useState("");

   const handleSubmit = async () => {
      setIsLoading(true);

      try {
         const schema = isRegister ? registerSchema : loginSchema;
         const dadosValidados = await schema.validate({ name, email, password }, { abortEarly: false });

         if (isRegister) {
            await register(name, dadosValidados.email, dadosValidados.password);
            if (isAuthenticated) return <>{children}</>;
         } else {
            await login(dadosValidados.email, dadosValidados.password);
         }
      } catch (errors) {
         if (errors instanceof yup.ValidationError) {
            errors.inner.forEach((error) => {
               if (error.path === "email") {
                  setEmailError(error.message);
               } else if (error.path === "password") {
                  setPasswordError(error.message);
               }
            });
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleToggleMode = () => {
      setIsRegister(!isRegister);
      setName("");
      setEmail("");
      setPassword("");
      // Uncomment if using confirmPassword
      // setConfirmPassword("");
      setNameError("");
      setEmailError("");
      setPasswordError("");
      // setConfirmPasswordError("");
   };

   if (isAuthenticated) return <>{children}</>;

   return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
         <Card>
            <CardContent>
               <Box display="flex" flexDirection="column" gap={2} width={250}>
                  <Typography variant="h6" align="center">
                     {isRegister ? "Registre-se" : "Identifique-se"}
                  </Typography>

                  {isRegister && (
                     <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        disabled={isLoading}
                        error={!!nameError}
                        helperText={nameError}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={() => setNameError("")}
                     />
                  )}

                  <TextField
                     fullWidth
                     type="email"
                     label="Email"
                     value={email}
                     disabled={isLoading}
                     error={!!emailError}
                     helperText={emailError}
                     onChange={(e) => setEmail(e.target.value)}
                     onKeyDown={() => setEmailError("")}
                  />

                  <TextField
                     fullWidth
                     type="password"
                     label="Password"
                     value={password}
                     disabled={isLoading}
                     error={!!passwordError}
                     helperText={passwordError}
                     onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={() => setPasswordError("")}
                  />

                  {/* {isRegister && (
                     <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        disabled={isLoading}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={() => setConfirmPasswordError("")}
                     />
                  )} */}
               </Box>

               <Box display="flex" justifyContent="center">
                  <Typography variant="body2" align="center">
                     {isRegister ? (
                        <>
                           Já tem uma conta?{" "}
                           <button
                              onClick={handleToggleMode}
                              style={{
                                 background: "none",
                                 border: "none",
                                 color: "blue",
                                 textDecoration: "underline",
                                 cursor: "pointer",
                              }}
                           >
                              Entre
                           </button>
                        </>
                     ) : (
                        <>
                           Não tem uma conta?{" "}
                           <button
                              onClick={handleToggleMode}
                              style={{
                                 background: "none",
                                 border: "none",
                                 color: "blue",
                                 textDecoration: "underline",
                                 cursor: "pointer",
                              }}
                           >
                              Cadastre-se
                           </button>
                        </>
                     )}
                  </Typography>
               </Box>
            </CardContent>
            <CardActions>
               <Box width="100%" display="flex" justifyContent="center">
                  <Button
                     variant="contained"
                     onClick={handleSubmit}
                     disabled={isLoading}
                     endIcon={
                        isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20} /> : undefined
                     }
                  >
                     {isRegister ? "Registrar" : "Entrar"}
                  </Button>
               </Box>
            </CardActions>
         </Card>
      </Box>
   );
};
