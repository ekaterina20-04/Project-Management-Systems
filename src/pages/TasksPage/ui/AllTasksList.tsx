import { Dialog, Flex, Portal, Spinner, Text, VStack } from "@chakra-ui/react";
import { useSummaryTasks } from "../hooks/useSummaryTasks";
import { SummaryTask } from "@/enteties/SummaryTasks";
import { useEffect, useState } from "react";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";
import { useNavigate } from "react-router-dom";

export const AllTasksList = () => {
  const { data: tasksResponse, isLoading, error } = useSummaryTasks();
  const navigate = useNavigate();
  const [selectedTask, setselectedTask] = useState<number | null>(null);

  const navigateToBoardTask = (boardId: number) => {
    navigate(`/board/${boardId}`);
  };
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
  if (!tasksResponse) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl">Задачи не найдены.</Text>
      </Flex>
    );
  }

  return (
    <>
      {tasksResponse.data.map((task: SummaryTask) => (
        <Flex
          bg="pink.100"
          p={5}
          mb={3}
          key={task.id}
          borderRadius={30}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            fontSize="xl"
            onClick={() => handleOpen(task.id)}
            cursor="pointer"
            flex={1}
          >
            {task.title}
          </Text>
          <Text
            cursor={"pointer"}
            fontSize={"xs"}
            key={task.boardId}
            onClick={() => navigateToBoardTask(task.boardId)}
          >
            Перейти к доске
          </Text>
        </Flex>
      ))}
      {selectedTask !== null && (
        <Dialog.Root
          key={selectedTask}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        >
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
