import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import GiftDetailPage from './pages/GiftDetailPage'
import OrderPage from './pages/OrderPage'
import TrackingPage from './pages/TrackingPage'
import CompanyDashboard from './pages/CompanyDashboard'
import CompaniesPage from './pages/CompaniesPage'
import RewardsPage from './pages/RewardsPage'
import GiftGuidePage from './pages/GiftGuidePage'
import { ThemeProvider } from './context/ThemeContext'
import { Web3Provider } from './context/Web3Context'

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/gift/:id" element={<GiftDetailPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/gift-guide" element={<GiftGuidePage />} />
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Router>
      </Web3Provider>
    </ThemeProvider>
  )
}

export default App
