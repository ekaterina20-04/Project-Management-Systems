import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useSummaryTasks } from "../hooks/useSummaryTasks";
import { SummaryTask } from "@/enteties/SummaryTasks";
import { useMemo, useState } from "react";
import { Status } from "@/enteties/Board";
import { TaskContent } from "./TaskContent";
import { Filters } from "./Filters";

export const AllTasksList = () => {
  const { data: tasksResponse, isLoading, error } = useSummaryTasks();
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [boardFilter, setBoardFilter] = useState<string>("");
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
    <Flex w={"100%"}>
      <Box w="100%">
        <Filters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          boardFilter={boardFilter}
          setBoardFilter={setBoardFilter}
          titleSearch={titleSearch}
          setTitleSearch={setTitleSearch}
          assigneeSearch={assigneeSearch}
          setAssigneeSearch={setAssigneeSearch}
        />
        {filteredTasks.map((task: SummaryTask) => (
          <TaskContent key={task.id} task={task} />
        ))}
      </Box>
    </Flex>
  );
};
