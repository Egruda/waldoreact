import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Start from "./Start"
import Game from "./Game"
import Scoreboard from "./Scoreboard"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Start />
        },
        {
          path: "game",
          element: <Game />
        },
        {
          path: "result",
          element: <Scoreboard />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;