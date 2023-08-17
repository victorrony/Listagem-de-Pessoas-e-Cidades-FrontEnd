import { Api } from "../axios-config";
import { Enviroment } from "../../../environment";

export interface IListagemCidade {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = " "
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelative = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

    const { data, headers } = await Api.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Enviroment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error("Error ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }
    return new Error("Error ao consultar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Error ao consultar os registros."
    );
  }
};

const create = async (
  dados: Omit<IDetalheCidade, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>(`/cidades`, dados);

    if (data) {
      return data.id;
    }
    return new Error("Error ao criar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao criar os registros."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheCidade
): Promise<any | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Error ao actualizar os registros."
    );
  }
};

const deleteById = async (id: number): Promise<any | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao apagar os registros."
    );
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
