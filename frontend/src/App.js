import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CreateClaimPage from "./pages/CreateClaimPage";
import EditClaimPage from "./pages/EditClaimPage";
import HeaderComponent from "./components/HeaderComponent";
import InsurancesPage from "./pages/InsurancesPage";
import AdminPage from "./pages/AdminPage";
import AdminEditClaimPage from "./pages/AdminEditClaimPage";


function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/insurances" element={<InsurancesPage />} />
        <Route path="/createclaim" element={<CreateClaimPage />} />
        <Route path="/editclaim/:claimid" element={<EditClaimPage />} />
        <Route path="/admin/admineditclaim/:claimid" element={<AdminEditClaimPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
