export interface MemoryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  note: string;
  objectPosition?: string;
}

export const MEMORIES_DATA: MemoryItem[] = [
  {
    id: 1,
    title: "Belajar Soal Kehidupan",
    category: "Pelajaran Hidup",
    image: "/1.JPG",
    note: "Mas seneng banget bisa belajar banyak hal dari kamu. Soal kehidupan, sudut pandang, dan cara menghadapi hari.",
  },
  {
    id: 2,
    title: "Ga Pernah Meremehkan Goal Mas",
    category: "Dukungan Tulus",
    image: "/2.JPG",
    objectPosition: "center 12%",
    note: "Salah satu hal yang paling Mas syukuri: Lala ga pernah menganggap remeh impian Mas, selalu percaya saat orang lain ragu.",
  },
  {
    id: 3,
    title: "Ga Pernah Bahas Negatif",
    category: "Energi Positif",
    image: "/3.JPG",
    objectPosition: "80% center",
    note: "Kamu ga melulu bilang hal-hal negatif. Ngobrol sama kamu selalu bikin hati Mas adem dan tenang.",
  },
  {
    id: 4,
    title: "Partner Usaha & Satu Frekuensi",
    category: "Usaha Bareng",
    image: "/4.JPG",
    note: "Dari awal ragu sampai akhirnya rill bikin usaha bareng di akhir 2025. Potensi kamu luar biasa hebat, La.",
  },
  {
    id: 5,
    title: "Buku 'I Have a Crush on You'",
    category: "8 September 2026",
    image: "/5.JPG",
    note: "Kado paling manis pas ultah Mas saat kita udah jadian. Di hati Mas selalu bilang: Mas juga sayang banget sama Lala.",
  },
];

export interface QualityItem {
  id: number;
  title: string;
  description: string;
}

export const LALA_QUALITIES: QualityItem[] = [
  {
    id: 1,
    title: "Selalu Mengerti Saat Mas di Puncak Stres",
    description: "Waktu akhir 2025 Mas lagi stres berat, kamu yang paling bisa mengerti Mas tanpa banyak menghakimi.",
  },
  {
    id: 2,
    title: "Tempat Mas Belajar Banyak Hal",
    description: "Mas banyak belajar soal kehidupan dan kedewasaan dari cara kamu bersikap dan mengambil keputusan.",
  },
  {
    id: 3,
    title: "Ga Pernah Meremehkan Mimpi Mas",
    description: "Setiap rencana dan goal yang Mas ceritain selalu kamu dengarkan dan kamu dukung penuh.",
  },
  {
    id: 4,
    title: "Selalu Bikin Mas Ceria",
    description: "Pas awal 2025 Mas sempat makan hati karena salah langkah, kehadiran Lala selalu berhasil balikin tawa Mas.",
  },
  {
    id: 5,
    title: "Potensi Luar Biasa",
    description: "Alasan Mas ajak kamu usaha bareng karena Mas percaya sama kecerdasan dan kemampuan hebat kamu.",
  },
  {
    id: 6,
    title: "Harapan Bersama ke Depan",
    description: "Mas pengen selalu ada di samping kamu buat men-support apa pun yang Lala pengen lakuin.",
  },
];
