import { Dialog, Flex, Portal, Spinner, Text, VStack } from "@chakra-ui/react";
import { useSummaryTasks } from "../hooks/useSummaryTasks";
import { SummaryTask } from "@/enteties/SummaryTasks";
import { useEffect, useState } from "react";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";

export const AllTasksList = () => {
  const { data: tasksResponse, isLoading, error } = useSummaryTasks();
  console.log("data", tasksResponse);
  const [selectedTask, setselectedTask] = useState<number | null>(null);
  const tasks: SummaryTask[] = tasksResponse?.data ?? [];

  const handleOpen = (id: number) => {
    setselectedTask(id);
  };
  const handleClose = () => {
    setselectedTask(null);
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
        <Flex
          key={task.id}
          bg="pink.100"
          p={5}
          mb={3}
          borderRadius={30}
          cursor="pointer"
          onClick={() => handleOpen(task.id)}
          w={'100%'}
        >
          <Text fontSize="xl">{task.title}</Text>
        </Flex>
      ))}
      {selectedTask !== null && (
        <Dialog.Root
          key={selectedTask}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}        >
          <Dialog.Trigger></Dialog.Trigger>
          <Portal>
            <TaskModal
              initialMode="view"
              taskId={selectedTask}
              isOpen={selectedTask !== null}
              onClose={handleClose}
            />
          </Portal>
        </Dialog.Root>
      )}
    </>
  );
};
