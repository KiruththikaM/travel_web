import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div 
      className="relative flex items-center gap-5 p-6 rounded-[20px] bg-white/70 backdrop-blur-lg border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(31,38,135,0.12)] cursor-pointer overflow-hidden group"
    >
      <div 
        className="absolute -top-2.5 -right-2.5 w-20 h-20 rounded-full z-0 opacity-10"
        style={{ backgroundColor: color }}
      />

      <div 
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-[28px]"
        style={{ 
          backgroundColor: `${color}15`,
          color: color,
          boxShadow: `0 4px 12px ${color}15`
        }}
      >
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="m-0 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
          {title}
        </h3>
        <p className="m-0 mt-1 text-2xl font-extrabold text-slate-800 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
