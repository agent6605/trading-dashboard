'use client';

import { AlertTriangle } from 'lucide-react';

interface RiskItem {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface RiskRadarProps {
  risks: RiskItem[];
}

export default function RiskRadar({ risks }: RiskRadarProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'medium':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default:
        return 'text-[#8b9ab5] border-[#2a3342] bg-[#1a2332]';
    }
  };

  return (
    <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-lg p-5 mb-6">
      <h2 className="text-[#8b9ab5] text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        Risk Radar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={`border rounded-md p-3 ${getSeverityColor(risk.severity)}`}
          >
            <div className="font-bold text-sm mb-1">{risk.title}</div>
            <div className="text-xs opacity-80">{risk.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}