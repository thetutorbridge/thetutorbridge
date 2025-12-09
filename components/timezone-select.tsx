"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, X } from "lucide-react"

const TIMEZONES = [
  // US Timezones
  { value: "America/New_York", label: "Eastern Time (ET)", group: "United States" },
  { value: "America/Chicago", label: "Central Time (CT)", group: "United States" },
  { value: "America/Denver", label: "Mountain Time (MT)", group: "United States" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)", group: "United States" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)", group: "United States" },
  { value: "America/Honolulu", label: "Hawaii Time (HT)", group: "United States" },
  { value: "America/Phoenix", label: "Arizona (No DST)", group: "United States" },

  // Canada
  { value: "America/Toronto", label: "Toronto (ET)", group: "Canada" },
  { value: "America/Vancouver", label: "Vancouver (PT)", group: "Canada" },
  { value: "America/Edmonton", label: "Edmonton (MT)", group: "Canada" },
  { value: "America/Winnipeg", label: "Winnipeg (CT)", group: "Canada" },
  { value: "America/Halifax", label: "Halifax (AT)", group: "Canada" },
  { value: "America/St_Johns", label: "Newfoundland (NT)", group: "Canada" },

  // Europe
  { value: "Europe/London", label: "London (GMT/BST)", group: "Europe" },
  { value: "Europe/Paris", label: "Paris (CET)", group: "Europe" },
  { value: "Europe/Berlin", label: "Berlin (CET)", group: "Europe" },
  { value: "Europe/Madrid", label: "Madrid (CET)", group: "Europe" },
  { value: "Europe/Rome", label: "Rome (CET)", group: "Europe" },
  { value: "Europe/Amsterdam", label: "Amsterdam (CET)", group: "Europe" },
  { value: "Europe/Brussels", label: "Brussels (CET)", group: "Europe" },
  { value: "Europe/Vienna", label: "Vienna (CET)", group: "Europe" },
  { value: "Europe/Stockholm", label: "Stockholm (CET)", group: "Europe" },
  { value: "Europe/Oslo", label: "Oslo (CET)", group: "Europe" },
  { value: "Europe/Copenhagen", label: "Copenhagen (CET)", group: "Europe" },
  { value: "Europe/Helsinki", label: "Helsinki (EET)", group: "Europe" },
  { value: "Europe/Athens", label: "Athens (EET)", group: "Europe" },
  { value: "Europe/Moscow", label: "Moscow (MSK)", group: "Europe" },
  { value: "Europe/Istanbul", label: "Istanbul (TRT)", group: "Europe" },
  { value: "Europe/Lisbon", label: "Lisbon (WET)", group: "Europe" },
  { value: "Europe/Dublin", label: "Dublin (GMT/IST)", group: "Europe" },
  { value: "Europe/Zurich", label: "Zurich (CET)", group: "Europe" },
  { value: "Europe/Warsaw", label: "Warsaw (CET)", group: "Europe" },
  { value: "Europe/Prague", label: "Prague (CET)", group: "Europe" },
  { value: "Europe/Budapest", label: "Budapest (CET)", group: "Europe" },

  // Asia
  { value: "Asia/Dubai", label: "Dubai (GST)", group: "Asia & Middle East" },
  { value: "Asia/Kolkata", label: "India (IST)", group: "Asia & Middle East" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", group: "Asia & Middle East" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", group: "Asia & Middle East" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", group: "Asia & Middle East" },
  { value: "Asia/Seoul", label: "Seoul (KST)", group: "Asia & Middle East" },
  { value: "Asia/Shanghai", label: "China (CST)", group: "Asia & Middle East" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)", group: "Asia & Middle East" },
  { value: "Asia/Jakarta", label: "Jakarta (WIB)", group: "Asia & Middle East" },
  { value: "Asia/Manila", label: "Manila (PHT)", group: "Asia & Middle East" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur (MYT)", group: "Asia & Middle East" },
  { value: "Asia/Ho_Chi_Minh", label: "Ho Chi Minh (ICT)", group: "Asia & Middle East" },
  { value: "Asia/Taipei", label: "Taipei (CST)", group: "Asia & Middle East" },
  { value: "Asia/Karachi", label: "Pakistan (PKT)", group: "Asia & Middle East" },
  { value: "Asia/Dhaka", label: "Bangladesh (BST)", group: "Asia & Middle East" },
  { value: "Asia/Colombo", label: "Sri Lanka (IST)", group: "Asia & Middle East" },
  { value: "Asia/Kathmandu", label: "Nepal (NPT)", group: "Asia & Middle East" },
  { value: "Asia/Tel_Aviv", label: "Israel (IST)", group: "Asia & Middle East" },
  { value: "Asia/Riyadh", label: "Saudi Arabia (AST)", group: "Asia & Middle East" },
  { value: "Asia/Kuwait", label: "Kuwait (AST)", group: "Asia & Middle East" },
  { value: "Asia/Qatar", label: "Qatar (AST)", group: "Asia & Middle East" },

  // Australia & Pacific
  { value: "Australia/Sydney", label: "Sydney (AEST)", group: "Australia & Pacific" },
  { value: "Australia/Melbourne", label: "Melbourne (AEST)", group: "Australia & Pacific" },
  { value: "Australia/Brisbane", label: "Brisbane (AEST)", group: "Australia & Pacific" },
  { value: "Australia/Perth", label: "Perth (AWST)", group: "Australia & Pacific" },
  { value: "Australia/Adelaide", label: "Adelaide (ACST)", group: "Australia & Pacific" },
  { value: "Pacific/Auckland", label: "New Zealand (NZST)", group: "Australia & Pacific" },
  { value: "Pacific/Fiji", label: "Fiji (FJT)", group: "Australia & Pacific" },
  { value: "Pacific/Guam", label: "Guam (ChST)", group: "Australia & Pacific" },

  // Latin America
  { value: "America/Mexico_City", label: "Mexico City (CST)", group: "Latin America" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)", group: "Latin America" },
  { value: "America/Buenos_Aires", label: "Buenos Aires (ART)", group: "Latin America" },
  { value: "America/Lima", label: "Lima (PET)", group: "Latin America" },
  { value: "America/Bogota", label: "Bogotá (COT)", group: "Latin America" },
  { value: "America/Santiago", label: "Santiago (CLT)", group: "Latin America" },
  { value: "America/Caracas", label: "Caracas (VET)", group: "Latin America" },
  { value: "America/Panama", label: "Panama (EST)", group: "Latin America" },
  { value: "America/Puerto_Rico", label: "Puerto Rico (AST)", group: "Latin America" },

  // Africa
  { value: "Africa/Cairo", label: "Cairo (EET)", group: "Africa" },
  { value: "Africa/Johannesburg", label: "South Africa (SAST)", group: "Africa" },
  { value: "Africa/Lagos", label: "Lagos (WAT)", group: "Africa" },
  { value: "Africa/Nairobi", label: "Nairobi (EAT)", group: "Africa" },
  { value: "Africa/Casablanca", label: "Casablanca (WET)", group: "Africa" },
]

interface TimezoneSelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
}

