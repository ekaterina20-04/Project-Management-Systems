import { Status, SummaryBoardId } from "@/enteties/Board";
import { Box, Flex, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

const STATUSES: Status[] = ["Backlog", "InProgress", "Done"];

interface StatusColumnsProps {
  updateStatus: (params: { taskId: number; status: Status }) => void;
  tasks: SummaryBoardId[];
  onTaskClick: (taskId: number) => void;
}

export const StatusColumns: React.FC<StatusColumnsProps> = ({
  updateStatus,
  tasks,
  onTaskClick,
}) => {
  const direction = useBreakpointValue({ base: "column", lg: "row" });

  const [columns, setColumns] = useState<Record<Status, SummaryBoardId[]>>({
    Backlog: [],
    InProgress: [],
    Done: [],
  });

  useEffect(() => {
    const grouped: Record<Status, SummaryBoardId[]> = {
      Backlog: [],
      InProgress: [],
      Done: [],
    };
    tasks.forEach((task) => grouped[task.status].push(task));
    setColumns(grouped);
  }, [tasks]);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

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
  return (
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
                bg={"pink.100"}
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
                        onClick={() => onTaskClick(task.id)}
                        cursor={"pointer"}
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
  );
};
