import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/TheTutorBridge Logo New.png"
                width={32}
                height={32}
                alt="The Tutor Bridge Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">The Tutor Bridge</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Expert online tutoring platform helping students achieve academic excellence. Personalized homework help and 1-on-1 tutoring for grades 6-12.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/thetutorbridge/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://t.me/thetutorbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/tools/timer" className="hover:text-white transition-colors">
                  Timer & Stopwatch
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="hover:text-white transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/character-counter" className="hover:text-white transition-colors">
                  Character Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/age-calculator" className="hover:text-white transition-colors">
                  Age Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/color-picker" className="hover:text-white transition-colors">
                  Color Picker
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-white transition-colors font-semibold">
                  View All 27 Tools →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">More Tools</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/tools/world-clock" className="hover:text-white transition-colors">
                  World Clock
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="hover:text-white transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/countdown-timer" className="hover:text-white transition-colors">
                  Countdown Timer
                </Link>
              </li>
              <li>
                <Link href="/tools/base64-encoder-decoder" className="hover:text-white transition-colors">
                  Base64 Encoder
                </Link>
              </li>
              <li>
                <Link href="/tools/md5-generator" className="hover:text-white transition-colors">
                  Hash Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/uuid-generator" className="hover:text-white transition-colors">
                  UUID Generator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@thetutorbridge.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} The Tutor Bridge. All rights reserved. | Helping students excel since
            2020
          </p>
        </div>
      </div>
    </footer>
  )
}
