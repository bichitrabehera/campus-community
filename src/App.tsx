import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./user/Events";
import Forum from "./user/Forum";
import Projects from "./user/Projects";
import Clubs from "./user/Clubs";
import Marketplace from "./user/Marketplace";
import LostFound from "./user/LostFound";
import Alumni from "./user/Alumni";
import Hackathons from "./user/Hackathons";
import Notices from "./user/Notices";
import AdminDashboard from "./admin/index";
import EventForm from "./admin/EventForm";
import HackathonForm from "./admin/HackathonForm";
import NoticeForm from "./admin/NoticeForm";
import LostFoundForm from "./admin/LostFoundForm";

import { useAuthStore } from "./store/auth";
import Shell from "./components/Shell";
import Footer from "./components/Footer";
import UserIndex from "./user/index";
import AdminProtected from "./components/AdminProtected";

import { isAdmin, hasRole, hasAnyRole, UserRoleType } from "@/utils/roles";

function Protected({
  children,
  role,
  roles,
}: {
  children: JSX.Element;
  role?: UserRoleType;
  roles?: UserRoleType[];
}) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user && !hasRole(user.role, role)) {
    return <Navigate to="/" replace />;
  }

  if (roles && user && !hasAnyRole(user.role, roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Shell>
        <Routes>
          {/* Redirect root → user index */}
          <Route path="/" element={<UserIndex />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User-protected routes */}
          <Route
            path="/user/events"
            element={
              <Protected>
                <Events />
              </Protected>
            }
          />
          <Route
            path="/user/forum"
            element={
              <Protected>
                <Forum />
              </Protected>
            }
          />
          <Route
            path="/user/projects"
            element={
              <Protected>
                <Projects />
              </Protected>
            }
          />
          <Route
            path="/user/clubs"
            element={
              <Protected>
                <Clubs />
              </Protected>
            }
          />
          <Route
            path="/user/marketplace"
            element={
              <Protected>
                <Marketplace />
              </Protected>
            }
          />
          <Route
            path="/user/lostfound"
            element={
              <Protected>
                <LostFound />
              </Protected>
            }
          />
          <Route
            path="/user/alumni"
            element={
              <Protected>
                <Alumni />
              </Protected>
            }
          />
          <Route
            path="/user/hackathons"
            element={
              <Protected>
                <Hackathons />
              </Protected>
            }
          />
          <Route
            path="/user/notices"
            element={
              <Protected>
                <Notices />
              </Protected>
            }
          />

          {/* Admin-protected routes */}
          <Route
            path="/admin"
            element={
              <AdminProtected>
                <AdminDashboard />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminProtected>
                <EventForm />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/hackathons"
            element={
              <AdminProtected>
                <HackathonForm />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/notices"
            element={
              <AdminProtected>
                <NoticeForm />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/lostfound"
            element={
              <AdminProtected>
                <LostFoundForm />
              </AdminProtected>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Shell>

      <Footer />
    </div>
  );
}
