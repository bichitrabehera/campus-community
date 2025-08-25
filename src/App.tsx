import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Forum from "./pages/Forum";
import Projects from "./pages/Projects";
import Clubs from "./pages/Clubs";
import Marketplace from "./pages/Marketplace";
import LostFound from "./pages/LostFound";
import Alumni from "./pages/Alumni";
import Hackathons from "./pages/Hackathons";
import Notices from "./pages/Notices";
import { useAuthStore } from "./store/auth";
import Shell from "./components/Shell";
import Footer from "./components/Footer";

function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="">
      <Shell>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/events"
            element={
              <Protected>
                <Events />
              </Protected>
            }
          />
          <Route
            path="/forum"
            element={
              <Protected>
                <Forum />
              </Protected>
            }
          />
          <Route
            path="/projects"
            element={
              <Protected>
                <Projects />
              </Protected>
            }
          />
          <Route
            path="/clubs"
            element={
              <Protected>
                <Clubs />
              </Protected>
            }
          />
          <Route
            path="/marketplace"
            element={
              <Protected>
                <Marketplace />
              </Protected>
            }
          />
          <Route
            path="/lostfound"
            element={
              <Protected>
                <LostFound />
              </Protected>
            }
          />
          <Route
            path="/alumni"
            element={
              <Protected>
                <Alumni />
              </Protected>
            }
          />
          <Route
            path="/hackathons"
            element={
              <Protected>
                <Hackathons />
              </Protected>
            }
          />
          <Route
            path="/notices"
            element={
              <Protected>
                <Notices />
              </Protected>
            }
          />
        </Routes>
      </Shell>
      <Footer />
    </div>
  );
}
