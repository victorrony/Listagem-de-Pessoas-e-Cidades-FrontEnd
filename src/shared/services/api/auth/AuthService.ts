import { Api } from "../axios-config";

interface IAuth {
   accessToken: string;
}

const entrar = async (email: string, password: string): Promise<IAuth> =>
   (await Api.post(`/entrar`, { email, password })).data;

const register = async (name: string, email: string, password: string): Promise<IAuth> =>
   (await Api.post(`/cadastrar`, { name, email, password })).data;

export const AuthService = {
   entrar,
   register,
};
