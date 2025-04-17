import { Text, VStack } from "@chakra-ui/react";
import { AllTasksList } from "./ui/AllTasksList";

export const TasksPage: React.FC = () => {
  return (
    <>
      <VStack w={"100%"} mt={5}>
        <Text textTransform={'uppercase'} fontSize={'xx-large'} mb={5}>Все задачи</Text>
          <AllTasksList />
      </VStack>
    </>
  );
};
