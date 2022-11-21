import { useState, useEffect } from "react";
import { useToast } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall, Trophy } from "phosphor-react-native";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import { New } from "../screens/New";
import { Pools } from "../screens/Pools";
import { Find } from "../screens/Find";
import { Results } from "../screens/ResultsGames";
import { Details } from "../screens/Details";
import { api } from "../services/api";

const { Navigator, Screen } = createBottomTabNavigator();

interface IsMeProps {
  name: String;
  avatarUrl: String;
  sub: String;
  iat: number;
  exp: number;
}

export function AppRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMe, setIsMe] = useState<IsMeProps>({} as IsMeProps);
  const { colors, sizes } = useTheme();
  const toast = useToast();

  const size = sizes[6];

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

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="New"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Novo bolão",
        }}
      />

      <Screen
        name="Poll"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus bolões",
        }}
      />

      <Screen
        name="Find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="Results"
        component={Results}
        options={{
          tabBarIcon: ({ color }) => <Trophy color={color} size={size} />,
          tabBarLabel: "Resultados",
        }}
      />
    </Navigator>
  );
}
