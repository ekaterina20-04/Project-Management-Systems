import  { FC } from "react";
import { Portal, Select, createListCollection, Spinner } from "@chakra-ui/react";
import { useAllProjects } from "@/pages/AllProgectsPage/hooks/useAllProjects";

interface SelectedTaskModalProps {
  value: string;
  onChange: (value: string) => void;
}

export const SelectedTaskModal: FC<SelectedTaskModalProps> = ({ value, onChange }) => {
  const { data, isLoading } = useAllProjects();
  if (isLoading) return <Spinner size="sm" />;
  if (!data) return null;

  const collection = createListCollection({
    items: data.data.map((p) => ({ value: String(p.id), label: p.name })),
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
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Выберите проект" />
        </Select.Trigger>
        <Select.IndicatorGroup><Select.Indicator /></Select.IndicatorGroup>
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
