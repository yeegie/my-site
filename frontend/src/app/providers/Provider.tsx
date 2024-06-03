import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "@/features/contexts/auth/privateRoute";

import { Layout } from "@app/layouts";
import { AdminLayout } from "@app/layouts";

// Pages
import { HomePage } from "@pages/home";
import { WorkPreviewPage } from "@/pages/workPreview";
import { Error404Page } from "@pages/error404";

import { SigninPage } from "@pages/signin";
import { LogoutPage } from "@pages/logout";

// Admin pages
import { DashboardPage } from "@pages/dashboard";

import { WorkListPage } from '@pages/workList';
import { EditWorkPage } from "@pages/workEdit";
import { WorkCreatePage } from "@pages/workCreate";

export default function Provider() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="work/:id" element={<WorkPreviewPage />} />
          <Route path="*" element={<Error404Page />} />

          <Route path="logout" element={<LogoutPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Route>
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<DashboardPage />} />

          <Route path="work/" element={<WorkListPage />} />
          <Route path="work/create" element={<WorkCreatePage />} />
          <Route path="work/:id" element={<EditWorkPage />} />

          <Route path="image/:id" element={<Error404Page />} />
          <Route path="user" element={<Error404Page />} />

          <Route path="widgets" element={<Error404Page />} />
          <Route path="statistics" element={<Error404Page />} />

          <Route path="security" element={<Error404Page />} />
          <Route path="settings" element={<Error404Page />} />

          <Route path="component" element={<Error404Page />} />
          <Route path="component/:id" element={<Error404Page />} />

          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </Router>
  );
}
