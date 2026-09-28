import { useMemo } from 'react'
import { BookOpen, Tags, Landmark, ChevronRight } from 'lucide-react'
import { books, categories, partners } from '../../lib/data'
import AdminLayout from './AdminLayout'

type Book = { id: string | number; title: string; author: string; university: string; category: string; cover: string }

export default function DashboardPage() {
  const list = books as Book[]
  const realCategories = categories.filter((c) => c.name !== 'Semua Kategori')

  const perCategory = useMemo(() => {
    return realCategories
      .map((c) => ({ name: c.name, total: list.filter((b) => b.category === c.name).length }))
      .sort((a, b) => b.total - a.total)
  }, [list, realCategories])

  const perInstitution = useMemo(() => {
    return partners
      .map((p) => ({ name: p.name, total: list.filter((b) => b.university === p.name).length }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [list])

  const maxCat = Math.max(1, ...perCategory.map((c) => c.total))
  const maxInst = Math.max(1, ...perInstitution.map((c) => c.total))

  const stats = [
    { label: 'Total Buku', value: list.length, icon: BookOpen },
    { label: 'Total Kategori', value: realCategories.length, icon: Tags },
    { label: 'Total Institusi', value: partners.length, icon: Landmark }
  ]

  return (
    <AdminLayout>
      <div className="min-h-screen text-[#231f1f] font-sans">
        
        {/* Padding & Ukuran Font Diperkecil */}
        <div className="mb-6">
          <p className="mb-1 text-[#cc8657] text-[11px] font-bold tracking-[2px] uppercase">Panel Admin</p>
          <h1 className="font-serif font-bold text-2xl md:text-[28px] text-[#9b0000] leading-tight">Dashboard</h1>
          <p className="mt-1 text-[#6b6663] text-[13px]">Ringkasan koleksi Sunda Islam Corner.</p>
        </div>

        {/* STATISTIK */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon }) => (
            // Sudut dibuat lebih tegas dengan rounded-lg
            <div key={label} className="flex items-center gap-4 p-4 lg:p-5 bg-white border border-[#eee5df] rounded-lg shadow-sm">
              <div className="w-[44px] h-[44px] shrink-0 rounded bg-[#f7ebeb] text-[#9b0000] flex items-center justify-center">
                <Icon size={20} />
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-[#9b0000] leading-none">{value}</div>
                <div className="mt-1 text-[#726a66] text-[12px]">{label}</div>
              </div>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {/* PER KATEGORI */}
          <section className="p-5 bg-white border border-[#eee5df] rounded-lg shadow-sm">
            <h2 className="pl-3 mb-4 border-l-[3px] border-[#9b0000] text-[#9b0000] text-[16px] font-bold leading-tight">Buku per Kategori</h2>
            {perCategory.length === 0 && <p className="text-[#6b6663] text-[13px]">Belum ada kategori.</p>}
            <ul className="space-y-3.5">
              {perCategory.map((c) => (
                <li key={c.name}>
                  <div className="flex justify-between mb-1.5 text-[12px]">
                    <span className="font-semibold text-[#2e2927]">{c.name}</span>
                    <span className="text-[#726a66]">{c.total} buku</span>
                  </div>
                  {/* Progress bar sudut dibuat lebih tegas (rounded-sm) */}
                  <div className="h-2 rounded-sm bg-[#f7ebeb] overflow-hidden">
                    <div className="h-full rounded-sm bg-[#9b0000]" style={{ width: `${(c.total / maxCat) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* PER INSTITUSI */}
          <section className="p-5 bg-white border border-[#eee5df] rounded-lg shadow-sm">
            <h2 className="pl-3 mb-4 border-l-[3px] border-[#9b0000] text-[#9b0000] text-[16px] font-bold leading-tight">Institusi Terbanyak</h2>
            {perInstitution.length === 0 && <p className="text-[#6b6663] text-[13px]">Belum ada institusi.</p>}
            <ul className="space-y-3.5">
              {perInstitution.map((c) => (
                <li key={c.name}>
                  <div className="flex justify-between mb-1.5 text-[12px]">
                    <span className="font-semibold text-[#2e2927] truncate pr-3">{c.name}</span>
                    <span className="text-[#726a66] shrink-0">{c.total} buku</span>
                  </div>
                  <div className="h-2 rounded-sm bg-[#f7e9dc] overflow-hidden">
                    <div className="h-full rounded-sm bg-[#cc8657]" style={{ width: `${(c.total / maxInst) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* BUKU TERBARU */}
        <section className="p-5 bg-white border border-[#eee5df] rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="pl-3 border-l-[3px] border-[#9b0000] text-[#9b0000] text-[16px] font-bold leading-tight">Terakhir Ditambahkan</h2>
            <a href="/admin/kelola-buku" className="text-[#9b0000] font-bold text-[12px] flex items-center gap-1 hover:text-[#760000] hover:translate-x-0.5 transition-all">
              Kelola <ChevronRight size={14} />
            </a>
          </div>
          <ul className="divide-y divide-[#f0e9e4]">
            {list.slice(-5).reverse().map((b) => (
              <li key={b.id} className="flex items-center gap-3 py-2.5">
                <div className="w-[32px] h-[44px] shrink-0 rounded-sm border border-gray-100 shadow-sm" style={{ background: b.cover }} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[13px] text-gray-900 truncate">{b.title}</p>
                  <p className="text-[11px] text-[#6b6663] truncate mt-0.5">{b.author} · {b.university}</p>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-[#f7ebeb] text-[#9b0000] text-[10px] font-bold uppercase tracking-wider">{b.category}</span>
              </li>
            ))}
            {list.length === 0 && <li className="py-6 text-center text-[#6b6663] text-[13px]">Belum ada buku.</li>}
          </ul>
        </section>

      </div>
    </AdminLayout>
  )
}