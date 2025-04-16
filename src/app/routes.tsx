import { createBrowserRouter } from 'react-router-dom';
import { Providers } from '@/app/providers';
import { ProjectPage } from '@/pages/ProjectPage/ProjectPage';
import { AllProjectsPage } from '@/pages/AllProgectsPage/AllProgectsPage';
import { TasksPage } from '@/pages/TasksPage/TasksPage';

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
        path: 'board/:boardId',
        element: <ProjectPage />,
      },
      
    //   {
    //     path: '*',
    //     element: <NotFoundPage />,
    //   },
    ],
  },
]);
