import React from 'react';
import type { XaiData } from '../types';
import { BrainCircuitIcon, CheckCircleIcon, LightbulbIcon } from './icons';

interface SidebarProps {
  xaiData: XaiData | null;
  onAlternativeSelect: (alternative: string) => void;
}

const ConfidenceMeter: React.FC<{ score: number }> = ({ score }) => {
    const percentage = Math.round(score * 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let colorClass = 'text-green-500';
    if (percentage < 75) colorClass = 'text-yellow-500';
    if (percentage < 50) colorClass = 'text-red-500';

    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-slate-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <circle
                    className={`transform -rotate-90 origin-center transition-all duration-500 ${colorClass}`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
            </svg>
            <span className="absolute text-2xl font-bold text-slate-700">{percentage}%</span>
        </div>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ xaiData, onAlternativeSelect }) => {
  if (!xaiData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 p-4 bg-slate-50 rounded-lg min-h-[500px]">
          <BrainCircuitIcon className="h-12 w-12 mb-4"/>
          <p className="font-medium">Awaiting First Recommendation</p>
          <p className="text-sm mt-2">The AI's reasoning will appear here once you receive advice from the AI Coach.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Confidence & Inputs */}
      <div className="space-y-8">
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-600 mb-4 text-center">Confidence Score</h3>
          <div className="flex justify-center">
              <ConfidenceMeter score={xaiData.confidenceScore} />
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">This score reflects the AI's confidence in its primary recommendation based on the data provided.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Key Inputs Considered
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {xaiData.modelInputs.map((input, index) => (
              <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">&#8227;</span>
                  <span>{input}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column: Alternatives */}
      <div className="p-6 bg-slate-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
          <LightbulbIcon className="h-5 w-5 mr-2" />
          Alternative Strategies
        </h3>
        <p className="text-sm text-slate-500 mb-4">Consider these options as well. Click one to discuss it with the AI Coach.</p>
        <div className="space-y-3">
          {xaiData.alternatives.map((alt, index) => (
            <button
              key={index}
              onClick={() => onAlternativeSelect(alt)}
              className="w-full text-left bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-3 rounded-md text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {alt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};