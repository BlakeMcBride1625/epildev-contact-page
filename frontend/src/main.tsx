import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ContactPage from './pages/ContactPage.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import TermsOfService from './pages/TermsOfService.tsx'
import CookiePolicy from './pages/CookiePolicy.tsx'
import './index.css'

// Component to handle root path access restriction
const RootRedirect = () => {
  return <Navigate to="/contact" replace />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        {/* Catch-all route - redirect any other paths to contact */}
        <Route path="*" element={<Navigate to="/contact" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)


