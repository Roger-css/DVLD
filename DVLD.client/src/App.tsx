import "./css/normalize.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import React, { lazy } from "react";
import Loading from "./components/UI/Loading";
const SingIn = lazy(() => import("./Pages/SignIn/SignIn"));
function App() {
  const router = createBrowserRouter([
    { path: "*", element: <ErrorPage /> },
    {
      path: "/",
      element: (
        <React.Suspense fallback={<Loading color="primary" />}>
          <SingIn />
        </React.Suspense>
      ),
    },
    {
      path: "/home",
      lazy: async () => {
        const { default: HomePage } = await import("./layout/InitialData");
        return { Component: HomePage };
      },
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: EmptyPage } = await import("./Pages/EmptyPage");
            return { Component: EmptyPage };
          },
        },
        {
          path: "people",
          lazy: async () => {
            const { default: PeoplePage } = await import("./Pages/People");
            return { Component: PeoplePage };
          },
        },
        {
          path: "users",
          lazy: async () => {
            const { default: UsersPage } = await import("./Pages/Users");
            return { Component: UsersPage };
          },
        },
        {
          path: "drivers",
          lazy: async () => {
            const { default: DriversPage } = await import(
              "./Pages/Drivers/Drivers"
            );
            return { Component: DriversPage };
          },
        },
        {
          path: "AppTypes",
          lazy: async () => {
            const { default: ApplicationTypesPage } = await import(
              "./Pages/Applications/ApplicationTypes"
            );
            return { Component: ApplicationTypesPage };
          },
        },
        {
          path: "TestTypes",
          lazy: async () => {
            const { default: TestTypesPage } = await import(
              "./Pages/Tests/TestTypes"
            );
            return { Component: TestTypesPage };
          },
        },
        {
          path: "LocalDrivingLicenseApplications",
          lazy: async () => {
            const { default: LocalDrivingLicenseApplicationPage } =
              await import(
                "./Pages/Applications/LocalDrivingLicenseApplication"
              );
            return { Component: LocalDrivingLicenseApplicationPage };
          },
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
