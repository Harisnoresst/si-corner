import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Filter, X, BookOpen, ChevronRight } from 'lucide-react'
import { mockBooksData } from './DetailBukuPage'

const categories = ['Sejarah', 'Budaya', 'Akhlak', 'Naskah', 'Masyarakat']
const institutions = ['UIN Sunan Gunung Djati', 'Universitas Padjadjaran', 'UPI Bandung', 'UIN Syarif Hidayatullah']
const years = ['2024', '2023', '2022', '2021', '2020', 'Lebih Lama']

export default function KatalogPage() {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || ''

  const [query, setQuery] = useState(initialSearch)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const toggleSelection = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) setList(list.filter(i => i !== item))
    else setList([...list, item])
  }

  const filteredBooks = useMemo(() => {
    const s = query.toLowerCase()
    return mockBooksData.filter((b) => {
      const matchQuery = b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s)
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(b.category)
      const matchInst = selectedInstitutions.length === 0 || selectedInstitutions.includes(b.university)
      
      let matchYear = true
      if (selectedYear) {
        if (selectedYear === 'Lebih Lama') matchYear = parseInt(b.year) < 2020
        else matchYear = b.year === selectedYear
      }

      return matchQuery && matchCat && matchInst && matchYear
    })
  }, [query, selectedCategories, selectedInstitutions, selectedYear])

  const FilterContent = () => (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Kategori</h3>
        <div className="flex flex-col gap-1.5">
          {categories.map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(c)}
                onChange={() => toggleSelection(selectedCategories, setSelectedCategories, c)}
                className="w-3.5 h-3.5 rounded-sm border-gray-300 text-[#9b0000] focus:ring-[#9b0000] cursor-pointer" 
              />
              <span className="text-[13px] text-gray-600 group-hover:text-[#9b0000] transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-100" />

      <div>
        <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Institusi</h3>
        <div className="flex flex-col gap-1.5">
          {institutions.map(inst => (
            <label key={inst} className="flex items-start gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedInstitutions.includes(inst)}
                onChange={() => toggleSelection(selectedInstitutions, setSelectedInstitutions, inst)}
                className="w-3.5 h-3.5 mt-0.5 rounded-sm border-gray-300 text-[#9b0000] focus:ring-[#9b0000] cursor-pointer shrink-0" 
              />
              <span className="text-[13px] leading-snug text-gray-600 group-hover:text-[#9b0000] transition-colors">{inst}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-100" />

      <div>
        <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Tahun Terbit</h3>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full h-8 px-2.5 text-[13px] bg-white border border-gray-200 rounded-md outline-none focus:border-[#9b0000] text-gray-600 cursor-pointer"
        >
          <option value="">Semua Tahun</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      
      {(selectedCategories.length > 0 || selectedInstitutions.length > 0 || selectedYear || query) && (
        <button 
          onClick={() => {
            setSelectedCategories([]); setSelectedInstitutions([]); setSelectedYear(''); setQuery('')
          }}
          className="mt-2 h-8 flex items-center justify-center text-[12px] font-medium text-[#9b0000] bg-[#f7ebeb] rounded-md hover:bg-[#f0d9d9] transition-colors"
        >
          Reset Filter
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fbfaf8] font-sans text-[#231f1f]">
      <main className="max-w-[1200px] mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* SIDEBAR FILTER (DESKTOP) */}
        <aside className="hidden md:block w-[220px] shrink-0 sticky top-[84px]">
          <h2 className="font-serif font-semibold text-lg text-[#9b0000] mb-4">Filter Koleksi</h2>
          <div className="bg-white border border-[#eee5df] rounded-lg p-4 shadow-sm">
            <FilterContent />
          </div>
        </aside>

        {/* AREA UTAMA */}
        <section className="flex-1 w-full min-w-0">
          <div className="mb-5">
            <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-1">Katalog Buku</h1>
            <p className="text-[13px] text-gray-500">Temukan referensi bacaan dari berbagai institusi.</p>
            
            <div className="mt-4 flex gap-2">
              <div className="flex-1 max-w-[400px] h-9 px-3 flex items-center gap-2 bg-white border border-gray-200 rounded-md shadow-sm focus-within:border-[#9b0000] transition-colors">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari judul atau penulis..."
                  className="w-full bg-transparent border-none outline-none text-[13px] placeholder-gray-400"
                />
              </div>
              
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden h-9 px-3 flex items-center gap-1.5 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <Filter size={15} className="text-gray-500" /> Filter
              </button>
            </div>
          </div>

          <div className="mb-4 text-[13px] text-gray-500">
            Menampilkan <span className="font-semibold text-gray-900">{filteredBooks.length}</span> buku
          </div>

          {/* GRID KARTU BUKU */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks.map((b) => (
                <Link
                  key={b.id}
                  to={`/katalog/${b.id}`}
                  className="group flex flex-col bg-white border border-[#eee5df] rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-[#e6d6ce] transition-all cursor-pointer"
                >
                  <div className="aspect-[3/4] w-full bg-gray-100 relative border-b border-[#eee5df] overflow-hidden flex items-center justify-center p-4">
                     <div 
                        className="w-[80%] h-[90%] rounded shadow-sm border border-black/5" 
                        style={{ backgroundColor: b.cover }}
                     />
                     <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm border border-gray-100 text-[10px] font-semibold text-[#9b0000] shadow-sm">
                       {b.category}
                     </div>
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-semibold text-[13px] leading-snug text-gray-900 group-hover:text-[#9b0000] transition-colors line-clamp-2" title={b.title}>
                      {b.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">{b.author}</p>
                    
                    <div className="mt-auto pt-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                        <BookOpen size={12} className="shrink-0" />
                        <span className="truncate" title={b.university}>{b.university}</span>
                        <span className="mx-0.5">•</span>
                        <span>{b.year}</span>
                      </div>
                      
                      {/* TULISAN DETAIL BUKU */}
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-1 text-[11px] font-semibold text-[#9b0000] opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        Detail buku <ChevronRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-dashed border-gray-200 rounded-lg bg-white">
              <Search size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-[14px] font-medium text-gray-600">Buku tidak ditemukan</p>
              <p className="text-[12px] text-gray-400 mt-1">Coba sesuaikan kata kunci atau hapus filter.</p>
            </div>
          )}
        </section>
      </main>

      {/* OVERLAY FILTER MOBILE */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[260px] bg-white shadow-2xl flex flex-col">
            <div className="h-[60px] px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <h2 className="font-serif font-bold text-lg text-[#9b0000]">Filter</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded bg-gray-50">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterContent />
            </div>
            <div className="p-4 border-t border-gray-100 shrink-0">
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full h-9 rounded-md bg-[#9b0000] text-white text-[13px] font-medium hover:bg-[#760000] transition-colors"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}