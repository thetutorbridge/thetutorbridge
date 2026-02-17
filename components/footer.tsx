import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
                rel="noopener noreferrer nofollow"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://t.me/thetutorbridge"
                target="_blank"
                rel="noopener noreferrer nofollow"
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
