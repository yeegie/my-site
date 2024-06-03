import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "@app/providers/Provider";
import "@app/layouts/user/layout.scss";

import { AuthProvider } from "@features/contexts/auth/authContext";
import { ThemeProvider } from "@entities/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Provider />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
