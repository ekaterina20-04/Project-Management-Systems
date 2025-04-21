import { FC } from "react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { Priority } from "@/enteties/Board";
import { SelectPriorietyProps } from "@/enteties/Selects";

const OPTIONS: Priority[] = ["Low", "Medium", "High"];

export const SelectPrioriety: FC<SelectPriorietyProps> = ({
  value,
  onChange,
}) => {
  const collection = createListCollection({
    items: OPTIONS.map((pr) => ({ value: pr, label: pr })),
  });

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      onValueChange={({ value: arr }) => {
        const first = arr[0] as Priority | undefined;
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
          <Select.ValueText placeholder="Выберите приоритет" />
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
