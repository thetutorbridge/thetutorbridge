import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from headers
    const authHeader = request.headers.get('authorization')

    // Check if the authorization header is present and valid
    // You can use an environment variable for the secret
    const secret = process.env.REVALIDATION_SECRET || 'your-secret-key-change-this'

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get the path and slug from request body
    const body = await request.json()
    const { slug, path } = body

    if (!slug && !path) {
      return NextResponse.json(
        { message: 'Missing slug or path parameter' },
        { status: 400 }
      )
    }

    // Revalidate the blog list page
    revalidatePath('/blog')

    // Revalidate the specific blog post if slug is provided
    if (slug) {
      revalidatePath(`/blog/${slug}`)
      console.log(`✅ Revalidated blog post: /blog/${slug}`)
    }

    // Revalidate custom path if provided
    if (path) {
      revalidatePath(path)
      console.log(`✅ Revalidated path: ${path}`)
    }

    return NextResponse.json({
      revalidated: true,
      paths: ['/blog', slug ? `/blog/${slug}` : null, path].filter(Boolean),
      now: Date.now()
    })

  } catch (err) {
    console.error('❌ Error revalidating:', err)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}
