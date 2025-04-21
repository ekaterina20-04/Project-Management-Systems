import { Flex, Text, VStack } from "@chakra-ui/react";
import { AllTasksList } from "./ui/AllTasksList";
import { CreateTaskButton } from "@/features/button/CreateTaskButton";

export const TasksPage: React.FC = () => {
  return (
    <>
      <VStack w={"100%"} mt={5} mb={10}>
        <Text textTransform={'uppercase'} fontSize={'xx-large'} mb={5}>Все задачи</Text>
          <AllTasksList />
        <Flex justifyContent={'end'} w={'100%'}><CreateTaskButton/></Flex>
      </VStack>
    </>
  );
};
