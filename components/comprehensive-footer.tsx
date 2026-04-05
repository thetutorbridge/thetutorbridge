import Link from "next/link"
import Image from "next/image"

export function ComprehensiveFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">The Tutor Bridge</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your 24/7 digital tutor. Free interactive learning tools, brain games, calculators, and career roadmaps for everyone.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/company/thetutorbridge/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Popular Calculators */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Popular Calculators</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/calculators/gpa-calculator" className="hover:text-white transition-colors">GPA Calculator</Link></li>
              <li><Link href="/calculators/grade-calculator" className="hover:text-white transition-colors">Grade Calculator</Link></li>
              <li><Link href="/calculators/percentage-calculator" className="hover:text-white transition-colors">Percentage Calculator</Link></li>
              <li><Link href="/calculators/basic-calculator" className="hover:text-white transition-colors">Basic Calculator</Link></li>
              <li><Link href="/calculators/bmi-calculator" className="hover:text-white transition-colors">BMI Calculator</Link></li>
              <li><Link href="/calculators/age-calculator" className="hover:text-white transition-colors">Age Calculator</Link></li>
              <li><Link href="/calculators/money-calculator" className="hover:text-white transition-colors">Money Calculator</Link></li>
              <li><Link href="/calculators" className="hover:text-white transition-colors font-semibold text-[#2BAE66]">View All →</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Tools */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Popular Tools</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/tools/timer" className="hover:text-white transition-colors">Study Timer</Link></li>
              <li><Link href="/tools/pomodoro-timer" className="hover:text-white transition-colors">Pomodoro Timer</Link></li>
              <li><Link href="/tools/random-number-generator" className="hover:text-white transition-colors">Random Number</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-white transition-colors">Password Generator</Link></li>
              <li><Link href="/tools/word-counter" className="hover:text-white transition-colors">Word Counter</Link></li>
              <li><Link href="/tools/qr-code-generator" className="hover:text-white transition-colors">QR Code Generator</Link></li>
              <li><Link href="/tools/color-picker" className="hover:text-white transition-colors">Color Picker</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors font-semibold text-[#2BAE66]">View All →</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">Career Roadmaps</Link></li>
            </ul>
          </div>
        </div>

        {/* Extended Calculator & Tools List */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="font-bold mb-4 text-lg">All Calculators & Tools</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 text-gray-400 text-sm">
            {/* Math Calculators */}
            <Link href="/calculators/quadratic-formula-calculator" className="hover:text-white transition-colors">Quadratic Formula</Link>
            <Link href="/calculators/fractions-calculator" className="hover:text-white transition-colors">Fraction Calculator</Link>
            <Link href="/calculators/decimal-to-fraction-calculator" className="hover:text-white transition-colors">Decimal to Fraction</Link>
            <Link href="/calculators/slope-calculator" className="hover:text-white transition-colors">Slope Calculator</Link>
            <Link href="/calculators/factoring-calculator" className="hover:text-white transition-colors">Factoring Calculator</Link>
            <Link href="/calculators/right-triangle-calculator" className="hover:text-white transition-colors">Right Triangle Calculator</Link>
            <Link href="/calculators/circle-area-calculator" className="hover:text-white transition-colors">Circle Area Calculator</Link>
            <Link href="/calculators/square-footage-calculator" className="hover:text-white transition-colors">Square Footage Calculator</Link>
            <Link href="/calculators/tank-volume-calculator" className="hover:text-white transition-colors">Tank Volume Calculator</Link>
            <Link href="/calculators/circumference-calculator" className="hover:text-white transition-colors">Circumference Calculator</Link>

            {/* Science & Measurement Calculators */}
            <Link href="/calculators/speed-distance-time-calculator" className="hover:text-white transition-colors">Speed Distance Time</Link>
            <Link href="/calculators/trigonometry-calculator" className="hover:text-white transition-colors">Trigonometry Calculator</Link>
            <Link href="/calculators/cylinder-volume-calculator" className="hover:text-white transition-colors">Cylinder Volume</Link>
            <Link href="/calculators/cubic-yards-calculator" className="hover:text-white transition-colors">Cubic Yards Calculator</Link>

            {/* Finance Calculators */}
            <Link href="/calculators/compound-interest-calculator" className="hover:text-white transition-colors">Compound Interest</Link>
            <Link href="/calculators/emi-calculator" className="hover:text-white transition-colors">EMI Calculator</Link>
            <Link href="/calculators/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link>
            <Link href="/calculators/sip-calculator" className="hover:text-white transition-colors">SIP Calculator</Link>
            <Link href="/calculators/income-tax-calculator" className="hover:text-white transition-colors">Income Tax Calculator</Link>
            <Link href="/calculators/discount-calculator" className="hover:text-white transition-colors">Discount Calculator</Link>

            {/* Health Calculators */}
            <Link href="/calculators/calorie-calculator" className="hover:text-white transition-colors">Calorie Calculator</Link>
            <Link href="/calculators/bmi-calculator" className="hover:text-white transition-colors">BMI Calculator</Link>
            <Link href="/calculators/bmr-calculator" className="hover:text-white transition-colors">BMR Calculator</Link>

            {/* Text Tools */}
            <Link href="/tools/case-converter" className="hover:text-white transition-colors">Case Converter</Link>
            <Link href="/tools/character-counter" className="hover:text-white transition-colors">Character Counter</Link>
            <Link href="/tools/text-repeater" className="hover:text-white transition-colors">Text Repeater</Link>
            <Link href="/tools/reverse-text" className="hover:text-white transition-colors">Reverse Text</Link>
            <Link href="/tools/lorem-ipsum-generator" className="hover:text-white transition-colors">Lorem Ipsum</Link>

            {/* Dev Tools */}
            <Link href="/tools/json-formatter" className="hover:text-white transition-colors">JSON Formatter</Link>
            <Link href="/tools/base64-encoder-decoder" className="hover:text-white transition-colors">Base64 Encoder</Link>
            <Link href="/tools/url-encoder-decoder" className="hover:text-white transition-colors">URL Encoder</Link>
            <Link href="/tools/md5-generator" className="hover:text-white transition-colors">MD5 Generator</Link>
            <Link href="/tools/uuid-generator" className="hover:text-white transition-colors">UUID Generator</Link>
            <Link href="/tools/regex-tester" className="hover:text-white transition-colors">Regex Tester</Link>

            {/* Converters */}
            <Link href="/tools/temperature-converter" className="hover:text-white transition-colors">Temperature Converter</Link>
            <Link href="/tools/length-converter" className="hover:text-white transition-colors">Length Converter</Link>
            <Link href="/tools/unit-converter" className="hover:text-white transition-colors">Unit Converter</Link>
            <Link href="/tools/binary-converter" className="hover:text-white transition-colors">Binary Converter</Link>
            <Link href="/tools/hex-converter" className="hover:text-white transition-colors">Hex Converter</Link>
            <Link href="/tools/roman-numeral-converter" className="hover:text-white transition-colors">Roman Numerals</Link>
          </div>
        </div>

        {/* Career Roadmaps */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="font-bold mb-4 text-lg">Career Roadmaps</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 text-gray-400 text-sm">
            <Link href="/roadmap/frontend-developer" className="hover:text-white transition-colors">Frontend Developer</Link>
            <Link href="/roadmap/backend-developer" className="hover:text-white transition-colors">Backend Developer</Link>
            <Link href="/roadmap/full-stack-developer" className="hover:text-white transition-colors">Full Stack Developer</Link>
            <Link href="/roadmap/data-scientist" className="hover:text-white transition-colors">Data Scientist</Link>
            <Link href="/roadmap/ai-engineer" className="hover:text-white transition-colors">AI Engineer</Link>
            <Link href="/roadmap/machine-learning" className="hover:text-white transition-colors">Machine Learning</Link>
            <Link href="/roadmap/devops" className="hover:text-white transition-colors">DevOps Engineer</Link>
            <Link href="/roadmap/cyber-security" className="hover:text-white transition-colors">Cyber Security</Link>
            <Link href="/roadmap/mobile-developer" className="hover:text-white transition-colors">Mobile Developer</Link>
            <Link href="/roadmap/game-developer" className="hover:text-white transition-colors">Game Developer</Link>
            <Link href="/roadmap/blockchain" className="hover:text-white transition-colors">Blockchain Developer</Link>
            <Link href="/roadmap/cloud-engineer" className="hover:text-white transition-colors">Cloud Engineer</Link>
            <Link href="/roadmap/react" className="hover:text-white transition-colors">React Developer</Link>
            <Link href="/roadmap/nodejs" className="hover:text-white transition-colors">Node.js Developer</Link>
            <Link href="/roadmap/python-developer" className="hover:text-white transition-colors">Python Developer</Link>
            <Link href="/roadmap/java" className="hover:text-white transition-colors">Java Developer</Link>
            <Link href="/roadmap/golang" className="hover:text-white transition-colors">Go Developer</Link>
            <Link href="/roadmap/rust" className="hover:text-white transition-colors">Rust Developer</Link>
            <Link href="/roadmap/flutter" className="hover:text-white transition-colors">Flutter Developer</Link>
            <Link href="/roadmap/android" className="hover:text-white transition-colors">Android Developer</Link>
            <Link href="/roadmap/ios" className="hover:text-white transition-colors">iOS Developer</Link>
            <Link href="/roadmap/qa" className="hover:text-white transition-colors">QA Engineer</Link>
            <Link href="/roadmap/product-manager" className="hover:text-white transition-colors">Product Manager</Link>
            <Link href="/roadmap/ux-design" className="hover:text-white transition-colors">UX Designer</Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left text-sm">
              © {new Date().getFullYear()} The Tutor Bridge. All rights reserved. Your 24/7 digital tutor for self-paced learning.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <Link href="/calculators" className="hover:text-white">Calculators</Link>
              <Link href="/roadmap" className="hover:text-white">Roadmaps</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <Link href="/faq" className="hover:text-white">FAQ</Link>
              <Link href="/about" className="hover:text-white">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
