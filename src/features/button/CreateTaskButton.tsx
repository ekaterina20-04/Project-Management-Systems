import { TaskModal } from "@/widgets/TaskModal/TaskModal"
import { Button, Dialog, Portal, useDisclosure } from "@chakra-ui/react"

export const CreateTaskButton=()=>{
    const { open, onOpen, onClose } = useDisclosure();

    return(
        <Dialog.Root >
        <Dialog.Trigger asChild>
          <Button colorPalette={"pink"} borderRadius={30} pb={1}         onClick={onOpen}
          >
            Создать задачу
          </Button>
        </Dialog.Trigger>
        <Portal >
        {open && (
        <TaskModal
          initialMode="create"
          isOpen={open}
          onClose={onClose}
        />
      )}
        </Portal>
      </Dialog.Root>
    )
}