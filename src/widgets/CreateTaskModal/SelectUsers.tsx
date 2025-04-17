
import { Users } from "@/enteties/Users";
import { useGetUsers } from "@/features/useGetUsers";
import { useAllProjects } from "@/pages/AllProgectsPage/hooks/useAllProjects";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useRef, useState} from "react";

export const SelectUsers = () => {
  const { data } = useGetUsers();
  const [value, setValue] = useState<string[]>([])
  if (!data) return;
  const users = data.data;
  const usersCollection = createListCollection({
    items: users.map((user) => ({
      label: user.fullName,       
      value: user.fullName, 
    })),
  });
  console.log('users',usersCollection.items)
  return (
    <Select.Root
        collection={usersCollection}
        size="sm"
        width="310px"
        zIndex={999}
        value={value}
        onValueChange={(e) => setValue(e.value)}

      >
        <Select.HiddenSelect />
        <Select.Label></Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Выберите исполнителя" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {usersCollection.items.map((user) => (
                <Select.Item item={user} key={user.label}>
                  {user.value}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
  );
};
