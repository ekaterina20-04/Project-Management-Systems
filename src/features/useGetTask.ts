import { GetTaskResponse } from "@/enteties/SummaryTasks";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Убираем из UseQueryOptions те ключи, которые мы сами всегда прокидываем
type GetTaskOptions = Omit<
  UseQueryOptions<
    GetTaskResponse,      // TQueryFnData
    Error,                // TError (или ваш кастомный Error)
    GetTaskResponse,      // TData
    ['task', number?]     // TQueryKey — ключ сегментации кэша
  >,
  'queryKey' | 'queryFn'
>;

export const useGetTask = (
  taskId?: number,
  options?: GetTaskOptions
) => {
  return useQuery<GetTaskResponse, Error, GetTaskResponse, ['task', number?]>({
    // мы жёстко задаём queryKey и queryFn,
    // а остальные опции (например enabled) приходят в `options`
    queryKey: ['task', taskId],
    queryFn: async () => {
      const  response  = await apiInstance.get<GetTaskResponse>(
        `/tasks/${taskId}`
      );
      return response.data;
    },
    enabled: false,   // по‑умолчанию ничего не дергаем
    ...options,       // сюда придёт { enabled: isOpen && !!taskId }
  });
};

// export const useGetTask = (taskId:number) => {
//     return useQuery({
//       queryKey: ['getTask'],
//       queryFn: async ():Promise<GetTaskResponse> => {
//         const response = await apiInstance.get<GetTaskResponse>(`/tasks/${taskId}`);
//         console.log(response.data)
//         return response.data;
//       }
//     });
//   };
