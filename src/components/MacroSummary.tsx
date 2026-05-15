'use client';

interface MacroSummaryProps {
  narrative: string;
  macroDrivers: string[];
}

export default function MacroSummary({ narrative, macroDrivers }: MacroSummaryProps) {
  return (
    <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-lg p-5 mb-6">
      <h2 className="text-[#8b9ab5] text-xs font-bold uppercase tracking-wider mb-3">
        Macro Summary
      </h2>
      <p className="text-[#e0e6ed] text-sm leading-relaxed mb-4">{narrative}</p>
      <div className="flex flex-wrap gap-2">
        {macroDrivers.map((driver, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#1a2332] text-[#8b9ab5] text-xs rounded-md border border-[#2a3342]"
          >
            {driver}
          </span>
        ))}
      </div>
    </div>
  );
}