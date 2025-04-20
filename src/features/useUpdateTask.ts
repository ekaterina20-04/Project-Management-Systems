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
      console.log("✔️ вызываю update с taskId =", taskId, "и data =", data);

      const response = await apiInstance.put<TaskUpdateResponse>(
        `/tasks/update/${taskId}`,
        data
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      console.log("успешно обновлена задача");
      queryClient.invalidateQueries({ queryKey: ["updateTasksId"] });
    },
    onError: (error) => {
      console.error("Ошибка при обновлении задачи:", error);
    },
  });
};
