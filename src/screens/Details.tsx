import { HStack, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Share } from "react-native";
import { useState, useEffect } from "react";

import { Option } from "../components/Option";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Guesses } from "../components/Guesses";
import { Ranking } from "../components/Ranking";
import { api } from "../services/api";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { ConfigPool } from "../components/ConfigPool";

interface RouteParams {
  id: "string";
}
interface IsMeProps {
  name: String;
  avatarUrl: String;
  sub: String;
  iat: number;
  exp: number;
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<
    "guesses" | "ranking" | "config"
  >("guesses");
  const [isLoading, setIsLoading] = useState(true);
  const [isMe, setIsMe] = useState<IsMeProps>({} as IsMeProps);
  const [pollDetails, setPollDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  async function fetchPollDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPollDetails(response.data.pool);
      const responseIsMe = await api.get(`/me`);
      setIsMe(responseIsMe.data.user);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os detalhes do bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb="5">
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />

            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />

            {pollDetails.ownerId === isMe.sub ? (
              <Option
                title="Configuração"
                isSelected={optionSelected === "config"}
                onPress={() => setOptionSelected("config")}
              />
            ) : (
              <></>
            )}
          </HStack>
          {optionSelected === "guesses" ? (
            <Guesses poolId={pollDetails.id} code={pollDetails.code} />
          ) : optionSelected === "ranking" ? (
            <Ranking poolId={pollDetails.id} />
          ) : pollDetails.ownerId === isMe.sub ? (
            <ConfigPool poolId={pollDetails.id} />
          ) : (
            <></>
          )}
        </VStack>
      ) : (
        <EmptyMyPoolList code={pollDetails.code} />
      )}
    </VStack>
  );
}
