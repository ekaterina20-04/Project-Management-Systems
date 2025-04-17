import { CreateTaskModal } from "@/widgets/CreateTaskModal/CreateTaskModal";
import { Button, Dialog, HStack, Portal, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToTasks = () => {
    navigate(`/tasks`);
  };
  const navigateToProjects = () => {
    navigate(`/`);
  };
  const isTasksPage = location.pathname === "/tasks";
  const isProjectPage = location.pathname === "/";
  return (
    <HStack my={5} justifyContent={"space-between"} w={"100%"}>
      <HStack cursor={"pointer"} fontSize={"xl"} gap={10} fontWeight={500}>
        <Text
          onClick={() => navigateToTasks()}
          color={isTasksPage ? "brand.100" : "black"}
        >
          Все задачи
        </Text>
        <Text
          cursor={"pointer"}
          onClick={() => navigateToProjects()}
          color={isProjectPage ? "brand.100" : "black"}
        >
          Проекты
        </Text>
      </HStack>
      <Dialog.Root >
        <Dialog.Trigger asChild>
          <Button colorPalette={"pink"} borderRadius={30} pb={1}>
            Создать задачу
          </Button>
        </Dialog.Trigger>
        <Portal >
          <CreateTaskModal />
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
