import { summaryProject } from "@/enteties/summaryProjects";
import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAllProjects } from "../hooks/useAllProjects";

export const ProjectList = () => {
  const { data: projects, isLoading, error } = useAllProjects();

  const navigate = useNavigate();
  const navigateToBorderId = (borderId: number) => {
    navigate(`board/${borderId}`);
  };

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
      {projects.data.map((project: summaryProject) => (
        <Flex
          key={project.id}
          bg={"pink.100"}
          w={"100%"}
          p={5}
          borderRadius={30}
          mb={3}
          cursor={"pointer"}
          onClick={() => navigateToBorderId(project.id)}
        >
          <Text ml={5} fontSize={"xl"}>
            {project.name}
          </Text>
        </Flex>
      ))}
    </>
  );
};
