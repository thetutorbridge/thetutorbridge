'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Home, ChevronRight, Info, ChevronDown, ChevronUp, GraduationCap, Grid3X3, Circle, Square, Download } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

type CircleType = 'thin' | 'thick' | 'filled';

interface BlockPosition {
  x: number;
  y: number;
  isEdge: boolean;
}

export default function MinecraftCircleGenerator() {
  const [diameter, setDiameter] = useState<string>('15');
  const [thickness, setThickness] = useState<string>('1');
  const [circleType, setCircleType] = useState<CircleType>('thin');
  const [showGrid, setShowGrid] = useState(true);
  const [blockCount, setBlockCount] = useState(0);

  const [showSettings, setShowSettings] = useState(true);
  const [showHowTo, setShowHowTo] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  // Midpoint circle algorithm to generate circle points
  const generateCircleBlocks = useMemo(() => {
    const d = parseInt(diameter) || 0;
    const t = parseInt(thickness) || 1;

    if (d < 3) return { blocks: [], gridSize: 0 };

    const radius = d / 2;
    const gridSize = d + 2; // Add padding
    const center = gridSize / 2;
    const blocks: BlockPosition[] = [];
    const blockSet = new Set<string>();

    // Helper to add block
    const addBlock = (x: number, y: number, isEdge: boolean) => {
      const gridX = Math.floor(x);
      const gridY = Math.floor(y);
      const key = `${gridX},${gridY}`;
      if (!blockSet.has(key) && gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
        blockSet.add(key);
        blocks.push({ x: gridX, y: gridY, isEdge });
      }
    };

    if (circleType === 'filled') {
      // Fill entire circle
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const dx = x + 0.5 - center;
          const dy = y + 0.5 - center;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= radius) {
            const isEdge = distance > radius - 1;
            addBlock(x, y, isEdge);
          }
        }
      }
    } else {
      // Generate hollow circle with thickness
      const outerRadius = radius;
      const innerRadius = circleType === 'thin' ? radius - 1 : Math.max(0, radius - t);

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const dx = x + 0.5 - center;
          const dy = y + 0.5 - center;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= outerRadius && distance >= innerRadius) {
            const isEdge = distance > outerRadius - 0.5 || distance < innerRadius + 0.5;
            addBlock(x, y, isEdge);
          }
        }
      }
    }

    return { blocks, gridSize };
  }, [diameter, thickness, circleType]);

  useEffect(() => {
    setBlockCount(generateCircleBlocks.blocks.length);
  }, [generateCircleBlocks]);

  const { blocks, gridSize } = generateCircleBlocks;

  // Create grid for rendering
  const grid = useMemo(() => {
    const g: (BlockPosition | null)[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));

    blocks.forEach((block) => {
      if (block.y >= 0 && block.y < gridSize && block.x >= 0 && block.x < gridSize) {
        g[block.y][block.x] = block;
      }
    });

    return g;
  }, [blocks, gridSize]);

  // Calculate cell size based on diameter
  const getCellSize = () => {
    const d = parseInt(diameter) || 15;
    if (d <= 10) return 28;
    if (d <= 20) return 22;
    if (d <= 30) return 16;
    if (d <= 50) return 12;
    if (d <= 75) return 8;
    return 6;
  };

  const cellSize = getCellSize();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-emerald-600 hover:text-emerald-800 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/calculators" className="text-emerald-600 hover:text-emerald-800">
              Calculators
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Minecraft Circle Generator</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white mb-4 shadow-lg">
            <Circle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Minecraft Circle Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate perfect pixel circles for your Minecraft builds. Enter the diameter and thickness to create circle templates for towers, domes, and other round structures.
          </p>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-600 text-white"
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Grid3X3 className="w-5 h-5 mr-2" />
              Circle Settings
            </h2>
            {showSettings ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showSettings && (
            <div className="p-6 space-y-5">
              {/* Diameter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diameter
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    placeholder="Diameter"
                    min="3"
                    max="100"
                  />
                  <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">blocks</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">The width of the circle in blocks (3-100)</p>
              </div>

              {/* Circle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Circle Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setCircleType('thin')}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      circleType === 'thin'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    Thin (1 block)
                  </button>
                  <button
                    onClick={() => setCircleType('thick')}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      circleType === 'thick'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    Thick
                  </button>
                  <button
                    onClick={() => setCircleType('filled')}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      circleType === 'filled'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    Filled
                  </button>
                </div>
              </div>

              {/* Thickness - only show for thick type */}
              {circleType === 'thick' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thickness
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      placeholder="Thickness"
                      min="1"
                      max={Math.floor((parseInt(diameter) || 15) / 2)}
                    />
                    <span className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">blocks</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Wall thickness for hollow circles</p>
                </div>
              )}

              {/* Show Grid Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Show Grid Lines</label>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showGrid ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      showGrid ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Circle Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Circle className="w-5 h-5 mr-2" />
              Circle Preview
            </h2>
            <div className="flex items-center gap-4 text-white">
              <span className="text-sm">
                <strong>{blockCount}</strong> blocks needed
              </span>
            </div>
          </div>

          <div className="p-6">
            {parseInt(diameter) >= 3 ? (
              <div className="overflow-auto">
                <div
                  className="mx-auto"
                  style={{
                    width: gridSize * cellSize + 2,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
                    gap: showGrid ? '1px' : '0px',
                    backgroundColor: showGrid ? '#e5e7eb' : 'transparent',
                    border: showGrid ? '1px solid #e5e7eb' : 'none',
                  }}
                >
                  {grid.map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`
                          ${cell ? 'bg-emerald-500' : showGrid ? 'bg-gray-50' : 'bg-transparent'}
                          ${cell?.isEdge ? 'bg-emerald-600' : ''}
                          transition-colors
                        `}
                        style={{
                          width: cellSize,
                          height: cellSize,
                        }}
                        title={cell ? `Block at (${x}, ${y})` : `Empty (${x}, ${y})`}
                      />
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Circle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Enter a diameter of at least 3 blocks to generate a circle</p>
              </div>
            )}

            {/* Stats */}
            {parseInt(diameter) >= 3 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">Diameter</p>
                  <p className="text-2xl font-bold text-emerald-700">{diameter}</p>
                  <p className="text-xs text-gray-500">blocks</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">Radius</p>
                  <p className="text-2xl font-bold text-green-700">{((parseInt(diameter) || 0) / 2).toFixed(1)}</p>
                  <p className="text-xs text-gray-500">blocks</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">Blocks Needed</p>
                  <p className="text-2xl font-bold text-teal-700">{blockCount}</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-2xl font-bold text-cyan-700 capitalize">{circleType}</p>
                  <p className="text-xs text-gray-500">circle</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Reference Circles */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Quick Reference - Common Circle Sizes</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[5, 7, 9, 11, 13, 15, 17, 19, 21, 25, 31, 41].map((size) => (
                <button
                  key={size}
                  onClick={() => setDiameter(size.toString())}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    parseInt(diameter) === size
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Square className="w-5 h-5 mr-2 text-emerald-600" />
              How to Build Circles in Minecraft
            </h3>
            {showHowTo ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showHowTo && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">Step 1: Plan Your Circle</h4>
                <p className="text-sm text-gray-700">
                  Enter your desired diameter above to generate the circle template. Each colored square represents one block you need to place.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Step 2: Mark the Center</h4>
                <p className="text-sm text-gray-700">
                  In Minecraft, place a marker block at the center of where you want your circle. For odd diameters, the center is a single block. For even diameters, the center is between four blocks.
                </p>
              </div>

              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                <h4 className="font-semibold text-teal-800 mb-2">Step 3: Build One Quadrant</h4>
                <p className="text-sm text-gray-700">
                  Start from the center and build one quarter of the circle following the template. Then mirror it to complete the other three quadrants.
                </p>
              </div>

              <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                <h4 className="font-semibold text-cyan-800 mb-2">Pro Tip: Use Scaffolding</h4>
                <p className="text-sm text-gray-700">
                  For large circles, use scaffolding or temporary blocks to help you count and position blocks accurately. Remove them after completing the circle.
                </p>
              </div>
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
              <Info className="w-5 h-5 mr-2 text-emerald-600" />
              How the Algorithm Works
            </h3>
            {showFormula ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showFormula && (
            <div className="px-6 pb-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Midpoint Circle Algorithm</h4>
                <p className="text-sm text-gray-700 mb-3">
                  This generator uses a variation of the Midpoint Circle Algorithm (also known as Bresenham&apos;s Circle Algorithm) to determine which blocks should be placed.
                </p>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>For each point (x, y) in the grid:</p>
                  <p className="mt-1">distance = √((x - center)² + (y - center)²)</p>
                  <p className="mt-1">If distance ≤ radius → place block</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Why Perfect Circles Are Impossible</h4>
                <p className="text-sm text-gray-700">
                  In Minecraft&apos;s block-based world, true circles cannot exist because the game uses a voxel (3D pixel) system. Each block is a 1×1×1 cube, so we can only approximate circles by deciding which blocks are &quot;close enough&quot; to the mathematical circle&apos;s edge.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Block Count Estimation</h4>
                <div className="bg-white rounded-lg p-3 font-mono text-sm">
                  <p>Thin circle: ~π × diameter blocks</p>
                  <p className="mt-1">Filled circle: ~π × (diameter/2)² blocks</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Circle className="w-6 h-6 mr-2 text-emerald-600" />
              About Minecraft Circles
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Use a Circle Generator?</h3>
                <p>
                  Building circular structures in Minecraft can be challenging because the game&apos;s world is made entirely of cubic blocks. A circle generator helps you visualize exactly where to place each block to create the most circular shape possible at any given size.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Common Uses for Minecraft Circles</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Towers:</strong> Create round tower bases and floors</li>
                  <li><strong>Domes:</strong> Stack circles of decreasing size to build domes</li>
                  <li><strong>Arenas:</strong> Design circular PvP arenas or coliseums</li>
                  <li><strong>Fountains:</strong> Build decorative water features</li>
                  <li><strong>Lighthouses:</strong> Classic cylindrical lighthouse structures</li>
                  <li><strong>Pixel Art:</strong> Create circular shapes in 2D pixel art</li>
                  <li><strong>Crop Circles:</strong> Design circular farm layouts</li>
                  <li><strong>Wheels:</strong> Build decorative wheels or gears</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tips for Better Circles</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <h4 className="font-semibold text-emerald-800">Use Odd Diameters</h4>
                    <p className="text-sm text-gray-600 mt-1">Odd-numbered diameters (5, 7, 9, etc.) have a clear center block, making them easier to build symmetrically.</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800">Larger = Smoother</h4>
                    <p className="text-sm text-gray-600 mt-1">Bigger circles appear smoother because the &quot;steps&quot; between blocks are less noticeable proportionally.</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <h4 className="font-semibold text-teal-800">Build From Inside</h4>
                    <p className="text-sm text-gray-600 mt-1">When building hollow circles, start from the inside edge to maintain accuracy.</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <h4 className="font-semibold text-cyan-800">Check Symmetry</h4>
                    <p className="text-sm text-gray-600 mt-1">Regularly check your build from above to ensure all quadrants match perfectly.</p>
                  </div>
                </div>
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
                q: 'Can you make a perfect circle in Minecraft?',
                a: 'No, it\'s impossible to create a mathematically perfect circle in vanilla Minecraft because the game uses cubic blocks. However, you can approximate circles very closely, especially with larger diameters where the block "steps" are less noticeable.'
              },
              {
                q: 'What\'s the best diameter for a Minecraft circle?',
                a: 'Odd-numbered diameters (like 7, 11, 15, 21) are generally easier to build because they have a clear center block. Larger diameters (15+) also look smoother. For towers, 7-15 blocks is a good starting range.'
              },
              {
                q: 'How do I build a dome in Minecraft?',
                a: 'To build a dome, generate circles of decreasing diameter and stack them on top of each other. Start with your base circle, then place progressively smaller circles above it until you reach the top. Use half the diameter as your height for a hemisphere.'
              },
              {
                q: 'How do I build a sphere in Minecraft?',
                a: 'A sphere is built by stacking circles that increase in size to the middle, then decrease. Generate circles from diameter 1 up to your max diameter at the equator, then back down to 1. Each layer is one block tall.'
              },
              {
                q: 'What\'s the difference between thin and thick circles?',
                a: 'A thin circle is only 1 block thick, creating a ring outline. A thick circle has multiple layers of blocks, creating a wall. Thick circles are better for structures like castle towers where you need walkable walls.'
              },
              {
                q: 'How many blocks do I need for a circle?',
                a: 'For a thin hollow circle, you need approximately π × diameter blocks. For a filled circle, you need approximately π × (radius)² blocks. The exact count varies slightly due to the block grid.'
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
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 sm:p-8 border border-emerald-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Circle Area Calculator', href: '/calculators/circle-area-calculator', desc: 'Calculate circle area' },
              { name: 'Circumference Calculator', href: '/calculators/circumference-calculator', desc: 'Find circle circumference' },
              { name: 'Square Footage Calculator', href: '/calculators/square-footage-calculator', desc: 'Calculate area in sq ft' },
              { name: 'Cylinder Volume Calculator', href: '/calculators/cylinder-volume-calculator', desc: 'Volume of cylinders' },
              { name: 'Tank Volume Calculator', href: '/calculators/tank-volume-calculator', desc: 'Calculate tank capacity' },
              { name: 'Cubic Yards Calculator', href: '/calculators/cubic-yards-calculator', desc: 'Volume calculations' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-emerald-200" />
          <h2 className="text-2xl font-bold mb-3">Need Help with Geometry?</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Our expert tutors can help you understand circles, geometry, and mathematical concepts for gaming and beyond!
          </p>
          <Link
            href="/tutoring/free-consultation"
            className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Book Your Free Session
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Minecraft Circle Generator',
            description: 'Free Minecraft circle generator to create perfect pixel circles for your builds. Generate circles and ovals with customizable diameter and thickness.',
            url: 'https://www.thetutorbridge.com/calculators/minecraft-circle-generator',
            applicationCategory: 'GameApplication',
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
