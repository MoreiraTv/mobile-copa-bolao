import { HStack, Switch, Text} from "native-base";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Button } from "../components/Button";

import { useNavigation } from "@react-navigation/native";

export function ConfigPool(poolId, code) {
  const [stateWin, setStateWin] = useState(true);
  const [stateDraw, setStateDraw] = useState(true);
  const { navigate } = useNavigation();
  const route = useRoute();
  return (
    <>
      <Button
        type="SECONDARY"
        title="APURAR RESULTADOS"
        onPress={() =>
          navigate("Results", {
            poolId,
            code,
          })
        }
        _loading={{ _spinner: { color: "white" } }}
      />
      <HStack alignItems="center" space={8} mt={6}>
        <Text color="white" fontFamily="medium" fontSize="md">
          Pontos por VITORIA
        </Text>
        <Switch 
        isChecked={stateWin}
        onChange={()=> {setStateWin(!stateWin)}}
        />
      </HStack>
      <HStack alignItems="center" space={8}>
        <Text color="white" fontFamily="medium" fontSize="md">
          Pontos por EMPATE
        </Text>
        <Switch 
        isChecked={stateDraw}
        onChange={()=> {setStateDraw(!stateDraw)}}
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
