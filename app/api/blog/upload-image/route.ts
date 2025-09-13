import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// POST /api/blog/upload-image - Upload image to Supabase Storage
export async function POST(request: NextRequest) {
  try {
    // For local development, skip authentication
    // In production, you should implement proper authentication
    const isLocalDev = process.env.NODE_ENV === 'development'
    
    if (!isLocalDev) {
      // For production, we'll use service role for uploads
      // The admin check will be handled by the frontend
      console.log('Production environment - using service role for upload')
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `images/${timestamp}_${randomString}.${fileExtension}`

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer()

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      publicUrl: urlData.publicUrl,
      fileName: fileName
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

