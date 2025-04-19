import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SelectedTaskModal } from "./SelectTaskModal";
import { SelectUsers } from "./SelectUsers";
import { SelectPrioriety } from "./SelectPrioriety";
import { SelectStatus } from "./SelectStatus";
import { useAllProjects } from "@/pages/AllProgectsPage/hooks/useAllProjects";
import { useGetUsers } from "@/features/useGetUsers";
import { useCreateTasks } from "@/features/useCreateTask";
import { useEffect, useState } from "react";
import { Priority, Status } from "@/enteties/Board";
import { TaskCreatePequest } from "@/enteties/Task";
import { useUpdateTask } from "@/features/useUpdateTask";
import { useGetTask } from "@/features/useGetTask";
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: number;
  initialMode: "create" | "view";
  onSuccess?: () => void;
}
type Mode = "create" | "view" | "edit";
interface CreateFormState {
  title: string;
  description: string;
  boardId: string;
  assigneeId: string;
  priority: Priority | "";
  status: Status | "";
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  taskId,
  initialMode,
  onSuccess,
}) => {
  const [mode, setMode] = useState<Mode>(
    initialMode === "create" ? "create" : "view"
  );
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode === "create" ? "create" : "view");
      resetForm();
    }
  }, [initialMode, isOpen]);
  
  
  const isCreate = mode === "create";
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const { data: task, isLoading: loadingTask } = useGetTask(taskId!, {
    enabled: isOpen && !!taskId,
  });
  const { data: projectsResponse } = useAllProjects();
  const { data: usersResponse } = useGetUsers();
  const createTask = useCreateTasks();
  const updateTask = useUpdateTask();
  const projects = projectsResponse?.data ?? [];
  const users = usersResponse?.data ?? [];

  const [form, setForm] = useState<CreateFormState>({
    title: "",
    description: "",
    boardId: "",
    assigneeId: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (!isCreate&& isOpen && task) {
      setForm({
        title: task.title,
        description: task.description,
        boardId: String(task.boardName),
        assigneeId: String(task.assignee.id),
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task, isCreate,isOpen]);

  const handleChange = <K extends keyof CreateFormState>(field: K) =>
    (value: CreateFormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));}
  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      boardId: "",
      assigneeId: "",
      priority: "",
      status: "",
    });

  const handleSubmit = async () => {
    if (isCreate) {
      const payload: TaskCreatePequest = {
        title: form.title,
        description: form.description,
        boardId: Number(form.boardId),
        assigneeId: Number(form.assigneeId),
        priority: form.priority as Priority,
      };
      await createTask.mutateAsync(payload);
    } else {
      const payload = {
        taskId: taskId!,
        data:{
        title:String(form.title),
        description: String(form.description),
        assigneeId: Number(form.assigneeId),
        priority: form.priority as Priority,
        status: form.status as Status},
      };
      await updateTask.mutateAsync(payload);
    }
    resetForm();
    onSuccess?.();
    onClose();
  };

  return (
    <>
      <Dialog.Backdrop zIndex={1} />
      <Dialog.Positioner
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={0}
        zIndex={2}
      >
        <Dialog.Content w={400} p={0}>
          <Dialog.Header>
            <Dialog.Title>
              <Flex color={"black"} fontSize={"xl"} fontWeight={500}>
                <Text>
                  {isCreate
                    ? "Создать задачу"
                    : isView
                    ? "Информация о задаче"
                    : "Редактирование задачи"}
                </Text>
              </Flex>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body w={"90%"}>
            {!isCreate && loadingTask ? (
              <Spinner />
            ) : (
              <VStack justifyContent={"center"}>
                <>
                  {isView ? (
                    <Text>{form.title}</Text>
                  ) : (
                    <Input
                      placeholder="Название задачи"
                      w={"100%"}
                      p={2}
                      onChange={(e) => handleChange("title")(e.target.value)}
                    />
                  )}
                  {isView ? (
                    <Text>{form.description}</Text>
                  ) : (
                    <Input
                      placeholder="Описание задачи"
                      w={"100%"}
                      p={2}
                      mt={2}
                      onChange={(e) =>
                        handleChange("description")(e.target.value)
                      }
                    />
                  )}
                  {isView ? (
                    <Text>
                      
                      {
                        projects?.find((p) => p.id === Number(form.boardId))
                          ?.name
                      }
                    </Text>
                  ) : (
                    <SelectedTaskModal
                      value={form.boardId}
                      onChange={(v) => handleChange("boardId")(v)}
                    />
                  )}
                  {isView ? (
                    <Text>{form.priority}</Text>
                  ) : (
                    <SelectPrioriety
                      value={form.priority}
                      onChange={(v) => handleChange("priority")(v)}
                    />
                  )}
                  {isView ? (
                    <Text>{form.status}</Text>
                  ) : (
                    <SelectStatus
                      value={form.status}
                      onChange={(v) => handleChange("status")(v)}
                    />
                  )}
                  {isView ? (
                    <Text>
                      {" "}
                      {
                        users?.find((u) => u.id === Number(form.assigneeId))
                          ?.fullName
                      }
                    </Text>
                  ) : (
                    <SelectUsers
                      value={form.assigneeId}
                      onChange={(v) => handleChange("assigneeId")(v)}
                    />
                  )}
                </>
              </VStack>
            )}
          </Dialog.Body>
          <Dialog.Footer pb={6}>
            <>
            {isView && (
            <Button mr={3} onClick={() => setMode("edit")}>Редактировать</Button>
          )}
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  Закрыть
                </Button>
              </Dialog.ActionTrigger>
              {(isCreate || isEdit) && (
            <Button colorPalette="pink" ml={3} onClick={handleSubmit}>
              {isCreate ? "Создать" : "Сохранить"}
            </Button>
          )}
            </>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};
