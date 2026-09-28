import { useState } from 'react'
import {
  Plus, Pencil, Trash2, X, BookOpen, Landmark, LibraryBig, Tags, Scroll, Users, Globe, Heart, Star, Sprout
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { categories as initialCategories, books } from '../../lib/data'
import AdminLayout from './AdminLayout'

type Icon = LucideIcon
type Category = { name: string; icon: Icon }

const iconOptions: { key: string; label: string; icon: Icon }[] = [
  { key: 'book', label: 'Buku', icon: BookOpen },
  { key: 'landmark', label: 'Sejarah', icon: Landmark },
  { key: 'library', label: 'Pustaka', icon: LibraryBig },
  { key: 'scroll', label: 'Naskah', icon: Scroll },
  { key: 'users', label: 'Masyarakat', icon: Users },
  { key: 'globe', label: 'Budaya', icon: Globe },
  { key: 'heart', label: 'Akhlak', icon: Heart },
  { key: 'star', label: 'Tokoh', icon: Star },
  { key: 'sprout', label: 'Alam', icon: Sprout },
  { key: 'tags', label: 'Umum', icon: Tags }
]

const inputCls =
  'w-full h-9 px-3 bg-white border border-gray-200 rounded-md text-[13px] outline-none focus:border-[#9b0000] transition-all'

export default function KelolaKategoriPage() {
  const [items, setItems] = useState<Category[]>(
    (initialCategories as Category[]).filter((c) => c.name !== 'Semua Kategori')
  )
  const [open, setOpen] = useState(false)
  const [editingName, setEditingName] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [iconKey, setIconKey] = useState('book')
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<Category | null>(null)

  const countBooks = (n: string) => (books as { category: string }[]).filter((b) => b.category === n).length

  const openAdd = () => {
    setEditingName(null)
    setName('')
    setIconKey('book')
    setError('')
    setOpen(true)
  }

  const openEdit = (c: Category) => {
    setEditingName(c.name)
    setName(c.name)
    setIconKey(iconOptions.find((o) => o.icon === c.icon)?.key ?? 'book')
    setError('')
    setOpen(true)
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = name.trim()
    if (items.some((c) => c.name.toLowerCase() === clean.toLowerCase() && c.name !== editingName)) {
      setError('Nama kategori sudah dipakai.')
      return
    }
    const icon = iconOptions.find((o) => o.key === iconKey)!.icon
    if (editingName) {
      setItems((prev) => prev.map((c) => (c.name === editingName ? { name: clean, icon } : c)))
    } else {
      setItems((prev) => [...prev, { name: clean, icon }])
    }
    setOpen(false)
  }

  return (
    <AdminLayout>
      <div className="min-h-screen text-[#231f1f] font-sans">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <p className="mb-1 text-[#cc8657] text-[11px] font-semibold tracking-[2px] uppercase">Panel Admin</p>
            <h1 className="font-serif font-bold text-2xl text-[#9b0000] leading-tight">Kelola Kategori</h1>
            <p className="mt-0.5 text-[#6b6663] text-[13px]">Kategori ini tampil sebagai grid ikon di beranda.</p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors self-start sm:self-auto"
          >
            <Plus size={16} /> Tambah Kategori
          </button>
        </div>

        {/* GRID KARTU RAMPING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {items.map((c) => {
            const Icon = c.icon
            const total = countBooks(c.name)
            return (
              <article key={c.name} className="p-4 flex flex-col bg-white border border-[#eee6e1] rounded-lg shadow-sm hover:border-[#e6d6ce] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-md bg-[#f7ebeb] text-[#9b0000] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[14px] text-gray-900 truncate">{c.name}</h3>
                    <p className="text-[12px] text-[#6b6663]">{total} buku</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 pt-2 border-t border-gray-100">
                  <button type="button" onClick={() => openEdit(c)} className="flex-1 flex items-center justify-center gap-1.5 h-8 border border-[#9b0000] text-[#9b0000] rounded-md text-[12px] font-medium hover:bg-[#9b0000] hover:text-white transition-colors">
                    <Pencil size={13} /> Ubah
                  </button>
                  <button type="button" onClick={() => setDeleting(c)} aria-label={`Hapus ${c.name}`} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-[#817a75] hover:bg-[#f7ebeb] hover:text-[#9b0000] transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            )
          })}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-[#6b6663]">
              <Tags size={32} className="mx-auto mb-2 text-[#9b0000]" />
              <h3 className="mb-1 text-base font-semibold text-[#312b28]">Belum ada kategori</h3>
              <p className="text-[13px]">Klik Tambah Kategori untuk membuat yang pertama.</p>
            </div>
          )}
        </div>

        {/* MODAL FORM */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <form onSubmit={save} className="w-full max-w-[400px] p-5 bg-white rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-[#9b0000]">{editingName ? 'Ubah Kategori' : 'Tambah Kategori'}</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="p-1 rounded hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>

              <label className="block text-[12px] font-medium text-[#3f3a37]">
                Nama kategori
                <input required value={name} onChange={(e) => { setName(e.target.value); setError('') }} className={`${inputCls} mt-1`} />
              </label>
              {error && <p className="mt-1 text-[12px] text-[#9b0000]">{error}</p>}

              <p className="mt-4 mb-1.5 text-[12px] font-medium text-[#3f3a37]">Pilih Ikon</p>
              <div className="grid grid-cols-5 gap-2">
                {iconOptions.map(({ key, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setIconKey(key)}
                    aria-label={label}
                    title={label}
                    className={`h-9 rounded-md flex items-center justify-center transition-all ${
                      iconKey === key ? 'bg-[#9b0000] text-white' : 'bg-[#f7ebeb] text-[#9b0000] hover:bg-[#f0d9d9]'
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setOpen(false)} className="h-9 px-4 rounded-md border border-gray-200 text-[13px] font-medium text-[#3f3a37] hover:bg-gray-50 transition-colors">
                  Batal
                </button>
                <button type="submit" className="h-9 px-4 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL HAPUS */}
        {deleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-[380px] p-5 bg-white rounded-lg shadow-xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-md bg-[#f7ebeb] text-[#9b0000] flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#9b0000]">Hapus kategori ini?</h3>
              <p className="mt-1 mb-5 text-[13px] text-[#68605d]">
                {countBooks(deleting.name) > 0
                  ? `Kategori “${deleting.name}” masih dipakai ${countBooks(deleting.name)} buku.`
                  : `Kategori “${deleting.name}” akan dihapus.`}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setDeleting(null)} className="flex-1 h-9 rounded-md border border-gray-200 text-[13px] font-medium hover:bg-gray-50 transition-colors">
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => { setItems((prev) => prev.filter((c) => c.name !== deleting.name)); setDeleting(null) }}
                  className="flex-1 h-9 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors"
                >
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