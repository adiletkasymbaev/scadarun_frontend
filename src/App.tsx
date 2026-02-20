import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { bootstrapAuth } from "./api/bootstrapAuth";
import LoginRoute from "./features/shared/utils/LoginRoute";
import RequireAuth from "./features/shared/utils/RequireAuth";
import SchemaPage from "./features/diagram-editor/pages/SchemaPage";
import SchemaListPage from "./features/diagram-editor/pages/SchemaListPage";
import AppSidebarWrap from "./features/shared/ui/AppSidebarWrap";
import JournalPage from "./features/journal/pages/JournalPage";

export default function App() {
  useEffect(() => {
    bootstrapAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />

        <Route
          path="/schemas"
          element={
            <RequireAuth>
              <AppSidebarWrap>
                <SchemaListPage/>
              </AppSidebarWrap>
            </RequireAuth>
          }
        />

        <Route
          path="/journal"
          element={
            <RequireAuth>
              <AppSidebarWrap>
                <JournalPage/>
              </AppSidebarWrap>
            </RequireAuth>
          }
        />

        <Route
          path="/schemas/:id"
          element={
            <RequireAuth>
              <SchemaPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/schemas" replace />} />
      </Routes>
    </BrowserRouter>
  );
}