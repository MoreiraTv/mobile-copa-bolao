import { useState, useEffect } from 'react';
import { useToast } from "native-base";

import { Box } from 'native-base';
import { api } from '../services/api';

import { Game, GameProps} from '../components/Game';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);

  const toast = useToast();


  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`);

      setGames(response.data.games)

    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possivel carregar os jogos!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  },[poolId])

  return (
    <Box>

    </Box>
  );
}
