import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAllProjects } from "../AllProgectsPage/hooks/useAllProjects";
import { useSummaryTasksId } from "./hooks/useSummaryTasksId";
import { BoardIdResponse, SummaryBoardId } from "@/enteties/boardId";

export const ProjectPage: React.FC = () => {
  const { boardId } = useParams<string>();
  if (!boardId) {
    return (
      <VStack w="100%" justify="center" align="center">
        <Text color="red.500">ID доски не найден</Text>
      </VStack>
    );
  }
  const tasksQuery = useSummaryTasksId(boardId);

  const boardIdNumber = Number(boardId);
  const projectsQuery  = useAllProjects();
  if (projectsQuery.isLoading || tasksQuery.isLoading) {
    return (
      <VStack w={"100%"} justify="center" align="center">
        <Spinner size="xl" />
      </VStack>
    );
  }
  if (projectsQuery.error || tasksQuery.error) {
    return (
      <VStack w={"100%"} justify="center" align="center">
        <Text color="red.500">Ошибка </Text>
      </VStack>
    );
  }
  if (!projectsQuery.data || !tasksQuery.data) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl">Проекты не найдены.</Text>
      </Flex>
    );
  }
  const selectedBoard = projectsQuery.data.data.find(
    (projects) => projects.id === boardIdNumber
  );
  const titleOfBoard = selectedBoard?.name;
  return (
    <>
      <VStack mt={5}>
        <Flex justifyContent={"start"} ml={0}>
          <Text textTransform={"uppercase"} fontSize={"xl"}>
            {titleOfBoard}
          </Text>
        </Flex>
        {(tasksQuery.data.data).map((board:SummaryBoardId) => (
        <Flex
          key={board.id}
          bg={"pink.100"}
          w={"100%"}
          p={5}
          borderRadius={30}
          mb={3}
          cursor={'pointer'}
        >
          <Text ml={5} fontSize={"xl"}>
            {board.title}
          </Text>
        </Flex>
      ))}
      </VStack>
    </>
  );
};
