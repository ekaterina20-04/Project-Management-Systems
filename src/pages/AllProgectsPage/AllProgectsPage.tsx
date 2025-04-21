import { Text, VStack } from "@chakra-ui/react";
import { ProjectList } from "./ui/ProjectList";

export const AllProjectsPage: React.FC = () => {
  return (
    <>
      <VStack w={"100%"} mt={5}>
        <Text textTransform={"uppercase"} fontSize={"xx-large"} mb={5}>
          Ваши проекты
        </Text>
        <ProjectList />
      </VStack>
    </>
  );
};
