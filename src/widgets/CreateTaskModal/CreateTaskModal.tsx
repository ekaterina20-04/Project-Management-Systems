import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Spinner,
  Text,
  useDisclosure,
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
import { FormState } from "react-hook-form";
import { CreateFormState } from "@/enteties/CreateFormState";
import { Priority, Status } from "@/enteties/Board";
import { TaskCreatePequest } from "@/enteties/Task";
const LOCAL_STORAGE_KEY = "createTaskForm";

export const CreateTaskModal: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { data: projectsData, isLoading: projectsLoading } = useAllProjects();
  const createTask = useCreateTasks();

  const [form, setForm] = useState<CreateFormState>({
    title: "",
    description: "",
    boardId: "",
    assigneeId: "",
    priority: "",
    status: "",
  });
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
  }, [form]);
  const handleChange =
    (field: keyof CreateFormState) => (value: string | Priority | Status) => {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = () => {
    const payload: TaskCreatePequest = {
      title: form.title,
      description: form.description,
      boardId: Number(form.boardId),
      assigneeId: Number(form.assigneeId),
      priority: form.priority as Priority,
    };
    createTask.mutate(payload, {
      onSuccess: () => {
        setForm({
          title: "",
          description: "",
          boardId: "",
          assigneeId: "",
          priority: "",
          status: "",
        });
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        onClose();
      },
    });
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
                <Text>Создание задачи</Text>
              </Flex>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body w={"90%"}>
            <VStack justifyContent={"center"}>
              <Input
                placeholder="Название задачи"
                w={"100%"}
                p={2}
                onChange={(e) => handleChange("title")(e.target.value)}
              />
              <Input
                placeholder="Описание задачи"
                w={"100%"}
                p={2}
                mt={2}
                onChange={(e) => handleChange("description")(e.target.value)}
              />
              {projectsLoading ? (
                <Spinner />
              ) : (
                <>
                  <SelectedTaskModal
                    value={form.boardId}
                    onChange={(v) => handleChange("boardId")(v)}
                  />
                  <SelectPrioriety
                    value={form.priority}
                    onChange={(v) => handleChange("priority")(v)}
                  />
                  <SelectStatus
                    value={form.status}
                    onChange={(v) => handleChange("status")(v)}
                  />
                  <SelectUsers
                    value={form.assigneeId}
                    onChange={(v) => handleChange("assigneeId")(v)}
                  />
                </>
              )}
            </VStack>
          </Dialog.Body>
          <Dialog.Footer pb={6}>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" p={2}>
                Закрыть
              </Button>
            </Dialog.ActionTrigger>
            <Button p={2} colorPalette={"pink"} onClick={handleSubmit}>
              Создать задачу
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};
