export interface summaryProject {
  description: string;
  id: number;
  name: string;
  taskCount: number;
}
export interface ProjectsResponse {
  data: summaryProject[];  
}