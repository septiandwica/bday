export interface StoryChapter {
  id: number;
  chapterNumber: string;
  year: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  quote?: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 0,
    chapterNumber: "00",
    year: "PROLOGUE",
    title: "Tentang Langit Biru & Najla",
    subtitle: "Sebuah Lembaran Khusus untuk Ulang Tahunmu",
    paragraphs: [
      "Kenapa warna biru? Karena kamu menyukai langit.",
      "Langit yang luas, tenang, dan selalu menghadirkan keteduhan setiap kali kita memandang ke atas. Sama seperti dirimu yang selalu membawa rasa nyaman dan ketenangan dalam hidupku.",
      "Hari ini, izinkan aku menceritakan kembali perjalanan kecil kita dari awal hingga detik ini...",
    ],
  },
  {
    id: 1,
    chapterNumber: "01",
    year: "2023",
    title: "Pertemuan Pertama",
    subtitle: "Ketika Dua Pribadi Saling Melengkapi",
    paragraphs: [
      "Tahun 2023 adalah awal mula takdir mempertemukan kita.",
      "Sejak awal, aku sangat kagum melihat karaktermu: seorang perempuan yang aktif, gigih, dan pekerja keras. Kamu selalu penuh semangat dalam menjalani hari-harimu.",
      "Bagi diriku yang pada awalnya cenderung pendiam dan jarang banyak bicara, kehadiran energimu terasa begitu hidup—melengkapi setiap kekuranganku dengan sempurna.",
    ],
    quote: "Kamu adalah kepingan puzzle yang melengkapi hal-hal yang tidak kumiliki.",
  },
  {
    id: 2,
    chapterNumber: "02",
    year: "NOVEMBER 2024",
    title: "Langkah Berani",
    subtitle: "Sebuah Ungkapan Rasa di Hari Lahirmu",
    paragraphs: [
      "November 2024, tepat di momen ulang tahunmu yang lalu, aku memberanikan diri untuk mengungkapkan perasaanku secara jujur padamu.",
      "Walaupun saat itu statusnya masih digantung dan belum ada kepastian, di dalam hati aku sudah bertekad kuat.",
      "Aku tidak akan pernah menyerah untuk memperjuangkan seseorang yang begitu tulus dan istimewa sepertimu.",
    ],
    quote: "Menunggu dan berjuang untukmu adalah keputusan terbaik yang pernah kuambil.",
  },
  {
    id: 3,
    chapterNumber: "03",
    year: "AWAL 2025",
    title: "Berjuang Bersama",
    subtitle: "Dari Rekan Usaha Hingga Tugas Akhir S1",
    paragraphs: [
      "Memasuki tahun 2025, aku mengajakmu menjadi partner untuk membangun usaha bersama.",
      "Bukan hanya dalam urusan usaha, kita juga berjuang di kelompok yang sama dalam menyelesaikan Tugas Akhir S1.",
      "Melihat ketangguhanmu saat begadang, berdiskusi, dan memecahkan setiap tantangan membuat rasa kagum dan sayangku semakin berakar dalam.",
    ],
    quote: "Bukan hanya pasangan hati, kamu adalah partner terbaik dalam setiap langkah perjuanganku.",
  },
  {
    id: 4,
    chapterNumber: "04",
    year: "AGUSTUS 2025",
    title: "Titik Temu di Bawah Langit",
    subtitle: "Resmi Bersama Setelah Sidang Capstone Defense",
    paragraphs: [
      "Setelah perjuangan panjang dan akhirnya lulus sidang Capstone Defense bersama, momen yang selama ini kunantikan pun tiba.",
      "Di bulan Agustus, akhirnya kita resmi jadian.",
      "Rasanya seperti kisah di Kimi no Na wa—dua insan yang saling mencari dan berproses di jalannya masing-masing, hingga akhirnya langit mempertemukan dan menyatukan tangan kita berdua.",
    ],
    quote: "Setelah semua ujian terlewati, tanganmu akhirnya ada di dalam genggamanku.",
  },
  {
    id: 5,
    chapterNumber: "05",
    year: "HARI INI",
    title: "Selamat Ulang Tahun, Najla",
    subtitle: "Harapan Tulus di Bawah Langit Biru",
    paragraphs: [
      "Di hari ulang tahunmu ini, harapanku untukmu begitu banyak dan tak terhingga.",
      "Aku berjanji akan selalu ada di sampingmu—mendukung penuh apa pun impian, cita-cita, dan hal yang ingin kamu lakukan ke depan.",
      "Terima kasih banyak ya sudah hadir di dunia ini, sudah mau berjuang bersamaku, dan menjadi bagian paling berharga dalam hidupku.",
    ],
    quote: "Selamat bertambah usia, Najla tercinta. Tiup lilin ini dan mari melangkah bersama selamanya. 💙",
  },
];

