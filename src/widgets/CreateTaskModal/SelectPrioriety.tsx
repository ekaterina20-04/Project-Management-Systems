import { Priority } from "@/enteties/Board";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
export const SelectPrioriety = () => {
  const priorityOptions: Priority[] = ["Low", "Medium", "High"];

  const priorityCollection = createListCollection({
    items: priorityOptions.map((priority) => ({
      value: priority,
      label: priority,
    })),
  });

  return (
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
  );
};
