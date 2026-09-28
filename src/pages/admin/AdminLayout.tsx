import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookCopy, 
  Tags, 
  Landmark, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  UserCircle 
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const location = useLocation()
  const currentPath = location.pathname

  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script')
      script.id = 'tailwind-cdn'
      script.src = 'https://cdn.tailwindcss.com'
      document.head.appendChild(script)
    }
  }, [])

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Kelola Buku', icon: BookCopy, path: '/admin/kelola-buku' },
    { name: 'Kategori', icon: Tags, path: '/admin/kategori' },
    { name: 'Institusi', icon: Landmark, path: '/admin/institusi' },
  ]

  const activeMenuName = menuItems.find(m => {
    if (m.path === '/admin') return currentPath === '/admin'
    return currentPath.includes(m.path)
  })?.name || 'Dashboard'

  return (
    <div className="min-h-screen bg-[#faf9f7] flex font-sans text-[#333]">
      
      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Dipersempit menjadi w-[220px] */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-white border-r border-gray-200 shadow-sm flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-[60px] flex items-center justify-between px-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#9b0000] flex items-center justify-center text-white font-bold font-serif text-[14px]">
              S
            </div>
            <div>
              <h1 className="text-[#9b0000] font-bold text-[14px] leading-tight">Panel Admin</h1>
              <p className="text-[10px] text-gray-500">Sunda Islam Corner</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 px-3 flex flex-col gap-1">
          <p className="px-2 mb-2 text-[11px] font-bold text-gray-400 tracking-wider">MENU UTAMA</p>
          
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.path === '/admin' 
              ? currentPath === '/admin' 
              : currentPath.startsWith(item.path)

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                // Border radius diubah ke rounded-md, padding diperkecil
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-all text-[13px] font-medium ${
                  isActive 
                    ? 'bg-[#fff5f5] text-[#9b0000] border-l-2 border-[#9b0000]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#9b0000] border-l-2 border-transparent'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#9b0000]' : 'text-gray-400'} />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-3 border-t border-gray-100">
          <Link to="/" className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors border-l-2 border-transparent">
            <LogOut size={16} className="text-gray-400" />
            Keluar
          </Link>
        </div>
      </aside>

      {/* AREA UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* HEADER - Diperpendek menjadi h-[60px] */}
        <header className="h-[60px] bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Menu size={18} />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-[13px]">
              <span className="text-gray-400">Admin</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-700">{activeMenuName}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-5">
            <button className="relative text-gray-500 hover:text-[#9b0000] transition-colors">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-[1px] h-5 bg-gray-200 hidden sm:block"></div>
            <button className="flex items-center gap-2 text-left group">
              <UserCircle size={26} className="text-gray-400 group-hover:text-[#9b0000] transition-colors" />
              <div className="hidden sm:block">
                <p className="text-[13px] font-bold text-gray-700 group-hover:text-[#9b0000] transition-colors leading-none">Admin Perpus</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Superadmin</p>
              </div>
            </button>
          </div>
        </header>

        {/* KONTEN */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 relative">
          {children}
        </main>
      </div>
    </div>
  )
}