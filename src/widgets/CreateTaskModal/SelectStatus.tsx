

import {  Status } from "@/enteties/Board";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
export const SelectStatus = () => {
    const statusOptions: Status[] = ["Backlog", "InProgress", "Done"];
    
    const statusCollection = createListCollection({
      items: statusOptions.map((status) => ({
        value: status,
        label: status,
      })),
    });
    return(<Select.Root
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
      </Select.Root>)}