// hooks/useGetTask.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetTaskResponse } from '@/enteties/SummaryTasks'
import { apiInstance } from '@/shared/api/apiConfig'

type TaskQueryKey = ['task', number?]

export const useGetTask = (
  taskId?: number,
  options?: Omit<
    UseQueryOptions<
      GetTaskResponse,    // TQueryFnData
      Error,              // TError
      GetTaskResponse,    // TData
      TaskQueryKey        // TQueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetTaskResponse, Error, GetTaskResponse, TaskQueryKey>({
    // здесь всё в одном объекте
    queryKey: ['task', taskId],
    queryFn: async () => {
      const  data  = await apiInstance.get<GetTaskResponse>(
        `/tasks/${taskId}`
      )
      return data.data
    },
    // не дергать, пока нет taskId
    enabled: Boolean(taskId),
    // сюда попадут ваши дополнительные опции
    ...options,
  })
}
