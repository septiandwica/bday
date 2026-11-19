import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 text-center border-t-2 border-[#bae6fd] bg-white/70 w-full">
      <div className="max-w-md mx-auto space-y-1">
        <div className="flex items-center justify-center gap-2 text-[#0284c7]">
          <Heart className="w-4 h-4 fill-[#0284c7] text-[#0284c7]" />
        </div>
        <p className="text-xs font-normal text-slate-700">
          Dibuat khusus dengan segenap hati untuk merayakan hari kelahiran <span className="font-bold text-[#0284c7]">Najla</span> 💙
        </p>
      </div>
    </footer>
  );
};
