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
    date: "Awal Ketemu 2023",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    note: "Dari awal ketemu di 2023, energimu yang ceria dan aktif selalu berhasil mencairkan suasana dan bikin aku jatuh hati.",
    tag: "Awal Pertemuan",
  },
  {
    id: 2,
    title: "Di Bawah Langit Biru",
    date: "Warna Favoritmu",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    note: "Sama seperti kecintaanmu pada birunya langit, kehadiranmu selalu membawa ketenangan dan kedamaian tanpa batas.",
    tag: "Langit Biru",
  },
  {
    id: 3,
    title: "Partner Usaha & Skripsi",
    date: "Perjuangan 2025",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    note: "Begadang bareng ngerjain usaha, revisi bab demi bab, sampai satu tim Tugas Akhir S1. Kamu partner paling hebat!",
    tag: "Satu Tim",
  },
  {
    id: 4,
    title: "Capstone Defense Lulus!",
    date: "Agustus 2025",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    note: "Momen setelah sidang Capstone Defense itu luar biasa lega, dan di bulan Agustus itulah akhirnya kita resmi jadian.",
    tag: "Resmi Bersama",
  },
  {
    id: 5,
    title: "Langkah Kita ke Depan",
    date: "Selamanya",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    note: "Aku berjanji akan selalu ada men-support apa pun yang pengen kamu lakuin. Terima kasih sudah ada di sampingku, Najla.",
    tag: "Selalu Ada",
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
    icon: "🌸",
    title: "Karaktermu yang Pekerja Keras & Aktif",
    message: "Dari pertama ketemu di 2023, energimu yang selalu aktif dan gigih bekerja luar biasa memesona bagiku yang awalnya pendiam.",
  },
  {
    id: 2,
    icon: "💙",
    title: "Melengkapi Setiap Kekuranganku",
    message: "Aku yang pada awalnya kurang banyak bicara menemukan kenyamanan bicara berjam-jam saat bersamamu.",
  },
  {
    id: 3,
    icon: "🤝",
    title: "Partner Usaha & Tim Tugas Akhir S1",
    message: "Bukan hanya pasangan, kamu adalah partner bisnis dan rekan satu tim yang paling tangguh, cerdas, dan bisa diandalkan.",
  },
  {
    id: 4,
    icon: "🎓",
    title: "Sukses Capstone Defense Bersama",
    message: "Melewati ketegangan sidang capstone bersama hingga akhirnya resmi jadian di Agustus 2025 adalah pembuktian indah cerita kita.",
  },
  {
    id: 5,
    icon: "⭐",
    title: "Buku 'I Have a Crush on You' (8 Sept 2026)",
    message: "Buku manis yang kamu kasih pas hari ultahku 8 September 2026 saat kita udah jadian selalu kusimpan rapi di hati. Jawabanku selalu sama: aku juga naksir & sayang banget sama kamu!",
  },
  {
    id: 6,
    icon: "🎂",
    title: "Komitmenku: Selalu Men-support Mimpimu",
    message: "Di hari ulang tahunmu ini, aku berjanji akan selalu jadi orang nomor satu yang mendukung semua hal yang pengen kamu lakukan.",
  },
];
