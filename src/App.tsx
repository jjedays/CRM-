import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, Home, Layout } from "./pages";
import { useStoreState } from "./store/hooks";
import {
  IProtectedRouteProps,
  ProtectedRoute,
} from "./components/PrivateRoute";

function App() {
  const { user } = useStoreState((state) => state);

  const defaultProtectedRouteProps: Omit<IProtectedRouteProps, "outlet"> = {
    isAuthenticated: !!user,
    authenticationPath: "/auth",
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
