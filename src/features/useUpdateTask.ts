import { TaskUpdatePequest, TaskUpdateResponse } from "@/enteties/Task";
import { apiInstance, queryClient } from "@/shared/api/apiConfig";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTask = () => {
  return useMutation<
    TaskUpdateResponse,
    Error,
    { taskId: number; data: TaskUpdatePequest }
  >({
    mutationFn: async ({ taskId, data }) => {
      const response = await apiInstance.put<TaskUpdateResponse>(
        `/tasks/update/${taskId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListOfTasks"] });
      queryClient.invalidateQueries({ queryKey: ["summaryTasksId"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении задачи:", error);
    },
  });
};
