import { Priority, Status } from "@/enteties/Board";
import { Portal, Select, createListCollection } from "@chakra-ui/react";

export const SelectUserChange = () => {
  const priorityOptions: Priority[] = ["Low", "Medium", "High"];
  const statusOptions: Status[] = ["Backlog", "InProgress", "Done"];
  
  const statusCollection = createListCollection({
    items: statusOptions.map((status) => ({
      value: status,
      label: status,
    })),
  });

  const priorityCollection = createListCollection({
    items: priorityOptions.map((priority) => ({
      value: priority,
      label: priority,
    })),
  });
  
  
  return (
    <div>
      <Select.Root
        collection={statusCollection}
        size="sm"
        width="310px"
        zIndex={999}
       
      >
        <Select.HiddenSelect />
        <Select.Label></Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Выберите приоритет" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {statusCollection.items.map((status) => (
                <Select.Item item={status} key={status.label}>
                  {status.value}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Select.Root
        
        collection={priorityCollection}
        size="sm"
        width="310px"
        zIndex={999}
        mt={4}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Выберите статус" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {priorityCollection.items.map((priority) => (
                <Select.Item key={priority.label} item={priority}>
                  {priority.value}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </div>
  );
};
