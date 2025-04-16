import { Button,  Flex,  HStack, Text, VStack } from "@chakra-ui/react";

export const Header: React.FC = () => {
  return (
    <HStack my={5} justifyContent={'space-between'} w={'100%'} >
    <HStack cursor={'pointer'} fontSize={'xl'} gap={10} fontWeight={500}>
        <Text >Все задачи</Text>
        <Text cursor={'pointer'}>Проекты</Text>
    </HStack>
    <Button colorPalette={"pink"} borderRadius={30} pb={1}>Создать задачу</Button>
  </HStack>
  );
};
