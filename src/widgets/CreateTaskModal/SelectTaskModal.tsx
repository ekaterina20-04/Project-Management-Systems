
import { useAllProjects } from "@/pages/AllProgectsPage/hooks/useAllProjects";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useRef, useState} from "react";

export const SelectedTaskModal = () => {
  const { data } = useAllProjects();
  const [value, setValue] = useState<string[]>([])
  if (!data) return;
  const projects = data.data;
  const collection = createListCollection({
    items: projects.map((p) => ({
      ...p,
      label: p.name,       
      value: String(p.id), 
    })),
  });
  console.log('projects',collection.items)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <Select.Root collection={collection} value={value}
      onValueChange={(e) => setValue(e.value)}
      size="sm" width="310px" zIndex={999}>
        <Select.HiddenSelect />
        <Select.Label></Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Выберите проект" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((project) => (
                <Select.Item item={project} key={project.id}>
                  {project.name}
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
