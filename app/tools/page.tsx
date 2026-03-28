import Link from 'next/link';
import { Home, Clock, Type, Lock, Dices, CaseSensitive, ArrowRight, Zap, Shield, Sparkles, Calendar, DollarSign, Thermometer, FileText, Ruler, User, Hash, Code, Palette, Globe, Repeat, ArrowLeftRight, FileJson, Key, Link as LinkIcon, Code2, QrCode, Percent, HeartPulse, Tag, Scale, Calculator, Timer, GitCompare, FileCode, FileSpreadsheet, Binary, Hash as HashIcon, Clock as ClockIcon, Palette as PaletteIcon, Box, Minimize, Database, Image, Barcode } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const tools = [
  {
    name: 'Timer & Stopwatch',
    slug: 'timer',
    icon: Clock,
    description: 'Free online timer and stopwatch. Perfect for workouts, cooking, studying, and Pomodoro technique. Set custom timers or track time with millisecond precision.',
    color: 'from-blue-500 to-blue-600',
    traffic: '15M+',
    features: ['Countdown Timer', 'Stopwatch', 'Audio Alerts', 'Preset Buttons'],
  },
  {
    name: 'Character Counter',
    slug: 'character-counter',
    icon: Type,
    description: 'Count characters, words, sentences, and paragraphs instantly. Real-time text analysis perfect for essays, social media posts, and content writing.',
    color: 'from-green-500 to-green-600',
    traffic: '3.5M+',
    features: ['Character Count', 'Word Count', 'Reading Time', 'Social Media Limits'],
  },
  {
    name: 'Password Generator',
    slug: 'password-generator',
    icon: Lock,
    description: 'Create strong, secure random passwords instantly. Customize length and character types. 100% secure - generated locally in your browser.',
    color: 'from-purple-500 to-purple-600',
    traffic: '5M+',
    features: ['Secure Passwords', 'Strength Meter', 'Customizable', '100% Private'],
  },
  {
    name: 'Random Number Generator',
    slug: 'random-number-generator',
    icon: Dices,
    description: 'Generate random numbers with custom ranges. Perfect for lottery, dice rolls, games, and statistical sampling. True randomness guaranteed.',
    color: 'from-orange-500 to-orange-600',
    traffic: '3M+',
    features: ['Custom Range', 'Multiple Numbers', 'Quick Presets', 'History Tracking'],
  },
  {
    name: 'Case Converter',
    slug: 'case-converter',
    icon: CaseSensitive,
    description: 'Convert text to uppercase, lowercase, title case, sentence case, and more. 7 conversion types for writers, programmers, and editors.',
    color: 'from-pink-500 to-pink-600',
    traffic: '500k+',
    features: ['7 Case Types', 'Real-time Preview', 'Copy or Apply', 'Instant Results'],
  },
  {
    name: 'Age Calculator',
    slug: 'age-calculator',
    icon: Calendar,
    description: 'Calculate your exact age in years, months, days, weeks, and hours. Find days until next birthday. Perfect for documents and age verification.',
    color: 'from-teal-500 to-teal-600',
    traffic: '3M+',
    features: ['Exact Age', 'Birthday Countdown', 'Total Days/Weeks', 'Detailed Breakdown'],
  },
  {
    name: 'Date Calculator',
    slug: 'date-calculator',
    icon: Calendar,
    description: 'Add or subtract days, weeks, months, and years from any date. Quick presets for common calculations. Perfect for project planning.',
    color: 'from-indigo-500 to-indigo-600',
    traffic: '2.5M+',
    features: ['Add/Subtract Time', 'Quick Presets', 'Custom Calculations', 'Future & Past Dates'],
  },
  {
    name: 'Days Between Dates',
    slug: 'days-between-dates',
    icon: Calendar,
    description: 'Calculate the exact number of days, weeks, and months between two dates. Includes weekday and weekend analysis.',
    color: 'from-cyan-500 to-cyan-600',
    traffic: '2M+',
    features: ['Date Difference', 'Weekday Count', 'Multiple Units', 'Detailed Stats'],
  },
  {
    name: 'Tip Calculator',
    slug: 'tip-calculator',
    icon: DollarSign,
    description: 'Calculate restaurant tips and split bills easily. Quick tip percentages (10-25%) or custom amounts. Perfect for dining out.',
    color: 'from-emerald-500 to-emerald-600',
    traffic: '1.5M+',
    features: ['Tip Percentages', 'Bill Splitting', 'Custom Amounts', 'Total Summary'],
  },
  {
    name: 'Temperature Converter',
    slug: 'temperature-converter',
    icon: Thermometer,
    description: 'Convert between Celsius, Fahrenheit, and Kelvin instantly. Includes common temperature references and conversion formulas.',
    color: 'from-red-500 to-red-600',
    traffic: '1.5M+',
    features: ['3 Temperature Scales', 'Common Temps', 'Conversion Formulas', 'Instant Conversion'],
  },
  {
    name: 'Word Counter',
    slug: 'word-counter',
    icon: FileText,
    description: 'Count words, characters, sentences, and paragraphs instantly. Includes reading time estimates and common word count limits.',
    color: 'from-lime-500 to-lime-600',
    traffic: '1.5M+',
    features: ['Word Count', 'Character Count', 'Reading Time', 'Text Statistics'],
  },
  {
    name: 'Length Converter',
    slug: 'length-converter',
    icon: Ruler,
    description: 'Convert between metric and imperial length units. Includes mm, cm, m, km, inches, feet, yards, and miles.',
    color: 'from-yellow-500 to-yellow-600',
    traffic: '1.2M+',
    features: ['8 Length Units', 'Metric & Imperial', 'Common Conversions', 'Instant Results'],
  },
  {
    name: 'Random Name Generator',
    slug: 'random-name-generator',
    icon: User,
    description: 'Generate realistic random names for characters, stories, games, and testing. Choose male, female, or both.',
    color: 'from-fuchsia-500 to-fuchsia-600',
    traffic: '1.2M+',
    features: ['Realistic Names', 'Gender Options', 'Bulk Generation', 'Copy Individual'],
  },
  {
    name: 'MD5 Hash Generator',
    slug: 'md5-generator',
    icon: Hash,
    description: 'Generate SHA-256 hashes from any text. 100% secure - all hashing done locally in your browser.',
    color: 'from-slate-500 to-slate-600',
    traffic: '1.2M+',
    features: ['SHA-256 Hash', 'Client-Side', 'Instant Results', '100% Secure'],
  },
  {
    name: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder-decoder',
    icon: Code,
    description: 'Encode and decode Base64 text instantly. Perfect for developers, APIs, and data URIs. All conversion done locally.',
    color: 'from-amber-500 to-amber-600',
    traffic: '1.7M+',
    features: ['Encode & Decode', 'Switch Mode', 'Error Handling', '100% Private'],
  },
  {
    name: 'Color Picker',
    slug: 'color-picker',
    icon: Palette,
    description: 'Pick colors and get HEX, RGB, and HSL codes instantly. Includes 21 preset colors and custom color selection.',
    color: 'from-rose-500 to-rose-600',
    traffic: '2M+',
    features: ['HEX/RGB/HSL Codes', 'Color Preview', '21 Presets', 'Copy to Clipboard'],
  },
  {
    name: 'World Clock',
    slug: 'world-clock',
    icon: Globe,
    description: 'View current time in 12 major cities worldwide. Real-time updates with time zones and country flags.',
    color: 'from-sky-500 to-sky-600',
    traffic: '1.5M+',
    features: ['12 World Cities', 'Real-time Updates', 'Time Zones', 'Country Flags'],
  },
  {
    name: 'Time Zone Converter',
    slug: 'time-zone-converter',
    icon: Clock,
    description: 'Convert time between different time zones worldwide. Perfect for international meetings and travel planning.',
    color: 'from-violet-500 to-violet-600',
    traffic: '1.2M+',
    features: ['12 Time Zones', 'Instant Conversion', 'Meeting Scheduler', 'Date Support'],
  },
  {
    name: 'RGB/HEX Converter',
    slug: 'rgb-hex-converter',
    icon: Palette,
    description: 'Convert between RGB and HEX color codes instantly. Live color preview and bidirectional conversion.',
    color: 'from-fuchsia-500 to-fuchsia-600',
    traffic: '1.5M+',
    features: ['RGB to HEX', 'HEX to RGB', 'Color Preview', 'Copy Codes'],
  },
  {
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    icon: FileText,
    description: 'Generate placeholder text in paragraphs, sentences, or words. Perfect for web design and mockups.',
    color: 'from-stone-500 to-stone-600',
    traffic: '800k+',
    features: ['Paragraphs/Words/Sentences', 'Custom Count', 'Copy Text', 'Instant Generation'],
  },
  {
    name: 'Text Repeater',
    slug: 'text-repeater',
    icon: Repeat,
    description: 'Repeat any text multiple times with custom separators. Perfect for testing and formatting.',
    color: 'from-red-500 to-red-600',
    traffic: '600k+',
    features: ['Custom Separators', 'Count Control', 'Line Breaks', 'Copy Output'],
  },
  {
    name: 'Reverse Text',
    slug: 'reverse-text',
    icon: ArrowLeftRight,
    description: 'Reverse text character by character, reverse word order, or reverse lines instantly.',
    color: 'from-orange-500 to-orange-600',
    traffic: '500k+',
    features: ['3 Reverse Modes', 'Characters/Words/Lines', 'Swap Text', 'Auto-reverse'],
  },
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    icon: FileJson,
    description: 'Format, minify, and validate JSON data instantly. Perfect for developers and API testing.',
    color: 'from-green-500 to-green-600',
    traffic: '1.2M+',
    features: ['Format JSON', 'Minify JSON', 'Validate JSON', 'Load Sample'],
  },
  {
    name: 'Countdown Timer',
    slug: 'countdown-timer',
    icon: Clock,
    description: 'Create countdown timers for events, deadlines, and special occasions. Quick set presets included.',
    color: 'from-blue-500 to-blue-600',
    traffic: '1M+',
    features: ['Event Countdown', 'Quick Presets', 'Days/Hours/Min/Sec', 'Custom Title'],
  },
  {
    name: 'UUID Generator',
    slug: 'uuid-generator',
    icon: Key,
    description: 'Generate unique UUIDs (GUIDs) instantly. Version 4 (random) or Version 1 (time-based) support.',
    color: 'from-indigo-500 to-indigo-600',
    traffic: '1.5M+',
    features: ['UUID v4 & v1', 'Bulk Generation', 'Copy Individual', '100% Unique'],
  },
  {
    name: 'URL Encoder/Decoder',
    slug: 'url-encoder-decoder',
    icon: LinkIcon,
    description: 'Encode and decode URLs instantly. Convert URLs to percent-encoded format or decode them back.',
    color: 'from-cyan-500 to-cyan-600',
    traffic: '1M+',
    features: ['Encode & Decode', 'Auto-convert', 'Load Sample', 'Copy Output'],
  },
  {
    name: 'HTML Encoder/Decoder',
    slug: 'html-encoder-decoder',
    icon: Code2,
    description: 'Encode and decode HTML entities instantly. Prevent XSS attacks and display code safely.',
    color: 'from-emerald-500 to-emerald-600',
    traffic: '1M+',
    features: ['Encode & Decode', 'XSS Prevention', 'Auto-convert', 'Entity Reference'],
  },
  {
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    icon: QrCode,
    description: 'Generate QR codes instantly from any text or URL. Customizable size with instant preview. Perfect for sharing links and information.',
    color: 'from-blue-500 to-blue-600',
    traffic: '2M+',
    features: ['Instant QR Codes', 'Custom Sizes', 'Copy & Save', 'Any Text/URL'],
  },
  {
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    icon: Percent,
    description: 'Calculate percentages instantly. Find what % of a number, percentage change, and more. 4 calculation modes included.',
    color: 'from-green-500 to-green-600',
    traffic: '2M+',
    features: ['4 Calculation Modes', 'Percentage Change', 'Instant Results', 'Quick Examples'],
  },
  {
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    icon: HeartPulse,
    description: 'Calculate your Body Mass Index (BMI) with metric or imperial units. Includes BMI categories and health information.',
    color: 'from-red-500 to-red-600',
    traffic: '3M+',
    features: ['Metric & Imperial', 'BMI Categories', 'Health Info', 'Instant Calculation'],
  },
  {
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    icon: Tag,
    description: 'Calculate discounts and final prices instantly. Quick buttons for common discount percentages (10-75%).',
    color: 'from-yellow-500 to-yellow-600',
    traffic: '1.5M+',
    features: ['Quick Discounts', 'Final Price', 'Savings Amount', 'Common Percentages'],
  },
  {
    name: 'Unit Converter',
    slug: 'unit-converter',
    icon: Scale,
    description: 'Convert between length, weight, temperature, and volume units. Comprehensive unit conversion tool.',
    color: 'from-purple-500 to-purple-600',
    traffic: '2M+',
    features: ['4 Categories', 'Metric & Imperial', 'Multiple Units', 'Instant Conversion'],
  },
  {
    name: 'Loan Calculator',
    slug: 'loan-calculator',
    icon: Calculator,
    description: 'Calculate monthly payments, total interest, and loan amortization. Perfect for mortgages and personal loans.',
    color: 'from-indigo-500 to-indigo-600',
    traffic: '1.5M+',
    features: ['Monthly Payment', 'Total Interest', 'Loan Amount', 'Interest Rate'],
  },
  {
    name: 'Pomodoro Timer',
    slug: 'pomodoro-timer',
    icon: Timer,
    description: 'Productivity timer with work and break sessions. Customizable work/break durations for focused work.',
    color: 'from-orange-500 to-orange-600',
    traffic: '1M+',
    features: ['Work Sessions', 'Break Timer', 'Custom Durations', 'Audio Alerts'],
  },
  {
    name: 'Text Diff Checker',
    slug: 'text-diff-checker',
    icon: GitCompare,
    description: 'Compare two texts line by line to find differences. Perfect for code review and document comparison.',
    color: 'from-teal-500 to-teal-600',
    traffic: '1M+',
    features: ['Line Comparison', 'Highlight Differences', 'Side by Side', 'Copy Text'],
  },
  {
    name: 'Markdown to HTML',
    slug: 'markdown-to-html',
    icon: FileCode,
    description: 'Convert Markdown to HTML instantly. Supports headings, bold, italic, links, and images.',
    color: 'from-cyan-500 to-cyan-600',
    traffic: '800k+',
    features: ['Markdown Parser', 'HTML Output', 'Copy HTML', 'Live Preview'],
  },
  {
    name: 'CSV to JSON',
    slug: 'csv-to-json',
    icon: FileSpreadsheet,
    description: 'Convert CSV data to JSON format instantly. Perfect for data transformation and API integration.',
    color: 'from-lime-500 to-lime-600',
    traffic: '700k+',
    features: ['CSV Parser', 'JSON Output', 'Headers Support', 'Copy JSON'],
  },
  {
    name: 'Binary Converter',
    slug: 'binary-converter',
    icon: Binary,
    description: 'Convert text to binary and binary to text instantly. Perfect for learning and encoding.',
    color: 'from-slate-500 to-slate-600',
    traffic: '600k+',
    features: ['Text to Binary', 'Binary to Text', 'Copy Output', 'Instant Conversion'],
  },
  {
    name: 'Hex Converter',
    slug: 'hex-converter',
    icon: HashIcon,
    description: 'Convert between text, decimal, and hexadecimal formats. Multi-directional conversion tool.',
    color: 'from-stone-500 to-stone-600',
    traffic: '500k+',
    features: ['Text/Decimal/Hex', 'Multi-directional', 'Copy Output', 'Instant Results'],
  },
  {
    name: 'Roman Numeral Converter',
    slug: 'roman-numeral-converter',
    icon: Type,
    description: 'Convert numbers to Roman numerals and vice versa. Supports numbers 1-3999.',
    color: 'from-amber-500 to-amber-600',
    traffic: '400k+',
    features: ['Number to Roman', 'Roman to Number', 'Validation', 'Copy Result'],
  },
  {
    name: 'Epoch Converter',
    slug: 'epoch-converter',
    icon: ClockIcon,
    description: 'Convert Unix timestamps to readable dates and vice versa. Current timestamp included.',
    color: 'from-rose-500 to-rose-600',
    traffic: '800k+',
    features: ['Unix Timestamp', 'Date Conversion', 'Current Time', 'Copy Timestamp'],
  },
  {
    name: 'Color Palette Generator',
    slug: 'color-palette-generator',
    icon: PaletteIcon,
    description: 'Generate random 5-color palettes instantly. Perfect for design inspiration and color schemes.',
    color: 'from-fuchsia-500 to-fuchsia-600',
    traffic: '1M+',
    features: ['5-Color Palettes', 'Random Generation', 'HEX Codes', 'Copy Colors'],
  },
  {
    name: 'Gradient Generator',
    slug: 'gradient-generator',
    icon: PaletteIcon,
    description: 'Create CSS linear gradients with custom colors. Live preview and copy CSS code.',
    color: 'from-pink-500 to-pink-600',
    traffic: '900k+',
    features: ['Color Picker', 'Gradient Preview', 'CSS Code', 'Copy CSS'],
  },
  {
    name: 'Box Shadow Generator',
    slug: 'box-shadow-generator',
    icon: Box,
    description: 'Generate CSS box shadows visually. Adjust offset, blur, spread, and color with live preview.',
    color: 'from-violet-500 to-violet-600',
    traffic: '700k+',
    features: ['Visual Builder', 'Live Preview', 'CSS Code', 'Copy CSS'],
  },
  {
    name: 'CSS Minifier',
    slug: 'css-minifier',
    icon: Minimize,
    description: 'Minify CSS code to reduce file size. Remove whitespace and comments for faster loading.',
    color: 'from-blue-500 to-blue-600',
    traffic: '600k+',
    features: ['Minify CSS', 'Remove Comments', 'Copy Output', 'File Size Reduction'],
  },
  {
    name: 'JS Minifier',
    slug: 'js-minifier',
    icon: Code,
    description: 'Minify JavaScript code to reduce file size. Basic minification for faster page loads.',
    color: 'from-yellow-500 to-yellow-600',
    traffic: '800k+',
    features: ['Minify JS', 'Remove Spaces', 'Copy Output', 'Basic Minification'],
  },
  {
    name: 'SQL Formatter',
    slug: 'sql-formatter',
    icon: Database,
    description: 'Format SQL queries for better readability. Supports SELECT, JOIN, WHERE, and more.',
    color: 'from-green-500 to-green-600',
    traffic: '700k+',
    features: ['Format SQL', 'Keyword Formatting', 'Copy Output', 'Instant Results'],
  },
  {
    name: 'XML Formatter',
    slug: 'xml-formatter',
    icon: FileCode,
    description: 'Format and beautify XML data for better readability. Perfect for developers and data analysts.',
    color: 'from-teal-500 to-teal-600',
    traffic: '600k+',
    features: ['Format XML', 'Beautify XML', 'Copy Output', 'Indentation'],
  },
  {
    name: 'YAML to JSON',
    slug: 'yaml-to-json',
    icon: FileJson,
    description: 'Convert YAML data to JSON format instantly. Perfect for configuration file conversion.',
    color: 'from-indigo-500 to-indigo-600',
    traffic: '500k+',
    features: ['YAML Parser', 'JSON Output', 'Copy JSON', 'Instant Conversion'],
  },
  {
    name: 'String Utility',
    slug: 'string-utility',
    icon: Type,
    description: 'Multi-function string manipulation tool. Reverse, count, remove spaces, and more operations.',
    color: 'from-purple-500 to-purple-600',
    traffic: '700k+',
    features: ['10+ Operations', 'Count Stats', 'Transform Text', 'Copy Output'],
  },
  {
    name: 'Color Contrast Checker',
    slug: 'color-contrast-checker',
    icon: PaletteIcon,
    description: 'Check WCAG color contrast ratios between foreground and background colors. Accessibility testing.',
    color: 'from-orange-500 to-orange-600',
    traffic: '600k+',
    features: ['WCAG Ratios', 'Contrast Testing', 'Color Picker', 'Accessibility'],
  },
  {
    name: 'Image to Base64',
    slug: 'image-to-base64',
    icon: Image,
    description: 'Convert images to Base64 encoded strings. Perfect for embedding images in CSS, HTML, or JSON.',
    color: 'from-cyan-500 to-cyan-600',
    traffic: '800k+',
    features: ['Image Upload', 'Base64 Output', 'Preview Image', 'Copy Base64'],
  },
  {
    name: 'Invoice Generator',
    slug: 'invoice-generator',
    icon: FileText,
    description: 'Create professional invoices instantly. Perfect for freelancers, small businesses, and contractors.',
    color: 'from-emerald-500 to-emerald-600',
    traffic: '1M+',
    features: ['Invoice Creator', 'Item List', 'Print Invoice', 'Professional Format'],
  },
  {
    name: 'Resume Builder',
    slug: 'resume-builder',
    icon: FileText,
    description: 'Build professional resumes instantly. Simple resume creation tool perfect for job seekers.',
    color: 'from-blue-500 to-blue-600',
    traffic: '1.5M+',
    features: ['Resume Creator', 'Sections', 'Print Resume', 'Professional Layout'],
  },
  {
    name: 'QR Code Scanner',
    slug: 'qr-code-scanner',
    icon: QrCode,
    description: 'Scan QR codes from uploaded images. Decode QR codes quickly and easily.',
    color: 'from-green-500 to-green-600',
    traffic: '1M+',
    features: ['Image Upload', 'QR Scanning', 'Copy Result', 'Instant Decode'],
  },
  {
    name: 'Barcode Generator',
    slug: 'barcode-generator',
    icon: Barcode,
    description: 'Generate barcodes in multiple formats. Supports Code 128, EAN-13, and UPC-A formats.',
    color: 'from-red-500 to-red-600',
    traffic: '800k+',
    features: ['3 Formats', 'Download Barcode', 'Custom Data', 'Instant Generation'],
  },
  {
    name: 'Dice Roller',
    slug: 'dice-roller',
    icon: Dices,
    description: 'Roll virtual dice with custom sides and quantities. Perfect for games, D&D, and decision making.',
    color: 'from-purple-500 to-purple-600',
    traffic: '500k+',
    features: ['Custom Dice', 'Multiple Rolls', 'Quick Presets', 'Total Calculation'],
  },
];

