import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Save, List, Plus } from 'lucide-react'
import { categories, partners } from '../../lib/data'
import AdminLayout from './AdminLayout'

// Move FormRow OUTSIDE FormBukuPage component to prevent re-mounting inputs on state change
const FormRow = ({ label, required, children, align = 'items-center' }: any) => (
  <div className={`flex flex-col md:flex-row md:${align} py-3.5`}>
    <label className="w-full md:w-56 font-medium text-[#3f3a37] shrink-0 mb-1 md:mb-0 pt-1 md:pt-0">
      {label} {required && <span className="text-[#9b0000]">*</span>}
    </label>
    <span className="hidden md:block w-6 text-[#817a75] pt-1 md:pt-0">:</span>
    <div className="flex-1 w-full max-w-4xl">{children}</div>
  </div>
)

const inputCls = "w-full h-[38px] px-3 bg-white border border-gray-300 rounded-[3px] text-[13px] outline-none focus:border-[#9b0000] focus:ring-1 focus:ring-[#9b0000] transition-all"

export default function FormBukuPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const catNames = categories.filter((c) => c.name !== 'Semua Kategori').map((c) => c.name)

  const [form, setForm] = useState({
    title: '',
    author: '',
    edition: '',
    category: catNames[0] ?? '', // Setara dengan GMD
    university: partners[0]?.name ?? '',
    isbn: '',
    publisher: '',
    publishYear: '',
    publishPlace: '',
    collation: '',
    classification: '',
    callNumber: '',
    subjects: '',
    abstract: '',
    link: '',
    imageUrl: '',
  })

  // State fallback untuk warna gradasi jika tidak ada cover
  const [c1] = useState('#f3e3c8')
  const [c2] = useState('#e3c9a0')

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Simpan Data:', form)
    navigate('/admin/kelola-buku')
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#fbfaf8] text-[#333] font-sans px-4 sm:px-8 py-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5ded8] mb-4">
          <h1 className="font-serif font-bold text-2xl text-[#9b0000]">
            {isEditing ? 'Ubah Bibliografi' : 'Tambah Bibliografi Baru'}
          </h1>
          <div className="flex items-center gap-1 bg-[#eae3dc] p-1 rounded self-start sm:self-auto text-[13px] font-semibold">
            <Link to="/admin/kelola-buku" className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[#6b6663] hover:text-[#9b0000] hover:bg-white/60 transition-all">
              <List size={15} /> Daftar Bibliografi
            </Link>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9b0000] text-white shadow-sm">
              <Plus size={15} /> {isEditing ? 'Ubah Bibliografi' : 'Tambah Bibliografi Baru'}
            </span>
          </div>
        </div>

        <form onSubmit={save} className="w-full">
          {/* Tombol Aksi Atas */}
          <div className="flex items-center justify-between py-3 mb-2 border-b border-[#e5ded8]">
            <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-[#9b0000] text-white text-[13px] font-bold rounded shadow-sm hover:bg-[#760000] transition-colors">
              <Save size={16} /> Simpan
            </button>
          </div>

          {/* Form Rows */}
          <div className="divide-y divide-[#ece4de] text-[13px]">
            
            <FormRow label="Judul Utama" required>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
            </FormRow>

            <FormRow label="Pengarang / Penulis" required>
              <div className="flex gap-2">
                <input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputCls} />
                <button type="button" className="px-4 bg-[#888] text-white font-semibold rounded-[3px] hover:bg-[#666] whitespace-nowrap">Add Author(s)</button>
              </div>
            </FormRow>

            <FormRow label="Pernyataan Tanggung Jawab">
              <input className={inputCls} />
            </FormRow>

            <FormRow label="Edisi">
              <input value={form.edition} onChange={(e) => setForm({ ...form, edition: e.target.value })} className={inputCls} />
            </FormRow>

            <FormRow label="Institusi Asal / PT">
              <select value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} className={`${inputCls} max-w-sm`}>
                {partners.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </FormRow>

            <FormRow label="GMD / Kategori">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputCls} max-w-sm`}>
                {catNames.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </FormRow>

            <FormRow label="ISBN/ISSN">
              <input value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} className={`${inputCls} max-w-sm`} />
            </FormRow>

            <FormRow label="Penerbit">
              <input value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} className={inputCls} />
            </FormRow>

            <FormRow label="Tahun Terbit">
              <input value={form.publishYear} onChange={(e) => setForm({ ...form, publishYear: e.target.value })} className={`${inputCls} max-w-[200px]`} />
            </FormRow>

            <FormRow label="Tempat Terbit">
              <input value={form.publishPlace} onChange={(e) => setForm({ ...form, publishPlace: e.target.value })} className={`${inputCls} max-w-sm`} />
            </FormRow>

            <FormRow label="Deskripsi Fisik (Collation)">
              <input value={form.collation} onChange={(e) => setForm({ ...form, collation: e.target.value })} className={inputCls} />
            </FormRow>

            <FormRow label="Klasifikasi">
              <input value={form.classification} onChange={(e) => setForm({ ...form, classification: e.target.value })} className={`${inputCls} max-w-sm`} />
            </FormRow>

            <FormRow label="Nomor Panggil (Call Number)">
              <input value={form.callNumber} onChange={(e) => setForm({ ...form, callNumber: e.target.value })} className={`${inputCls} max-w-sm`} />
            </FormRow>

            <FormRow label="Subjek" align="items-start">
              <div className="flex flex-col gap-2">
                <div>
                  <button type="button" className="px-4 py-1.5 bg-[#888] text-white font-semibold rounded-[3px] hover:bg-[#666]">Add Subject(s)</button>
                </div>
                <textarea value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} rows={3} className={`${inputCls} h-auto py-2`} />
              </div>
            </FormRow>

            <FormRow label="Abstrak / Catatan" align="items-start">
              <textarea value={form.abstract} onChange={(e) => setForm({ ...form, abstract: e.target.value })} rows={5} className={`${inputCls} h-auto py-2`} />
            </FormRow>

            <FormRow label="Tautan (URL) Katalog Asli" required>
              <input required type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className={inputCls} />
            </FormRow>

            {/* Bagian Image (Cover) ala SLiMS */}
            <FormRow label="Gambar Sampul" align="items-start">
              <div className="flex flex-col md:flex-row gap-4">
                
                {/* Preview Box */}
                <div className="w-[110px] h-[150px] shrink-0 bg-gray-200 border-l-[12px] border-[#333] shadow-sm flex items-center justify-center p-2 text-center overflow-hidden" 
                     style={{ background: form.imageUrl ? 'transparent' : `linear-gradient(135deg, ${c1}, ${c2})` }}>
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-sans text-[12px] font-bold text-gray-500 line-clamp-4 tracking-widest uppercase">
                      BOOK<br/>COVER
                    </span>
                  )}
                </div>

                {/* Input Controls */}
                <div className="flex-1 space-y-4">
                  {/* File Upload */}
                  <div className="flex gap-2 items-center">
                    <div className="flex w-full max-w-lg border border-gray-300 rounded-[3px] bg-white overflow-hidden h-[38px]">
                      <span className="px-3 py-2 text-gray-400 bg-gray-50 border-r border-gray-300 w-full">Choose file</span>
                      <label className="px-4 py-2 bg-[#888] text-white font-semibold cursor-pointer hover:bg-[#666] transition-colors shrink-0">
                        Browse
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                    <span className="text-gray-500">Maximum 500 KB</span>
                  </div>

                  {/* URL Upload */}
                  <div className="space-y-2">
                    <p className="text-[#3f3a37]">Or download from url</p>
                    <div className="flex flex-wrap gap-2">
                      <input 
                        type="url" 
                        placeholder="Paste url address here" 
                        value={form.imageUrl}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                        className={`${inputCls} max-w-[280px]`} 
                      />
                      <button type="button" className="px-4 bg-[#888] text-white font-semibold rounded-[3px] hover:bg-[#666]">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            </FormRow>
            
            <FormRow label="Sembunyikan di OPAC">
               <div className="flex items-center gap-4 py-1">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="hideOpac" value="show" defaultChecked className="accent-[#9b0000]" />
                   Tampil
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="hideOpac" value="hide" className="accent-[#9b0000]" />
                   Sembunyikan
                 </label>
               </div>
            </FormRow>

          </div>

          {/* Tombol Aksi Bawah */}
          <div className="flex items-center py-4 mt-6 border-t border-[#e5ded8]">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#9b0000] text-white text-[13px] font-bold rounded shadow-sm hover:bg-[#760000] transition-colors">
              <Save size={16} /> Simpan
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}