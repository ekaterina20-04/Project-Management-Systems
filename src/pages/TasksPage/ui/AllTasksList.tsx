import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useSummaryTasks } from "../hooks/useSummaryTasks";
import { SummaryTask, TasksResponse } from "@/enteties/SummaryTasks";

export const AllTasksList=({data}:TasksResponse) =>{
    const { data: tasks, isLoading, error } = useSummaryTasks();
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
    if (!tasks) {
      return (
        <Flex justify="center" align="center" h="100vh">
          <Text fontSize="xl">Проекты не найдены.</Text>
        </Flex>
      );
    }
  return (
    <>
    {(tasks.data).map((board:SummaryTask) => (
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
      </>
  )
}
