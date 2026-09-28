import { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ExternalLink, Instagram, Youtube, Facebook } from 'lucide-react'

export default function UserLayout() {
  const [query, setQuery] = useState('')
  const [activeSection, setActiveSection] = useState('beranda')
  
  const navigate = useNavigate()
  const location = useLocation()

  // Sinkronisasi active menu saat user pindah halaman/hash
  useEffect(() => {
    if (location.pathname === '/katalog') {
      setActiveSection('katalog')
    } else {
      const hash = location.hash.replace('#', '') || 'beranda'
      setActiveSection(hash)
    }
  }, [location])

  const handleSearch = () => {
    if (query) {
      navigate(`/katalog?search=${encodeURIComponent(query)}`)
      setQuery('') // Reset input setelah mencari
    } else {
      navigate('/katalog')
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-[#231f1f] font-sans flex flex-col selection:bg-[#9b0000] selection:text-white">
      
      {/* HEADER GLOBAL */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-[4.8vw] min-h-[70px] md:min-h-[78px] bg-white/95 backdrop-blur-md border-b border-gray-200">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 md:gap-3">
          <img src="/images/logo-uin.png" alt="Logo UIN" className="w-[40px] md:w-[46px] h-[40px] md:h-[46px] object-contain" />
          <div>
            <div className="text-[#9b0000] font-serif text-[13px] md:text-[17px] font-extrabold tracking-wide">PERPUSTAKAAN</div>
            <div className="mt-0.5 text-[8px] md:text-[10px] tracking-widest text-[#393433]">UIN SUNAN GUNUNG DJATI</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center justify-center gap-7 text-[14px]">
          {['beranda', 'tentang', 'katalog'].map((section) => {
            const isKatalog = section === 'katalog'
            // Jika kita di halaman katalog dan klik 'tentang', kita arahkan ke /#tentang
            const targetUrl = isKatalog ? '/katalog' : `/#${section}`

            return (
              <a
                key={section}
                href={section === 'beranda' ? '/' : targetUrl}
                className={`relative py-7 transition-colors hover:text-[#9b0000] capitalize ${
                  activeSection === section
                    ? 'text-[#9b0000] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#9b0000]'
                    : 'text-[#292524]'
                }`}
              >
                {section}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <div className="hidden md:flex h-[42px] w-[255px] px-4 items-center gap-2.5 border border-gray-200 bg-gray-50 rounded-full focus-within:border-[#9b0000] focus-within:ring-1 focus-within:ring-[#9b0000]/20 transition-all">
            <Search size={17} className="text-gray-400 shrink-0" />
            <input
              value={query}
              placeholder="Cari di Sunda Islam Corner..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-transparent border-none outline-none text-[12px] text-gray-700 placeholder-gray-400"
            />
          </div>
          <a
            href="https://lib.uinsgd.ac.id/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[38px] md:min-h-[42px] px-3 md:px-5 rounded-lg bg-[#9b0000] text-white text-[12px] md:text-[14px] font-bold hover:bg-[#760000] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(118,0,0,0.12)] transition-all"
          >
            <ExternalLink size={16} /> <span className="hidden sm:inline">Website Perpustakaan</span>
          </a>
        </div>
      </header>

      {/* AREA KONTEN HALAMAN (BERANDA / KATALOG) */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER GLOBAL */}
      <footer className="py-8 px-5 md:px-[4.8vw] bg-[#760000] border-t border-[#8c0a0a] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <img src="/images/logo-uin.png" alt="Logo UIN" className="w-[40px] h-[40px] object-contain brightness-0 invert" />
            <div>
              <div className="text-white font-serif text-[15px] font-bold tracking-wide">PERPUSTAKAAN</div>
              <div className="mt-0.5 text-[9px] tracking-wider text-white/70">UIN SUNAN GUNUNG DJATI</div>
            </div>
          </div>
          <p className="mt-4 text-[#d49999] text-[11px] md:text-[12px]">© 2026 Perpustakaan UIN Sunan Gunung Djati Bandung. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 md:gap-8 text-white/80 text-[12px] md:text-[13px]">
          {['beranda', 'tentang', 'katalog', 'kontak'].map((section) => {
            const isKatalog = section === 'katalog'
            const targetUrl = isKatalog ? '/katalog' : `/#${section}`
            return (
              <a key={section} href={section === 'beranda' ? '/' : targetUrl} className="hover:text-white capitalize transition-colors">
                {section}
              </a>
            )
          })}
        </div>
        <div className="flex items-center justify-center gap-4 text-white/80">
          <a href="https://www.instagram.com/perpusuinbdg/" target="_blank" rel="noreferrer" className="hover:text-white hover:-translate-y-0.5 transition-all"><Instagram size={20} /></a>
          <a href="#" className="hover:text-white hover:-translate-y-0.5 transition-all"><Youtube size={20} /></a>
          <a href="#" className="hover:text-white hover:-translate-y-0.5 transition-all"><Facebook size={20} /></a>
          <div className="w-[1px] h-[24px] bg-white/20 mx-1"></div>
          <em className="text-[#f7e6e6] font-serif text-[13px] md:text-[14px] leading-tight">Miindung ka Waktu,<br />Mibapa ka Zaman</em>
        </div>
      </footer>

    </div>
  )
}