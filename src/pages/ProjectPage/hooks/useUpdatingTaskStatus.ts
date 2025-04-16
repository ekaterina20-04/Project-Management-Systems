import { Status } from "@/enteties/boardId";
import { apiInstance, queryClient } from "@/shared/api/apiConfig";
import { useMutation } from "@tanstack/react-query";

export const useUpdatingTaskStatus = ()=>{
    return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: number; status: Status }) =>{
      const response= await apiInstance.put(`/tasks/updateStatus/${taskId}`, { status });
      console.log(response.data)
      return response.data;
    },onSuccess: () => {
        console.log('успешно обновлен статус')
      queryClient.invalidateQueries({ queryKey: ["summaryTasksId"] });
    },
    onError: (error) => {
        console.error("Ошибка при обновлении статуса задачи:", error);
      },
  });}