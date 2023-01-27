import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import InventoryPage from "./pages/Inventory";
import LoginPage, {action as loginAction} from "./pages/Login";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
