import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AdminLayout from './components/Admin/AdminLayout';
import AdminLogin from './components/Admin/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import ProjectsManager from './components/Admin/ProjectsManager';
import CareerManager from './components/Admin/CareerManager';
import SkillsManager from './components/Admin/SkillsManager';
import AboutManager from './components/Admin/AboutManager';
import ContactsManager from './components/Admin/ContactsManager';
import SettingsManager from './components/Admin/SettingsManager';

const CharacterModel = lazy(() => import('./components/Character'));
const MainContainer = lazy(() => import('./components/MainContainer'));
import { LoadingProvider } from './context/LoadingProvider';
import './App.css';

const PortfolioSite = () => {
  return (
    <LoadingProvider>
      <Suspense>
        <MainContainer>
          <Suspense>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Portfolio Routes */}
          <Route path="/" element={<PortfolioSite />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="projects" element={<ProjectsManager />} />
                  <Route path="career" element={<CareerManager />} />
                  <Route path="skills" element={<SkillsManager />} />
                  <Route path="about" element={<AboutManager />} />
                  <Route path="contacts" element={<ContactsManager />} />
                  <Route path="settings" element={<SettingsManager />} />
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
