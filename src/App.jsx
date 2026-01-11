import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView,
  useSpring,
  useMotionValue,
  LayoutGroup
} from 'framer-motion';
import { 
  Camera, MapPin, Clock, ChevronRight, Instagram, Menu, X, Star, 
  Calendar, ArrowRight, CheckCircle2, Facebook, Twitter, 
  Image as ImageIcon, Heart, User, ShieldCheck, Zap, ArrowUpRight, 
  Mail, Phone, Info, ChevronDown, Play, Share2, Bookmark, 
  Sparkles, Coffee, Smartphone, CreditCard, ChevronLeft,
  Gift, Crown, BookOpen, HelpCircle, Plus, Minus,
  Layers, Sliders, Scissors, Award, Compass, MessageSquare, 
  ExternalLink, Globe, Shield, Send, Search, Bell, Filter,
  Eye, Monitor, Printer, MousePointer2, Settings, Download,
  Hash, ShoppingBag, Target, Wind, Moon, Sun, Coffee as CoffeeIcon
} from 'lucide-react';

/**
 * =========================================================================================
 * SEORI STUDIO - THE GRAND DIGITAL FLAGSHIP v8.0 (THE ABSOLUTE MASTERPIECE)
 * =========================================================================================
 * Dikembangkan dengan dedikasi penuh pada estetika visual dan keunggulan teknis.
 * * DESIGN TOKENS:
 * - Brand Color (Accent): #C1867B (Seori Bronze)
 * - Canvas (Background): #FAF9F6 (Alabaster)
 * - Typography (Primary): #1A1A1A (Obsidian)
 * - Secondary/Muted: #E5E5E1 (Mist)
 * * ARCHITECTURE:
 * - Single File React Masterpiece.
 * - Dynamic Navbar State Management.
 * - Comprehensive Multi-Page Simulation.
 * - High-Performance Framer Motion Orchestration.
 * =========================================================================================
 */

// --- GLOBAL DATA ENGINE ---

