import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Error de conexão"));
  }

  if (error.response?.status === 401) {
    // Do something
  }

  if (error.response?.status === 404) {
    // Handle 404 error
  }

  return Promise.reject(error);
};
