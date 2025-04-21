import { FC } from "react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { Status } from "@/enteties/Board";
import { SelectStatusProps } from "@/enteties/Selects";

const OPTIONS: Status[] = ["Backlog", "InProgress", "Done"];

export const SelectStatus: FC<SelectStatusProps> = ({ value, onChange }) => {
  const collection = createListCollection({
    items: OPTIONS.map((st) => ({ value: st, label: st })),
  });

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      onValueChange={({ value: arr }) => {
        const first = arr[0] as Status | undefined;
        if (first) onChange(first);
      }}
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
            {collection.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
