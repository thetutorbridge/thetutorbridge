'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ChevronDown, ChevronUp, GraduationCap, Target, Trophy, Cloud, CircleDot } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type InterruptionType =
  | 'team2_delayed'
  | 'team2_cut_short'
  | 'team2_interrupted'
  | 'team1_cut_short'
  | 'team1_interrupted';

interface TeamData {
  oversAvailable: string;
  runs: string;
  wicketsLost: string;
}

interface Results {
  team1Resources: number;
  team2Resources: number;
  parScore: number;
  targetScore: number;
  resourceRatio: number;
}

// DLS Resource Table (Standard Edition - simplified)
// Format: resourceTable[wicketsLost][oversRemaining] = percentage
const getResourcePercentage = (oversRemaining: number, wicketsLost: number): number => {
  // Standard DLS resource percentages (approximation based on ICC standard table)
  // These are approximate values - real DLS uses proprietary tables
  const resourceTable: Record<number, Record<number, number>> = {
    0: { 50: 100, 45: 96.5, 40: 92.2, 35: 87.1, 30: 81.3, 25: 74.6, 20: 67.3, 15: 58.9, 10: 49.2, 5: 35.6, 0: 0 },
    1: { 50: 93.4, 45: 90.5, 40: 86.9, 35: 82.5, 30: 77.3, 25: 71.3, 20: 64.5, 15: 56.7, 10: 47.6, 5: 34.6, 0: 0 },
    2: { 50: 85.1, 45: 82.7, 40: 79.8, 35: 76.2, 30: 71.8, 25: 66.6, 20: 60.6, 15: 53.5, 10: 45.2, 5: 33.1, 0: 0 },
    3: { 50: 74.9, 45: 73.1, 40: 70.8, 35: 68.1, 30: 64.5, 25: 60.2, 20: 55.1, 15: 49.0, 10: 41.8, 5: 30.8, 0: 0 },
    4: { 50: 62.7, 45: 61.4, 40: 59.8, 35: 57.8, 30: 55.2, 25: 51.8, 20: 47.8, 15: 42.8, 10: 36.9, 5: 27.6, 0: 0 },
    5: { 50: 49.0, 45: 48.1, 40: 47.1, 35: 45.7, 30: 43.9, 25: 41.6, 20: 38.7, 15: 35.0, 10: 30.5, 5: 23.2, 0: 0 },
    6: { 50: 34.9, 45: 34.4, 40: 33.8, 35: 33.0, 30: 31.9, 25: 30.5, 20: 28.6, 15: 26.1, 10: 23.0, 5: 17.8, 0: 0 },
    7: { 50: 22.0, 45: 21.7, 40: 21.4, 35: 21.0, 30: 20.4, 25: 19.6, 20: 18.5, 15: 17.1, 10: 15.2, 5: 12.0, 0: 0 },
    8: { 50: 11.9, 45: 11.8, 40: 11.6, 35: 11.4, 30: 11.1, 25: 10.8, 20: 10.3, 15: 9.6, 10: 8.6, 5: 6.9, 0: 0 },
    9: { 50: 4.7, 45: 4.7, 40: 4.6, 35: 4.6, 30: 4.5, 25: 4.4, 20: 4.2, 15: 4.0, 10: 3.6, 5: 2.9, 0: 0 },
    10: { 50: 0, 45: 0, 40: 0, 35: 0, 30: 0, 25: 0, 20: 0, 15: 0, 10: 0, 5: 0, 0: 0 },
  };

  // Interpolate for non-standard over values
  const wickets = Math.min(10, Math.max(0, Math.floor(wicketsLost)));
  const overs = Math.max(0, oversRemaining);

  // Find the closest standard overs
  const standardOvers = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];

  // Find surrounding values for interpolation
  let lowerOvers = 0;
  let upperOvers = 50;

  for (let i = 0; i < standardOvers.length; i++) {
    if (overs >= standardOvers[i]) {
      upperOvers = standardOvers[i];
      lowerOvers = i < standardOvers.length - 1 ? standardOvers[i + 1] : standardOvers[i];
      break;
    }
  }

  if (upperOvers === lowerOvers) {
    return resourceTable[wickets][upperOvers] || 0;
  }

  // Linear interpolation
  const upperValue = resourceTable[wickets][upperOvers] || 0;
  const lowerValue = resourceTable[wickets][lowerOvers] || 0;
  const ratio = (overs - lowerOvers) / (upperOvers - lowerOvers);

  return lowerValue + (upperValue - lowerValue) * ratio;
};

