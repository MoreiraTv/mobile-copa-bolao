import { useCallback, useState } from "react";
import { VStack, useToast, FlatList } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../components/Header";
import { ResultsGames } from "../components/ResultsGames";

export function Results() {

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title="Resultados dos jogos"
        showBackButton={true}
        showShareButton={false}
        onShare={() => {}}
      />
      <ResultsGames />
    </VStack>
  );
}
