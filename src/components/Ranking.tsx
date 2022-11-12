import { useState, useEffect } from "react";
import { useToast, FlatList, VStack, Text } from "native-base";

import { api } from "../services/api";

import { Loading } from "./Loading";
// import { Game, GameProps } from "../components/Game";
import { EmptyRakingList } from "./EmptyRakingList";
import { PositionRanking } from "./PositionRanking";

interface Props {
  poolId: string;
}

export function Ranking({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState([]);

  const toast = useToast();

  async function fetchRanking() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/ranking`);

      setRanking(response.data.ranking);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar o ranking!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRanking();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        data={ranking}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PositionRanking
          data={item}
          position={index+1}
          />
        )}
        _contentContainerStyle={{ pb: 10 }}
        ListEmptyComponent={() => <EmptyRakingList />}
      />
    </>
  );
}
