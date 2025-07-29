"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function PhotoSlider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mounted, setMounted] = useState(false);
  const totalSlides = 4;

  const slides = [
    { src: "/bannerHome5.jpg", alt: "Online tutoring session" },
    { src: "/bannerHome2.jpg", alt: "Student success celebration" },
    { src: "/bannerHome4.jpg", alt: "Study resources and materials" },
  ];

  const showSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides ? 1 : currentSlide + 1);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide === 1 ? totalSlides : currentSlide - 1);
  };

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative flex justify-center lg:justify-end">
        <div className="relative">
          <div className="relative">
            <div className="relative w-[675px] h-[500px] overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center lg:justify-end mt-20">
      <div className="relative">
        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Slider Images */}
          <div className="relative w-[675px] h-[500px] overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index + 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.src}
                  width={675}
                  height={500}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Slider Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button 
                key={index}
                className={`w-5 h-5 rounded-full hover:bg-white transition-colors duration-300 ${
                  currentSlide === index + 1 ? 'bg-white/90' : 'bg-white/60'
                }`}
                onClick={() => showSlide(index + 1)}
              ></button>
            ))}
          </div>


        </div>


      </div>
    </div>
  )
} 