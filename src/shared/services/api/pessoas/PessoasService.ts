import { Api } from "../axios-config";
import { Enviroment } from "../../../environment";

export interface IListagemPessoa {
   id: number;
   email: string;
   cidadeId: number;
   nomeCompleto: string;
}

export interface IDetalhePessoa {
   id: number;
   email: string;
   cidadeId: number;
   nomeCompleto: string;
}

type TPessoasComTotalCount = {
   data: IListagemPessoa[];
   totalCount: number;
};

const getAll = async (page = 1, filter = " "): Promise<TPessoasComTotalCount | Error> => {
   try {
      const urlRelative = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

      const { data, headers } = await Api.get(urlRelative);

      if (data) {
         return {
            data,
            totalCount: Number(headers["x-total-count"] || Enviroment.LIMITE_DE_LINHAS),
         };
      }
      return new Error("Error ao listar os registros.");
   } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Error ao listar os registros.");
   }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
   try {
      const { data } = await Api.get(`/pessoas/${id}`);

      if (data) {
         return data;
      }
      return new Error("Error ao consultar os registros.");
   } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Error ao consultar os registros.");
   }
};

const create = async (dados: Omit<IDetalhePessoa, "id">): Promise<number | Error> => {
   try {
      const { data } = await Api.post<IDetalhePessoa>(`/pessoas`, dados);

      if (data) {
         return data.id;
      }
      return new Error("Error ao criar os registros.");
   } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Error ao criar os registros.");
   }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<any | Error> => {
   try {
      await Api.put(`/pessoas/${id}`, dados);
   } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Error ao actualizar os registros.");
   }
};

const deleteById = async (id: number): Promise<any | Error> => {
   try {
      await Api.delete(`/pessoas/${id}`);
   } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || "Error ao apagar os registros.");
   }
};

export const PessoasService = {
   getAll,
   getById,
   create,
   updateById,
   deleteById,
};
