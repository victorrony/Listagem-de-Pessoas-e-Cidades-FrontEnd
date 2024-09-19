import { useState } from "react";
import { useAuthContext } from "../../contexts";
import { Box, CardContent, Card, CardActions, Button, Typography, TextField, CircularProgress } from "@mui/material";
import * as yup from "yup";

const cadastroSchema = yup.object().shape({
   nome: yup.string().required(),
   sobrenome: yup.string().required(),
   email: yup.string().email().required(),
   senha: yup.string().min(5).required(),
   dataNascimento: yup.date().required(),
});

// interface ICadastroProps {
//    children: React.ReactNode;
// }

export const Cadastro = ({  }) => {
   const { isAuthenticated, cadastrar } = useAuthContext();
   const [isLoading, setIsLoading] = useState(false);
   const [nome, setNome] = useState("");
   const [sobrenome, setSobrenome] = useState("");
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [nomeError, setNomeError] = useState("");
   const [sobrenomeError, setSobrenomeError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [senhaError, setSenhaError] = useState("");
   

   const handleSubmit = () => {
      setIsLoading(true);
      console.log(nome, sobrenome, email, senha);

      cadastroSchema
         .validate({ nome, sobrenome, email, senha }, { abortEarly: false })
         .then((dadosValidados) => {
            console.log(dadosValidados);
            cadastrar(dadosValidados.nome, dadosValidados.sobrenome, dadosValidados.email, dadosValidados.senha).then(
               () => {
                  setIsLoading(false);
               }
            );
         })
         .catch((errors: yup.ValidationError) => {
            setIsLoading(false);

            errors.inner.forEach((error) => {
               if (error.path === "nome") {
                  setNomeError(error.message);
               } else if (error.path === "sobrenome") {
                  setSobrenomeError(error.message);
               } else if (error.path === "email") {
                  setEmailError(error.message);
               } else if (error.path === "senha") {
                  setSenhaError(error.message);
               }
            });
         });
   };

   // if (isAuthenticated) return <>{children}</>;

   return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
         <Card>
            <CardContent>
               <Box display="flex" flexDirection="column" gap={2} width={250}>
                  <Typography variant="h6" align="center">
                     Cadastre-se
                  </Typography>

                  <TextField
                     fullWidth
                     type="text"
                     label="Nome"
                     value={nome}
                     disabled={isLoading}
                     error={!!nomeError}
                     helperText={nomeError}
                     onChange={(e) => setNome(e.target.value)}
                     onKeyDown={() => setNomeError("")}
                  />

                  <TextField
                     fullWidth
                     type="text"
                     label="Sobrenome"
                     value={sobrenome}
                     disabled={isLoading}
                     error={!!sobrenomeError}
                     helperText={sobrenomeError}
                     onChange={(e) => setSobrenome(e.target.value)}
                     onKeyDown={() => setSobrenomeError("")}
                  />

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
                     type="senha"
                     label="Senha"
                     value={senha}
                     disabled={isLoading}
                     error={!!senhaError}
                     helperText={senhaError}
                     onChange={(e) => setSenha(e.target.value)}
                     onKeyDown={() => setSenhaError("")}
                  />
               </Box>

               <Box display="flex" flexDirection="column" gap={2} width={250}>
                  <Typography variant="body2" align="center">
                     Já possui conta?
                     <Button
                        size="small"
                        onClick={() => {
                           setNome("");
                           setSobrenome("");
                           setEmail("");
                           setSenha("");
                        }}
                     >
                        Faça login
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
                     endIcon={
                        isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20} /> : undefined
                     }
                  >
                     Cadastrar
                  </Button>
               </Box>
            </CardActions>
         </Card>
      </Box>
   );
};
