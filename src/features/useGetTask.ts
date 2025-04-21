import { GetTaskResponse } from "@/enteties/SummaryTasks";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type GetTaskOptions = Omit<
  UseQueryOptions<GetTaskResponse, Error, GetTaskResponse, ["task", number?]>,
  "queryKey" | "queryFn"
>;

export const useGetTask = (taskId?: number, options?: GetTaskOptions) => {
  return useQuery<GetTaskResponse, Error, GetTaskResponse, ["task", number?]>({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await apiInstance.get<GetTaskResponse>(
        `/tasks/${taskId}`
      );
      return response.data;
    },
    enabled: false,
    ...options,
  });
};
