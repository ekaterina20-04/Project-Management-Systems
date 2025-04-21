import {
  Box,
  Button,
  Dialog,
  Flex,
  HStack,
  Portal,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSummaryTasks } from "../hooks/useSummaryTasks";
import { SummaryTask } from "@/enteties/SummaryTasks";
import { useEffect, useMemo, useState } from "react";
import { TaskModal } from "@/widgets/TaskModal/TaskModal";
import { useNavigate } from "react-router-dom";
import { SelectStatus } from "@/widgets/TaskModal/SelectStatus";
import { SelectedTaskModal } from "@/widgets/TaskModal/SelectTaskModal";
import { Status } from "@/enteties/Board";

export const AllTasksList = () => {
  const { data: tasksResponse, isLoading, error } = useSummaryTasks();
  const navigate = useNavigate();
  const [selectedTask, setselectedTask] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [boardFilter, setBoardFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = useMemo(() => {
    if (!tasksResponse) return [];
    return tasksResponse.data.filter((task: SummaryTask) => {
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesBoard = boardFilter
        ? String(task.boardId) === boardFilter
        : true;
      return matchesStatus && matchesBoard;
    });
  }, [tasksResponse, statusFilter, boardFilter]);
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
    <Flex>
      <Box w="100%">
        <VStack mb={5} w={'100%'} alignItems={'end'}>
        {!showFilters && (
        <Button borderRadius={30} colorPalette={'pink'}  onClick={() => setShowFilters(true)}>
          Фильтровать
        </Button>
      )}
          {showFilters && (
        <VStack  w={'100%'} alignItems={'end'}>
          <SelectStatus value={statusFilter as Status} onChange={setStatusFilter} />
          <SelectedTaskModal value={boardFilter} onChange={setBoardFilter} />
          <Button borderRadius={30} colorPalette={'pink'} onClick={() => setShowFilters(false)}>Скрыть</Button>
        </VStack>
      )}
        </VStack>
        {filteredTasks.map((task: SummaryTask) => (
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
              onClick={() => navigateToBoardTask(task.boardId)}
            >
              Перейти к доске
            </Text>
          </Flex>
        ))}
      </Box>

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
    </Flex>
  );
};
