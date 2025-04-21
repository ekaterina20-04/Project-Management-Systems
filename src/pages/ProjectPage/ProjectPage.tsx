import { Dialog, Portal, Spinner, Text, VStack } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { useAllProjects } from "../AllProgectsPage/hooks/useAllProjects";
import { useSummaryTasksId } from "./hooks/useSummaryTasksId";
import { useState, useEffect } from "react";
import { useUpdatingTaskStatus } from "./hooks/useUpdatingTaskStatus";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";
import { StatusColumns } from "./ui/StatusColumns";

export const ProjectPage: React.FC = () => {
  const { boardId } = useParams<string>();
  const boardIdNumber = Number(boardId);
  const { mutate: updateStatus } = useUpdatingTaskStatus();
  const tasksQuery = useSummaryTasksId(boardId || "");
  const projectsQuery = useAllProjects();
  const { state } = useLocation() as { state?: { openTaskId?: number } };
  const openTaskId = state?.openTaskId;
  const [selectedTask, setselectedTask] = useState<number | null>(null);

  const handleClose = () => {
    setselectedTask(null);
  };
  useEffect(() => {
    if (openTaskId) {
      setselectedTask(openTaskId);
    }
  }, [openTaskId]);

  if (!boardId) {
    return <Text color="red.500">ID доски не найден</Text>;
  }

  if (projectsQuery.isLoading || tasksQuery.isLoading) {
    return <Spinner size="xl" />;
  }

  if (projectsQuery.error || tasksQuery.error) {
    return <Text color="red.500">Ошибка загрузки</Text>;
  }

  const selectedBoard = projectsQuery.data?.data.find(
    (p) => p.id === boardIdNumber
  );
  const titleOfBoard = selectedBoard?.name;

  return (
    <VStack gap={5} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">
        {titleOfBoard}
      </Text>
      <StatusColumns
        updateStatus={updateStatus}
        tasks={tasksQuery.data?.data || []}
        onTaskClick={(id) => setselectedTask(id)}
      />
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
    </VStack>
  );
};
