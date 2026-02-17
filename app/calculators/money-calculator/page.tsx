'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Coins as CoinsIcon, Calculator, Info } from 'lucide-react';

interface MoneyResult {
  totalNotes: number;
  totalNotesValue: number;
  totalCoins: number;
  totalCoinsValue: number;
  grandTotal: number;
  notesBreakdown: { value: number; quantity: number; total: number }[];
  coinsBreakdown: { value: number; quantity: number; total: number }[];
}

export default function MoneyCalculatorPage() {
  const [currency, setCurrency] = useState('USD');
  const [countBanknotes, setCountBanknotes] = useState(true);
  const [countCoins, setCountCoins] = useState(true);
  const [countRolledCoins, setCountRolledCoins] = useState(false);

  // Banknotes
  const [note1, setNote1] = useState('');
  const [note2, setNote2] = useState('');
  const [note5, setNote5] = useState('');
  const [note10, setNote10] = useState('');
  const [note20, setNote20] = useState('');
  const [note50, setNote50] = useState('');
  const [note100, setNote100] = useState('');

  // Coins
  const [coin1c, setCoin1c] = useState('');
  const [coin5c, setCoin5c] = useState('');
  const [coin10c, setCoin10c] = useState('');
  const [coin25c, setCoin25c] = useState('');
  const [coin50c, setCoin50c] = useState('');
  const [coin1d, setCoin1d] = useState('');

  const [result, setResult] = useState<MoneyResult | null>(null);

  const clearInputs = () => {
    setNote1('');
    setNote2('');
    setNote5('');
    setNote10('');
    setNote20('');
    setNote50('');
    setNote100('');
    setCoin1c('');
    setCoin5c('');
    setCoin10c('');
    setCoin25c('');
    setCoin50c('');
    setCoin1d('');
    setResult(null);
  };

  const calculateMoney = () => {
    const notesBreakdown: { value: number; quantity: number; total: number }[] = [];
    const coinsBreakdown: { value: number; quantity: number; total: number }[] = [];

    let totalNotesValue = 0;
    let totalNotesCount = 0;
    let totalCoinsValue = 0;
    let totalCoinsCount = 0;

    // Calculate notes
    if (countBanknotes) {
      const notes = [
        { value: 1, quantity: parseFloat(note1) || 0 },
        { value: 2, quantity: parseFloat(note2) || 0 },
        { value: 5, quantity: parseFloat(note5) || 0 },
        { value: 10, quantity: parseFloat(note10) || 0 },
        { value: 20, quantity: parseFloat(note20) || 0 },
        { value: 50, quantity: parseFloat(note50) || 0 },
        { value: 100, quantity: parseFloat(note100) || 0 },
      ];

      notes.forEach(note => {
        if (note.quantity > 0) {
          const total = note.value * note.quantity;
          notesBreakdown.push({ value: note.value, quantity: note.quantity, total });
          totalNotesValue += total;
          totalNotesCount += note.quantity;
        }
      });
    }

    // Calculate coins
    if (countCoins) {
      const coins = [
        { value: 0.01, quantity: parseFloat(coin1c) || 0 },
        { value: 0.05, quantity: parseFloat(coin5c) || 0 },
        { value: 0.10, quantity: parseFloat(coin10c) || 0 },
        { value: 0.25, quantity: parseFloat(coin25c) || 0 },
        { value: 0.50, quantity: parseFloat(coin50c) || 0 },
        { value: 1.00, quantity: parseFloat(coin1d) || 0 },
      ];

      coins.forEach(coin => {
        if (coin.quantity > 0) {
          const total = coin.value * coin.quantity;
          coinsBreakdown.push({ value: coin.value, quantity: coin.quantity, total });
          totalCoinsValue += total;
          totalCoinsCount += coin.quantity;
        }
      });
    }

    const grandTotal = totalNotesValue + totalCoinsValue;

    setResult({
      totalNotes: totalNotesCount,
      totalNotesValue: totalNotesValue,
      totalCoins: totalCoinsCount,
      totalCoinsValue: totalCoinsValue,
      grandTotal: grandTotal,
      notesBreakdown: notesBreakdown,
      coinsBreakdown: coinsBreakdown,
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What denominations of US currency are currently in circulation?","acceptedAnswer":{"@type":"Answer","text":"The US currently circulates bills in $1, $2, $5, $10, $20, $50, and $100 denominations. Coins include 1¢ (penny), 5¢ (nickel), 10¢ (dime), 25¢ (quarter), 50¢ (half dollar), and $1 (dollar coin). While $2 bills, half dollars, and dollar coins are legal tender, they\'re rarely seen in everyday transactions."}}]}' }}
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A3D7C] to-[#2BAE66] rounded-full mb-6">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3D7C] mb-4">
              Money Calculator
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Count and calculate the total value of banknotes, coins, and rolled coins with detailed denomination breakdown
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border-2 border-gray-200">
            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-4 px-6 rounded-lg mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">Money Counting Calculator</h2>
            </div>

            {/* Currency Selection */}
            <div className="mb-6">
              <Label className="text-lg font-semibold text-gray-700 mb-2 block">Currency:</Label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full md:w-64 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>

            {/* Count Options */}
            <div className="mb-8">
              <Label className="text-lg font-semibold text-gray-700 mb-3 block">Count:</Label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={countBanknotes}
                    onChange={(e) => setCountBanknotes(e.target.checked)}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded"
                  />
                  <span className="ml-3 text-lg text-gray-700">Banknotes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={countCoins}
                    onChange={(e) => setCountCoins(e.target.checked)}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded"
                  />
                  <span className="ml-3 text-lg text-gray-700">Coins</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={countRolledCoins}
                    onChange={(e) => setCountRolledCoins(e.target.checked)}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded"
                  />
                  <span className="ml-3 text-lg text-gray-700">Rolled Coins</span>
                </label>
              </div>
            </div>

            {/* Banknotes Section */}
            {countBanknotes && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Notes - How Many?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 1</Label>
                    <Input
                      type="number"
                      value={note1}
                      onChange={(e) => setNote1(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 2</Label>
                    <Input
                      type="number"
                      value={note2}
                      onChange={(e) => setNote2(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 5</Label>
                    <Input
                      type="number"
                      value={note5}
                      onChange={(e) => setNote5(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 10</Label>
                    <Input
                      type="number"
                      value={note10}
                      onChange={(e) => setNote10(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 20</Label>
                    <Input
                      type="number"
                      value={note20}
                      onChange={(e) => setNote20(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 50</Label>
                    <Input
                      type="number"
                      value={note50}
                      onChange={(e) => setNote50(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 100</Label>
                    <Input
                      type="number"
                      value={note100}
                      onChange={(e) => setNote100(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Coins Section */}
            {countCoins && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Coins - How Many?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">1 ¢</Label>
                    <Input
                      type="number"
                      value={coin1c}
                      onChange={(e) => setCoin1c(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">5 ¢</Label>
                    <Input
                      type="number"
                      value={coin5c}
                      onChange={(e) => setCoin5c(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">10 ¢</Label>
                    <Input
                      type="number"
                      value={coin10c}
                      onChange={(e) => setCoin10c(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">25 ¢</Label>
                    <Input
                      type="number"
                      value={coin25c}
                      onChange={(e) => setCoin25c(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">50 ¢</Label>
                    <Input
                      type="number"
                      value={coin50c}
                      onChange={(e) => setCoin50c(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-700 mb-2 block">$ 1</Label>
                    <Input
                      type="number"
                      value={coin1d}
                      onChange={(e) => setCoin1d(e.target.value)}
                      placeholder="0"
                      className="text-lg"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <Button
                onClick={clearInputs}
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-gray-400 hover:bg-gray-100"
              >
                Clear
              </Button>
              <Button
                onClick={calculateMoney}
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] hover:from-[#15325f] hover:to-[#239654] text-white"
              >
                Calculate
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Answer:</h3>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-green-700">
                      Total Money = $ {result.grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Calculations Breakdown */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Calculations</h3>

                  {/* Banknotes Breakdown */}
                  {result.notesBreakdown.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">Banknotes</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-gray-300">
                              <th className="text-left py-2 px-4 font-semibold text-gray-700">Value</th>
                              <th className="text-center py-2 px-4 font-semibold text-gray-700">Quantity</th>
                              <th className="text-right py-2 px-4 font-semibold text-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.notesBreakdown.map((note, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="py-3 px-4 text-left">$ {note.value}</td>
                                <td className="py-3 px-4 text-center">× {note.quantity}</td>
                                <td className="py-3 px-4 text-right font-semibold">= $ {note.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t-2 border-gray-300 bg-gray-50">
                              <td className="py-3 px-4 font-bold text-gray-800">Total Notes</td>
                              <td className="py-3 px-4 text-center font-bold text-gray-800">{result.totalNotes}</td>
                              <td className="py-3 px-4 text-right font-bold text-gray-800">$ {result.totalNotesValue.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Coins Breakdown */}
                  {result.coinsBreakdown.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">Coins</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-gray-300">
                              <th className="text-left py-2 px-4 font-semibold text-gray-700">Value</th>
                              <th className="text-center py-2 px-4 font-semibold text-gray-700">Quantity</th>
                              <th className="text-right py-2 px-4 font-semibold text-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.coinsBreakdown.map((coin, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="py-3 px-4 text-left">$ {coin.value.toFixed(2)}</td>
                                <td className="py-3 px-4 text-center">× {coin.quantity}</td>
                                <td className="py-3 px-4 text-right font-semibold">= $ {coin.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t-2 border-gray-300 bg-gray-50">
                              <td className="py-3 px-4 font-bold text-gray-800">Total Coins</td>
                              <td className="py-3 px-4 text-center font-bold text-gray-800">{result.totalCoins}</td>
                              <td className="py-3 px-4 text-right font-bold text-gray-800">$ {result.totalCoinsValue.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-6 mt-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Grand Total</h4>
                    <div className="text-center space-y-2">
                      {result.notesBreakdown.length > 0 && (
                        <p className="text-lg text-gray-700">{result.totalNotesValue.toFixed(2)}</p>
                      )}
                      {result.coinsBreakdown.length > 0 && (
                        <p className="text-lg text-gray-700">+ {result.totalCoinsValue.toFixed(2)}</p>
                      )}
                      <div className="border-t-2 border-gray-400 pt-2">
                        <p className="text-2xl font-bold text-blue-700">= {result.grandTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6 flex items-center">
              <Calculator className="mr-3 h-8 w-8 text-[#2BAE66]" />
              What is a Money Calculator?
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                A <strong>money calculator</strong> is a practical tool designed to help you count and calculate the total value of cash, including banknotes, coins, and rolled coins. It automatically calculates the sum of different denominations and provides a detailed breakdown of your money count.
              </p>
              <p className="text-lg">
                Whether you're counting cash from a business day, organizing your savings, preparing a bank deposit, or managing a cash register, a money calculator simplifies the process and reduces counting errors. It's an essential tool for retailers, cashiers, accountants, small business owners, and anyone who handles physical currency regularly.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">How to Use the Money Calculator</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <ol className="space-y-4 text-lg list-decimal list-inside">
                <li><strong>Select Currency:</strong> Choose the currency you're counting (currently USD is supported)</li>
                <li><strong>Choose Count Options:</strong> Check the boxes for what you want to count:
                  <ul className="ml-8 mt-2 space-y-1 list-disc list-inside">
                    <li>Banknotes - Count paper money</li>
                    <li>Coins - Count loose coins</li>
                    <li>Rolled Coins - Count coin rolls (future feature)</li>
                  </ul>
                </li>
                <li><strong>Enter Quantities:</strong> For each denomination you have, enter the quantity (how many bills or coins)</li>
                <li><strong>Calculate:</strong> Click the "Calculate" button to get your total</li>
                <li><strong>View Results:</strong> See the grand total and detailed breakdown by denomination</li>
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">US Dollar Denominations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Banknotes (Bills)</h3>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$1</span> - One Dollar Bill
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$2</span> - Two Dollar Bill (rare)
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$5</span> - Five Dollar Bill
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$10</span> - Ten Dollar Bill
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$20</span> - Twenty Dollar Bill
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$50</span> - Fifty Dollar Bill
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$100</span> - One Hundred Dollar Bill
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Coins</h3>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">1¢</span> - Penny (One Cent)
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">5¢</span> - Nickel (Five Cents)
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">10¢</span> - Dime (Ten Cents)
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">25¢</span> - Quarter (Twenty-Five Cents)
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">50¢</span> - Half Dollar (Fifty Cents, rare)
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">$1</span> - Dollar Coin (rare in circulation)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Money Counting Formula</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="text-lg">
                The basic formula for counting money is straightforward:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-xl font-semibold text-center mb-4">
                  <strong>Total Value = Σ (Denomination Value × Quantity)</strong>
                </p>
                <p className="text-center text-lg">
                  Sum of (each denomination's value multiplied by its quantity)
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mt-6">Step-by-Step Calculation:</h3>
              <ol className="space-y-3 text-lg list-decimal list-inside">
                <li><strong>Separate denominations:</strong> Sort bills and coins by denomination</li>
                <li><strong>Count each denomination:</strong> Count how many of each bill or coin you have</li>
                <li><strong>Multiply:</strong> For each denomination, multiply the value by the quantity
                  <div className="ml-8 mt-2 text-base">
                    Example: 5 twenty-dollar bills = $20 × 5 = $100
                  </div>
                </li>
                <li><strong>Sum all values:</strong> Add up all the products from step 3</li>
                <li><strong>Get total:</strong> The sum is your total money value</li>
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Money Counting Examples</h2>
            <div className="space-y-8">
              {/* Example 1 */}
              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 1: Counting Bills Only</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Problem:</strong> Count 3 five-dollar bills, 2 ten-dollar bills, and 1 twenty-dollar bill
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800">
                  <p className="mb-2"><strong>Solution:</strong></p>
                  <p>• $5 bills: $5 × 3 = $15</p>
                  <p>• $10 bills: $10 × 2 = $20</p>
                  <p>• $20 bills: $20 × 1 = $20</p>
                  <p className="mt-3 pt-3 border-t-2 border-gray-300 font-bold">
                    Total = $15 + $20 + $20 = $55
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 2: Counting Coins Only</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Problem:</strong> Count 12 quarters, 8 dimes, and 15 nickels
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800">
                  <p className="mb-2"><strong>Solution:</strong></p>
                  <p>• Quarters (25¢): $0.25 × 12 = $3.00</p>
                  <p>• Dimes (10¢): $0.10 × 8 = $0.80</p>
                  <p>• Nickels (5¢): $0.05 × 15 = $0.75</p>
                  <p className="mt-3 pt-3 border-t-2 border-gray-300 font-bold">
                    Total = $3.00 + $0.80 + $0.75 = $4.55
                  </p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 3: Mixed Bills and Coins</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Problem:</strong> Count 2 twenty-dollar bills, 1 ten-dollar bill, 5 quarters, and 10 dimes
                </p>
                <div className="bg-white p-4 rounded-lg text-gray-800">
                  <p className="mb-2"><strong>Solution:</strong></p>
                  <p className="font-semibold">Bills:</p>
                  <p>• $20 bills: $20 × 2 = $40</p>
                  <p>• $10 bills: $10 × 1 = $10</p>
                  <p className="mt-2 font-semibold">Coins:</p>
                  <p>• Quarters: $0.25 × 5 = $1.25</p>
                  <p>• Dimes: $0.10 × 10 = $1.00</p>
                  <p className="mt-3 pt-3 border-t-2 border-gray-300">
                    Total Bills = $40 + $10 = $50<br />
                    Total Coins = $1.25 + $1.00 = $2.25
                  </p>
                  <p className="mt-3 pt-3 border-t-2 border-gray-300 font-bold">
                    Grand Total = $50 + $2.25 = $52.25
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Common Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <DollarSign className="mr-2 h-6 w-6 text-blue-600" />
                  Retail & Business
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cash register balancing</li>
                  <li>• End-of-day till counting</li>
                  <li>• Bank deposit preparation</li>
                  <li>• Petty cash management</li>
                  <li>• Change fund verification</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <CoinsIcon className="mr-2 h-6 w-6 text-green-600" />
                  Personal Finance
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Counting savings at home</li>
                  <li>• Organizing piggy bank money</li>
                  <li>• Preparing garage sale change</li>
                  <li>• Coin jar totaling</li>
                  <li>• Cash gift counting</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Calculator className="mr-2 h-6 w-6 text-purple-600" />
                  Events & Fundraising
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Counting event ticket sales</li>
                  <li>• Charity donation totaling</li>
                  <li>• Bake sale revenue</li>
                  <li>• Fundraiser cash collection</li>
                  <li>• Concession stand counting</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Info className="mr-2 h-6 w-6 text-orange-600" />
                  Educational
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Teaching kids about money</li>
                  <li>• Learning coin values</li>
                  <li>• Math practice with currency</li>
                  <li>• Financial literacy training</li>
                  <li>• Money counting exercises</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Tips for Accurate Money Counting</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Sort First:</strong> Separate bills by denomination and coins by type before counting
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Count Twice:</strong> Always count your money at least twice to verify accuracy
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Use Flat Surface:</strong> Count on a clean, flat surface to prevent losing bills or coins
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Stack Bills:</strong> Stack bills facing the same direction in consistent piles (often groups of 10 or 20)
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Roll Coins:</strong> For large quantities of coins, use coin rolls or wrappers to organize and count
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Minimize Distractions:</strong> Count in a quiet environment to maintain concentration
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Write It Down:</strong> Keep a running tally as you count each denomination
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3 text-[#2BAE66]">✓</span>
                <div>
                  <strong>Check for Counterfeits:</strong> Examine bills for authenticity, especially larger denominations
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Coin Roll Values</h2>
            <p className="text-lg text-gray-700 mb-6">
              When coins are rolled in paper wrappers, each roll contains a specific number of coins and value:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white">
                    <th className="border border-gray-300 px-6 py-3 text-left">Coin Type</th>
                    <th className="border border-gray-300 px-6 py-3 text-center">Coins per Roll</th>
                    <th className="border border-gray-300 px-6 py-3 text-right">Roll Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">Penny (1¢)</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">50</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">$0.50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">Nickel (5¢)</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">40</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">$2.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">Dime (10¢)</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">50</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">$5.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">Quarter (25¢)</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">40</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">$10.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">Half Dollar (50¢)</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">20</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">$10.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-3">Dollar ($1)</td>
                    <td className="border border-gray-300 px-6 py-3 text-center">25</td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold">$25.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Money Counting in Different Contexts</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Cash Register Management</h3>
                <p className="text-lg text-gray-700">
                  Retail businesses start each day with a cash drawer containing a predetermined "change fund" or "starting float." At the end of the day, cashiers count all money in the drawer, subtract the starting amount, and the remainder is the day's sales. Using a money calculator ensures accurate end-of-shift reporting and helps identify discrepancies quickly.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Bank Deposits</h3>
                <p className="text-lg text-gray-700">
                  When preparing bank deposits, businesses must provide a detailed breakdown of cash by denomination. Banks often require deposit slips showing the count of each bill denomination and total coin values. A money calculator generates this breakdown automatically, making deposit preparation faster and more accurate.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Charity and Fundraising</h3>
                <p className="text-lg text-gray-700">
                  Organizations collecting cash donations need accurate counting for transparency and reporting. Whether it's a charity collection box, fundraising event, or donation drive, a money calculator helps volunteers quickly tally contributions and provide donors with accurate acknowledgments.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Financial Education</h3>
                <p className="text-lg text-gray-700">
                  Money calculators serve as excellent teaching tools for children and adults learning about currency, denominations, and basic financial math. They provide immediate feedback and help learners understand how different coins and bills combine to create specific amounts.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#1A3D7C] mb-6">Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What denominations of US currency are currently in circulation?
                </h3>
                <p className="text-gray-700">
                  The US currently circulates bills in $1, $2, $5, $10, $20, $50, and $100 denominations. Coins include 1¢ (penny), 5¢ (nickel), 10¢ (dime), 25¢ (quarter), 50¢ (half dollar), and $1 (dollar coin). While $2 bills, half dollars, and dollar coins are legal tender, they're rarely seen in everyday transactions.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How do I count large amounts of cash efficiently?
                </h3>
                <p className="text-gray-700">
                  Start by sorting bills by denomination. Count bills in stacks of 10 or 20 for easier tracking. For coins, sort by type and consider using coin rolls or a coin sorting tray. Use a money calculator to input your counts and get an instant total, which is much faster and more accurate than manual addition.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What should I do if my cash count doesn't match the expected amount?
                </h3>
                <p className="text-gray-700">
                  First, recount everything carefully. Sort all bills and coins again and use the calculator to recalculate. Check for bills stuck together, coins that fell, or misplaced denominations. Review all transactions if you're balancing a register. If there's still a discrepancy, document it and investigate possible errors in transaction recording or handling.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Can I use this calculator for other currencies?
                </h3>
                <p className="text-gray-700">
                  This calculator is currently designed for US Dollar (USD) denominations. Different currencies have different denominations and coin/bill types. The principle of counting remains the same: multiply each denomination by its quantity and sum the results. Future versions may support additional currencies.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How many coins are in a standard coin roll?
                </h3>
                <p className="text-gray-700">
                  Standard coin rolls contain: 50 pennies ($0.50), 40 nickels ($2.00), 50 dimes ($5.00), 40 quarters ($10.00), 20 half dollars ($10.00), and 25 dollar coins ($25.00). These standard quantities are used by banks and coin-rolling machines across the United States.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Is there a limit to how much money I can count with this calculator?
                </h3>
                <p className="text-gray-700">
                  No, there's no practical limit. You can enter any quantity for each denomination. The calculator will accurately compute totals for small personal amounts or large business cash counts. However, for extremely large sums, you may want to count in batches and record subtotals.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Should I count damaged or torn bills?
                </h3>
                <p className="text-gray-700">
                  Yes, damaged bills that are clearly identifiable and more than 50% intact are still legal tender and should be counted. However, you may want to set aside severely damaged bills to exchange at a bank. Banks can submit damaged currency to the Bureau of Engraving and Printing for replacement.
                </p>
              </div>
              <div className="border-l-4 border-[#2BAE66] pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Why is accurate money counting important for businesses?
                </h3>
                <p className="text-gray-700">
                  Accurate money counting is crucial for financial integrity, preventing theft or errors, ensuring proper bank deposits, maintaining customer trust, complying with accounting requirements, and managing cash flow. Discrepancies can indicate problems ranging from simple mistakes to serious issues like theft or fraud, making accurate counting an essential business practice.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-[#1A3D7C] mb-4">Why Use Our Money Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Fast & Accurate:</strong> Instant calculations with no arithmetic errors</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Detailed Breakdown:</strong> See value-by-denomination totals</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Free to Use:</strong> No registration or payment required</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Mobile Friendly:</strong> Works on phones, tablets, and computers</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Professional Results:</strong> Perfect for business and personal use</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2BAE66] mr-3 text-2xl">✓</span>
                <span><strong>Easy to Use:</strong> Simple interface, no learning curve</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