export function TimezoneSelect({ value, onChange, required, className }: TimezoneSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [customTimezone, setCustomTimezone] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const filteredTimezones = TIMEZONES.filter(tz =>
    tz.label.toLowerCase().includes(search.toLowerCase()) ||
    tz.value.toLowerCase().includes(search.toLowerCase()) ||
    tz.group.toLowerCase().includes(search.toLowerCase())
  )

  // Group timezones
  const groupedTimezones = filteredTimezones.reduce((acc, tz) => {
    if (!acc[tz.group]) acc[tz.group] = []
    acc[tz.group].push(tz)
    return acc
  }, {} as Record<string, typeof TIMEZONES>)

  const selectedTimezone = TIMEZONES.find(tz => tz.value === value)
  const displayValue = selectedTimezone?.label || value || "Select timezone"

  const handleSelect = (tzValue: string) => {
    onChange(tzValue)
    setIsOpen(false)
    setSearch("")
    setShowCustomInput(false)
  }

  const handleCustomSubmit = () => {
    if (customTimezone.trim()) {
      onChange(customTimezone.trim())
      setIsOpen(false)
      setShowCustomInput(false)
      setCustomTimezone("")
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent bg-white text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>{displayValue}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search timezone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Timezone List */}
          <div className="overflow-y-auto max-h-56">
            {Object.entries(groupedTimezones).map(([group, timezones]) => (
              <div key={group}>
                <div className="px-3 py-1 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">
                  {group}
                </div>
                {timezones.map((tz) => (
                  <button
                    key={tz.value}
                    type="button"
                    onClick={() => handleSelect(tz.value)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[#1A3D7C]/10 transition-colors ${
                      value === tz.value ? 'bg-[#1A3D7C]/10 text-[#1A3D7C] font-medium' : 'text-gray-700'
                    }`}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            ))}

            {filteredTimezones.length === 0 && !showCustomInput && (
              <div className="p-4 text-center text-gray-500 text-sm">
                <p>No timezone found</p>
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="mt-2 text-[#1A3D7C] hover:underline font-medium"
                >
                  Enter custom timezone
                </button>
              </div>
            )}
          </div>

          {/* Other/Custom Option */}
          <div className="border-t p-2 bg-gray-50">
            {showCustomInput ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your timezone (e.g., GMT+5:30)"
                  value={customTimezone}
                  onChange={(e) => setCustomTimezone(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                />
                <button
                  type="button"
                  onClick={handleCustomSubmit}
                  className="px-4 py-2 bg-[#1A3D7C] text-white rounded-md text-sm hover:bg-[#1A3D7C]/90"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full px-3 py-2 text-left text-sm text-[#1A3D7C] hover:bg-[#1A3D7C]/10 rounded-md transition-colors font-medium"
              >
                + Other (Enter custom timezone)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input
          type="text"
          value={value}
          required
          className="sr-only"
          tabIndex={-1}
          onChange={() => {}}
        />
      )}
    </div>
  )
}
