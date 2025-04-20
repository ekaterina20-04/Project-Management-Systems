import { TaskCreatePequest, TaskCreateResponse } from "@/enteties/Task";
import { apiInstance, queryClient } from "@/shared/api/apiConfig";
import { useMutation } from "@tanstack/react-query";

export const useCreateTasks = () => {
    return useMutation<TaskCreateResponse, Error, TaskCreatePequest>({
      mutationKey: ['transition'],
      mutationFn: async (requestData: TaskCreatePequest): Promise<TaskCreateResponse> => {
        
          const response = await apiInstance.post('/tasks/create', requestData, {
          });
          console.log('создание task прошло успешно', response.data);
          return response.data;
        
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['summaryTasksId'] });
        queryClient.invalidateQueries({ queryKey: ['ListOfTasks'] });
      },
      onError: (error) => {
        console.error("Ошибка при обновлении задачи:", error);
    }});
  };