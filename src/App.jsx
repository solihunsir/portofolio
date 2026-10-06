import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortfolioHome from "./pages/PortfolioHome";
import AdminApp from "./admin/AdminApp";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PortfolioHome />} />

          {/* Secret Admin Dashboard Route (Hidden URL without login form) */}
          <Route path="/x-admin-7f3a9b/*" element={<AdminApp />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
