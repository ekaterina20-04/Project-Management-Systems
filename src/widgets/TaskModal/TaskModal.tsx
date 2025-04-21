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
import { useCreateTasks } from "@/features/useCreateTask";
import { useEffect, useState } from "react";
import { Priority, Status } from "@/enteties/Board";
import { TaskCreatePequest, TaskUpdatePequest } from "@/enteties/Task";
import { useUpdateTask } from "@/features/useUpdateTask";
import { useGetTask } from "@/features/useGetTask";
import { CreateFormState, Mode, TaskModalProps } from "@/enteties/Modal";

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

  const { data, isLoading: loadingTask } = useGetTask(taskId!, {
    enabled: typeof taskId === "number",
  });

  const createTask = useCreateTasks();
  const updateTask = useUpdateTask();

  const task = data?.data;

  const [form, setForm] = useState<CreateFormState>({
    title: "",
    description: "",
    boardId: "",
    assigneeId: "",
    assigneeName: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (!isCreate && isOpen && task) {
      setForm({
        title: task.title,
        description: task.description,
        boardId: String(task.boardName),
        assigneeId: String(task.assignee.id),
        assigneeName: String(task.assignee.fullName),
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task, isCreate, isOpen]);

  const handleChange =
    <K extends keyof CreateFormState>(field: K) =>
    (value: CreateFormState[K]) => {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      boardId: "",
      assigneeId: "",
      assigneeName: "",
      priority: "",
      status: "",
    });

  const handleSubmit = async () => {
    try {
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
        const payload: TaskUpdatePequest = {
          title: String(form.title),
          description: String(form.description),
          assigneeId: Number(form.assigneeId),
          priority: form.priority as Priority,
          status: form.status as Status,
        };
        await updateTask.mutateAsync({ taskId: taskId!, data: payload });
      }
      resetForm();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      alert("Не удалось отправить форму");
    }
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
                    <Text w={"100%"} pl={2}>
                      Задача: {form.title}
                    </Text>
                  ) : (
                    <Input
                      placeholder="Название задачи"
                      w={"100%"}
                      p={2}
                      onChange={(e) => handleChange("title")(e.target.value)}
                      value={form.title}
                    />
                  )}
                  {isView ? (
                    <Text w={"100%"} pl={2}>
                      Описание: {form.description}
                    </Text>
                  ) : (
                    <Input
                      placeholder="Описание задачи"
                      w={"100%"}
                      p={2}
                      mt={2}
                      onChange={(e) =>
                        handleChange("description")(e.target.value)
                      }
                      value={form.description}
                    />
                  )}
                  {isView || isEdit ? (
                    <Text w={"100%"} pl={2} pt={2}>
                      Доска: {form.boardId}
                    </Text>
                  ) : (
                    <SelectedTaskModal
                      value={form.boardId}
                      onChange={(v) => handleChange("boardId")(v)}
                    />
                  )}
                  {isView ? (
                    <Text w={"100%"} pl={2}>
                      Приоритет: {form.priority}
                    </Text>
                  ) : (
                    <SelectPrioriety
                      value={form.priority}
                      onChange={(v) => handleChange("priority")(v)}
                    />
                  )}
                  {isView ? (
                    <Text w={"100%"} pl={2}>
                      Статус: {form.status}
                    </Text>
                  ) : isEdit ? (
                    <SelectStatus
                      value={form.status}
                      onChange={(v) => handleChange("status")(v)}
                    />
                  ) : null}
                  {isView ? (
                    <Text w="100%" pl={2}>
                      Исполнитель: {task?.assignee.fullName}
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
                <Button
                  colorPalette="pink"
                  mr={3}
                  onClick={() => setMode("edit")}
                >
                  Редактировать
                </Button>
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
                  {isCreate ? "Создать задачу" : "Сохранить изменения"}
                </Button>
              )}
            </>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" onClick={onClose} />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};
