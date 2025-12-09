import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      )
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 files allowed" },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const uploadedFiles: { name: string; url: string; size: number }[] = []
    const timestamp = Date.now()
    const submissionId = `submission_${timestamp}`

    for (const file of files) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds 10MB limit` },
          { status: 400 }
        )
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ]

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `File type ${file.type} not allowed. Please upload images, PDFs, or Word documents.` },
          { status: 400 }
        )
      }

      // Create unique file path
      const fileExtension = file.name.split('.').pop()
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filePath = `${submissionId}/${sanitizedName}`

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('homework-files')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error("Upload error:", error)
        return NextResponse.json(
          { error: `Failed to upload ${file.name}: ${error.message}` },
          { status: 500 }
        )
      }

      // Create a signed URL valid for 7 days
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('homework-files')
        .createSignedUrl(filePath, 60 * 60 * 24 * 7) // 7 days

      if (signedUrlError) {
        console.error("Signed URL error:", signedUrlError)
        // Fall back to public URL if signed URL fails
        const { data: publicUrlData } = supabase.storage
          .from('homework-files')
          .getPublicUrl(filePath)

        uploadedFiles.push({
          name: file.name,
          url: publicUrlData.publicUrl,
          size: file.size
        })
      } else {
        uploadedFiles.push({
          name: file.name,
          url: signedUrlData.signedUrl,
          size: file.size
        })
      }
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      submissionId
    })

  } catch (error) {
    console.error("Error uploading files:", error)
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    )
  }
}
