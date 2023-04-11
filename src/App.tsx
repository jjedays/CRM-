import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Auth, Home, Layout, Profile } from "./pages";
import { useStoreState } from "./store/hooks";
import {
  IProtectedRouteProps,
  ProtectedRoute,
} from "./components/PrivateRoute";
import { adminEmail } from "./configs/firebase";

function App() {
  const { user } = useStoreState((state) => state);
  const defaultProtectedRouteProps: Omit<IProtectedRouteProps, "outlet"> = {
    isAuthenticated: !!user,
    authenticationPath: "/auth",
  };

  const defaultProtectedAdminRouteProps: Omit<IProtectedRouteProps, "outlet"> =
    {
      isAuthenticated: user?.email === adminEmail,
      authenticationPath: "/auth?admin=true",
    };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<Home />}
              />
            }
          />
          <Route path="auth" element={<Auth />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute
                {...defaultProtectedAdminRouteProps}
                outlet={<Admin />}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<Profile />}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
