import { SummaryTask } from "@/enteties/SummaryTasks";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";
import { Box, Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface TaskContentProps {
  task: SummaryTask;
}
export const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  const navigate = useNavigate();
  const [selectedTask, setselectedTask] = useState<number | null>(null);
  const navigateToBoardTask = (boardId: number, taskId: number) => {
    navigate(`/board/${boardId}`, {
      state: { openTaskId: taskId },
    });
  };
  const handleOpen = (id: number) => {
    setselectedTask(id);
  };
  const handleClose = () => {
    setselectedTask(null);
  };

  return (
    <Box>
      <Flex
        key={task.id}
        bg="pink.100"
        p={5}
        mb={3}
        borderRadius={30}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
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
          cursor="pointer"
          fontSize="xs"
          onClick={() => navigateToBoardTask(task.boardId, task.id)}
        >
          Перейти к доске
        </Text>
      </Flex>
      {selectedTask !== null && (
        <Dialog.Root
          open={true}
          onOpenChange={(open) => !open && handleClose()}
        >
          <Dialog.Trigger />
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
    </Box>
  );
};
