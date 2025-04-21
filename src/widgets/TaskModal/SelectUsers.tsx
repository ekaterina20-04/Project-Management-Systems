import { FC } from "react";
import {
  Portal,
  Select,
  createListCollection,
  Spinner,
} from "@chakra-ui/react";
import { useGetUsers } from "@/features/useGetUsers";
import { SelectProps } from "@/enteties/Selects";

export const SelectUsers: FC<SelectProps> = ({ value, onChange }) => {
  const { data, isLoading } = useGetUsers();
  if (isLoading) return <Spinner size="sm" />;
  if (!data) return null;

  const collection = createListCollection({
    items: data.data.map((u) => ({ value: String(u.id), label: u.fullName })),
  });

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      onValueChange={({ value: arr }) => {
        const first = arr[0];
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
          <Select.ValueText placeholder="Выберите исполнителя" />
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
