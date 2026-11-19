export interface MemoryItem {
  id: number;
  title: string;
  date: string;
  image: string;
  note: string;
  tag: string;
}

export const MEMORIES_DATA: MemoryItem[] = [
  {
    id: 1,
    title: "Senyum Manismu",
    date: "Setiap Hari",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    note: "Senyum Najla itu selalu berhasil bikin hari-hari yang capek jadi terasa tenang dan indah lagi.",
    tag: "Favorite Smile",
  },
  {
    id: 2,
    title: "Di Bawah Langit Biru",
    date: "Kenangan Berharga",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    note: "Sama seperti warna biru favoritmu, laut dan langit yang luas mengingatkanku betapa tulusnya hatimu.",
    tag: "Blue Vibes",
  },
  {
    id: 3,
    title: "Momen Manis Bersamamu",
    date: "Tak Tergantikan",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    note: "Tawa renyahmu, cerita-cerita kecilmu yang seru, sampai ngambek lucumu selalu jadi hal paling berharga bagiku.",
    tag: "Pure Joy",
  },
  {
    id: 4,
    title: "Bunga & Kejutan",
    date: "Hari Bahagia",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    note: "Bahkan buket bunga terindah di dunia masih kalah cantik dari tatapan matamu yang hangat.",
    tag: "Special Flower",
  },
  {
    id: 5,
    title: "Langkah Kita ke Depan",
    date: "Masa Depan Indah",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    note: "Terima kasih sudah tumbuh jadi wanita yang hebat. Aku selalu ada untuk menemani setiap impianmu tercapai.",
    tag: "Forever & Always",
  },
];

export interface StarReason {
  id: number;
  icon: string;
  title: string;
  message: string;
}

export const STAR_REASONS: StarReason[] = [
  {
    id: 1,
    icon: "✨",
    title: "Hatimu yang Tulus & Penyayang",
    message: "Cara kamu peduli sama orang di sekitarmu selalu bikin aku kagum. Kamu selalu punya tempat hangat untuk semua orang.",
  },
  {
    id: 2,
    icon: "💙",
    title: "Paling Cantik Saat Tersenyum",
    message: "Ketika kamu tertawa lepas, seluruh dunia rasanya ikut bersinar. Jangan pernah berhenti tersenyum ya, Najla!",
  },
  {
    id: 3,
    icon: "🌙",
    title: "Tempat Pulang Paling Nyaman",
    message: "Bisa ngobrol sama kamu setelah seharian lelah adalah obat terbaik. Suaramu selalu menenangkan.",
  },
  {
    id: 4,
    icon: "🌊",
    title: "Kesabaran & Kedewasaanmu",
    message: "Terima kasih selalu sabar memahami aku, mendengarkan, dan saling belajar menjadi pribadi yang lebih baik bersama.",
  },
  {
    id: 5,
    icon: "⭐",
    title: "Semangatmu Menggapai Cita-cita",
    message: "Aku selalu bangga melihat dedikasi dan kerja kerasmu. Apapun cita-citamu, aku selalu jadi pendukung nomormu satu!",
  },
  {
    id: 6,
    icon: "🎂",
    title: "Kamu Adalah Kado Terindah",
    message: "Hari ini hari ulang tahunmu, tapi kehadiranmu di hidupku adalah kado paling berharga yang pernah Tuhan titipkan.",
  },
];

