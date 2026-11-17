// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { RootLayout, RouteErrorBoundary } from './components/RootLayout';
import {
  DonorDirectoryPage,
  donorDirectoryLoader,
} from './pages/DonorDirectoryPage';
import {
  RegisterDonorPage,
  registerDonorAction,
} from './pages/RegisterDonorPage';
import {
  BloodRequestsPage,
  bloodRequestsLoader,
} from './pages/BloodRequestsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/donors" replace />,
      },
      {
        path: 'donors',
        element: <DonorDirectoryPage />,
        loader: donorDirectoryLoader,
      },
      {
        path: 'register',
        element: <RegisterDonorPage />,
        action: registerDonorAction,
      },
      {
        path: 'requests',
        element: <BloodRequestsPage />,
        loader: bloodRequestsLoader,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
