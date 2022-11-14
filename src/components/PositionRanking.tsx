import { TouchableOpacity } from "react-native";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";

export function PositionRanking({ data, position }) {
  // console.log(data);
  const { colors, sizes } = useTheme();
  return (
    <TouchableOpacity>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        space={3}
        // space-between
        // flex-start
        justifyContent="flex-start"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <Avatar
          key={data.user.id}
          source={{ uri: data.user.avatarUrl }}
          w={12}
          h={12}
          rounded="full"
          borderWidth={2}
          marginRight={2}
          borderColor="gray.800"
        >
          {data.user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <HStack w="65%" h={20} alignItems="center" rounded="sm" mb={3} p={4}>
          <VStack>
            <Heading color="white" fontSize="md" fontFamily="heading">
              {data.user.name}
            </Heading>
            <Text color="gray.200" fontSize="xs">
              {data.points} ponto(s)
            </Text>
          </VStack>
        </HStack>

        <VStack bgColor="yellow.500" px={3} py={1} alignItems="center" rounded="xl">
          <Text fontFamily="heading" color="gray.950" fontSize="xs">
            {position}º
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
