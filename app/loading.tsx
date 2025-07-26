import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 animate-gradient-move relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-300 rounded-full opacity-30 blur-3xl animate-float-slow z-0" style={{animationDelay: '0s'}} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl animate-float-slow z-0" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-3xl animate-float-slow z-0" style={{animationDelay: '1s'}} />
      <div className="flex flex-col items-center gap-6 z-10">
        {/* Pulsing logo */}
        <div className="p-6 bg-white/80 rounded-full shadow-xl animate-pulse-slow">
          <Image src="/logo.png" width={80} height={80} alt="The Tutor Bridge Logo" className="rounded-full" />
        </div>
        <span className="text-2xl font-bold text-blue-700 tracking-wide animate-fade-in">Loading The Tutor Bridge...</span>
      </div>
    </div>
  );
} 