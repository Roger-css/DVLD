import People from "./Pages/People";
import SignIn from "./Pages/SignIn/SignIn";
import "./css/normalize.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EmptyPage from "./Pages/EmptyPage";
import InitialData from "./layout/InitialData";
import Users from "./Pages/Users";
import ApplicationTypes from "./Pages/Applications/ApplicationTypes";
import TestTypes from "./Pages/Tests/TestTypes";
import LocalDrivingLicenseApplication from "./Pages/Applications/LocalDrivingLicenseApplication";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/home",
      element: <InitialData />,
      children: [
        { index: true, element: <EmptyPage /> },
        { path: "people", element: <People /> },
        { path: "users", element: <Users /> },
        { path: "AppTypes", element: <ApplicationTypes /> },
        { path: "TestTypes", element: <TestTypes /> },
        {
          path: "LocalDrivingLicenseApplications",
          element: <LocalDrivingLicenseApplication />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
