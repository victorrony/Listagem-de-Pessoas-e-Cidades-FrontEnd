import { Api } from "../axios-config";

interface IAuthResponse {
  accessToken: string;
}

const auth = async (email: string, senha: string): Promise<IAuthResponse | Error> => {
  try {
    const { data } = await Api.post<IAuthResponse>("/entrar", { email, senha });
    return data;
  } catch (error) {
    return new Error((error as { message: string }).message || "Error ao entrar");
  }
};

const register = async (nome: string, email: string, senha: string): Promise<IAuthResponse | Error> => {
  try {
    const { data } = await Api.post<IAuthResponse>("/cadastrar", { nome, email, senha });
    return data;
  } catch (error) {
    return new Error((error as { message: string }).message || "Error ao registrar");
  }
};

export const AuthService = {
  auth,
  register,
};
