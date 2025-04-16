import { ProjectsResponse } from "@/enteties/summaryProjects";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const useAllProjects = () => {
  return useQuery({
    queryKey: ['summary'],
    queryFn: async ():Promise<ProjectsResponse> => {
      const response = await apiInstance.get<ProjectsResponse>(`/boards`);
      console.log(response.data)
      return response.data;
    }
  });
};