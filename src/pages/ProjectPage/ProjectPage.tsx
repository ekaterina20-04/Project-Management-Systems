import { Box, Dialog, Flex, Portal, Spinner, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { useLocation, useParams } from "react-router-dom";
import { useAllProjects } from "../AllProgectsPage/hooks/useAllProjects";
import { useSummaryTasksId } from "./hooks/useSummaryTasksId";

import { useState, useEffect } from "react";
import { useUpdatingTaskStatus } from "./hooks/useUpdatingTaskStatus";
import { Status, SummaryBoardId } from "@/enteties/Board";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";

const STATUSES: Status[] = ["Backlog", "InProgress", "Done"];

export const ProjectPage: React.FC = () => {
  const direction = useBreakpointValue({ base: "column", lg: "row" });

  const { boardId } = useParams<string>();
  const boardIdNumber = Number(boardId);
  const {mutate:updateStatus}=useUpdatingTaskStatus();
  const tasksQuery = useSummaryTasksId(boardId || "");
  const projectsQuery = useAllProjects();
  const { state } = useLocation() as { state?: { openTaskId?: number } };
  const openTaskId = state?.openTaskId;
  const [selectedTask, setselectedTask] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setselectedTask(id);
  };
  const handleClose = () => {
    setselectedTask(null);
  };
  useEffect(() => {
    if (openTaskId) {
      setselectedTask(openTaskId);
    }
  }, [openTaskId]);
  const [columns, setColumns] = useState<Record<Status, SummaryBoardId[]>>({
    Backlog: [],
    InProgress: [],
    Done: [],
  });

  useEffect(() => {
    if (tasksQuery.data) {
      const tasks = tasksQuery.data.data;
      console.log("tasks", tasks);
      const grouped: Record<Status, SummaryBoardId[]> = {
        Backlog: [],
        InProgress: [],
        Done: [],
      };
      tasks.forEach((task) => {
        console.log(task);
        console.log("task.status:", task.status);
        grouped[task.status].push(task);
      });
      setColumns(grouped);
    }
  }, [tasksQuery.data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceCol = source.droppableId as Status;
    const destCol = destination.droppableId as Status;

    if (sourceCol === destCol && source.index === destination.index) return;

    const task = columns[sourceCol][source.index];

    const newSource = Array.from(columns[sourceCol]);
    const [movedTask] = newSource.splice(source.index, 1);

    const newDestination = Array.from(columns[destCol]);
    newDestination.splice(destination.index, 0, movedTask);

    const newColumns = {
      ...columns,
      [sourceCol]: newSource,
      [destCol]: newDestination,
    };

    setColumns(newColumns);

    if (task.status !== destCol) {
      updateStatus({ taskId: task.id, status: destCol });
    }
  };

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
    <VStack gap={5} align="stretch" >
      <Text fontSize="2xl" fontWeight="bold">
        {titleOfBoard}
      </Text>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex gap={4} overflowX="auto" flexDir={direction}>
          {STATUSES.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <VStack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  w="300px"
                  p={4}
                  borderRadius="lg"
                  align="stretch"
                  bg={'pink.100'}
                >
                  <Text fontSize="lg" fontWeight="semibold">
                    {status}
                  </Text>
                  {columns[status].map((task, index) => (
                    
                    <Draggable
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          bg="white"
                          p={4}
                          borderRadius="md"
                          boxShadow="md"
                          onClick={() => handleOpen(task.id)}  // открываем модалку
                          cursor={'pointer'}
                        >
                          <Text fontWeight="medium">{task.title}</Text>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          ))}
        </Flex>
      </DragDropContext>
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
    </VStack>
  );
};
