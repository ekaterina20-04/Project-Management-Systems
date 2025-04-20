import { TasksResponse } from "@/enteties/SummaryTasks";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery } from "@tanstack/react-query";

export const useSummaryTasks = () => {
  return useQuery({
    queryKey: ["ListOfTasks"],
    queryFn: async (): Promise<TasksResponse> => {
      console.log("➡️ fetching /tasks…");       
      const response = await apiInstance.get<TasksResponse>(`/tasks`);
      console.log('for summary tasks', response.data);
      return response.data;
    },
    
  });
};
