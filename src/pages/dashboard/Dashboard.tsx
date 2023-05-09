import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramentasDaListagem } from "../../shared/components";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="pagina inicial"
      barraDeFerramentas={
        <FerramentasDaListagem mostrarInputBusca textoBotaoNovo="Nova" />
      }
    >
      testando
    </LayoutBaseDePagina>
  );
};
