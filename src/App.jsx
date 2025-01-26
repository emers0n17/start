import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import DashboardHeader from './components/DashboardHeader'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import Projects from './pages/Projects'
import Categories from './pages/Categories'
import Login from './pages/Login'
import Register from './pages/Register'
import SellerDashboard from './pages/SellerDashboard'
import { AuthProvider } from './context/AuthContext'
import MyProjects from './pages/MyProjects'
import PrivateRoute from './components/PrivateRoute'

const AppContent = () => {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <>
      {isDashboard ? <DashboardHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/projeto/:id" element={<ProjectDetails />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<SellerDashboard />} />
        <Route 
          path="/meus-projetos" 
          element={
            <PrivateRoute>
              <MyProjects />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App 

