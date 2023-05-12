import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useEffect, useState  } from "react";
import { LinearProgress } from "@mui/material";


export const DetalheDePessoas: React.FC = () => {
  const navigate = useNavigate();
  const { id = "nova" } = useParams<"id">();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState(' ')

  useEffect(() => {
    if (id !== "nova") {
        setIsLoading(true);
        PessoasService.getById(Number(id))
            .then((result) => {
                setIsLoading(false)
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                } else {
                    setNome(result.nomeCompleto)
                    console.log(result)
                }
            });
    }       
  }, [ id, navigate ]);

  const handleSave = () => {
    console.log("Salvar");
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Deseja realmente apagar esse registro?"
    );
    if (confirmDelete) {
      PessoasService.deleteById(id)
      .then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {          
          alert("Registro apagado com sucesso!");
          navigate('/pessoas')
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={ id === "nova" ? "Nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
        {isLoading && (
            <LinearProgress variant= 'indeterminate' />
        )}

      <p>Detalhe de pessoas {id}</p>
    </LayoutBaseDePagina>
  );
};
