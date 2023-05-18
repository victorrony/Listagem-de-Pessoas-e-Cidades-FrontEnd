import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cidadeId");
  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );
  const [isLoading, setIsLoading] = useState(false);
  const { debounce } = useDebounce();
  const [busca, setBusca] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [selectedId, fieldName, registerField]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          // alert(result.message);
        } else {
          console.log(result);

          setOpcoes(
            result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
          );
        }
      });
    });
  }, [busca, debounce]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find((opcoes) => opcoes.id === selectedId);
    if (!selectedOption) return null;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="sem opcoes"
      loadingText="carregando..."
      disablePortal
      options={opcoes}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onInputChange={(_, newValue) => setBusca(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
        clearError();
      }}
    />
  );
};
