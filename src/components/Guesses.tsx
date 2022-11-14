import { useState, useEffect } from "react";
import { useToast, FlatList } from "native-base";

import { api } from "../services/api";

import { Loading } from "./Loading";
import { Game, GameProps } from "../components/Game";
import { EmptyMyPoolList } from "./EmptyMyPoolList";

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secoundTeamPoints, setSecoundTeamPoints] = useState("");
  console.log(poolId)
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);

      // console.log(response.data.games);
      setGames(response.data.games);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os jogos!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      setIsLoading(true);
      if (!firstTeamPoints.trim() || !secoundTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar do palpite!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secoundTeamPoints: Number(secoundTeamPoints),
      });
      toast.show({
        title: "Palpite realizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      fetchGames();
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel enviar o palpite!",
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Game
            data={item}
            setFirstTeamPoints={setFirstTeamPoints}
            setSecoundTeamPoints={setSecoundTeamPoints}
            onGuessConfirm={() => handleGuessConfirm(item.id)}
          />
        )}
        _contentContainerStyle={{ pb: 20 }}
        ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
      />
    </>
  );
}
