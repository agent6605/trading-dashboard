'use client';

interface TraderNoteProps {
  note: string;
}

export default function TraderNote({ note }: TraderNoteProps) {
  return (
    <div className="bg-gradient-to-r from-[#1a2332] to-[#0a0e1a] border border-[#2a3342] rounded-lg p-5 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-400 font-bold text-sm">$</span>
        </div>
        <div>
          <span className="text-[#8b9ab5] text-xs font-bold uppercase tracking-wider block mb-1">
            Trader&apos;s Note
          </span>
          <p className="text-[#e0e6ed] text-sm italic leading-relaxed">&quot;{note}&quot;</p>
        </div>
      </div>
    </div>
  );
}