import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Search,
  Landmark,
  ExternalLink,
  Instagram,
  LibraryBig,
  Mail,
  ChevronRight
} from 'lucide-react'
import { books, categories, partners } from '../../lib/data'

export default function WelcomePage() {
  const [query, setQuery] = useState('')
  const [category] = useState('Semua Kategori')

  const navigate = useNavigate()

  // Logic filter untuk Koleksi Unggulan di Beranda
  const filtered = useMemo(() => {
    return books
      .filter((book) => {
        const search = query.toLowerCase()
        const matchQuery =
          book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search) ||
          book.university.toLowerCase().includes(search)

        const matchCategory =
          category === 'Semua Kategori' || book.category === category

        return matchQuery && matchCategory
      })
      .slice(0, 5) // Batasi 5 buku untuk Koleksi Unggulan
  }, [query, category])

  // Fungsi navigasi ke halaman katalog
  const goToCatalog = () => {
    if (query) {
      navigate(`/katalog?search=${encodeURIComponent(query)}`)
    } else {
      navigate('/katalog')
    }
  }

  return (
    <>
      <style>{`
        @keyframes marquee-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 35s linear infinite;
        }
        .marquee-track:hover .animate-marquee-slow {
          animation-play-state: paused;
        }
      `}</style>

      {/* HERO SECTION */}
      <section id="beranda" className="relative min-h-[300px] md:min-h-[380px] px-5 md:px-[6vw] py-10 md:py-0 flex flex-col md:flex-row md:items-center overflow-hidden bg-[#f7f1e8] scroll-mt-[78px]">
        <div className="absolute -left-2 top-8 z-0 text-7xl opacity-5 text-[#a36f44] -rotate-6 select-none pointer-events-none">ᮞᮥᮔ᮪ᮓ</div>
        
        <div className="relative z-10 max-w-[590px] w-full pt-4 md:pt-0">
          <p className="mb-2.5 tracking-[4px] text-[#cc8657] font-bold text-[11px] md:text-[13px]">SELAMAT DATANG DI</p>
          <h1 className="mb-4 font-serif font-bold text-4xl md:text-[52px] leading-[1.05] text-[#9b0000]">
            Sunda Islam Corner
          </h1>
          <p className="mb-8 text-[16px] md:text-[18px] leading-relaxed text-[#514c49] max-w-[92%] md:max-w-full">
            Menelusuri khazanah ilmu, budaya, dan peradaban Sunda dalam
            perspektif Islam melalui koleksi perpustakaan perguruan tinggi.
          </p>
          <Link
            to="/katalog"
            className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-[#9b0000] text-white font-bold hover:bg-[#760000] hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <BookOpen size={18} /> Jelajahi Katalog <ChevronRight size={18} />
          </Link>
        </div>

        <div className="absolute inset-0 md:left-[40%] overflow-hidden z-[1] opacity-30 md:opacity-100">
          <img src="/images/img-perpus.jpeg" alt="Perpustakaan" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#f7f1e8] via-[#f7f1e8]/80 to-transparent pointer-events-none"></div>
          <div className="hidden md:block absolute right-[4vw] top-[50px] z-10 font-serif italic text-[26px] leading-[1.4] text-[#6c2f24] -rotate-3 text-center" style={{ textShadow: '0 0 6px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.65), 0 2px 4px rgba(255,255,255,0.9)' }}>
            “Ngawangun Elmu,<br />Ngahiji dina Kahadéan”
          </div>
        </div>
      </section>

      {/* SEARCH BOX TENGAH */}
      <section className="relative z-20 w-[90%] md:max-w-[760px] mx-auto -mt-6 md:-mt-8 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-[54px] md:h-[64px] px-5 flex items-center gap-3 bg-white border border-[#f0e9e4] rounded-full shadow-[0_8px_25px_rgba(55,40,26,0.08)] focus-within:border-[#9b0000] transition-colors">
          <Search size={22} className="text-[#817a75] shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && goToCatalog()}
            placeholder="Cari judul buku, penulis, atau kata kunci ..."
            className="w-full bg-transparent border-none outline-none text-[14px] md:text-[15px] text-[#3f3a37] placeholder-[#817a75]"
          />
        </div>
        <button
          type="button"
          onClick={goToCatalog}
          className="h-[54px] md:h-[64px] px-8 rounded-full bg-[#9b0000] text-white font-bold hover:bg-[#760000] hover:shadow-lg transition-all w-full sm:w-auto cursor-pointer"
        >
          Cari
        </button>
      </section>

      {/* KATEGORI */}
      <section className="max-w-[1060px] mx-auto mt-10 mb-6 px-4 md:px-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map(({ name, icon: Icon }) => (
          <button
            type="button"
            key={name}
            onClick={() => {
              navigate(`/katalog?category=${encodeURIComponent(name)}`)
            }}
            className="flex flex-col items-center gap-2.5 group transition-colors text-[#2e2927] cursor-pointer"
          >
            <div className="w-[52px] md:w-[60px] h-[52px] md:h-[60px] rounded-full flex items-center justify-center transition-all bg-[#f7ebeb] text-[#9b0000] group-hover:bg-[#9b0000] group-hover:text-white group-hover:-translate-y-1">
              <Icon size={26} />
            </div>
            <span className="text-[12px] md:text-[13px] text-center font-medium leading-tight">{name}</span>
          </button>
        ))}
      </section>

      {/* TENTANG KAMI */}
      <section id="tentang" className="py-14 md:py-20 px-5 md:px-[6vw] bg-white scroll-mt-[70px]">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.5fr_0.8fr] gap-10 md:gap-16 items-center">
          <div>
            <p className="mb-2 text-[#cc8657] text-[12px] md:text-[13px] font-bold tracking-[3px]">TENTANG KAMI</p>
            <h2 className="mb-5 text-[#9b0000] font-serif text-3xl md:text-[36px]">Tentang Sunda Islam Corner</h2>
            <p className="mb-4 text-[#5c5652] text-[15px] md:text-[16px] leading-[1.8]">
              Sunda Islam Corner merupakan layanan katalog digital Perpustakaan
              UIN Sunan Gunung Djati Bandung yang menghimpun dan menghubungkan
              berbagai referensi mengenai Sunda dan Islam dari perpustakaan
              perguruan tinggi.
            </p>
            <p className="text-[#5c5652] text-[15px] md:text-[16px] leading-[1.8]">
              Melalui layanan ini, pengguna dapat menelusuri koleksi berdasarkan
              judul, penulis, kategori, maupun institusi sumber. Setiap koleksi
              akan diarahkan ke katalog perpustakaan asal untuk memperoleh
              informasi lebih lanjut.
            </p>
          </div>
          <div className="p-8 md:p-10 bg-[#fff8f5] border border-[#f0e3dc] rounded-[20px] text-center shadow-[0_10px_30px_rgba(80,50,40,0.06)]">
            <BookOpen size={46} className="text-[#9b0000] mx-auto" />
            <h3 className="mt-5 mb-3 text-[#9b0000] text-xl font-bold">Khazanah Sunda & Islam</h3>
            <p className="text-[#68605d] leading-relaxed text-[15px]">
              Menghubungkan literatur, budaya, sejarah, dan keislaman dalam
              satu portal pencarian yang terintegrasi.
            </p>
          </div>
        </div>
      </section>

      {/* KOLEKSI UNGGULAN */}
      <section className="pt-10 md:pt-14 px-5 md:px-[4.8vw]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="pl-3 border-l-4 border-[#9b0000] text-[#9b0000] text-2xl md:text-[28px] font-bold leading-tight">Koleksi Unggulan</h2>
            <p className="mt-2 ml-4 text-[#6b6663] text-[13px] md:text-[14px]">Pilihan buku dari berbagai perpustakaan perguruan tinggi</p>
          </div>
          <Link
            to="/katalog"
            className="text-[#9b0000] font-bold text-[13px] md:text-[14px] flex items-center gap-1 hover:text-[#760000] hover:translate-x-1 transition-all"
          >
            Lihat Semua <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {filtered.length > 0 ? (
            filtered.map((book) => (
              <article key={book.id} className="group min-h-[380px] md:min-h-[410px] p-3 md:p-4 flex flex-col bg-white border border-[#eee6e1] rounded-2xl shadow-sm hover:-translate-y-1 hover:border-[#e6d6ce] hover:shadow-[0_14px_30px_rgba(80,50,40,0.08)] transition-all">
                <div className="w-[85%] md:w-[78%] h-[160px] md:h-[185px] mx-auto mb-4 p-4 relative grid place-items-center rounded-sm shadow-md" style={{ background: book.cover }}>
                  <span className="font-serif text-[14px] md:text-[16px] font-bold leading-tight text-center text-[#3b2f26] line-clamp-4">{book.title}</span>
                  <span className="absolute bottom-2 right-2.5 opacity-40 text-xs">✦</span>
                </div>
                <h3 className="mb-1 text-[14px] md:text-[16px] font-semibold leading-[1.3] text-gray-900 line-clamp-2">{book.title}</h3>
                <p className="text-[12px] md:text-[13px] text-[#6b6663] line-clamp-1">{book.author}</p>
                <p className="mt-auto mb-0 pt-3 flex items-center gap-2 text-[#68605d] text-[11px] md:text-[12px]">
                  <Landmark size={14} className="shrink-0" /> <span className="truncate">{book.university}</span>
                </p>
                <a href={book.link} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 h-[36px] border border-[#9b0000] text-[#9b0000] rounded-full text-[12px] font-bold hover:bg-[#9b0000] hover:text-white transition-colors">
                  Lihat Katalog <ExternalLink size={14} />
                </a>
              </article>
            ))
          ) : (
            <div className="col-span-full py-16 px-5 text-center text-[#6b6663]">
              <BookOpen size={38} className="mx-auto mb-4 text-[#9b0000]" />
              <h3 className="mb-2 text-lg font-bold text-[#312b28]">Koleksi tidak ditemukan</h3>
            </div>
          )}
        </div>
      </section>

      {/* INSTITUSI */}
      <section id="institusi" className="pt-12 md:pt-16 scroll-mt-[70px]">
        <div className="mb-6 px-5 md:px-[4.8vw]">
          <h2 className="pl-3 border-l-4 border-[#9b0000] text-[#9b0000] text-2xl md:text-[28px] font-bold leading-tight">Sumber Koleksi</h2>
          <p className="mt-2 ml-4 text-[#6b6663] text-[13px] md:text-[14px]">Koleksi terkurasi dari berbagai perpustakaan perguruan tinggi</p>
        </div>
        <div className="marquee-track relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-12 md:gap-20 animate-marquee-slow">
            {[...partners, ...partners].map((partner, idx) => (
              <a key={`${partner.id}-${idx}`} href={partner.link} target="_blank" rel="noreferrer" className="shrink-0 flex items-center justify-center h-[48px] md:h-[64px]" title={partner.name}>
                <img src={partner.logo} alt={partner.name} className="h-full w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REKOMENDASI */}
      <section className="mx-5 md:mx-[4.8vw] mt-12 mb-10 md:mb-14 p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 border border-[#f0e5de] rounded-[16px] bg-[#fff8f5]">
        <div className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center text-[#9b0000]">
          <BookOpen size={28} />
        </div>
        <div className="text-center md:text-left flex-1">
          <h3 className="mb-1.5 text-[#9b0000] font-bold text-[15px] md:text-[17px]">Ingin mengusulkan buku atau sumber baru?</h3>
          <p className="text-[#6b6663] text-[13px] md:text-[14px] leading-relaxed">
            Bantu kami memperkaya koleksi Sunda Islam Corner dengan
            merekomendasikan sumber dari perpustakaan lain.
          </p>
        </div>
        <a href="mailto:perpustakaan@uinsgd.ac.id" className="w-full md:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full bg-[#9b0000] text-white text-[14px] font-bold hover:bg-[#760000] transition-colors">
          <Mail size={16} /> Kirim Rekomendasi
        </a>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="py-14 md:py-20 px-5 md:px-[6vw] bg-[#f8f4ef] scroll-mt-[70px]">
        <div className="max-w-[760px] mx-auto mb-10 text-center">
          <p className="mb-2 text-[#cc8657] text-[12px] md:text-[13px] font-bold tracking-[3px]">HUBUNGI KAMI</p>
          <h2 className="mb-4 text-[#9b0000] font-serif text-3xl md:text-[36px]">Kontak Perpustakaan</h2>
          <p className="text-[#68605d] text-[15px] md:text-[16px] leading-[1.7]">
            Untuk informasi, saran koleksi, atau pertanyaan mengenai Sunda
            Islam Corner, silakan hubungi Perpustakaan UIN Sunan Gunung Djati
            Bandung.
          </p>
        </div>
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-4 md:gap-6">
          <a href="mailto:perpustakaan@uinsgd.ac.id" className="group flex items-center gap-5 p-6 bg-white border border-[#eee5df] rounded-[16px] shadow-sm hover:-translate-y-1 hover:border-[#9b0000]/30 hover:shadow-lg transition-all">
            <Mail size={32} className="text-[#9b0000]" />
            <div><h3 className="mb-1 text-gray-900 font-bold text-[15px] md:text-[16px]">Email</h3><span className="text-[#726a66] text-[13px] md:text-[14px]">perpustakaan@uinsgd.ac.id</span></div>
          </a>
          <a href="https://www.instagram.com/perpusuinbdg/" target="_blank" rel="noreferrer" className="group flex items-center gap-5 p-6 bg-white border border-[#eee5df] rounded-[16px] shadow-sm hover:-translate-y-1 hover:border-[#9b0000]/30 hover:shadow-lg transition-all">
            <Instagram size={32} className="text-[#9b0000]" />
            <div><h3 className="mb-1 text-gray-900 font-bold text-[15px] md:text-[16px]">Instagram</h3><span className="text-[#726a66] text-[13px] md:text-[14px]">@perpusuinbdg</span></div>
          </a>
          <a href="https://lib.uinsgd.ac.id/" target="_blank" rel="noreferrer" className="group flex items-center gap-5 p-6 bg-white border border-[#eee5df] rounded-[16px] shadow-sm hover:-translate-y-1 hover:border-[#9b0000]/30 hover:shadow-lg transition-all">
            <LibraryBig size={32} className="text-[#9b0000]" />
            <div><h3 className="mb-1 text-gray-900 font-bold text-[15px] md:text-[16px]">Website</h3><span className="text-[#726a66] text-[13px] md:text-[14px]">lib.uinsgd.ac.id</span></div>
          </a>
        </div>
      </section>
    </>
  )
}