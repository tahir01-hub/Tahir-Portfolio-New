// Type definitions for API service and admin components
declare module '*/services/api' {
  export const authAPI: any;
  export const aboutAPI: any;
  export const projectAPI: any;
  export const careerAPI: any;
  export const skillAPI: any;
  export const contactAPI: any;
  export const settingsAPI: any;
}

declare module '*/context/AuthContext' {
  export const AuthProvider: any;
  export const useAuth: () => any;
}

// Admin component declarations
declare module './components/Admin/ProtectedRoute' {
  const component: any;
  export default component;
}

declare module './components/Admin/AdminLayout' {
  const component: any;
  export default component;
}

declare module './components/Admin/AdminLogin' {
  const component: any;
  export default component;
}

declare module './components/Admin/Dashboard' {
  const component: any;
  export default component;
}

declare module './components/Admin/ProjectsManager' {
  const component: any;
  export default component;
}

declare module './components/Admin/CareerManager' {
  const component: any;
  export default component;
}

declare module './components/Admin/SkillsManager' {
  const component: any;
  export default component;
}

declare module './components/Admin/AboutManager' {
  const component: any;
  export default component;
}

declare module './components/Admin/ContactsManager' {
  const component: any;
  export default component;
}

declare module './components/Admin/SettingsManager' {
  const component: any;
  export default component;
}
