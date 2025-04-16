import { TasksResponse } from "@/enteties/SummaryTasks";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery } from "@tanstack/react-query";

export const useSummaryTasks = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: async (): Promise<TasksResponse> => {
      const response = await apiInstance.get<TasksResponse>(`/tasks`);
      console.log('for summary tasks', response.data);
      return response.data;
    },
  });
};
