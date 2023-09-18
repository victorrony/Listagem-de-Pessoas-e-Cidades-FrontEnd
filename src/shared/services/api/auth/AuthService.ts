import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const baseURL = "http://localhost:3333";

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const  {data}  = await Api.get(`${baseURL}/entrar`, { data: { email, password } });
      
    if (data) {
      return data;
    }
    return new Error("Error ao entrar");
  } catch (error) {
     console.log(error);
    return new Error(
      (error as { message: string }).message || "Error ao login."
    );
  }
};

export const AuthService = {
  auth,
};
