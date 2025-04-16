import { Text, VStack } from "@chakra-ui/react";
import { AllTasksList } from "./ui/AllTasksList";

export const TasksPage: React.FC = () => {
  return (
    <>
      <VStack>
        <Text>Все задачи</Text>
        <AllTasksList/>
      </VStack>
    </>
  );
};
