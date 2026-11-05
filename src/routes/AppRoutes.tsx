import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { Login } from '@/pages/Login/Login';
import { Workspace } from '@/pages/Workspace/Workspace';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
