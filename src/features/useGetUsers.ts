import { UsersResponse } from "@/enteties/Users";
import { apiInstance } from "@/shared/api/apiConfig";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
    return useQuery({
      queryKey: ['users'],
      queryFn: async ():Promise<UsersResponse> => {
        const response = await apiInstance.get<UsersResponse>(`/users`);
        console.log(response.data)
        return response.data;
      }
    });
  };