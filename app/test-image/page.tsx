import Image from "next/image"

export default function TestImagePage() {
  const testImageUrl = "https://zkphbzcomixukygigpka.supabase.co/storage/v1/object/public/blog-images/images/1757780349116_t4smuinj28c.png"
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Image Loading Test</h1>
      <p className="mb-4">Testing Next.js Image component with Supabase Storage URL:</p>
      <p className="mb-4 text-sm text-gray-600 break-all">{testImageUrl}</p>
      
      <div className="relative w-full h-96 border border-gray-300">
        <Image
          src={testImageUrl}
          alt="Test image from Supabase Storage"
          fill
          className="object-cover"
          onLoad={() => {
            console.log('✅ Test image loaded successfully!')
          }}
          onError={(e) => {
            console.error('❌ Test image failed to load:', e)
          }}
        />
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Check the browser console for loading status messages.
        </p>
      </div>
    </div>
  )
}
