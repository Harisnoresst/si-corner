import { useState } from 'react'
import { Plus, Pencil, Trash2, X, ExternalLink, Landmark } from 'lucide-react'
import { partners as initialPartners, books } from '../../lib/data'
import AdminLayout from './AdminLayout'

type Partner = { id: string | number; name: string; logo: string; link: string }

const emptyForm = { name: '', logo: '', link: '' }

const inputCls =
  'w-full h-9 px-3 bg-white border border-gray-200 rounded-md text-[13px] outline-none focus:border-[#9b0000] transition-all'

export default function KelolaInstitusiPage() {
  const [items, setItems] = useState<Partner[]>(initialPartners as Partner[])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Partner | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleting, setDeleting] = useState<Partner | null>(null)

  const countBooks = (name: string) => (books as { university: string }[]).filter((b) => b.university === name).length

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const openEdit = (p: Partner) => {
    setEditing(p)
    setForm({ name: p.name, logo: p.logo, link: p.link })
    setOpen(true)
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const data = { name: form.name.trim(), logo: form.logo.trim(), link: form.link.trim() }
    if (editing) {
      setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)))
    } else {
      setItems((prev) => [...prev, { id: Date.now(), ...data }])
    }
    setOpen(false)
  }

  return (
    <AdminLayout>
      <div className="min-h-screen text-[#231f1f] font-sans">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <p className="mb-1 text-[#cc8657] text-[11px] font-semibold tracking-[2px] uppercase">Panel Admin</p>
            <h1 className="font-serif font-bold text-2xl text-[#9b0000] leading-tight">Kelola Institusi</h1>
            <p className="mt-0.5 text-[#6b6663] text-[13px]">Perpustakaan sumber yang tampil di bagian Sumber Koleksi.</p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors self-start sm:self-auto"
          >
            <Plus size={16} /> Tambah Institusi
          </button>
        </div>

        {/* GRID KARTU RAMPING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {items.map((p) => (
            <article key={p.id} className="p-4 flex flex-col bg-white border border-[#eee6e1] rounded-lg shadow-sm hover:border-[#e6d6ce] transition-all">
              <div className="h-[64px] mb-3 flex items-center justify-center rounded-md bg-[#fff8f5] border border-[#f0e3dc] p-2">
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="max-h-full w-auto object-contain" />
                ) : (
                  <Landmark size={24} className="text-[#9b0000]" />
                )}
              </div>
              <h3 className="font-semibold text-[14px] leading-snug text-gray-900 line-clamp-1">{p.name}</h3>
              <p className="mt-0.5 text-[12px] text-[#6b6663]">{countBooks(p.name)} buku</p>
              <a href={p.link} target="_blank" rel="noreferrer" className="mt-1 mb-3 flex items-center gap-1 text-[11px] text-[#68605d] hover:text-[#9b0000] transition-colors truncate">
                <ExternalLink size={12} className="shrink-0" /> <span className="truncate">{p.link}</span>
              </a>
              <div className="mt-auto flex gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 h-8 border border-[#9b0000] text-[#9b0000] rounded-md text-[12px] font-medium hover:bg-[#9b0000] hover:text-white transition-colors">
                  <Pencil size={13} /> Ubah
                </button>
                <button type="button" onClick={() => setDeleting(p)} aria-label={`Hapus ${p.name}`} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-[#817a75] hover:bg-[#f7ebeb] hover:text-[#9b0000] transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-[#6b6663]">
              <Landmark size={32} className="mx-auto mb-2 text-[#9b0000]" />
              <h3 className="mb-1 text-base font-semibold text-[#312b28]">Belum ada institusi</h3>
              <p className="text-[13px]">Klik Tambah Institusi untuk menambahkan perpustakaan sumber.</p>
            </div>
          )}
        </div>

        {/* MODAL FORM */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <form onSubmit={save} className="w-full max-w-[420px] p-5 bg-white rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-[#9b0000]">{editing ? 'Ubah Institusi' : 'Tambah Institusi'}</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="p-1 rounded hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-[12px] font-medium text-[#3f3a37]">
                  Nama institusi
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${inputCls} mt-1`} />
                </label>
                <label className="block text-[12px] font-medium text-[#3f3a37]">
                  URL logo
                  <input required placeholder="/images/logo-institusi.png" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className={`${inputCls} mt-1`} />
                </label>
                <label className="block text-[12px] font-medium text-[#3f3a37]">
                  Link perpustakaan
                  <input required type="url" placeholder="https://" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className={`${inputCls} mt-1`} />
                </label>

                {form.logo && (
                  <div className="h-[52px] flex items-center justify-center rounded-md bg-[#fff8f5] border border-[#f0e3dc] p-2">
                    <img src={form.logo} alt="Pratinjau logo" className="max-h-full w-auto object-contain" />
                  </div>
                )}
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
              <h3 className="font-serif text-lg font-bold text-[#9b0000]">Hapus institusi ini?</h3>
              <p className="mt-1 mb-5 text-[13px] text-[#68605d]">
                {countBooks(deleting.name) > 0
                  ? `“${deleting.name}” masih digunakan oleh ${countBooks(deleting.name)} buku.`
                  : `“${deleting.name}” akan dihapus.`}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setDeleting(null)} className="flex-1 h-9 rounded-md border border-gray-200 text-[13px] font-medium hover:bg-gray-50 transition-colors">
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => { setItems((prev) => prev.filter((p) => p.id !== deleting.id)); setDeleting(null) }}
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