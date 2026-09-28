import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, BookOpen, Landmark, Calendar, Hash, Tag, FileText } from 'lucide-react'

// Data sampel buku dengan atribut lengkap
export const mockBooksData = [
  {
    id: 1,
    title: 'Sejarah Islam di Tanah Sunda',
    author: 'Dr. Ahmad Fulan',
    university: 'UIN Sunan Gunung Djati',
    category: 'Sejarah',
    year: '2023',
    isbn: '978-602-1234-56-7',
    cover: '#e8d5c4',
    link: 'https://lib.uinsgd.ac.id',
    abstract:
      'Buku ini membahas secara mendalam sejarah masuk dan berkembangnya ajaran Islam di wilayah Sunda/Jawa Barat. Pembahasan mencakup peran para ulama lokal, transformasi sosial-budaya masyarakat Priangan, serta peninggalan manuskrip keagamaan yang menjadi fondasi peradaban Islam Sunda hingga era modern.'
  },
  {
    id: 2,
    title: 'Naskah Kuno Cirebon',
    author: 'Prof. Budi Santoso',
    university: 'Universitas Padjadjaran',
    category: 'Naskah',
    year: '2021',
    isbn: '978-602-9876-54-3',
    cover: '#d5c4e8',
    link: 'https://katalog.unpad.ac.id',
    abstract:
      'Kajian filologis terhadap manuskrip dan naskah kuno peninggalan Kesultanan Cirebon. Naskah-naskah ini berisi pengajaran tasawuf, tata negara, ajaran moral, serta perpaduan tradisi lokal Sunda-Jawa dengan nilai-nilai keislaman.'
  },
  {
    id: 3,
    title: 'Adab dan Akhlak Masyarakat Priangan',
    author: 'Hj. Siti Aminah',
    university: 'UPI Bandung',
    category: 'Akhlak',
    year: '2024',
    isbn: '978-623-4567-89-0',
    cover: '#c4e8d5',
    link: 'https://perpustakaan.upi.edu',
    abstract:
      'Analisis etnografis mengenai pandangan hidup dan tatakrama (undak-usuk) masyarakat Priangan yang diselaraskan dengan etika dan akhlakul karimah dalam ajaran Islam.'
  },
  {
    id: 4,
    title: 'Perkembangan Pesantren di Jawa Barat',
    author: 'K.H. Hasan Basri',
    university: 'UIN Sunan Gunung Djati',
    category: 'Sejarah',
    year: '2022',
    isbn: '978-602-3333-11-2',
    cover: '#e8c4c4',
    link: 'https://lib.uinsgd.ac.id',
    abstract:
      'Studi historis keberadaan pesantren-pesantren salaf dan modern di Tatar Sunda serta kontribusinya dalam pendidikan keagamaan dan perjuangan kemerdekaan.'
  },
  {
    id: 5,
    title: 'Seni Tradisi dan Dakwah',
    author: 'Asep Sunandar',
    university: 'Universitas Padjadjaran',
    category: 'Budaya',
    year: '2023',
    isbn: '978-602-4444-22-1',
    cover: '#c4dce8',
    link: 'https://katalog.unpad.ac.id',
    abstract:
      'Menelusuri penggunaan kesenian tradisional Sunda seperti wayang golek, tembang cianjuran, dan seni terbang sebagai media syiar agama Islam secara persuasif dan akulturatif.'
  },
  {
    id: 6,
    title: 'Sosiologi Agama Masyarakat Sunda',
    author: 'Dr. Ridwan Kamil',
    university: 'UIN Syarif Hidayatullah',
    category: 'Masyarakat',
    year: '2020',
    isbn: '978-602-5555-33-0',
    cover: '#e8e5c4',
    link: 'https://perpus.uinjkt.ac.id',
    abstract:
      'Kajian sosiologis mengenai bagaimana nilai-nilai keagamaan berinteraksi dengan struktur sosial, ritual kebudayaan, dan dinamika kehidupan sehari-hari masyarakat Sunda.'
  }
]

export default function DetailBukuPage() {
  const { id } = useParams<{ id: string }>()
  const book = mockBooksData.find((b) => b.id === Number(id))

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <BookOpen size={48} className="text-gray-300 mb-3" />
        <h2 className="text-xl font-bold text-gray-800 mb-1">Buku tidak ditemukan</h2>
        <p className="text-sm text-gray-500 mb-4">Informasi buku yang Anda cari tidak tersedia.</p>
        <Link
          to="/katalog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#9b0000] hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Katalog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8] font-sans text-[#231f1f] py-8 px-4 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        {/* Navigasi / Breadcrumb */}
        <nav className="mb-6">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-600 hover:text-[#9b0000] transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Katalog
          </Link>
        </nav>

        {/* Tampilan Utama Detail ala SLiMS (Tanpa wrapper card/box) */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
          {/* Kolom Kiri: Cover & Tombol Katalog Asal */}
          <div className="flex flex-col items-center md:items-start">
            <div
              className="w-[180px] md:w-[200px] aspect-[3/4] rounded shadow-md border border-black/10 flex items-center justify-center p-4 relative"
              style={{ backgroundColor: book.cover }}
            >
              <span className="font-serif text-center font-bold text-gray-800 text-sm md:text-base leading-snug line-clamp-4">
                {book.title}
              </span>
            </div>

            <a
              href={book.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full max-w-[200px] h-10 inline-flex items-center justify-center gap-2 bg-[#9b0000] text-white text-xs md:text-sm font-medium rounded-md hover:bg-[#760000] transition-colors shadow-sm"
            >
              <ExternalLink size={15} /> Lihat di Katalog Asal
            </a>
          </div>

          {/* Kolom Kanan: Informasi Bibliografi SLiMS */}
          <div>
            {/* Kategori Badge */}
            <span className="inline-block px-2.5 py-1 text-xs font-semibold text-[#9b0000] bg-[#f7ebeb] rounded mb-3">
              {book.category}
            </span>

            {/* Judul & Penulis */}
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
              {book.title}
            </h1>
            <p className="text-base font-medium text-gray-600 mb-6">{book.author}</p>

            {/* Tabel Metadata Bibliografi */}
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                Informasi Detail / Bibliografi
              </h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div className="flex items-start gap-2.5">
                  <dt className="text-gray-400 shrink-0 mt-0.5" title="Nomor Standar / ISBN">
                    <Hash size={16} />
                  </dt>
                  <div>
                    <dd className="text-xs text-gray-500">ISBN / ISSN</dd>
                    <dd className="font-medium text-gray-800">{book.isbn}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <dt className="text-gray-400 shrink-0 mt-0.5" title="Institusi / Penerbit">
                    <Landmark size={16} />
                  </dt>
                  <div>
                    <dd className="text-xs text-gray-500">Institusi / Perguruan Tinggi</dd>
                    <dd className="font-medium text-gray-800">{book.university}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <dt className="text-gray-400 shrink-0 mt-0.5" title="Tahun Terbit">
                    <Calendar size={16} />
                  </dt>
                  <div>
                    <dd className="text-xs text-gray-500">Tahun Terbit</dd>
                    <dd className="font-medium text-gray-800">{book.year}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <dt className="text-gray-400 shrink-0 mt-0.5" title="Kategori / Subjek">
                    <Tag size={16} />
                  </dt>
                  <div>
                    <dd className="text-xs text-gray-500">Kategori Subjek</dd>
                    <dd className="font-medium text-gray-800">{book.category}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Abstrak / Ringkasan Buku */}
            <div>
              <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <FileText size={16} className="text-[#9b0000]" /> Abstrak / Ringkasan
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-600 text-justify">
                {book.abstract}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}