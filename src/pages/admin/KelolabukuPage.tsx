import { useMemo, useState } from 'react'
import { Plus, Search, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { books as initialBooks, categories } from '../../lib/data'
import AdminLayout from './AdminLayout'

type Book = {
  id: string | number
  title: string
  author: string
  university: string
  category: string
  link: string
  cover: string
}

export default function KelolabukuPage() {
  const [items, setItems] = useState<Book[]>(initialBooks as Book[])
  const [query, setQuery] = useState('')
  const [filterCat, setFilterCat] = useState('Semua Kategori')
  const [deleting, setDeleting] = useState<Book | null>(null)

  const catNames = categories.filter((c) => c.name !== 'Semua Kategori').map((c) => c.name)

  const filtered = useMemo(() => {
    const s = query.toLowerCase()
    return items.filter((b) => {
      const okQ = b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s) || b.university.toLowerCase().includes(s)
      const okC = filterCat === 'Semua Kategori' || b.category === filterCat
      return okQ && okC
    })
  }, [items, query, filterCat])

  const confirmDelete = () => {
    if (deleting) setItems((prev) => prev.filter((b) => b.id !== deleting.id))
    setDeleting(null)
  }

  return (
    <AdminLayout>
      <div className="min-h-screen text-[#231f1f] font-sans">
        
        {/* Header Ramping */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <p className="mb-1 text-[#cc8657] text-[11px] font-semibold tracking-[2px] uppercase">Panel Admin</p>
            <h1 className="font-serif font-bold text-2xl text-[#9b0000] leading-tight">Kelola Koleksi</h1>
            <p className="mt-0.5 text-[#6b6663] text-[13px]">{items.length} buku terdaftar di katalog.</p>
          </div>
          <Link
            to="/admin/kelola-buku/tambah"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors self-start sm:self-auto"
          >
            <Plus size={16} /> Tambah Buku
          </Link>
        </div>

        {/* FILTER RAMPING */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <div className="flex-1 h-9 px-3 flex items-center gap-2 bg-white border border-gray-200 rounded-md shadow-sm focus-within:border-[#9b0000] transition-colors">
            <Search size={15} className="text-[#817a75] shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul, penulis, atau institusi..."
              className="w-full bg-transparent border-none outline-none text-[13px] placeholder-[#817a75]"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="h-9 px-3 bg-white border border-gray-200 rounded-md text-[13px] outline-none focus:border-[#9b0000]"
          >
            <option>Semua Kategori</option>
            {catNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* TABEL PROPORSIONAL */}
        <div className="bg-white border border-[#eee5df] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#fff8f5] text-[#9b0000] text-[12px] font-semibold border-b border-[#eee5df]">
                <tr>
                  <th className="px-4 py-2.5">Buku</th>
                  <th className="px-4 py-2.5">Kategori</th>
                  <th className="px-4 py-2.5">Institusi</th>
                  <th className="px-4 py-2.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e9e4]">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#fffcfa] transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-[30px] h-[40px] shrink-0 rounded-sm border border-gray-100 shadow-sm" style={{ background: b.cover }} />
                        <div className="min-w-[180px]">
                          <p className="font-semibold text-gray-900 line-clamp-1">{b.title}</p>
                          <p className="text-[11px] text-[#6b6663]">{b.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#f7ebeb] text-[#9b0000] text-[11px] font-medium whitespace-nowrap">{b.category}</span>
                    </td>
                    <td className="px-4 py-2.5 text-[#68605d] text-[12px] whitespace-nowrap">{b.university}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <a href={b.link} target="_blank" rel="noreferrer" className="p-1.5 rounded-md text-[#817a75] hover:bg-[#f7ebeb] hover:text-[#9b0000] transition-colors">
                          <ExternalLink size={15} />
                        </a>
                        <Link to={`/admin/kelola-buku/edit/${b.id}`} className="p-1.5 rounded-md text-[#817a75] hover:bg-[#f7ebeb] hover:text-[#9b0000] transition-colors">
                          <Pencil size={15} />
                        </Link>
                        <button type="button" onClick={() => setDeleting(b)} className="p-1.5 rounded-md text-[#817a75] hover:bg-[#f7ebeb] hover:text-[#9b0000] transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-[#6b6663]">
                      <p className="font-medium text-[#312b28]">Buku tidak ditemukan</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL HAPUS */}
        {deleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-[380px] p-5 bg-white rounded-lg shadow-xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-md bg-[#f7ebeb] text-[#9b0000] flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#9b0000]">Hapus buku ini?</h3>
              <p className="mt-1 mb-5 text-[13px] text-[#68605d]">“{deleting.title}” akan dihapus dari katalog.</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setDeleting(null)} className="flex-1 h-9 rounded-md border border-gray-200 text-[13px] font-medium hover:bg-gray-50 transition-colors">
                  Batal
                </button>
                <button type="button" onClick={confirmDelete} className="flex-1 h-9 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}