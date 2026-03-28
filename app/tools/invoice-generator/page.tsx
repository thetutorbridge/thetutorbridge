'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function InvoiceGeneratorPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: '', price: '' }]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: '', price: '' }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      return sum + (qty * price);
    }, 0).toFixed(2);
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <div className="bg-gray-50 py-4 px-6 print:hidden">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/tools" className="text-[#1A3D7C] hover:text-[#2BAE66]">
              Tools
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Invoice Generator</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 print:bg-white print:py-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 print:hidden">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Invoice Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Create professional invoices
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 print:shadow-none print:rounded-none">
            <div className="mb-6 print:mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">INVOICE</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                  <textarea
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Your name/company&#10;Address&#10;Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bill To</label>
                  <textarea
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Client name&#10;Address&#10;Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="INV-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-gray-900 print:border-none print:p-0"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Description</th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 w-24">Qty</th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 w-32">Price</th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700 w-32">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          placeholder="Item description"
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-sm text-gray-900 print:border-none print:p-0"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          placeholder="1"
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-sm text-gray-900 print:border-none print:p-0"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:border-[#2BAE66] focus:outline-none text-sm text-gray-900 print:border-none print:p-0"
                        />
                      </td>
                      <td className="py-2 px-2 text-right text-sm text-gray-900">
                        ${((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={addItem}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all text-sm font-semibold print:hidden"
              >
                Add Item
              </button>
            </div>

            <div className="flex justify-end mb-6">
              <div className="w-64">
                <div className="flex justify-between py-2 border-t-2 border-gray-300">
                  <span className="font-bold text-gray-900">TOTAL:</span>
                  <span className="font-bold text-gray-900 text-xl">${calculateTotal()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={printInvoice}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white rounded-lg font-bold text-lg hover:from-[#153162] hover:to-[#229554] transition-all shadow-lg print:hidden"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
