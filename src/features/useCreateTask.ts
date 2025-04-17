import { TaskCreatePequest, TaskCreateResponse } from "@/enteties/Task";
import { apiInstance } from "@/shared/api/apiConfig";
import { useMutation } from "@tanstack/react-query";

export const useCreateTasks = () => {
    return useMutation<TaskCreateResponse, Error, TaskCreatePequest>({
      mutationKey: ['transition'],
      mutationFn: async (requestData: TaskCreatePequest): Promise<TaskCreateResponse> => {
        try {
          const response = await apiInstance.post('/tasks/create', requestData, {
          });
          console.log('создание task прошло успешно', response.data);
          return response.data;
        } catch (error: any) {
          console.error('ошибка создания task', error.message);
          if (error.response) {
            console.error('ошибка при создании task: ', error.response.data);
          }
          throw error;
        }
      },
    });
  };