import {
  Dialog,
  Flex,
  Portal,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSummaryTasks } from "../hooks/useSummaryTasks";
import { SummaryTask } from "@/enteties/SummaryTasks";
import { useState } from "react";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";

export const AllTasksList = () => {
  const { data: tasksResponse, isLoading, error } = useSummaryTasks();
  console.log('data', tasksResponse)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const tasks: SummaryTask[] = tasksResponse?.data ?? [];

  const handleOpen = (id: number) => {
    
    setSelectedTaskId(id);

  };
  const handleClose = () => {
    setSelectedTaskId(null);
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
        <Text color="red.500">Ошибка загрузки задач.</Text>
      </VStack>
    );
  }
  if (tasks.length === 0) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl">Задачи не найдены.</Text>
      </Flex>
    );
  }
  return (
    <>
      {tasks.map((task: SummaryTask) => (
        <Dialog.Root
          key={task.id}
          open={selectedTaskId === task.id}
          onOpenChange={(open) => !open && setSelectedTaskId(null)}
        >
          <Dialog.Trigger asChild>
            <Flex
              key={task.id}
              bg={"pink.100"}
              w={"100%"}
              p={5}
              borderRadius={30}
              mb={3}
              cursor={"pointer"}
              onClick={() => handleOpen(task.id)}
            >
              <Text ml={5} fontSize={"xl"}>
                {task.title}
              </Text>
            </Flex>
          </Dialog.Trigger>
          <Portal>
            <TaskModal
              initialMode="view"
              taskId={task.id}
              isOpen={selectedTaskId === task.id}
              onClose={handleClose}
            />
          </Portal>
        </Dialog.Root>
      ))}
    </>
  );
};
