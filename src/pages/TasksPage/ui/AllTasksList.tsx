import {
  Box,
  Button,
  Dialog,
  Flex,
  HStack,
  Input,
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
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [assigneeSearch, setAssigneeSearch] = useState<string>("");

  const filteredTasks = useMemo(() => {
    if (!tasksResponse) return [];
    return tasksResponse.data.filter((task: SummaryTask) => {
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesBoard = boardFilter
        ? String(task.boardId) === boardFilter
        : true;
      const matchesTitle = titleSearch
        ? task.title.toLowerCase().includes(titleSearch.toLowerCase())
        : true;
      const matchesAssignee = assigneeSearch
        ? task.assignee.fullName
            .toLowerCase()
            .includes(assigneeSearch.toLowerCase())
        : true;
      return matchesStatus && matchesBoard && matchesTitle && matchesAssignee;
    });
  }, [tasksResponse, statusFilter, boardFilter, titleSearch, assigneeSearch]);
  const navigateToBoardTask = (boardId: number, taskId:number) => {
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
    <Flex w={'100%'}>
      <Box w="100%">
        <VStack mb={5} w={"100%"} alignItems={"end"}>
          {!showFilters && (
            <Flex w={'100%'} justifyContent={'end'}>
            <Button
              borderRadius={30}
              colorPalette={"pink"}
              onClick={() => setShowFilters(true)}
              
            >
              Фильтровать
            </Button></Flex>
          )}
          {showFilters && (
            <HStack mb={5} alignItems={"start"}>
              <VStack mt={4}>
                <Input
                  placeholder="По названию задачи"
                  size="sm"
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  maxW="200px"
                />
                <Input
                  placeholder="По исполнителю"
                  size="sm"
                  value={assigneeSearch}
                  onChange={(e) => setAssigneeSearch(e.target.value)}
                  maxW="200px"
                  mt={2}
                />
              </VStack>
              <VStack>
                <SelectStatus
                  value={statusFilter as Status}
                  onChange={setStatusFilter}
                />
                <SelectedTaskModal
                  value={boardFilter}
                  onChange={setBoardFilter}
                />
                <Flex justifyContent={"end"} w={"100%"}>
                  <Button
                    onClick={() => setShowFilters(false)}
                    colorPalette={"pink"}
                    borderRadius={30}
                  >
                    Скрыть
                  </Button>
                </Flex>
              </VStack>
            </HStack>
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
              onClick={() => navigateToBoardTask(task.boardId, task.id)}
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