export default function ToolsPage() {
  const totalTraffic = '88M+';

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Tools</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-14 h-14 mr-3 text-[#2BAE66]" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Free Online Tools
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              Powerful, free tools for students, professionals, and everyday use
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="bg-gradient-to-r from-[#1A3D7C] to-[#2BAE66] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                {tools.length} Tools Available
              </div>
              <div className="bg-white text-gray-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg border-2 border-gray-300">
                {totalTraffic} Monthly Users
              </div>
            </div>
          </div>

          {/* Features Banner */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
              </div>
              <p className="text-gray-700">
                All tools run instantly in your browser. No waiting, no delays.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">100% Private</h3>
              </div>
              <p className="text-gray-700">
                Nothing is sent to our servers. Your data stays on your device.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Always Free</h3>
              </div>
              <p className="text-gray-700">
                No sign-up, no payment, no limits. Use as much as you want.
              </p>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-[#2BAE66]"
              >
                <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                  <tool.icon className="w-12 h-12 mb-3" />
                  <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    {tool.traffic} monthly searches
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Key Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-[#2BAE66] font-bold group-hover:translate-x-2 transition-transform">
                    Try it now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* New Tools Section */}
          <div className="mt-16 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">30 New Tools Just Added!</h2>
            <p className="text-xl text-gray-700 mb-4">
              We've just launched QR Code Generator, BMI Calculator, Percentage Calculator, Unit Converter, and 26 more powerful tools!
            </p>
            <p className="text-gray-600">
              All tools are 100% free, private, and work instantly in your browser.
            </p>
          </div>

          {/* Why Use Our Tools */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Use TheTutorBridge Tools?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#1A3D7C] mb-3">For Students</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Character counter for essay word limits</li>
                  <li>• Timer for study sessions and exams</li>
                  <li>• Random number generator for practice problems</li>
                  <li>• Password generator for secure accounts</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2BAE66] mb-3">For Professionals</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Case converter for formatting documents</li>
                  <li>• Character counter for social media posts</li>
                  <li>• Timer for time management (Pomodoro)</li>
                  <li>• Password generator for security</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">For Writers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Word and character counting</li>
                  <li>• Reading time estimates</li>
                  <li>• Case conversion for formatting</li>
                  <li>• Social media character limits</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-3">For Everyone</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 100% free to use, no sign-up required</li>
                  <li>• Works on desktop, tablet, and mobile</li>
                  <li>• No ads or distractions</li>
                  <li>• Privacy-focused - all local processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