const SEORI_DATA = {
  NAV_LINKS: [
    { id: 'home', label: 'Beranda' },
    { id: 'philosophy', label: 'Filosofi' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'locations', label: 'Lokasi' },
    { id: 'society', label: 'Society' },
    { id: 'journal', label: 'Jurnal' }
  ],

  BRANCHES: [
    {
      id: 'kemang',
      name: 'Seori Kemang',
      city: 'Jakarta Selatan',
      tagline: 'The First Sanctuary',
      address: 'Jl. Kemang Raya No. 12, Lantai 2, Bangunan No. 5, Jak-Sel',
      vibe: 'Warm, Japandi, Zen Sanctuary.',
      description: 'Cabang flagship pertama kami yang menawarkan ketenangan di tengah hiruk pikuk Jakarta Selatan. Didesain dengan material kayu alami dan pencahayaan yang lembut.',
      amenities: [
        { name: 'Private Lounge', icon: <CoffeeIcon size={16}/> },
        { name: 'Artisan Coffee', icon: <CoffeeIcon size={16}/> },
        { name: 'Pet Friendly', icon: <Heart size={16}/> },
        { name: 'Valet Parking', icon: <Award size={16}/> },
        { name: 'Premium Changing Room', icon: <User size={16}/> }
      ],
      suites: 5,
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30',
      heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      stats: { bookings: '12k+', rating: '4.9', satisfaction: '99%' },
      openingHours: '10:00 - 22:00',
      contact: '+62 812 3456 7890'
    },
    {
      id: 'lebak-bulus',
      name: 'Seori Lebak Bulus',
      city: 'Jakarta Selatan',
      tagline: 'Urban Precision',
      address: 'Point Square Mall, GF-22, Dekat MRT Lebak Bulus, Jak-Sel',
      vibe: 'Modern, Minimalist, Urban Flow.',
      description: 'Menawarkan aksesibilitas terbaik bagi kaum urban. Studio ini memiliki karakter yang lebih clean, modern, dan efisien tanpa meninggalkan esensi kenyamanan.',
      amenities: [
        { name: 'MRT Access', icon: <MapPin size={16}/> },
        { name: 'Mall Facilities', icon: <ShoppingBag size={16}/> },
        { name: 'Professional Editor', icon: <Sliders size={16}/> },
        { name: 'Express Delivery', icon: <Zap size={16}/> }
      ],
      suites: 4,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      heroImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30',
      stats: { bookings: '8k+', rating: '4.8', satisfaction: '98%' },
      openingHours: '10:00 - 21:00',
      contact: '+62 812 3456 7891'
    },
    {
      id: 'bsd',
      name: 'Seori BSD',
      city: 'Tangerang',
      tagline: 'Nature Integrated',
      address: 'The Breeze BSD City, Unit L-05, Dekat Danau, Tangerang',
      vibe: 'Industrial, Natural, Airy Spirit.',
      description: 'Studio kami yang paling luas dengan integrasi cahaya alami. Terletak di kawasan The Breeze yang asri, cocok untuk sesi keluarga besar atau tim.',
      amenities: [
        { name: 'Natural Light', icon: <Sun size={16}/> },
        { name: 'Lakeside View', icon: <Globe size={16}/> },
        { name: 'Family Suites', icon: <Layers size={16}/> },
        { name: 'Outdoor Area', icon: <Wind size={16}/> }
      ],
      suites: 6,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
      heroImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721',
      stats: { bookings: '9k+', rating: '4.9', satisfaction: '99%' },
      openingHours: '09:00 - 21:00',
      contact: '+62 812 3456 7892'
    },
    {
      id: 'bandung',
      name: 'Seori Bandung',
      city: 'Bandung',
      tagline: 'Creative Heritage',
      address: 'Jl. Ir. H. Juanda No. 102, Dago Atas, Bandung',
      vibe: 'Heritage, Cozy, Creative Hub.',
      description: 'Mengambil inspirasi dari bangunan kolonial Bandung, studio ini menawarkan atmosfer kreatif yang kental dengan sentuhan klasik yang elegan.',
      amenities: [
        { name: 'Historical Vibe', icon: <Award size={16}/> },
        { name: 'Garden Area', icon: <Wind size={16}/> },
        { name: 'Local Coffee', icon: <CoffeeIcon size={16}/> },
        { name: 'Creative Library', icon: <BookOpen size={16}/> }
      ],
      suites: 3,
      image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
      stats: { bookings: '4k+', rating: '4.9', satisfaction: '100%' },
      openingHours: '10:00 - 20:00',
      contact: '+62 812 3456 7893'
    }
  ],

  PACKAGES: [
    { 
      id: 'basic', 
      name: 'Basic Story', 
      price: 150000, 
      time: 15, 
      maxPeople: 2,
      desc: 'Untuk potret diri atau pasangan yang ringkas namun mendalam.', 
      items: ['15 Menit Sesi', 'Semua File Digital (Email)', '1 Cetak Fisik (4R)', 'Pilihan Background Standard'],
      details: 'Sangat cocok untuk kebutuhan pasfoto estetik, headshot profil profesional, atau kenangan singkat bersama pasangan.',
      popular: false
    },
    { 
      id: 'signature', 
      name: 'The Signature', 
      price: 250000, 
      time: 20, 
      maxPeople: 4,
      desc: 'Pilihan terpopuler kami untuk hasil yang lebih ekspresif dan beragam.', 
      items: ['20 Menit Sesi', 'Semua File Digital (Drive)', '2 Cetak Fisik (4R)', 'Basic Color Grading', 'Akses Semua Properti'],
      details: 'Waktu ekstra memberikan ruang bagi Anda untuk bereksperimen dengan berbagai gaya dan mengganti properti sesuka hati.',
      popular: true
    },
    { 
      id: 'legacy', 
      name: 'Legacy Group', 
      price: 450000, 
      time: 30, 
      maxPeople: 8,
      desc: 'Rayakan momen besar bersama keluarga, sahabat, atau tim Anda.', 
      items: ['30 Menit Sesi', 'Semua File Digital (Drive)', '4 Cetak Fisik (4R)', 'Premium Color Grading', 'Prioritas Slot Booking'],
      details: 'Dirancang khusus untuk grup besar. Memastikan setiap orang mendapatkan momen terbaiknya dalam frame yang lapang.',
      popular: false
    },
    { 
      id: 'cinematic', 
      name: 'Seori Cinematic', 
      price: 750000, 
      time: 45, 
      maxPeople: 10,
      desc: 'Pengalaman premium dengan sentuhan artistik yang sangat kuat.', 
      items: ['45 Menit Sesi', 'Advanced Art Grading', '6 Cetak Fisik (4R)', 'Behind the Scene Video (1 Menit)', 'Gift Box Eksklusif'],
      details: 'Bagi Anda yang menginginkan hasil layaknya poster film atau editorial fashion dengan grading warna yang sinematik.',
      popular: false
    }
  ],

  ADDONS: [
    { id: 'print-4r', name: 'Extra 4R Print', price: 25000, icon: <Printer size={16}/> },
    { id: 'print-a4', name: 'Premium A4 Print', price: 75000, icon: <Award size={16}/> },
    { id: 'color-cinema', name: 'Cinema Grading', price: 50000, icon: <Sliders size={16}/> },
    { id: 'prop-vintage', name: 'Vintage Props Pack', price: 35000, icon: <Gift size={16}/> },
    { id: 'fast-track', name: 'Instant Delivery', price: 40000, icon: <Zap size={16}/> },
    { id: 'extra-person', name: 'Extra Person', price: 50000, icon: <User size={16}/> }
  ],

  SOCIETY_TIERS: [
    {
      id: 'silver',
      name: 'Silver Muse',
      price: 'IDR 0',
      description: 'Langkah awal Anda menjadi bagian dari narasi Seori Studio.',
      benefits: [
        'Diskon Sesi 5%',
        'Akses Prioritas Newsletter',
        'Voucher Ulang Tahun IDR 25k',
        'Undangan Digital Pameran Karya'
      ],
      color: '#E5E5E1',
      accent: '#A0A0A0'
    },
    {
      id: 'gold',
      name: 'Gold Artist',
      price: 'IDR 500k/thn',
      description: 'Bagi Anda yang menjadikan potret diri sebagai bagian dari gaya hidup.',
      benefits: [
        'Diskon Sesi 15%',
        '1 Sesi Basic Gratis per Tahun',
        'Akses Properti Eksklusif',
        'Free 1 Cetak A4 per Kunjungan',
        'Voucher Ulang Tahun IDR 100k'
      ],
      color: '#D9D2C5',
      accent: '#C1867B'
    },
    {
      id: 'black',
      name: 'Black Legend',
      price: 'IDR 2.5jt/thn',
      description: 'Level tertinggi apresiasi seni visual di Seori Studio.',
      benefits: [
        'Diskon Sesi 25% (Unlimited)',
        '3 Sesi Signature Gratis per Tahun',
        'Creative Director Consultation',
        'Private Event Invitations',
        'Penempatan Karya di Galeri Utama',
        'Layanan Antar Jemput (Radius 5km)'
      ],
      color: '#1A1A1A',
      accent: '#C1867B'
    }
  ],

  JOURNAL_POSTS: [
    {
      id: 1,
      title: 'Seni Menatap Diri Sendiri dalam Keheningan',
      date: '10 Jan 2024',
      author: 'Seori Curators',
      category: 'Philosophy',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      excerpt: 'Bagaimana ruang privat membantu kita melepaskan topeng sosial dan menemukan kejujuran di depan lensa.'
    },
    {
      id: 2,
      title: 'Rahasia Pencahayaan Klasik Seori Studio',
      date: '05 Jan 2024',
      author: 'Technical Team',
      category: 'Technical',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
      excerpt: 'Mengapa konfigurasi lampu kami dirancang untuk menonjolkan tekstur kulit yang natural tanpa distorsi.'
    },
    {
      id: 3,
      title: 'Panduan Memilih Pakaian untuk Sesi Potret',
      date: '28 Des 2023',
      author: 'Style Consultant',
      category: 'Guides',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
      excerpt: 'Tips memilih warna dan tekstur kain agar foto Anda terlihat abadi (timeless) hingga puluhan tahun mendatang.'
    },
    {
      id: 4,
      title: 'Kisah Reuni Keluarga di Seori Kemang',
      date: '15 Des 2023',
      author: 'Community Story',
      category: 'Stories',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7',
      excerpt: 'Sebuah narasi hangat tentang bagaimana 15 menit sesi foto merajut kembali komunikasi yang sempat terputus.'
    }
  ],

  FAQS: [
    { q: 'Apakah perlu booking jauh-jauh hari?', a: 'Sangat disarankan melakukan reservasi minimal 3-5 hari sebelum kunjungan, terutama untuk akhir pekan.' },
    { q: 'Berapa orang maksimal dalam satu suite?', a: 'Setiap suite kami dapat menampung hingga 10 orang dengan paket Cinematic.' },
    { q: 'Bagaimana cara menerima file foto?', a: 'Seluruh file digital akan dikirimkan melalui link Google Drive atau Email segera setelah sesi berakhir.' },
    { q: 'Apakah boleh membawa hewan peliharaan?', a: 'Tentu! Kami sangat ramah hewan peliharaan, namun mohon pastikan kebersihan tetap terjaga.' },
    { q: 'Bagaimana jika saya terlambat?', a: 'Waktu sesi akan tetap berakhir sesuai jadwal untuk menghargai klien di sesi berikutnya. Harap hadir 15 menit lebih awal.' }
  ]
};

// --- UTILITY COMPONENTS ---

const formatCurrency = (val) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
      animate={{ 
        x: pos.x - 20, 
        y: pos.y - 20,
        scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1)
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.5 }}
    >
      <div className={`relative flex items-center justify-center`}>
        <div className={`w-10 h-10 border border-[#C1867B] rounded-full flex items-center justify-center transition-all ${isHovering ? 'bg-[#C1867B]/10 w-16 h-16 border-2' : ''}`}>
           <div className={`w-1 h-1 bg-[#C1867B] rounded-full transition-transform ${isHovering ? 'scale-0' : ''}`} />
        </div>
      </div>
    </motion.div>
  );
};

