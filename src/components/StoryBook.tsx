import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import { AnimeCharactersIllustration } from './AnimeCharactersIllustration';
import { sounds } from '../utils/audio';

interface StorySlide {
  id: number;
  badge: string;
  title: string;
  story: string;
  illustrationIndex: number;
  highlight: string;
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 0,
    badge: "TAHUN 2023 & AWAL MULA",
    title: "Pertemuan Pertama yang Mengubah Segalanya",
    story: "Tahun 2023 adalah awal mula takdir mempertemukan kita. Aku langsung jatuh hati saat melihat karaktermu: kamu orang yang begitu aktif, periang, dan pekerja keras. Bagi aku yang pada awalnya pendiam dan kurang banyak bicara, energimu menjadi oase—melengkapi setiap kekuranganku dengan penuh warna.",
    illustrationIndex: 1,
    highlight: "Karaktermu yang aktif & pekerja keras melengkapi sifatku yang pendiam ",
  },
  {
    id: 1,
    badge: "NOVEMBER 2024",
    title: "Langkah Berani di Hari Ulang Tahunmu",
    story: "Tepat di hari ulang tahunmu bulan November 2024, aku memberanikan diri untuk confess dan menyatakan perasaanku padamu. Saat itu jawabannya memang masih digantung. Tapi di dalam hati kecilku, aku sudah berjanji: aku tidak akan mudah menyerah memperjuangkan wanita sehebat dirimu.",
    illustrationIndex: 2,
    highlight: "Walau sempat digantung saat confess di hari ultahmu, aku pantang menyerah.",
  },
  {
    id: 2,
    badge: "AWAL 2025",
    title: "Partner Usaha & Satu Tim Tugas Akhir S1",
    story: "Memasuki 2025, aku mengajakmu menjadi partner untuk membangun usaha bersama. Tak hanya itu, kita juga dipertemukan dalam kelompok yang sama untuk menyelesaikan Tugas Akhir S1. Melewati begadang, bimbingan, revisi, dan kerja keras bersama membuatku semakin yakin betapa hebat dan tangguhnya dirimu.",
    illustrationIndex: 3,
    highlight: "Partner terbaik dalam membangun usaha dan menuntaskan Tugas Akhir S1.",
  },
  {
    id: 3,
    badge: "AGUSTUS 2025",
    title: "Resmi Jadian Setelah Sidang Capstone Defense",
    story: "Setelah semua perjuangan panjang dan akhirnya sukses melewati sidang Capstone Defense bersama, momen yang selama ini kunantikan akhirnya tiba di bulan Agustus 2025. Kita resmi jadian! Rasanya seperti adegan di Kimi no Na wa—dua insan yang saling mencari dan berjuang bersama, akhirnya bersatu di bawah langit biru.",
    illustrationIndex: 4,
    highlight: "Resmi jadian setelah sukses sidang Capstone Defense bersama ",
  },
  {
    id: 4,
    badge: "8 SEPTEMBER 2026",
    title: "Buku 'I Have a Crush on You' di Hari Ulang Tahunku",
    story: "Ketika kita sudah jadian dan tepat di hari ulang tahun Mas tanggal 8 September 2026, kamu memberikanku kado yang sangat manis: sebuah buku berjudul 'I Have a Crush on You'. Buku itu adalah salah satu hadiah paling berharga dan menyentuh hati yang pernah Mas terima. Di dalam hati Mas berbisik: 'dan ternyata... Mas juga naksir dan sayang banget sama kamu dari dulu sampai selamanya!'.",
    illustrationIndex: 0,
    highlight: "Kado terindah saat ultahku: 'I Have a Crush on You' & jawabanku: 'Aku juga!' ",
  },
  {
    id: 5,
    badge: "NOVEMBER 2026 (HARI INI)",
    title: "Ulang Tahun Lala & Janji Selalu Men-Support Impianmu",
    story: "Dan hari ini, di hari ulang tahunmu, giliran aku yang ingin berterima kasih sebanyak-banyaknya atas hadirnya kamu di hidupku. Harapanku untukmu banyak sekali, tapi yang paling utama: aku berjanji akan selalu ada di sampingmu untuk men-support apa pun yang ingin kamu lakukan, mengejar semua impian dan langkah masa depanmu.",
    illustrationIndex: 5,
    highlight: "Aku akan selalu ada men-support apa pun yang kamu impikan selamanya ",
  },
];

export const StoryBook: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < STORY_SLIDES.length - 1) {
      sounds.playChime(1.05);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      sounds.playChime(0.95);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = STORY_SLIDES[currentSlide];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Book Container Card */}
      <div className="w-full bg-white border-4 border-[#bae6fd] rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        {/* Book Ribbon Bookmark in Top Right */}
        <div className="absolute top-0 right-8 w-8 h-12 bg-[#0284c7] text-white flex items-end justify-center pb-1 shadow-xs rounded-b-md">
          <Bookmark className="w-4 h-4 fill-white" />
        </div>

        {/* Slide Indicator & Tabs */}
        <div className="flex items-center gap-1.5 mb-4">
          {STORY_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playChime(1.0);
                setCurrentSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-[#0284c7]' : 'w-2 bg-sky-200 hover:bg-sky-400'
              }`}
              title={s.title}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#e0f2fe] border border-sky-300 text-[#0284c7] text-[11px] font-bold font-mono tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0369a1] mb-2">
              {slide.title}
            </h3>

            {/* Anime Illustration Scene */}
            <div className="my-2 py-1 flex items-center justify-center">
              <AnimeCharactersIllustration step={slide.illustrationIndex} />
            </div>

            {/* Story Paragraph */}
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal bg-[#f0f8ff] p-4 rounded-2xl border border-sky-200">
              {slide.story}
            </p>

            {/* Highlight Banner */}
            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
              <Heart className="w-4 h-4 fill-[#0284c7]" />
              <span>{slide.highlight}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons for Book */}
        <div className="mt-6 pt-4 border-t-2 border-sky-100 flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentSlide === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-[#0369a1] bg-sky-50 hover:bg-sky-100 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400 font-bold">
            Bab {currentSlide + 1} dari {STORY_SLIDES.length}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === STORY_SLIDES.length - 1}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentSlide === STORY_SLIDES.length - 1
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-white bg-[#0284c7] hover:bg-[#0369a1] cursor-pointer shadow-xs'
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
