import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";

export const Layout = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main className="container flex-grow-1 flex-shrink-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
