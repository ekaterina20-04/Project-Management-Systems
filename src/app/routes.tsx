import { createBrowserRouter } from 'react-router-dom';
import { Providers } from '@/app/providers';
import { TasksPage } from '@/pages/TasksPage/TasksPage';
import { ProjectPage } from '@/pages/ProjectPage/ProjectPage';
import { AllProjectsPage } from '@/pages/AllProgectsPage/AllProgectsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Providers />,
    children: [
      {
        index: true,
        element: <AllProjectsPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
      {
        path: 'board/:projectId',
        element: <ProjectPage />,
      },
      
    //   {
    //     path: '*',
    //     element: <NotFoundPage />,
    //   },
    ],
  },
]);
