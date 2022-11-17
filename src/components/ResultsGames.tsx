import { useState, useEffect } from "react";
import { useToast, FlatList } from "native-base";

import { api } from "../services/api";

import { Loading } from "./Loading";
import { GameResult, GameProps } from "./GameResult";


export function ResultsGames() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [resultFirstTeam, setResultFirstTeam] = useState("");
  const [resultSecoundTeam, setResultSecoundTeam] = useState("");
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/games`);

      setGames(response.data.games);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os jogos!",
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResultConfirm(gameId: string) {
    try {
      setIsLoading(true);
      if (!resultFirstTeam.trim() || !resultSecoundTeam.trim()) {
        return toast.show({
          title: "Informe o placar do jogo!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/games/${gameId}/result`, {
        resultFirstTeam: Number(resultFirstTeam),
        resultSecoundTeam: Number(resultSecoundTeam),
      });
      toast.show({
        title: "Resultado enviado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      fetchGames();
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel enviar o resultado!",
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
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameResult
            data={item}
            setResultFirstTeam={setResultFirstTeam}
            setResultSecoundTeam={setResultSecoundTeam}
            onResultConfirm={() => handleResultConfirm(item.id)}
          />
        )}
        _contentContainerStyle={{ pb: 20 }}
      />
    </>
  );
}
