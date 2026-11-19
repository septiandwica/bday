import React from 'react';

export const ShinkaiSky: React.FC<{ timeOfDay?: string }> = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#f0f8ff]">
      {/* Clean, elegant, soft pastel sky-blue canvas with subtle warm tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e0f2fe] via-[#f0f8ff] to-[#f8fafc] opacity-90" />
    </div>
  );
};
