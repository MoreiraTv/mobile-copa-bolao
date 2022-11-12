import { HStack, useToast, VStack } from "native-base";
import { Share } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import { Option } from "../components/Option";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Guesses } from "../components/Guesses";
import { api } from "../services/api";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

interface RouteParams {
  id: "string";
}

export function DetailsParticipant() {
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [isLoading, setIsLoading] = useState(true);
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
      // console.log(response.data.pool);
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
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title="Titulo do bolão"
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
          </HStack>
          <Guesses poolId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={pollDetails.code} />
      )}
    </VStack>
  );
}
