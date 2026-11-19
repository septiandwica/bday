import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 text-center border-t border-sky-500/20 relative z-10">
      <div className="max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-sky-400">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          <Heart className="w-4 h-4 fill-sky-400 text-sky-300" />
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <p className="text-sm font-light text-slate-300">
          Dibuat dengan segenap cinta khusus untuk merayakan hari kelahiran <span className="font-semibold text-sky-300">Najla</span> 💙
        </p>
        <p className="text-[11px] text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} &bull; Forever &amp; Always with Najla
        </p>
      </div>
    </footer>
  );
};

