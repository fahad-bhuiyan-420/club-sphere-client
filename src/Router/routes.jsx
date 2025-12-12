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
import ManagerOverview from "../Pages/ManagerOverview";
import EventsMannegement from "../Pages/EventsMannegement";
import UpdateEvent from "../Pages/UpdateEvent";
import EventRegistrations from "../Pages/EventRegistrations";
import MyClubs from "../Pages/MyClubs";
import CreateClub from "../Pages/CreateClub";
import UpdateClub from "../Pages/UpdateClub";
import ClubMembers from "../Pages/ClubMembers";
import PrivateRoute from "./PrivateRoute";
import ClubManagerRoute from "./ClubManagerRoute";

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
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><h2>This is Dashboard Home</h2></PrivateRoute>
      },
      {
        path: 'my-clubs',
        element: <ClubManagerRoute><MyClubs></MyClubs></ClubManagerRoute>
      },
      {
        path: 'update-club/:id',
        element: <ClubManagerRoute><UpdateClub></UpdateClub></ClubManagerRoute>
      },
      {
        path: 'manager-overview',
        element: <ClubManagerRoute><ManagerOverview></ManagerOverview></ClubManagerRoute>
      },
      {
        path: 'create-club',
        element: <ClubManagerRoute><CreateClub></CreateClub></ClubManagerRoute>
      },
      {
        path: 'create-event',
        element: <ClubManagerRoute><CreateEvent></CreateEvent></ClubManagerRoute>
      },
      {
        path: 'club-members',
        element: <ClubManagerRoute><ClubMembers></ClubMembers></ClubManagerRoute>
      },
      {
        path: 'events-management',
        element: <ClubManagerRoute><EventsMannegement></EventsMannegement></ClubManagerRoute>
      },
      {
        path: 'update-event/:id',
        element: <ClubManagerRoute><UpdateEvent></UpdateEvent></ClubManagerRoute>
      },
      {
        path: 'event-registrations',
        element: <EventRegistrations></EventRegistrations>
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