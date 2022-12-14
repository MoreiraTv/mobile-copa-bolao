import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import { getName } from "country-list-pt";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { Team } from "./Team";

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secoundTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secoundTeamCountryCode: string;
  resultFirstTeam: number;
  resultSecoundTeam: number;
  guess: null | GuessProps;
}

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecoundTeamPoints: (value: string) => void;
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecoundTeamPoints,
  onGuessConfirm,
}: Props) {
  const { colors, sizes } = useTheme();
  // const dataBR = data.date.toLocaleString('pt-BR');
  const when = dayjs(data.date)
    .locale("pt-br")
    .format("DD [de] MMMM [de] YYYY [ás] HH:00[h]");

  if (data.guess !== null) {
    data.guess.firstTeamPoints;
    data.guess.secoundTeamPoints;
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
        {getName(data.firstTeamCountryCode)} vs.{" "}
        {getName(data.secoundTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          value={data.guess !== null ? data.guess.firstTeamPoints : null}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secoundTeamCountryCode}
          position="left"
          onChangeText={setSecoundTeamPoints}
          value={data.guess !== null ? data.guess.secoundTeamPoints : null}
        />
      </HStack>

      {new Date(data.date) > new Date(Date.now()) ? (
        !data.guess && (
          <Button
            size="xs"
            w="full"
            bgColor="green.500"
            mt={4}
            onPress={onGuessConfirm}
          >
            <HStack alignItems="center">
              <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
                CONFIRMAR PALPITE
              </Text>

              <Check color={colors.white} size={sizes[4]} />
            </HStack>
          </Button>
        )
      ) : (
        <>
          <Text color="gray.200" fontSize="sm">Tempo para palpite esgotado!</Text>
        </>
      )}
    </VStack>
  );
}
