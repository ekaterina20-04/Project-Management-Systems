import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useAllProjects } from "./hooks/useAllProjects";
import { ProjectList } from "./ui/ProjectList";

export const AllProjectsPage: React.FC = () => {
  const { data: projects, isLoading, error } = useAllProjects();
  if (isLoading) {
    return (
      <VStack w={"100%"} justify="center" align="center">
        <Spinner size="xl" />
      </VStack>
    );
  }
  if (error) {
    return (
      <VStack w={"100%"} justify="center" align="center">
        <Text color="red.500">Ошибка загрузки проектов.</Text>
      </VStack>
    );
  }
  if (!projects) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl">Проекты не найдены.</Text>
      </Flex>
    );
  }

  return (
    <>
      <VStack w={"100%"} mt={5}>
        <Text textTransform={'uppercase'} fontSize={'xx-large'} mb={5}>Ваши проекты</Text>
          <ProjectList data={projects.data||[]}/>
      </VStack>
    </>
  );
};