const Preloader = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-[2000] bg-neutral-900 flex flex-col items-center justify-center text-white"
      exit={{ y: '-100%', transition: { duration: 1, ease: [0.83, 0, 0.17, 1] } }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative w-32 h-32 mx-auto mb-16">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-t-2 border-[#C1867B] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center font-serif italic text-5xl">S.</div>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold tracking-[0.5em] uppercase mb-4"
        >
          Seori Studio
        </motion.h1>
        <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#C1867B]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionHeading = ({
  title,
  subtitle,
  align = "left",
  dark = false,
}) => {
  return (
    <div
      className={`mb-16 ${
        align === "center" ? "text-center mx-auto" : "text-left"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-4 justify-center md:justify-start"
      >
        <div className="w-8 h-[1px] bg-[#C1867B]" />
        <span className="text-[10px] font-bold tracking-[0.5em] text-[#C1867B] uppercase">
          {subtitle}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`text-4xl md:text-7xl font-light tracking-tighter leading-[1.1] ${
          dark ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </motion.h2>
    </div>
  );
};  

// --- CORE APPLICATION SHELL ---

const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logika warna: Putih di Home Hero, Hitam di tempat lain.
  const isDarkText = scrolled || page !== 'home';

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
        scrolled ? 'bg-white/80 backdrop-blur-2xl py-4 shadow-sm' : 'bg-transparent py-10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => setPage('home')}
          >
            <div className={`w-12 h-12 flex items-center justify-center font-serif italic text-2xl transition-all duration-500 ${
              isDarkText ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900 shadow-xl'
            }`}>
              S
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-[0.4em] uppercase leading-none transition-colors ${
                isDarkText ? 'text-neutral-900' : 'text-white'
              }`}>
                Seori Studio
              </span>
              <span className={`text-[8px] font-bold tracking-[0.2em] uppercase mt-1 opacity-60 transition-colors ${
                isDarkText ? 'text-neutral-500' : 'text-white/60'
              }`}>
                The Grand Flagship v8.0
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {SEORI_DATA.NAV_LINKS.map(link => (
              <button 
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-all relative py-2 ${
                  page === link.id 
                  ? (isDarkText ? 'text-neutral-900' : 'text-white') 
                  : (isDarkText ? 'text-neutral-400 hover:text-neutral-900' : 'text-white/50 hover:text-white')
                }`}
              >
                {link.label}
                <motion.div 
                  initial={false}
                  animate={{ width: page === link.id ? '100%' : '0%' }}
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#C1867B]" 
                />
              </button>
            ))}
            <button 
              onClick={() => setPage('booking')}
              className={`px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all flex items-center gap-3 ${
                isDarkText 
                ? 'bg-neutral-900 text-white hover:bg-[#C1867B]' 
                : 'bg-white text-neutral-900 hover:bg-[#C1867B] hover:text-white'
              }`}
            >
              Reservasi <ArrowRight size={14}/>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-3 rounded-full transition-all ${
              isDarkText ? 'bg-neutral-100 text-neutral-900' : 'bg-white/10 text-white backdrop-blur-md'
            }`}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1000] bg-neutral-900 text-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="font-serif italic text-4xl text-[#C1867B]">Seori.</span>
              <button onClick={() => setMenuOpen(false)} className="p-4 border border-white/10 rounded-full">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {SEORI_DATA.NAV_LINKS.map((link, idx) => (
                <motion.button 
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => { setPage(link.id); setMenuOpen(false); }}
                  className="text-5xl md:text-7xl font-light text-left hover:italic hover:text-[#C1867B] transition-all flex items-center gap-6 group"
                >
                  <span className="text-xs font-serif opacity-20 group-hover:opacity-100">0{idx+1}</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => { setPage('booking'); setMenuOpen(false); }}
                className="text-5xl font-light text-[#C1867B] italic mt-10 text-left"
              >
                Pesan Sekarang
              </motion.button>
            </div>

            <div className="mt-auto border-t border-white/10 pt-10 grid grid-cols-2 gap-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">Contact</p>
                <p className="text-lg font-light">hello@seoristudio.com</p>
                <p className="text-neutral-400 font-light">+62 21 555 1234</p>
              </div>
              <div className="flex gap-4 items-end justify-end">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center"><Icon size={18}/></a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- PAGES COMPONENT ---

const HomePage = ({ setPage }) => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
        <motion.div 
          style={{ y: yParallax, opacity: opacityHero }} 
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1590608897129-79da98d15969" 
            className="w-full h-full object-cover" 
            alt="Seori Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-transparent to-neutral-900" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-6 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="w-12 h-[1px] bg-[#C1867B]" />
            <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-[#C1867B]">Capture Honest Moments</span>
            <div className="w-12 h-[1px] bg-[#C1867B]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-6xl md:text-[14rem] font-light leading-[0.8] tracking-tighter mb-16"
          >
            THE ART OF <br />
            <span className="font-serif italic text-[#C1867B]">BEING</span> YOU.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10"
          >
            <button 
              onClick={() => setPage('booking')}
              className="bg-white text-neutral-900 px-16 py-7 rounded-full text-xs font-bold tracking-[0.4em] uppercase hover:bg-[#C1867B] hover:text-white transition-all shadow-2xl group flex items-center gap-4"
            >
              Mulai Sesi Anda <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => setPage('philosophy')}
              className="group flex items-center gap-4 text-xs font-bold tracking-[0.4em] uppercase text-white/80 hover:text-white transition-all"
            >
              Filosofi Kami <Play size={18} className="fill-current text-[#C1867B]"/>
            </button>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
          <span className="text-[8px] font-bold tracking-[0.5em] text-white/40 uppercase">Scroll to Discover</span>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-20 bg-gradient-to-b from-[#C1867B] to-transparent" 
          />
        </div>
      </section>

      {/* Brief Philosophy */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10"
             >
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e" className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0" alt="Studio Gear" />
             </motion.div>
             <div className="absolute -bottom-16 -right-16 w-3/4 aspect-square bg-stone-50 border border-stone-100 p-16 rounded-[4rem] shadow-xl flex flex-col justify-center -z-0">
                <Quote size={48} className="text-[#C1867B] mb-8" />
                <p className="text-2xl font-light italic text-neutral-500 leading-relaxed mb-10">
                   "Kejujuran adalah bentuk kemewahan yang paling murni. Di Seori, kami memberikan Anda ruang untuk menemukannya."
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-[1px] bg-neutral-200" />
                   <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-neutral-400">Founder, Seori Studio</span>
                </div>
             </div>
          </div>
          <div>
            <SectionHeading title="Ruang Privat, Hasil Galeri." subtitle="The Essence" />
            <p className="text-xl text-neutral-500 font-light leading-relaxed mb-12">
              Kami memadukan kenyamanan privasi mutlak dengan teknologi fotografi kelas dunia. Tanpa ada orang lain di dalam suite, Anda bebas berekspresi, tertawa, atau sekadar menatap lensa dalam diam.
            </p>
            <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-16">
               {[
                 { t: '100% Privacy', d: 'Hanya Anda dan cermin.', i: <Shield size={20}/> },
                 { t: 'Artistic Lighting', d: 'Konfigurasi lampu profesional.', i: <Zap size={20}/> },
                 { t: 'Medium Format', d: 'Detail visual tingkat tinggi.', i: <Camera size={20}/> },
                 { t: 'Instant Digital', d: 'Kirim file di hari yang sama.', i: <Smartphone size={20}/> }
               ].map(f => (
                 <div key={f.t} className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-[#C1867B] group-hover:bg-neutral-900 group-hover:text-white transition-all shadow-sm">
                       {f.i}
                    </div>
                    <div>
                       <h4 className="font-bold text-xs tracking-widest uppercase mb-2">{f.t}</h4>
                       <p className="text-xs text-neutral-400 font-light leading-relaxed">{f.d}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button 
              onClick={() => setPage('philosophy')}
              className="px-12 py-5 border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-900 hover:text-white transition-all"
            >
              Jelajahi Filosofi
            </button>
          </div>
        </div>
      </section>

      {/* Package Showcase */}
      <section className="py-40 bg-stone-50 border-y border-stone-100">
         <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="Tentukan Level Cerita Anda." subtitle="Our Offerings" align="center" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {SEORI_DATA.PACKAGES.map((pkg, idx) => (
                 <motion.div 
                   key={pkg.id}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   viewport={{ once: true }}
                   className={`bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-sm relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 flex flex-col group ${pkg.popular ? 'ring-2 ring-[#C1867B]' : ''}`}
                 >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-[#C1867B] text-white text-[8px] font-bold px-8 py-2 tracking-widest uppercase rotate-45 translate-x-10 -translate-y-2">Favorite</div>
                    )}
                    <div className="mb-10">
                       <h3 className="text-3xl font-light mb-4">{pkg.name}</h3>
                       <p className="text-xs text-neutral-400 font-light leading-relaxed">{pkg.desc}</p>
                    </div>
                    <div className="mb-12">
                       <p className="text-4xl font-light tracking-tighter mb-2">{formatCurrency(pkg.price)}</p>
                       <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{pkg.time} Menit Sesi</p>
                    </div>
                    <ul className="space-y-4 mb-12 flex-grow">
                       {pkg.items.map(item => (
                         <li key={item} className="flex items-center gap-3 text-xs text-neutral-500 font-light">
                            <CheckCircle2 size={14} className="text-[#C1867B]"/> {item}
                         </li>
                       ))}
                    </ul>
                    <button 
                      onClick={() => setPage('booking')}
                      className={`w-full py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                        pkg.popular ? 'bg-neutral-900 text-white' : 'bg-stone-50 text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      Pilih Paket
                    </button>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Locations Brief */}
      <section className="py-40 bg-neutral-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C1867B] opacity-5 blur-[150px]" />
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
               <SectionHeading title="Temukan Sanctuary Terdekat." subtitle="Our Branches" dark />
               <button 
                 onClick={() => setPage('locations')}
                 className="px-10 py-4 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-neutral-900 transition-all mb-16"
               >
                 Lihat Detail Lokasi
               </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {SEORI_DATA.BRANCHES.map((b, i) => (
                 <motion.div 
                   key={b.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                   onClick={() => setPage('locations')}
                   className="group relative h-[500px] rounded-[3.5rem] overflow-hidden cursor-pointer"
                 >
                    <img src={b.image} className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" alt={b.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1867B] mb-2 block">{b.city}</span>
                       <h4 className="text-3xl font-light mb-6">{b.name}</h4>
                       <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-all">
                          <ArrowUpRight size={24}/>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Society Brief */}
      <section className="py-40 bg-white">
         <div className="max-w-6xl mx-auto px-6">
            <div className="bg-stone-50 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden border border-stone-100">
               <div className="absolute top-0 left-0 p-12 opacity-5"><Crown size={150}/></div>
               <SectionHeading title="Society Club." subtitle="Exclusive Membership" align="center" />
               <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto mb-16">
                 Bukan sekadar program loyalitas, ini adalah apresiasi kami kepada para pencerita visual. Dapatkan akses prioritas, diskon eksklusif, hingga penempatan karya Anda di galeri utama kami.
               </p>
               <button 
                 onClick={() => setPage('society')}
                 className="bg-neutral-900 text-white px-16 py-7 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-[#C1867B] transition-all shadow-xl"
               >
                 Pelajari Benefit Society
               </button>
            </div>
         </div>
      </section>
    </motion.div>
  );
};

const PhilosophyPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 bg-white">
     <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Di Balik Setiap Lensa." subtitle="Our Soul & Vision" align="center" />
        
        <div className="grid lg:grid-cols-2 gap-32 items-center mb-48">
           <div className="space-y-12">
              <h3 className="text-4xl font-light leading-tight">Keheningan adalah ruang bagi <span className="font-serif italic text-[#C1867B]">kejujuran</span>.</h3>
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                 Seori (S-eo-ri) dalam bahasa filosofis kuno melambangkan momen di mana kabut pagi bertemu dengan ketenangan mutlak. Kami membawa esensi ini ke setiap suite studio kami.
              </p>
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                 Kami percaya bahwa keberadaan fotografer asing di depan Anda seringkali menjadi distorsi bagi ekspresi yang sebenarnya. Dengan privasi 100%, Anda adalah penari, penyair, dan pahlawan bagi cerita Anda sendiri.
              </p>
              <div className="flex gap-10">
                 <div>
                    <p className="text-4xl font-light text-neutral-900 mb-2">120k+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Stories Captured</p>
                 </div>
                 <div className="w-[1px] h-16 bg-stone-100" />
                 <div>
                    <p className="text-4xl font-light text-neutral-900 mb-2">99.2%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Client Satisfaction</p>
                 </div>
              </div>
           </div>
           <div className="relative">
              <img src="https://images.unsplash.com/photo-1590608897129-79da98d15969" className="rounded-[5rem] shadow-3xl" alt="Philosophy Visual" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C1867B] rounded-full flex flex-col items-center justify-center text-white p-10 text-center">
                 <Sparkles size={32} className="mb-2"/>
                 <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Pro Gear Certified</span>
              </div>
           </div>
        </div>

        {/* Tech Specs */}
        <div className="bg-stone-50 rounded-[5rem] p-16 md:p-32 border border-stone-100">
           <SectionHeading title="Infrastruktur Visual." subtitle="Our Technology" align="center" />
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
              {[
                { n: 'Fujifilm GFX 100S', t: 'Medium Format Detail', d: 'Sensor raksasa yang menangkap tekstur kulit dan gradasi warna dengan kejujuran mutlak.' },
                { n: 'Profoto Lighting', t: 'Studio Grade Light', d: 'Cahaya yang dirancang khusus untuk memberikan catchlight indah pada mata Anda.' },
                { n: 'Apple 5K Workflow', t: 'Color Accuracy', d: 'Layar preview 5K memastikan hasil yang Anda lihat adalah hasil yang Anda dapatkan.' },
                { n: 'Archival Ink Print', t: 'Museum Quality', d: 'Tinta dan kertas yang menjamin kenangan Anda tidak akan memudar selama 50 tahun.' }
              ].map(tech => (
                <div key={tech.n} className="group text-center">
                   <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-neutral-900 group-hover:text-white transition-all">
                      <Settings size={28}/>
                   </div>
                   <h4 className="text-xl font-medium mb-3">{tech.n}</h4>
                   <p className="text-[10px] font-bold text-[#C1867B] uppercase tracking-widest mb-4">{tech.t}</p>
                   <p className="text-xs text-neutral-400 font-light leading-relaxed">{tech.d}</p>
                </div>
              ))}
           </div>
        </div>
     </div>
  </motion.div>
);

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const cats = ['Semua', 'Solo', 'Couple', 'Family', 'Graduation', 'Pet'];
  
  const galleryItems = useMemo(() => [
    { id: 1, cat: 'Solo', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
    { id: 2, cat: 'Couple', url: 'https://images.unsplash.com/photo-1516589174184-c685265e48d6' },
    { id: 3, cat: 'Family', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7' },
    { id: 4, cat: 'Graduation', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1' },
    { id: 5, cat: 'Pet', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9' },
    { id: 6, cat: 'Solo', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac' },
    { id: 7, cat: 'Couple', url: 'https://images.unsplash.com/photo-1517441581617-19046c764580' },
    { id: 8, cat: 'Family', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac' },
    { id: 9, cat: 'Solo', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
  ], []);

  const filtered = activeTab === 'Semua' ? galleryItems : galleryItems.filter(i => i.cat === activeTab);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 bg-[#FAF9F6]">
       <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
             <SectionHeading title="Arsip Kejujuran." subtitle="The Gallery" />
             <div className="flex gap-4 flex-wrap bg-white p-3 rounded-full shadow-sm border border-stone-100 mb-16">
                {cats.map(c => (
                  <button 
                    key={c}
                    onClick={() => setActiveTab(c)}
                    className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
                      activeTab === c ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    {c}
                  </button>
                ))}
             </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
             <AnimatePresence mode="popLayout">
                {filtered.map(item => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className="group relative aspect-[3/4] rounded-[3.5rem] overflow-hidden bg-white shadow-xl"
                  >
                     <img src={item.url} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="Gallery item" />
                     <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-[#C1867B] uppercase mb-4">{item.cat} Session</span>
                        <h4 className="text-white text-3xl font-light">Ethereal Moments</h4>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </motion.div>
       </div>
    </motion.div>
  );
};

const LocationsPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 bg-white">
     <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Lokasi Sanctuary Kami." subtitle="Our Branches" align="center" />
        
        <div className="space-y-48 mt-32">
           {SEORI_DATA.BRANCHES.map((branch, i) => (
             <div key={branch.id} className={`flex flex-col lg:flex-row items-center gap-24 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 relative">
                   <div className="aspect-[16/10] rounded-[5rem] overflow-hidden shadow-3xl">
                      <img src={branch.heroImage} className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105" alt={branch.name} />
                   </div>
                   <div className="absolute -top-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl hidden md:block">
                      <div className="flex items-center gap-4 mb-2">
                        <Star className="text-[#C1867B]" size={20}/>
                        <span className="text-xl font-bold">{branch.stats.rating}</span>
                      </div>
                      <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{branch.stats.bookings} Happy Clients</p>
                   </div>
                </div>
                <div className="lg:w-1/2">
                   <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C1867B] mb-6 block">{branch.tagline}</span>
                   <h3 className="text-5xl font-light mb-8">{branch.name}</h3>
                   <p className="text-xl text-neutral-400 font-light italic mb-8">"Vibe: {branch.vibe}"</p>
                   <p className="text-lg text-neutral-500 font-light leading-relaxed mb-12">{branch.description}</p>
                   
                   <div className="grid grid-cols-2 gap-6 mb-16">
                      {branch.amenities.map(amenity => (
                        <div key={amenity.name} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-400 group">
                           <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-[#C1867B] group-hover:bg-neutral-900 group-hover:text-white transition-all">
                              {amenity.icon}
                           </div>
                           {amenity.name}
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-col sm:flex-row gap-6">
                      <button className="bg-neutral-900 text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#C1867B] transition-all shadow-xl">
                         Cek Jadwal Sesi
                      </button>
                      <button className="px-12 py-5 border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-all">
                         Petunjuk Arah
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Global Map CTA */}
        <div className="mt-48 bg-neutral-900 rounded-[5rem] p-24 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[#C1867B] opacity-5 blur-[120px]" />
           <h3 className="text-4xl md:text-5xl font-light mb-8 relative z-10">Tidak menemukan lokasi terdekat Anda?</h3>
           <p className="text-xl text-neutral-400 font-light mb-12 relative z-10">Kami sedang melakukan ekspansi besar-besaran di 2024. Masukkan kota Anda untuk notifikasi pembukaan studio baru.</p>
           <div className="flex p-2 bg-white/5 border border-white/10 rounded-full max-w-lg mx-auto relative z-10">
              <input type="text" placeholder="Masukkan Kota Anda..." className="bg-transparent px-8 py-4 flex-grow outline-none text-sm font-light" />
              <button className="bg-white text-neutral-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest">Kirim</button>
           </div>
        </div>
     </div>
  </motion.div>
);

const SocietyPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 bg-[#FAF9F6]">
     <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Society Club." subtitle="Exclusive Benefits" align="center" />
        
        <div className="grid lg:grid-cols-3 gap-10 mt-32">
           {SEORI_DATA.SOCIETY_TIERS.map((tier, idx) => (
             <motion.div 
               key={tier.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className={`p-16 rounded-[4rem] border border-stone-100 flex flex-col relative overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 group ${
                 tier.id === 'black' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
               }`}
             >
                <div className="relative z-10 mb-12">
                   <div 
                     className="w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-transform group-hover:rotate-12"
                     style={{ backgroundColor: tier.accent, color: tier.id === 'black' ? '#1A1A1A' : 'white' }}
                   >
                      <Crown size={32}/>
                   </div>
                   <h3 className="text-4xl font-serif italic mb-4">{tier.name}</h3>
                   <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${tier.id === 'black' ? 'text-neutral-500' : 'text-[#C1867B]'}`}>
                      {tier.price}
                   </p>
                   <p className={`text-sm font-light leading-relaxed ${tier.id === 'black' ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      {tier.description}
                   </p>
                </div>

                <div className="relative z-10 space-y-6 flex-grow">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Privileges</p>
                   {tier.benefits.map(benefit => (
                     <div key={benefit} className="flex items-center gap-4 text-xs font-light">
                        <CheckCircle2 size={16} className="text-[#C1867B] shrink-0"/>
                        {benefit}
                     </div>
                   ))}
                </div>

                <button className={`relative z-10 w-full py-6 rounded-full text-[10px] font-bold uppercase tracking-widest mt-16 transition-all ${
                  tier.id === 'black' ? 'bg-[#C1867B] text-white hover:bg-white hover:text-neutral-900' : 'bg-neutral-900 text-white hover:bg-[#C1867B]'
                }`}>
                   Pilih Membership
                </button>
                
                {/* Visual Card ID Shadow */}
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Award size={250}/>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Social Proof Section */}
        <div className="mt-48 grid lg:grid-cols-2 gap-32 items-center">
           <div>
              <SectionHeading title="Kisah Society Kami." subtitle="Member Stories" />
              <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
                Bergabung dengan Society bukan sekadar tentang diskon. Ini adalah tentang menjadi bagian dari komunitas yang menghargai setiap fragmen kejujuran dalam potret.
              </p>
              <div className="space-y-10">
                 {[
                   { name: 'Riana Safitri', role: 'Artist', text: 'Menjadi Black Legend member adalah investasi emosional terbaik saya tahun ini. Konsultasi dengan Creative Director Seori mengubah cara saya melihat diri saya sendiri.' },
                   { name: 'Dimas Aditya', role: 'Architect', text: 'Akses prioritas sangat membantu jadwal sibuk saya. Seori Kemang sudah seperti rumah kedua untuk sesi foto keluarga kami.' }
                 ].map((t, i) => (
                   <div key={i} className="p-10 bg-white rounded-[3rem] border border-stone-100 shadow-sm">
                      <Quote size={32} className="text-[#C1867B] mb-6 opacity-20"/>
                      <p className="text-lg text-neutral-500 italic font-light mb-8">"{t.text}"</p>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-stone-200" />
                         <div>
                            <p className="text-sm font-bold">{t.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">{t.role}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="relative">
              <div className="aspect-square bg-neutral-900 rounded-[5rem] overflow-hidden p-20 flex flex-col justify-between text-white relative group">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-[#C1867B] blur-[150px] opacity-20 transition-all group-hover:opacity-40" />
                 <div className="relative z-10">
                    <h4 className="text-5xl font-serif italic mb-6">Society <br /> Exhibition 2024</h4>
                    <p className="text-neutral-400 font-light mb-10">Kami akan memamerkan 100 karya terbaik dari anggota Society di Galeri Nasional. Jadilah salah satunya.</p>
                 </div>
                 <div className="relative z-10 flex justify-between items-end">
                    <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:gap-8 transition-all">
                       Submit Karya <ArrowRight size={20} className="text-[#C1867B]"/>
                    </button>
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-[#C1867B] animate-pulse">
                       <Play size={24} className="fill-current"/>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </motion.div>
);

const JournalPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 bg-[#FAF9F6]">
     <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
           <SectionHeading title="Warta & Narasi." subtitle="The Journal" />
           <div className="flex gap-8 mb-16">
              {['Semua', 'Philosophy', 'Technical', 'Stories', 'Guides'].map(c => (
                <button key={c} className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 hover:text-neutral-900 transition-colors">{c}</button>
              ))}
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
           {SEORI_DATA.JOURNAL_POSTS.map((post, idx) => (
             <motion.div 
               key={post.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="group cursor-pointer"
             >
                <div className="aspect-[16/10] rounded-[4rem] overflow-hidden mb-10 shadow-2xl relative">
                   <img src={post.image} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt={post.title} />
                   <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#C1867B]">{post.category}</span>
                   </div>
                </div>
                <div className="max-w-xl">
                   <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      <span>{post.date}</span>
                      <div className="w-1 h-1 rounded-full bg-stone-300" />
                      <span>Oleh {post.author}</span>
                   </div>
                   <h3 className="text-4xl font-light mb-6 group-hover:italic group-hover:text-[#C1867B] transition-all leading-tight">{post.title}</h3>
                   <p className="text-lg text-neutral-500 font-light leading-relaxed mb-10 line-clamp-2">{post.excerpt}</p>
                   <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] group-hover:gap-8 transition-all">
                      Baca Selengkapnya <ArrowRight size={20} className="text-[#C1867B]"/>
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
     </div>
  </motion.div>
);

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    branch: null,
    package: null,
    date: '',
    time: '',
    addons: [],
    user: { name: '', email: '', phone: '', note: '' }
  });

  const totalAmount = useMemo(() => {
    let base = bookingData.package?.price || 0;
    let extras = bookingData.addons.reduce((sum, item) => sum + item.price, 0);
    return base + extras;
  }, [bookingData.package, bookingData.addons]);

  const toggleAddon = (addon) => {
    setBookingData(prev => ({
      ...prev,
      addons: prev.addons.find(a => a.id === addon.id)
        ? prev.addons.filter(a => a.id !== addon.id)
        : [...prev.addons, addon]
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const simulateBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 2500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-48 pb-32 bg-[#FAF9F6] min-h-screen">
       <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[5rem] shadow-3xl overflow-hidden flex flex-col lg:flex-row min-h-[800px] border border-stone-100">
             
             {/* Left Panel - Status */}
             <div className="lg:w-[380px] bg-neutral-900 text-white p-16 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1867B] blur-[150px] opacity-10" />
                <div className="relative z-10 mb-20">
                   <h2 className="text-4xl font-serif italic mb-2">Reservasi.</h2>
                   <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-neutral-500">The Grand Flagship Flow</p>
                </div>

                <div className="space-y-12 flex-grow relative z-10">
                   {['Pilih Lokasi', 'Pilih Paket', 'Waktu Sesi', 'Add-ons', 'Konfirmasi'].map((s, i) => (
                     <div key={s} className={`flex items-center gap-6 transition-all duration-500 ${
                       step === i + 1 ? 'opacity-100 translate-x-2' : step > i + 1 ? 'opacity-40' : 'opacity-10'
                     }`}>
                        <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold ${
                          step >= i + 1 ? 'bg-[#C1867B] border-[#C1867B]' : ''
                        }`}>
                          {step > i + 1 ? <CheckCircle2 size={18}/> : i + 1}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{s}</span>
                     </div>
                   ))}
                </div>

                <div className="mt-20 pt-10 border-t border-white/10 relative z-10">
                   <div className="flex justify-between items-end mb-6">
                      <div>
                         <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Total Estimas</p>
                         <p className="text-4xl font-light tracking-tighter">{formatCurrency(totalAmount)}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Pajak (0%)</p>
                         <p className="text-[10px] text-[#C1867B] font-bold uppercase tracking-widest">Included</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Panel - Form */}
             <div className="flex-grow p-12 lg:p-24 relative overflow-y-auto max-h-[90vh]">
                <AnimatePresence mode="wait">
                   {step === 1 && (
                     <motion.div key="st1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <SectionHeading title="Pilih Sanctuary Anda." subtitle="Step 01" />
                        <div className="grid gap-6">
                           {SEORI_DATA.BRANCHES.map(b => (
                             <button 
                               key={b.id}
                               onClick={() => { setBookingData({...bookingData, branch: b}); nextStep(); }}
                               className={`group p-10 rounded-[3.5rem] border transition-all text-left flex justify-between items-center ${
                                 bookingData.branch?.id === b.id ? 'border-neutral-900 bg-stone-50' : 'border-stone-100 hover:border-neutral-400'
                               }`}
                             >
                                <div className="flex gap-8 items-center">
                                   <div className="w-20 h-20 rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all shadow-xl">
                                      <img src={b.image} className="w-full h-full object-cover" alt={b.name} />
                                   </div>
                                   <div>
                                      <h4 className="text-2xl font-light mb-1">{b.name}</h4>
                                      <p className="text-xs text-neutral-400 font-light flex items-center gap-2"><MapPin size={12}/> {b.city}</p>
                                   </div>
                                </div>
                                <ArrowRight size={24} className={`transition-all ${
                                  bookingData.branch?.id === b.id ? 'text-neutral-900' : 'text-neutral-200 opacity-0 group-hover:opacity-100 group-hover:-translate-x-4'
                                }`} />
                             </button>
                           ))}
                        </div>
                     </motion.div>
                   )}

                   {step === 2 && (
                     <motion.div key="st2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <button onClick={prevStep} className="flex items-center gap-2 text-neutral-300 mb-8 hover:text-neutral-900 transition-colors"><ChevronLeft size={16}/> Kembali</button>
                        <SectionHeading title="Tentukan Level Cerita." subtitle="Step 02" />
                        <div className="grid gap-6">
                           {SEORI_DATA.PACKAGES.map(p => (
                             <button 
                               key={p.id}
                               onClick={() => { setBookingData({...bookingData, package: p}); nextStep(); }}
                               className={`p-12 rounded-[3.5rem] border transition-all text-left flex justify-between items-center group relative overflow-hidden ${
                                 p.popular ? 'border-[#C1867B] bg-[#C1867B]/5' : 'border-stone-100 hover:border-neutral-900'
                               }`}
                             >
                                {p.popular && <div className="absolute top-0 right-0 bg-[#C1867B] text-white text-[8px] font-bold px-8 py-2 tracking-widest uppercase rotate-45 translate-x-10 -translate-y-2">Favorite</div>}
                                <div className="max-w-md">
                                   <div className="flex items-center gap-4 mb-3">
                                      <h4 className="text-3xl font-light">{p.name}</h4>
                                      <span className="text-[9px] font-bold text-[#C1867B] uppercase tracking-widest">{p.time} Menit</span>
                                   </div>
                                   <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">{p.desc}</p>
                                   <ul className="grid grid-cols-2 gap-y-2">
                                      {p.items.map(it => <li key={it} className="text-[9px] text-neutral-500 flex items-center gap-2 uppercase tracking-tighter"><CheckCircle2 size={12} className="text-[#C1867B]"/> {it}</li>)}
                                   </ul>
                                </div>
                                <div className="text-right">
                                   <p className="text-4xl font-light mb-1">{formatCurrency(p.price)}</p>
                                   <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Base Rate</p>
                                </div>
                             </button>
                           ))}
                        </div>
                     </motion.div>
                   )}

                   {step === 3 && (
                     <motion.div key="st3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <button onClick={prevStep} className="flex items-center gap-2 text-neutral-300 mb-8 hover:text-neutral-900 transition-colors"><ChevronLeft size={16}/> Kembali</button>
                        <SectionHeading title="Waktu Adalah Milik Anda." subtitle="Step 03" />
                        <div className="space-y-12">
                           <div className="grid md:grid-cols-2 gap-10">
                              <div>
                                 <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-300 mb-6 block">Tanggal Sesi</label>
                                 <input 
                                   type="date" 
                                   onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                   className="w-full p-10 rounded-[2.5rem] border border-stone-100 focus:outline-none focus:border-neutral-900 transition-all text-xl font-light"
                                 />
                              </div>
                              <div className="p-10 bg-neutral-900 rounded-[2.5rem] text-white">
                                 <div className="flex items-center gap-4 mb-4 text-[#C1867B]">
                                    <Bell size={24}/>
                                    <h4 className="text-xl font-serif italic">Availability Note</h4>
                                 </div>
                                 <p className="text-xs text-neutral-400 font-light leading-relaxed">Sesi weekend di cabang {bookingData.branch?.name || 'Seori'} biasanya terisi 1 minggu lebih awal. Harap hadir 15 menit sebelum sesi dimulai.</p>
                              </div>
                           </div>
                           
                           <div>
                              <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-300 mb-6 block">Pilih Jam (WIB)</label>
                              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                 {['10:00', '11:15', '13:00', '14:45', '16:00', '17:15', '19:00', '20:15'].map(t => (
                                   <button 
                                     key={t}
                                     onClick={() => { setBookingData({...bookingData, time: t}); nextStep(); }}
                                     className={`py-6 rounded-3xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                                       bookingData.time === t ? 'bg-neutral-900 text-white border-neutral-900' : 'border-stone-100 hover:border-neutral-900'
                                     }`}
                                   >
                                      {t}
                                   </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                   )}

                   {step === 4 && (
                     <motion.div key="st4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <button onClick={prevStep} className="flex items-center gap-2 text-neutral-300 mb-8 hover:text-neutral-900 transition-colors"><ChevronLeft size={16}/> Kembali</button>
                        <SectionHeading title="Sentuhan Akhir." subtitle="Step 04" />
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                           {SEORI_DATA.ADDONS.map(a => (
                             <button 
                               key={a.id}
                               onClick={() => toggleAddon(a)}
                               className={`flex justify-between items-center p-10 border rounded-[3rem] transition-all group ${
                                 bookingData.addons.find(x => x.id === a.id) ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-stone-100 hover:border-neutral-400'
                               }`}
                             >
                                <div className="flex items-center gap-6 text-left">
                                   <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                                     bookingData.addons.find(x => x.id === a.id) ? 'bg-[#C1867B]' : 'bg-stone-50 text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white'
                                   }`}>
                                      {a.icon}
                                   </div>
                                   <span className="font-medium text-lg">{a.name}</span>
                                </div>
                                <span className={`text-sm font-bold ${bookingData.addons.find(x => x.id === a.id) ? 'text-[#C1867B]' : 'text-neutral-400'}`}>
                                   +{formatCurrency(a.price)}
                                </span>
                             </button>
                           ))}
                        </div>
                        <button 
                          onClick={nextStep}
                          className="w-full bg-neutral-900 text-white py-10 rounded-full font-bold uppercase tracking-[0.5em] text-xs shadow-3xl hover:bg-[#C1867B] transition-all transform hover:-translate-y-2"
                        >
                           Lanjut ke Konfirmasi
                        </button>
                     </motion.div>
                   )}

                   {step === 5 && (
                     <motion.div key="st5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <button onClick={prevStep} className="flex items-center gap-2 text-neutral-300 mb-8 hover:text-neutral-900 transition-colors"><ChevronLeft size={16}/> Kembali</button>
                        <SectionHeading title="Data Pemuja Seni." subtitle="Step 05" />
                        <div className="space-y-10">
                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                 <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-6">Nama Lengkap</label>
                                 <input type="text" placeholder="John Doe" className="w-full p-8 rounded-[2.5rem] border border-stone-100 focus:outline-none focus:border-neutral-900 transition-all font-light bg-stone-50/50" />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-6">No. WhatsApp</label>
                                 <input type="tel" placeholder="0812..." className="w-full p-8 rounded-[2.5rem] border border-stone-100 focus:outline-none focus:border-neutral-900 transition-all font-light bg-stone-50/50" />
                              </div>
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-6">Alamat Email</label>
                              <input type="email" placeholder="john@example.com" className="w-full p-8 rounded-[2.5rem] border border-stone-100 focus:outline-none focus:border-neutral-900 transition-all font-light bg-stone-50/50" />
                           </div>
                           
                           <div className="pt-10">
                              <div className="bg-stone-50 p-12 rounded-[4rem] mb-12 border border-stone-100 flex flex-col md:flex-row justify-between items-center gap-10">
                                 <div className="flex items-start gap-4">
                                    <input type="checkbox" className="mt-2 accent-[#C1867B]" />
                                    <p className="text-[10px] text-neutral-400 leading-relaxed uppercase tracking-widest max-w-[300px]">Saya menyetujui seluruh S&K serta Kebijakan Privasi Seori Studio Grand Flagship.</p>
                                 </div>
                                 <div className="text-right whitespace-nowrap">
                                    <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mb-1">Total Pembayaran</p>
                                    <p className="text-5xl font-light text-[#C1867B]">{formatCurrency(totalAmount)}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={simulateBooking}
                                className="w-full bg-[#C1867B] text-white py-10 rounded-full font-bold uppercase tracking-[0.5em] text-xs shadow-3xl hover:bg-neutral-900 transition-all transform hover:-translate-y-2 flex items-center justify-center gap-6"
                              >
                                 {loading ? (
                                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 ) : (
                                   <>Konfirmasi Reservasi <ChevronRight size={18}/></>
                                 )}
                              </button>
                           </div>
                        </div>
                     </motion.div>
                   )}

                   {step === 6 && (
                     <motion.div key="st6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                        <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-16 shadow-xl border border-green-100">
                           <CheckCircle2 size={64} />
                        </div>
                        <h3 className="text-5xl font-light mb-8 tracking-tighter">Momen Anda Terpesan.</h3>
                        <p className="text-lg text-neutral-400 mb-16 max-w-lg mx-auto leading-relaxed">Instruksi pembayaran detail telah dikirimkan ke WhatsApp Anda. Sampai jumpa di studio, Sang Kreator.</p>
                        
                        <div className="bg-stone-50 p-16 rounded-[5rem] text-left space-y-8 mb-16 border border-stone-100 relative overflow-hidden shadow-sm">
                           <div className="absolute top-0 right-0 p-12 opacity-5"><Award size={150}/></div>
                           <div className="flex justify-between items-center border-b border-stone-200 pb-6">
                              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.5em]">Layanan</span>
                              <span className="font-medium">{bookingData.package?.name} @ {bookingData.branch?.name}</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-stone-200 pb-6">
                              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.5em]">Jadwal Sesi</span>
                              <span className="font-medium">{bookingData.date || '15 Januari 2024'}, {bookingData.time} WIB</span>
                           </div>
                           <div className="flex justify-between items-end pt-6">
                              <span className="font-serif italic text-3xl">Total Bayar</span>
                              <span className="font-bold text-4xl text-[#C1867B]">{formatCurrency(totalAmount)}</span>
                           </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                           <button className="bg-neutral-900 text-white px-12 py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#C1867B] transition-all flex items-center justify-center gap-4">
                              Download E-Invoice <Download size={16}/>
                           </button>
                           <button onClick={() => window.location.reload()} className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 hover:text-neutral-900 transition-colors">
                              Kembali ke Beranda
                           </button>
                        </div>
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>
       </div>
    </motion.div>
  );
};

// --- GLOBAL FOOTER COMPONENT ---

const Footer = ({ setPage }) => (
  <footer className="bg-white pt-48 pb-12 border-t border-stone-100 relative overflow-hidden">
     <div className="absolute top-0 right-0 w-1/4 h-full bg-stone-50 -z-10" />
     <div className="max-w-7xl mx-auto px-6">
        
        {/* Newsletter CTA */}
        <div className="bg-neutral-900 rounded-[5rem] p-16 md:p-32 mb-40 text-white flex flex-col lg:flex-row justify-between items-center gap-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#C1867B] blur-[200px] opacity-20" />
           <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h3 className="text-5xl md:text-7xl font-light mb-10 tracking-tighter leading-tight">Mulai Narasi <br /> Anda Bersama <span className="font-serif italic text-[#C1867B]">Seori</span>.</h3>
              <p className="text-xl text-neutral-400 font-light leading-relaxed mb-16">Dapatkan inspirasi kurasi mingguan dan penawaran terbatas langsung di kotak masuk Anda.</p>
              <div className="flex p-2 bg-white/5 border border-white/10 rounded-full max-w-md mx-auto md:mx-0 group focus-within:border-[#C1867B] transition-all">
                 <input type="email" placeholder="email@seoristudio.com" className="bg-transparent px-8 py-4 flex-grow outline-none text-sm font-light" />
                 <button className="bg-[#C1867B] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-neutral-900 transition-all">Daftar</button>
              </div>
           </div>
           <div className="relative z-10">
              <button 
                onClick={() => setPage('booking')}
                className="w-56 h-56 rounded-full border border-white/20 flex flex-col items-center justify-center group hover:bg-[#C1867B] hover:border-[#C1867B] transition-all duration-1000 shadow-2xl"
              >
                 <ArrowUpRight size={56} className="mb-6 group-hover:rotate-45 transition-transform duration-700" />
                 <span className="text-[11px] font-bold uppercase tracking-[0.5em]">Book Session</span>
              </button>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-24 mb-40">
           {/* Brand Section */}
           <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-16 h-16 bg-neutral-900 text-white flex items-center justify-center font-serif italic text-4xl shadow-2xl">S</div>
                 <div>
                    <span className="text-3xl font-bold tracking-[0.2em] uppercase leading-none">Seori Studio</span>
                    <p className="text-[10px] font-bold tracking-[0.6em] text-neutral-400 uppercase mt-2">The Grand Flagship v8.0</p>
                 </div>
              </div>
              <p className="text-neutral-500 text-2xl font-light leading-relaxed max-w-md mb-16 italic">
                "Kami menghidupkan kembali esensi sebuah potret: Kejujuran dalam keheningan."
              </p>
              <div className="flex gap-4">
                 {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                   <a key={i} href="#" className="w-16 h-16 rounded-full border border-stone-100 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all duration-700 shadow-sm">
                     <Icon size={22}/>
                   </a>
                 ))}
              </div>
           </div>

           {/* Links Sections */}
           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-300 mb-12">Navigasi</h4>
              <ul className="space-y-6">
                 {SEORI_DATA.NAV_LINKS.map(item => (
                   <li key={item.id}>
                      <button onClick={() => setPage(item.id)} className="text-neutral-500 hover:text-neutral-900 transition-colors font-light text-base tracking-widest flex items-center gap-2 group">
                         <div className="w-1 h-1 rounded-full bg-[#C1867B] scale-0 group-hover:scale-100 transition-transform" />
                         {item.label}
                      </button>
                   </li>
                 ))}
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-300 mb-12">Bantuan</h4>
              <ul className="space-y-6">
                 {['Society Club', 'Gift Voucher', 'Pertanyaan Umum', 'Kebijakan Privasi', 'S&K Studio'].map(item => (
                   <li key={item}>
                      <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors font-light text-base tracking-widest">{item}</a>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Contact Section */}
           <div className="lg:col-span-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-300 mb-12">Lokasi Pusat</h4>
              <div className="space-y-10">
                 <p className="text-neutral-500 font-light text-base leading-relaxed flex gap-4">
                    <MapPin size={22} className="shrink-0 text-[#C1867B]"/>
                    Senopati Business Center, Tower 1, Lt 5 <br /> Jakarta Selatan, Indonesia 12190
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-base font-light">
                       <Phone size={18} className="text-neutral-300"/>
                       <span>+62 21 555 1212</span>
                    </div>
                    <div className="flex items-center gap-4 text-base font-light">
                       <Mail size={18} className="text-neutral-300"/>
                       <span className="text-[#C1867B]">hello@seoristudio.com</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Legal & Credits */}
        <div className="pt-20 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <p className="text-neutral-300 text-[10px] font-bold tracking-[0.4em] uppercase">
                 &copy; {new Date().getFullYear()} Seori Studio. Member of Seori Creative Group. All Rights Reserved.
              </p>
              <div className="flex gap-8">
                 <span className="text-[10px] font-bold text-neutral-200 uppercase tracking-widest">ISO 9001:2015</span>
                 <span className="text-[10px] font-bold text-neutral-200 uppercase tracking-widest">GDPR COMPLIANT</span>
              </div>
           </div>
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-200">Crafted by</span>
                 <span className="text-3xl font-black tracking-tighter italic text-neutral-900">LAVIRIXWEB</span>
              </div>
              <div className="w-[1px] h-8 bg-stone-100" />
              <button className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest hover:text-neutral-900 transition-colors flex items-center gap-2">
                 Indonesian <ChevronDown size={14}/>
              </button>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APP SHELL ---

export default function SeoriFlagship() {
  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(true);

  // Initial Preloader Simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth Scroll to Top on Page Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderCurrentPage = () => {
    switch(page) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'philosophy': return <PhilosophyPage />;
      case 'gallery': return <GalleryPage />;
      case 'locations': return <LocationsPage />;
      case 'society': return <SocietyPage />;
      case 'journal': return <JournalPage />;
      case 'booking': return <BookingPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-[#FAF9F6] font-sans text-neutral-900 selection:bg-[#C1867B]/20 overflow-x-hidden antialiased">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar page={page} setPage={setPage} />
          
          <main className="min-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer setPage={setPage} />

          {/* Persistent Floating Action Button (FAB) */}
          <AnimatePresence>
             {page !== 'booking' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 40 }}
                  className="fixed bottom-12 right-12 z-[90] hidden lg:block"
                >
                   <button 
                     onClick={() => setPage('booking')}
                     className="w-48 h-48 bg-neutral-900 text-white rounded-full flex flex-col items-center justify-center group overflow-hidden shadow-3xl hover:bg-[#C1867B] transition-colors duration-1000"
                   >
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 p-4"
                      >
                         <svg viewBox="0 0 100 100" className="w-full h-full fill-white/10">
                            <path id="fabPath" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="transparent" />
                            <text className="text-[8px] uppercase tracking-[0.5em] fill-white group-hover:fill-white/80 transition-colors">
                               <textPath xlinkHref="#fabPath">Capture Honest Moments — Book Your Sanctuary —</textPath>
                            </text>
                         </svg>
                      </motion.div>
                      <div className="relative z-10 flex flex-col items-center">
                         <Sparkles className="mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" size={36}/>
                         <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Pesan Sesi</span>
                      </div>
                   </button>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Mobile Booking Bar (Fixed) */}
          <AnimatePresence>
             {page !== 'booking' && (
                <motion.div 
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  exit={{ y: 120 }}
                  className="lg:hidden fixed bottom-6 left-6 right-6 z-[100]"
                >
                   <button 
                     onClick={() => setPage('booking')}
                     className="w-full bg-neutral-900 text-white py-7 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] shadow-3xl flex items-center justify-center gap-4 active:scale-95 transition-all border border-white/5"
                   >
                      <Calendar size={20} className="text-[#C1867B]"/>
                      Pesan Sesi Sekarang
                   </button>
                </motion.div>
             )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

// Helper: Custom Quote SVG
const Quote = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 3C15.1216 3 16.017 3.89543 16.017 5L16.017 5V6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V3L3 3C4.10457 3 5 3.89543 5 5L5 5V6H8C9.65685 6 11 7.34315 11 9V15C11 18.3137 8.31371 21 5 21H3Z" />
  </svg>
);