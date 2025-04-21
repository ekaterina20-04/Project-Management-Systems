import { Status } from "@/enteties/Board";
import { apiInstance, queryClient } from "@/shared/api/apiConfig";
import { useMutation } from "@tanstack/react-query";

export const useUpdatingTaskStatus = () => {
  return useMutation({
    mutationFn: async ({
      taskId,
      status,
    }: {
      taskId: number;
      status: Status;
    }) => {
      const response = await apiInstance.put(`/tasks/updateStatus/${taskId}`, {
        status,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summaryTasksId"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении статуса задачи:", error);
    },
  });
};
