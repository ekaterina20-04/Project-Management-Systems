import { createBrowserRouter } from 'react-router-dom';
import { Providers } from '@/app/providers';
import { TasksPage } from '@/pages/TasksPage/TasksPage';
import { AllProgectsPage } from '@/pages/AllProgectsPage/AllProgectsPage';
import { ProjectPage } from '@/pages/ProjectPage/ProjectPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Providers />,
    children: [
      {
        index: true,
        element: <AllProgectsPage />,
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
