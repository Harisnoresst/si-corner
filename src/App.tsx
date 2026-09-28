import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/user/WelcomePage'
import DashboardPage from './pages/admin/DashboardPage'
import KelolaBukuPage from './pages/admin/KelolabukuPage'
import KelolakategoriPage from './pages/admin/KelolakategoriPage'
import KelolainstitusiPage from './pages/admin/KelolainstitusiPage'
import FormBukuPage from './pages/admin/FormBukuPage'
import KatalogPage from './pages/user/KatalogPage'
import UserLayout from './pages/user/UserLayout'
import DetailBukuPage from './pages/user/DetailBukuPage'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rute User dengan Layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/katalog" element={<KatalogPage />} />
          <Route path="/katalog/:id" element={<DetailBukuPage />} />
        </Route>

        {/* Endpoint untuk Admin */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/kelola-buku" element={<KelolaBukuPage />} />
        <Route path="/admin/kategori" element={<KelolakategoriPage />} />
        <Route path="/admin/institusi" element={<KelolainstitusiPage />} />
        <Route path="/admin/kelola-buku/tambah" element={<FormBukuPage />} />
        <Route path="/admin/kelola-[#id]" element={<FormBukuPage />} />

        {/* Fallback 404 */}
        <Route path="*" element={<div className="p-10 text-center font-sans text-gray-500">404 - Halaman tidak ditemukan</div>} />
      </Routes>
    </Router>
  )
}