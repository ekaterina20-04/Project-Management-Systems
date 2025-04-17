import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SelectedTaskModal } from "./SelectTaskModal";
import { SelectUsers } from "./SelectUsers";
import { SelectPrioriety } from "./SelectPrioriety";
import { SelectStatus } from "./SelectStatus";

export const CreateTaskModal: React.FC = () => {
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
              <Input placeholder="Название задачи" w={"100%"} p={2} />
              <Input placeholder="Описание задачи" w={"100%"} p={2} mt={2} />
              <SelectedTaskModal />
              <SelectPrioriety />
              <SelectStatus/>
              <SelectUsers/>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer pb={6}>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" p={2}>
                Закрыть
              </Button>
            </Dialog.ActionTrigger>
            <Button p={2} colorPalette={"pink"}>
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
