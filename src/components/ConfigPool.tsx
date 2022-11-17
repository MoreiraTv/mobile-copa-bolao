import { HStack, Switch, Text, useToast } from "native-base";

import { api } from "../services/api";

import { Loading } from "./Loading";
import { useState } from "react";
import { Button } from "../components/Button";

export function ConfigPool({poolId}) {
  const [stateWin, setStateWin] = useState(true);
  const [stateDraw, setStateDraw] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleApResult() {
    try {
      setIsLoading(true);
      await api.get(`/pools/${poolId}/getRanking`);
      toast.show({
        title: "Ranking apurado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi apurado o ranking!",
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Button
        type="SECONDARY"
        title="APURAR RESULTADOS"
        onPress={() => handleApResult()}
        _loading={{ _spinner: { color: "white" } }}
      />
      <HStack alignItems="center" space={8} mt={6}>
        <Text color="white" fontFamily="medium" fontSize="md">
          Pontos por VITORIA
        </Text>
        <Switch
          isChecked={stateWin}
          onChange={() => {
            setStateWin(!stateWin);
          }}
        />
      </HStack>
      <HStack alignItems="center" space={8}>
        <Text color="white" fontFamily="medium" fontSize="md">
          Pontos por EMPATE
        </Text>
        <Switch
          isChecked={stateDraw}
          onChange={() => {
            setStateDraw(!stateDraw);
          }}
        />
      </HStack>
      <Text color="gray.400">
        Caso o palpite seja certeiro o participante irar ganhar 5 pontos no
        ranking, e caso ele acerte a vitoria ou empate do jogo, ira conceder
        apenas 2 pontos, caso esteja ativado na configuração do bolão
      </Text>
    </>
  );
}
