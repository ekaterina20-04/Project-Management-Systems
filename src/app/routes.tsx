import { createBrowserRouter } from 'react-router-dom';
import { ProjectPage } from '@/pages/ProjectPage/ProjectPage';
import { AllProjectsPage } from '@/pages/AllProgectsPage/AllProgectsPage';
import { TasksPage } from '@/pages/TasksPage/TasksPage';
import { MainLayout } from '@/layouts/mainLayout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,  
    children: [
      { index: true, element: <AllProjectsPage /> },
      { path: "tasks",  element: <TasksPage /> },
      { path: "board/:boardId", element: <ProjectPage /> },
    ],
  },
]);
