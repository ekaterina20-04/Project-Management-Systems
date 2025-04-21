import { Status } from "@/enteties/Board";
import { SelectStatus } from "@/widgets/TaskModal/SelectStatus";
import { SelectedTaskModal } from "@/widgets/TaskModal/SelectTaskModal";
import { Button, Flex, HStack, Input, VStack } from "@chakra-ui/react";
import {  useState } from "react";
interface FiltersProps {
  statusFilter: Status | "";
  setStatusFilter: (value: Status | "") => void;
  boardFilter: string;
  setBoardFilter: (value: string) => void;
  titleSearch: string;
  setTitleSearch: (value: string) => void;
  assigneeSearch: string;
  setAssigneeSearch: (value: string) => void;
}
export const Filters: React.FC<FiltersProps> = ({
  statusFilter,
  setStatusFilter,
  boardFilter,
  setBoardFilter,
  titleSearch,
  setTitleSearch,
  assigneeSearch,
  setAssigneeSearch,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <VStack mb={5} w={"100%"} alignItems={"end"}>
      {!showFilters && (
        <Flex w={"100%"} justifyContent={"end"}>
          <Button
            borderRadius={30}
            colorPalette={"pink"}
            onClick={() => setShowFilters(true)}
          >
            Фильтровать
          </Button>
        </Flex>
      )}
      {showFilters && (
        <HStack mb={5} alignItems={"start"}>
          <VStack mt={4}>
            <Input
              placeholder="По названию задачи"
              size="sm"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              maxW="200px"
            />
            <Input
              placeholder="По исполнителю"
              size="sm"
              value={assigneeSearch}
              onChange={(e) => setAssigneeSearch(e.target.value)}
              maxW="200px"
              mt={2}
            />
          </VStack>
          <VStack>
            <SelectStatus
              value={statusFilter as Status}
              onChange={setStatusFilter}
            />
            <SelectedTaskModal value={boardFilter} onChange={setBoardFilter} />
            <Flex justifyContent={"end"} w={"100%"}>
              <Button
                onClick={() => setShowFilters(false)}
                colorPalette={"pink"}
                borderRadius={30}
              >
                Скрыть
              </Button>
            </Flex>
          </VStack>
        </HStack>
      )}
    </VStack>
  );
};
