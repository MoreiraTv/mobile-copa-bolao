import { Button, HStack, Text, useTheme, VStack, useToast } from 'native-base';
import { useState, useEffect } from "react";
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list-pt';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Team } from './Team';
import { api } from '../services/api';
import { Loading } from './Loading';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  resultFirstTeam: number;
  resultSecoundTeam: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secoundTeamCountryCode: string;
  resultFirstTeam: number;
  resultSecoundTeam: number;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onResultConfirm: () => void;
  setResultFirstTeam: (value: string) => void;
  setResultSecoundTeam: (value: string) => void;
};

interface IsMeProps {
  name: String;
  avatarUrl: String;
  sub: String;
  iat: number;
  exp: number;
}

export function GameResult({ data, setResultFirstTeam, setResultSecoundTeam, onResultConfirm }: Props) {
  const [isMe, setIsMe] = useState<IsMeProps>({} as IsMeProps);
  const [isLoading, setIsLoading] = useState(true);
  const { colors, sizes } = useTheme();
  const toast = useToast();
  // const dataBR = data.date.toLocaleString('pt-BR');
  const when = dayjs(data.date).locale('pt-br').format('DD [de] MMMM [de] YYYY [ás] HH:00[h]');

  if(data.resultFirstTeam !== null){
    data.resultFirstTeam
    data.resultSecoundTeam
  }

  async function fetchIsMe() {
    try {
      setIsLoading(true);

      const responseIsMe = await api.get(`/me`);
      setIsMe(responseIsMe.data.user);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os detalhes do usuario!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchIsMe();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {
          getName(data.firstTeamCountryCode)
        } vs. {
          getName(data.secoundTeamCountryCode)
        }
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setResultFirstTeam}
          value={data.resultFirstTeam !== null ? data.resultFirstTeam : null}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secoundTeamCountryCode}
          position="left"
          onChangeText={setResultSecoundTeam}
          value={data.resultSecoundTeam !== null ? data.resultSecoundTeam : null}
        />
      </HStack>

      {
        data.resultFirstTeam == null && isMe.sub == "cla4eejvb0000tm1ge17c8xj4" &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onResultConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR RESULTADO
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}