const interruptionTypes: Record<InterruptionType, string> = {
  team2_delayed: "Team 2's innings delayed",
  team2_cut_short: "Team 2's innings cut short",
  team2_interrupted: "Team 2's innings interrupted",
  team1_cut_short: "Team 1's innings cut short",
  team1_interrupted: "Team 1's innings interrupted",
};

export default function DuckworthLewisCalculator() {
  const [interruptionType, setInterruptionType] = useState<InterruptionType>('team2_delayed');
  const [maxOvers, setMaxOvers] = useState<string>('50');
  const [team1, setTeam1] = useState<TeamData>({ oversAvailable: '', runs: '', wicketsLost: '0' });
  const [team2, setTeam2] = useState<TeamData>({ oversAvailable: '', runs: '', wicketsLost: '0' });
  const [results, setResults] = useState<Results | null>(null);
  const [showInterruptionDropdown, setShowInterruptionDropdown] = useState(false);
  const [showTeam1, setShowTeam1] = useState(true);
  const [showTeam2, setShowTeam2] = useState(true);
  const [showResourceTable, setShowResourceTable] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  // Calculate DLS
  useEffect(() => {
    const maxOversNum = parseFloat(maxOvers) || 50;
    const team1Overs = parseFloat(team1.oversAvailable) || 0;
    const team1Runs = parseFloat(team1.runs) || 0;
    const team1Wickets = parseInt(team1.wicketsLost) || 0;
    const team2Overs = parseFloat(team2.oversAvailable) || 0;
    const team2Runs = parseFloat(team2.runs) || 0;
    const team2Wickets = parseInt(team2.wicketsLost) || 0;

    // Need at least team 1's data
    if (team1Overs <= 0 || team1Runs <= 0) {
      setResults(null);
      return;
    }

    let team1Resources: number;
    let team2Resources: number;
    let parScore: number;
    let targetScore: number;

    switch (interruptionType) {
      case 'team2_delayed':
        // Team 2 starts with fewer overs but all 10 wickets
        team1Resources = getResourcePercentage(team1Overs, 0);
        team2Resources = getResourcePercentage(team2Overs, 0);

        // Target = Team 1 score × (Team 2 resources / Team 1 resources)
        targetScore = Math.ceil(team1Runs * (team2Resources / team1Resources));
        parScore = targetScore - 1;
        break;

      case 'team2_cut_short':
        // Team 2's innings ends early - calculate par score at that point
        team1Resources = getResourcePercentage(team1Overs, 0);
        // Team 2 resources = what they had at start - what they have remaining
        const team2StartResources = getResourcePercentage(maxOversNum, 0);
        const team2RemainingResources = getResourcePercentage(team2Overs, team2Wickets);
        team2Resources = team2StartResources - team2RemainingResources;

        // Calculate what Team 2 should have scored with resources used
        parScore = Math.ceil(team1Runs * (team2Resources / team1Resources));
        targetScore = parScore + 1;
        break;

      case 'team2_interrupted':
        // Team 2's innings interrupted and resumed with fewer overs
        team1Resources = getResourcePercentage(team1Overs, 0);
        // Resources lost = resources at interruption - resources when resumed
        const resourcesAtInterruption = getResourcePercentage(team2Overs, team2Wickets);
        team2Resources = resourcesAtInterruption;

        // Adjusted target
        targetScore = Math.ceil(team1Runs * (team2Resources / team1Resources));
        parScore = targetScore - 1;
        break;

      case 'team1_cut_short':
        // Team 1's innings was cut short
        // Resources Team 1 had = max resources - remaining resources
        const team1MaxResources = getResourcePercentage(maxOversNum, 0);
        const team1RemainingResources = getResourcePercentage(maxOversNum - team1Overs, team1Wickets);
        team1Resources = team1MaxResources - team1RemainingResources;
        team2Resources = getResourcePercentage(team2Overs > 0 ? team2Overs : maxOversNum, 0);

        // If Team 2 has more resources, add runs to Team 1's score
        if (team2Resources > team1Resources) {
          const extraResources = team2Resources - team1Resources;
          const g50 = 245; // Average score for 50 overs (G50 parameter)
          const additionalRuns = Math.round((extraResources / 100) * g50);
          targetScore = team1Runs + additionalRuns + 1;
        } else {
          targetScore = Math.ceil(team1Runs * (team2Resources / team1Resources));
        }
        parScore = targetScore - 1;
        break;

      case 'team1_interrupted':
        // Team 1's innings was interrupted (lost overs mid-innings)
        team1Resources = getResourcePercentage(team1Overs, team1Wickets);
        team2Resources = getResourcePercentage(team2Overs > 0 ? team2Overs : maxOversNum, 0);

        if (team2Resources > team1Resources) {
          const extraResources = team2Resources - team1Resources;
          const g50 = 245;
          const additionalRuns = Math.round((extraResources / 100) * g50);
          targetScore = team1Runs + additionalRuns + 1;
        } else {
          targetScore = Math.ceil(team1Runs * (team2Resources / team1Resources));
        }
        parScore = targetScore - 1;
        break;

      default:
        setResults(null);
        return;
    }

    setResults({
      team1Resources,
      team2Resources,
      parScore: Math.max(0, parScore),
      targetScore: Math.max(1, targetScore),
      resourceRatio: team2Resources / team1Resources,
    });
  }, [interruptionType, maxOvers, team1, team2]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-green-600 hover:text-green-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Duckworth Lewis Calculator</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-4 shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Duckworth Lewis Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate revised targets for rain-interrupted cricket matches using the Duckworth Lewis Stern (DLS) method. Find par scores and target scores instantly.
          </p>
        </div>

        {/* Match Settings Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Match Settings
            </h2>
          </div>

          <div className="p-6 space-y-5">
            {/* Interruption Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interruption type</label>
              <div className="relative">
                <button
                  onClick={() => setShowInterruptionDropdown(!showInterruptionDropdown)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-all flex items-center justify-between bg-gray-50 text-left"
                >
                  <span className="font-medium text-gray-700">{interruptionTypes[interruptionType]}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
                {showInterruptionDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    {(Object.keys(interruptionTypes) as InterruptionType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setInterruptionType(type);
                          setShowInterruptionDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors ${
                          interruptionType === type ? 'bg-green-100 text-green-700' : 'text-gray-700'
                        }`}
                      >
                        {interruptionTypes[type]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Maximum Overs */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">Maximum overs</label>
                <div className="group relative">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    50 for ODI, 20 for T20
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={maxOvers}
                onChange={(e) => setMaxOvers(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="50"
                min="1"
                max="50"
              />
            </div>
          </div>
        </div>

        {/* Team 1 Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowTeam1(!showTeam1)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <CircleDot className="w-5 h-5 mr-2" />
              Team 1 (Batting First)
            </h2>
            {showTeam1 ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showTeam1 && (
            <div className="p-6 space-y-4">
              {/* Overs Available */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">Overs available</label>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Overs Team 1 faced
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={team1.oversAvailable}
                    onChange={(e) => setTeam1({ ...team1, oversAvailable: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all pr-12"
                    placeholder="Enter overs"
                    min="0"
                    max={maxOvers}
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">🏏</span>
                </div>
              </div>

              {/* Runs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Runs</label>
                <div className="relative">
                  <input
                    type="number"
                    value={team1.runs}
                    onChange={(e) => setTeam1({ ...team1, runs: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all pr-12"
                    placeholder="Enter runs scored"
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">🏃</span>
                </div>
              </div>

              {/* Wickets Lost (for certain interruption types) */}
              {(interruptionType === 'team1_cut_short' || interruptionType === 'team1_interrupted') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wickets lost</label>
                  <select
                    value={team1.wicketsLost}
                    onChange={(e) => setTeam1({ ...team1, wicketsLost: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((w) => (
                      <option key={w} value={w}>{w} wickets</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Team 2 Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowTeam2(!showTeam2)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <CircleDot className="w-5 h-5 mr-2" />
              Team 2 (Chasing)
            </h2>
            {showTeam2 ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showTeam2 && (
            <div className="p-6 space-y-4">
              {/* Overs Available */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">Overs available</label>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Overs available for Team 2
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={team2.oversAvailable}
                    onChange={(e) => setTeam2({ ...team2, oversAvailable: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all pr-12"
                    placeholder="Enter overs"
                    min="0"
                    max={maxOvers}
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">🏏</span>
                </div>
              </div>

              {/* Runs (for interrupted innings) */}
              {(interruptionType === 'team2_cut_short' || interruptionType === 'team2_interrupted') && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-medium text-gray-700">Runs</label>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Runs scored by Team 2 at interruption
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={team2.runs}
                      onChange={(e) => setTeam2({ ...team2, runs: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all pr-12"
                      placeholder="Enter runs scored"
                      min="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">🏃</span>
                  </div>
                </div>
              )}

              {/* Wickets Lost (for cut short/interrupted) */}
              {(interruptionType === 'team2_cut_short' || interruptionType === 'team2_interrupted') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wickets lost</label>
                  <select
                    value={team2.wicketsLost}
                    onChange={(e) => setTeam2({ ...team2, wicketsLost: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((w) => (
                      <option key={w} value={w}>{w} wickets</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Result
            </h2>
          </div>

          <div className="p-6">
            {results ? (
              <div className="space-y-4">
                {/* Main Results */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Par Score</p>
                    <p className="text-3xl font-bold text-green-700">{results.parScore}</p>
                    <p className="text-xs text-gray-500 mt-1">Team 2 needs to match this to tie</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Target Score</p>
                    <p className="text-3xl font-bold text-blue-700">{results.targetScore}</p>
                    <p className="text-xs text-gray-500 mt-1">Team 2 needs this to win</p>
                  </div>
                </div>

                {/* Resource Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Resource Calculation</h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Team 1 Resources</p>
                      <p className="font-bold text-gray-800">{results.team1Resources.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Team 2 Resources</p>
                      <p className="font-bold text-gray-800">{results.team2Resources.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Resource Ratio</p>
                      <p className="font-bold text-gray-800">{(results.resourceRatio * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Interpretation:</strong> Based on the DLS method, Team 2 needs to score{' '}
                    <strong>{results.targetScore} runs</strong> to win. If their innings is cut short,
                    they need to be ahead of the par score of <strong>{results.parScore}</strong> at that point.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Cloud className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Waiting for your inputs...</p>
                <p className="text-sm mt-1">Enter Team 1's score and overs to calculate the DLS target</p>
              </div>
            )}
          </div>
        </div>

        {/* Resource Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowResourceTable(!showResourceTable)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-green-600" />
              DLS Resource Table
            </h3>
            {showResourceTable ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showResourceTable && (
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600 mb-4">
                Resource percentage remaining based on overs and wickets lost:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="py-2 px-2 text-left font-semibold text-gray-700 border-b">Overs</th>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                        <th key={w} className="py-2 px-2 text-center font-semibold text-gray-700 border-b">
                          {w}W
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[50, 40, 30, 20, 10, 5].map((overs) => (
                      <tr key={overs} className="hover:bg-gray-50">
                        <td className="py-2 px-2 font-medium text-gray-800 border-b">{overs}</td>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                          <td key={w} className="py-2 px-2 text-center text-gray-600 border-b">
                            {getResourcePercentage(overs, w).toFixed(1)}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * This is a simplified approximation. Official DLS calculations use proprietary ICC tables.
              </p>
            </div>
          )}
        </div>

        {/* Formula Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="w-5 h-5 mr-2 text-green-600" />
              How DLS Works
            </h3>
            {showFormula ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showFormula && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Basic DLS Formula:</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm text-center">
                  Target = Team 1 Score × (Team 2 Resources / Team 1 Resources)
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Resources Depend On:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Overs remaining:</strong> More overs = more resources</li>
                  <li>• <strong>Wickets in hand:</strong> More wickets = more resources</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Example Calculation:</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>Team 1 scores 240 in 50 overs (100% resources used)</p>
                  <p>Rain delays Team 2's innings to 30 overs available</p>
                  <p>Team 2 resources at 30 overs, 0 wickets = 75.1%</p>
                  <p className="font-medium">Target = 240 × (75.1 / 100) = 180.24 → <strong>181 runs</strong></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-green-600" />
              Understanding the Duckworth Lewis Stern Method
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is the DLS Method?</h3>
                <p>
                  The <strong>Duckworth Lewis Stern (DLS) method</strong> is a mathematical formula used to calculate revised targets in rain-interrupted limited-overs cricket matches. It was developed by statisticians Frank Duckworth and Tony Lewis in 1997, and later updated by Steven Stern in 2014.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why is DLS Needed?</h3>
                <p>
                  Before DLS, methods like "average run rate" and "most productive overs" were used, but they were often unfair:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Average run rate ignored wickets lost</li>
                  <li>Most productive overs penalized aggressive batting</li>
                  <li>Neither accounted for match situation properly</li>
                </ul>
                <p className="mt-2">
                  DLS considers both <strong>overs remaining</strong> and <strong>wickets in hand</strong> as resources available to a batting team.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Types of Interruptions</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Team 2's Innings Delayed</h4>
                    <p className="text-sm mt-1">Rain before Team 2 starts. They get fewer overs to chase.</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800">Team 2's Innings Cut Short</h4>
                    <p className="text-sm mt-1">Rain ends match early. Par score determines winner.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800">Team 2's Innings Interrupted</h4>
                    <p className="text-sm mt-1">Rain during chase. Target adjusted for lost overs.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800">Team 1's Innings Affected</h4>
                    <p className="text-sm mt-1">If Team 2 has more resources, runs are added to target.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Minimum Overs Requirement</h3>
                <p>
                  For a match result using DLS:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>ODI:</strong> Both teams must face at least 20 overs</li>
                  <li><strong>T20:</strong> Both teams must face at least 5 overs</li>
                  <li>Exception: If a team is bowled out or reaches target earlier</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'What does par score mean in DLS?',
                a: 'Par score is the score Team 2 needs to tie the match at any point during their innings. If Team 2 is ahead of par when rain stops play, they win. If they are behind par, Team 1 wins.'
              },
              {
                q: 'Why do wickets matter in DLS calculations?',
                a: 'Wickets are a crucial resource. A team with 8 wickets in hand has more scoring potential than one with only 2 wickets, even with the same overs remaining. DLS accounts for this by assigning different resource percentages.'
              },
              {
                q: 'Can the target increase under DLS?',
                a: 'Yes! If Team 1\'s innings was cut short by rain, Team 2 may have more resources available. In this case, runs are added to Team 1\'s score to calculate the target, using the G50 parameter (average score in 50 overs).'
              },
              {
                q: 'What is the G50 parameter?',
                a: 'G50 is the average score expected from a team batting 50 overs with all wickets intact. It\'s currently set at 245 runs for international ODIs and is used when Team 2 has more resources than Team 1.'
              },
              {
                q: 'Is this calculator 100% accurate?',
                a: 'This calculator uses an approximation of the official DLS tables. The actual ICC DLS system uses proprietary tables that are regularly updated. For official matches, the on-field DLS software is used.'
              },
              {
                q: 'How is DLS different from the old D/L method?',
                a: 'The Stern update (2014) improved the method for high-scoring matches by making the resource percentages dependent on the first innings score, rather than using fixed tables. This is now called DLS (Duckworth-Lewis-Stern).'
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-green-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Percentage Calculator', href: '/calculators/percentage-calculator', desc: 'Calculate percentages' },
              { name: 'Average Calculator', href: '/calculators/average-calculator', desc: 'Calculate averages' },
              { name: 'Speed Distance Time', href: '/calculators/speed-distance-time-calculator', desc: 'Calculate rate problems' },
              { name: 'Ratio Calculator', href: '/calculators/ratio-calculator', desc: 'Solve ratio problems' },
              { name: 'Random Number Generator', href: '/calculators/random-number-generator', desc: 'Generate random numbers' },
              { name: 'Dice Roller', href: '/calculators/dice-roller', desc: 'Roll virtual dice' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-green-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Math or Statistics?</h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand probability, statistics, and mathematical formulas used in sports analytics!
          </p>
          <Link
            href="/book-demo-class"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Click outside to close dropdown */}
      {showInterruptionDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowInterruptionDropdown(false)}
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Duckworth Lewis Calculator',
            description: 'Free Duckworth Lewis Stern (DLS) calculator for cricket. Calculate revised targets for rain-interrupted ODI and T20 matches.',
            url: 'https://thetutorbridge.com/calculators/duckworth-lewis-calculator',
            applicationCategory: 'SportsApplication',
            operatingSystem: 'Any',
            permissions: 'browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}
