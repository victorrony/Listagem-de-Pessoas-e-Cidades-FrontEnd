import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

//  const baseURL = "http://localhost:3333";

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get("/auth/login", { data: { email, password }});
    
    if (data) {
      return data;
    }
    return new Error("Error ao entrar");

  } catch (error) {
    console.log(error);
    const errorMessage = (error as { message: string }).message || "Error ao login.";
    return new Error(errorMessage);
  }
};

// const auth = async (
//   email: string,
//   password: string
// ): Promise<IAuth | Error> => {
//   try {
//     const response = await Api.post<IAuth>("/auth/login", {
//       email,
//       password,
//     });
//     const data = response.data;
//     console.log(data);
//     if (data) {
//       return data;
//     }
//     return new Error("Error ao entrar");
//   } catch (error) {
//     console.log(error);
//     const errorMessage = (error as { message: string }).message || "Error ao login.";
//     return new Error(errorMessage);
//   }
// };

export const AuthService = {
  auth,
};
