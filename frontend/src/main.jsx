import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import TaskDetails from "./components/TaskDetails/TaskDetails.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/task-details/:id",
        element: <TaskDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthContextProvider>
  </StrictMode>
);
