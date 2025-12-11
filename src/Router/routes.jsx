import { createBrowserRouter } from "react-router";
import Home from "../Components/Home";
import Root from "../Pages/root";
import Events from "../Components/Events";
import Clubs from "../Components/Clubs";
import ErrorPage from "../Pages/ErrorPage";
import Club from "../Components/Club";
import Register from "../Components/Register";
import LogIn from "../Components/LogIn";
import ResetPass from "../Components/ResetPass";
import DashBoardLayout from "../layouts/DashBoardLayout";
import CreateEvent from "../Pages/CreateEvent";
import EventDetails from "../Pages/EventDetails";
import SuccesPage from "../Pages/SuccesPage";
import PaymentCancelled from "../Pages/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: '/events',
            Component: Events
        },
        {
          path: 'events/:id',
          Component: EventDetails
        },
        {
            path: '/clubs',
            Component: Clubs
        },
        {
          path: '/clubs/:id',
          Component: Club
        },
        {
          path: '*',
          Component: ErrorPage
        }
    ]
  },
  {
    path: '/register',
    Component: Register
  },
  {
    path: '/login',
    Component: LogIn
  },
  {
    path: '/reset',
    Component: ResetPass
  },
  {
    path: '/dashboard',
    Component: DashBoardLayout,
    children: [
      {
        index: true,
        element: <h2>This is Dashboard Home</h2>
      },
      {
        path: 'create-event',
        Component: CreateEvent
      },
      {
        path: 'payment-success',
        Component: SuccesPage
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
    }
    ]
  }
]);