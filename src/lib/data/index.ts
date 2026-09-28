import {
  BookOpen,
  Landmark,
  LibraryBig,
  Users,
  Layers3,
  Leaf,
  MoreHorizontal,
  type LucideIcon
} from 'lucide-react'

export type Book = {
  id: string
  title: string
  author: string
  university: string
  category: string
  cover: string
  link: string
}

export type Category = {
  name: string
  icon: LucideIcon
}

export type Partner = {
  id: string
  name: string
  link: string
  logo: string
}

export const books: Book[] = [
  {
    id: '1',
    title: 'Islam dalam Kebudayaan Sunda',
    author: 'A. Hasan Muarif',
    university: 'Universitas Padjadjaran',
    category: 'Islam',
    cover: 'linear-gradient(160deg, #e7dfbd, #f8f4e9)',
    link: 'https://library.unpad.ac.id/'
  },
  {
    id: '2',
    title: 'Sejarah Islam di Tatar Sunda',
    author: 'Dudung Abdurahman',
    university: 'UIN Sunan Gunung Djati',
    category: 'Sejarah',
    cover: 'linear-gradient(160deg, #b98b58, #e6d3b8)',
    link: 'https://lib.uinsgd.ac.id/'
  },
  {
    id: '3',
    title: 'Tradisi dan Spiritualitas Sunda',
    author: 'Elis Suryani',
    university: 'Universitas Indonesia',
    category: 'Budaya Sunda',
    cover: 'linear-gradient(160deg, #d6a868, #e8d1ad)',
    link: 'https://lib.ui.ac.id/'
  },
  {
    id: '4',
    title: 'Pemikiran Islam di Jawa Barat',
    author: 'Kholid Al-Wafa',
    university: 'Universitas Pendidikan Indonesia',
    category: 'Islam',
    cover: 'linear-gradient(160deg, #171717, #7d5c20)',
    link: 'https://perpustakaan.upi.edu/'
  },
  {
    id: '5',
    title: 'Sastra Sunda dan Nilai-Nilai Islam',
    author: 'Tatang Febriansyah',
    university: 'Institut Teknologi Bandung',
    category: 'Sastra & Bahasa',
    cover: 'linear-gradient(160deg, #275b3e, #9fb590)',
    link: 'https://lib.itb.ac.id/'
  }
]

export const categories: Category[] = [
  { name: 'Semua Kategori', icon: BookOpen },
  { name: 'Islam', icon: Landmark },
  { name: 'Budaya Sunda', icon: LibraryBig },
  { name: 'Sejarah', icon: Users },
  { name: 'Sastra & Bahasa', icon: Layers3 },
  { name: 'Sosial & Masyarakat', icon: Leaf },
  { name: 'Lainnya', icon: MoreHorizontal }
]

export const partners: Partner[] = [
  {
    id: 'p1',
    name: 'UIN Sunan Gunung Djati Bandung',
    link: 'https://lib.uinsgd.ac.id/',
    logo: '/images/logo-uin.png'
  },
  {
    id: 'p2',
    name: 'Universitas Padjadjaran',
    link: 'https://library.unpad.ac.id/',
    logo: '/images/logo-unpad.png'
  },
  {
    id: 'p3',
    name: 'Universitas Pendidikan Indonesia',
    link: 'https://perpustakaan.upi.edu/',
    logo: '/images/logo-upi.png'
  },
  {
    id: 'p4',
    name: 'Institut Teknologi Bandung',
    link: 'https://lib.itb.ac.id/',
    logo: '/images/logo-itb.png'
  },
  {
    id: 'p5',
    name: 'Universitas Indonesia',
    link: 'https://lib.ui.ac.id/',
    logo: '/images/logo-ui.png'
  }
]