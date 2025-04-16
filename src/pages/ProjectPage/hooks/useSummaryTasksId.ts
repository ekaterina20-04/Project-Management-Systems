import { BoardIdResponse } from "@/enteties/boardId";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const useSummaryTasksId = (boardId:string) => {
  return useQuery({
    queryKey: ['summaryTasksId'],
    queryFn: async ():Promise<BoardIdResponse> => {
      const response = await apiInstance.get<BoardIdResponse>(`/boards/${boardId}`);
      console.log('here',response.data)
      return response.data;
    }
  });
};