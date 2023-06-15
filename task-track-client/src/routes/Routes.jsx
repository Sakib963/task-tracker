import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../pages/AddTask/AddTask";
import AllTasks from "../pages/AllTasks/AllTasks";
import UpdateTask from "../pages/UpdateTask/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <AllTasks></AllTasks>,
      },
      {
        path: "add-task",
        element: <AddTask></AddTask>,
      },
      {
        path: "task/:id",
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) => fetch(`https://task-tracker-server-gray.vercel.app/task/${params.id}`),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
