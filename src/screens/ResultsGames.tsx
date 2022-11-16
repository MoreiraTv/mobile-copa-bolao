import { useCallback, useState } from "react";
import { VStack, useToast, FlatList } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { ResultsGames } from "../components/ResultsGames";

interface RouteParams {
  poolId: "string";
  code: "string";
}

export function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [poll, setPoll] = useState<PoolCardProps[]>([]);

  const route = useRoute();
  const toast = useToast();

  const { poolId, code } = route.params as RouteParams;

  async function fetchPolls() {
    try {
      setIsLoading(true);

      const response = await api.get("/pools");
      setPoll(response.data.pools);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel carregar os bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title="Resultados dos jogos"
        showBackButton={true}
        showShareButton={false}
        onShare={() => {}}
      />
      {isLoading ? <Loading /> : <ResultsGames poolId={poolId} code={code} />}
    </VStack>
  );
}
