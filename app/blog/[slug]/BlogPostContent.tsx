"use client"

import Image from "next/image"
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer"

interface BlogPostContentProps {
  content: any;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  const getActualImageUrl = (url: string) => {
    if (url.includes('supabase.co')) {
      return url
    }
    if (url.includes('thetutorbridge.com')) {
      return url
    }
    if (url.includes('google.com/imgres') && url.includes('imgurl=')) {
      const imgurlMatch = url.match(/imgurl=([^&]+)/)
      if (imgurlMatch) {
        return decodeURIComponent(imgurlMatch[1])
      }
    }
    return url
  }
  const renderTextContent = (content: any[]): React.ReactNode[] => {
    if (!content) return []

    return content.map((textNode: any, textIndex: number) => {
      if (textNode.type === 'text') {
        let text = textNode.text || ''
        if (textNode.marks) {
          textNode.marks.forEach((mark: any) => {
            if (mark.type === 'bold') {
              text = <strong key={textIndex} className="font-semibold">{text}</strong>
            }
            if (mark.type === 'italic') {
              text = <em key={textIndex} className="italic">{text}</em>
            }
            if (mark.type === 'underline') {
              text = <u key={textIndex}>{text}</u>
            }
            if (mark.type === 'link') {
              text = (
                <a
                  key={textIndex}
                  href={mark.attrs?.href}
                  target={mark.attrs?.target || "_blank"}
                  rel={mark.attrs?.rel || "noopener noreferrer"}
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  {text}
                </a>
              )
            }
          })
        }
        return text
      }
      if (textNode.type === 'paragraph') {
        return (
          <span key={textIndex}>
            {textNode.content ? renderTextContent(textNode.content) : ''}
          </span>
        )
      }
      if (textNode.type === 'link') {
        return (
          <a
            key={textIndex}
            href={textNode.attrs?.href}
            target={textNode.attrs?.target || "_blank"}
            rel={textNode.attrs?.rel || "noopener noreferrer"}
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            {textNode.content ? renderTextContent(textNode.content) : textNode.text}
          </a>
        )
      }
      return null
    }).filter(Boolean)
  }

  const renderContent = (content: any) => {
    if (content && typeof content === 'object' && content.type === 'doc' && content.content) {
      return content.content.map((node: any, index: number) => {
        if (node.type === 'heading') {
          const HeadingTag = `h${node.attrs?.level || 1}` as keyof JSX.IntrinsicElements
          const level = node.attrs?.level || 1
          const headingClasses = {
            1: 'text-3xl font-bold mt-8 mb-4 text-blue-700',
            2: 'text-2xl font-bold mt-6 mb-3 text-blue-700',
            3: 'text-xl font-bold mt-4 mb-2 text-green-600',
            4: 'text-lg font-bold mt-3 mb-2 text-blue-700'
          }
          return (
            <HeadingTag key={index} className={headingClasses[level as keyof typeof headingClasses] || headingClasses[1]}>
              {node.content?.map((textNode: any, textIndex: number) =>
                textNode.type === 'text' ? textNode.text : ''
              ).join('')}
            </HeadingTag>
          )
        }
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="mb-4 leading-relaxed text-gray-700">
              {renderTextContent(node.content || [])}
            </p>
          )
        }
        if (node.type === 'bulletList') {
          return (
            <ul key={index} className="list-disc ml-6 mb-4 space-y-2">
              {node.content?.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-700 leading-relaxed">
                  {item.content?.map((paragraphNode: any, paragraphIndex: number) => {
                    if (paragraphNode.type === 'paragraph') {
                      return (
                        <span key={paragraphIndex}>
                          {paragraphNode.content?.map((textNode: any, textIndex: number) => {
                            if (textNode.type === 'text') {
                              let text = textNode.text || ''
                              if (textNode.marks) {
                                textNode.marks.forEach((mark: any) => {
                                  if (mark.type === 'bold') {
                                    text = <strong key={textIndex} className="font-semibold text-blue-700">{text}</strong>
                                  }
                                  if (mark.type === 'italic') {
                                    text = <em key={textIndex} className="italic text-green-600">{text}</em>
                                  }
                                  if (mark.type === 'underline') {
                                    text = <u key={textIndex}>{text}</u>
                                  }
                                  if (mark.type === 'link') {
                                    text = (
                                      <a
                                        key={textIndex}
                                        href={mark.attrs?.href}
                                        target={mark.attrs?.target || "_blank"}
                                        rel={mark.attrs?.rel || "noopener noreferrer"}
                                        className="text-blue-700 underline hover:text-green-600 transition-colors"
                                      >
                                        {text}
                                      </a>
                                    )
                                  }
                                })
                              }
                              return text
                            }
                            if (textNode.type === 'link') {
                              return (
                                <a
                                  key={textIndex}
                                  href={textNode.attrs?.href}
                                  target={textNode.attrs?.target || "_blank"}
                                  rel={textNode.attrs?.rel || "noopener noreferrer"}
                                  className="text-blue-700 underline hover:text-green-600 transition-colors"
                                >
                                  {textNode.content?.[0]?.text || ''}
                                </a>
                              )
                            }
                            return textNode.text || ''
                          })}
                        </span>
                      )
                    }
                    if (paragraphNode.type === 'text') {
                      let text = paragraphNode.text || ''
                      if (paragraphNode.marks) {
                        paragraphNode.marks.forEach((mark: any) => {
                          if (mark.type === 'bold') {
                            text = <strong key={paragraphIndex} className="font-semibold text-blue-700">{text}</strong>
                          }
                          if (mark.type === 'italic') {
                            text = <em key={paragraphIndex} className="italic text-green-600">{text}</em>
                          }
                          if (mark.type === 'underline') {
                            text = <u key={paragraphIndex}>{text}</u>
                          }
                        })
                      }
                      return text
                    }
                    return paragraphNode.text || ''
                  })}
                </li>
              ))}
            </ul>
          )
        }
        if (node.type === 'orderedList') {
          return (
            <ol key={index} className="list-decimal ml-6 mb-4 space-y-2">
              {node.content?.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-700 leading-relaxed">
                  {item.content?.map((paragraphNode: any, paragraphIndex: number) => {
                    if (paragraphNode.type === 'paragraph') {
                      return (
                        <span key={paragraphIndex}>
                          {paragraphNode.content?.map((textNode: any, textIndex: number) => {
                            if (textNode.type === 'text') {
                              let text = textNode.text || ''
                              if (textNode.marks) {
                                textNode.marks.forEach((mark: any) => {
                                  if (mark.type === 'bold') {
                                    text = <strong key={textIndex} className="font-semibold text-blue-700">{text}</strong>
                                  }
                                  if (mark.type === 'italic') {
                                    text = <em key={textIndex} className="italic text-green-600">{text}</em>
                                  }
                                  if (mark.type === 'underline') {
                                    text = <u key={textIndex}>{text}</u>
                                  }
                                  if (mark.type === 'link') {
                                    text = (
                                      <a
                                        key={textIndex}
                                        href={mark.attrs?.href}
                                        target={mark.attrs?.target || "_blank"}
                                        rel={mark.attrs?.rel || "noopener noreferrer"}
                                        className="text-blue-700 underline hover:text-green-600 transition-colors"
                                      >
                                        {text}
                                      </a>
                                    )
                                  }
                                })
                              }
                              return text
                            }
                            if (textNode.type === 'link') {
                              return (
                                <a
                                  key={textIndex}
                                  href={textNode.attrs?.href}
                                  target={textNode.attrs?.target || "_blank"}
                                  rel={textNode.attrs?.rel || "noopener noreferrer"}
                                  className="text-blue-700 underline hover:text-green-600 transition-colors"
                                >
                                  {textNode.content?.[0]?.text || ''}
                                </a>
                              )
                            }
                            return textNode.text || ''
                          })}
                        </span>
                      )
                    }
                    if (paragraphNode.type === 'text') {
                      let text = paragraphNode.text || ''
                      if (paragraphNode.marks) {
                        paragraphNode.marks.forEach((mark: any) => {
                          if (mark.type === 'bold') {
                            text = <strong key={paragraphIndex} className="font-semibold text-blue-700">{text}</strong>
                          }
                          if (mark.type === 'italic') {
                            text = <em key={paragraphIndex} className="italic text-green-600">{text}</em>
                          }
                          if (mark.type === 'underline') {
                            text = <u key={paragraphIndex}>{text}</u>
                          }
                        })
                      }
                      return text
                    }
                    return paragraphNode.text || ''
                  })}
                </li>
              ))}
            </ol>
          )
        }
        if (node.type === 'image') {
          const imageUrl = getActualImageUrl(node.attrs?.src || '')
          return (
            <div key={index} className="my-8 text-center">
              <div className="relative w-full h-auto max-h-[500px] mx-auto">
                <img
                  src={imageUrl}
                  alt={node.attrs?.alt || 'Image'}
                  className="max-w-full h-auto mx-auto rounded-lg"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
            </div>
          )
        }
        if (node.type === 'blockquote') {
          return (
            <blockquote key={index} className="border-l-4 border-yellow-400 bg-yellow-50 p-4 my-6 italic text-gray-700">
              <div className="flex items-start gap-2">
                <span className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0 text-lg">◆</span>
                <div>
                  {node.content?.map((paragraphNode: any, paragraphIndex: number) => {
                    if (paragraphNode.type === 'paragraph') {
                      return (
                        <div key={paragraphIndex}>
                          {paragraphNode.content?.map((textNode: any, textIndex: number) => {
                            if (textNode.type === 'text') {
                              let text = textNode.text || ''
                              if (textNode.marks) {
                                textNode.marks.forEach((mark: any) => {
                                  if (mark.type === 'bold') {
                                    text = <strong key={textIndex} className="font-semibold text-blue-700">{text}</strong>
                                  }
                                  if (mark.type === 'italic') {
                                    text = <em key={textIndex} className="italic text-green-600">{text}</em>
                                  }
                                  if (mark.type === 'link') {
                                    text = (
                                      <a
                                        key={textIndex}
                                        href={mark.attrs?.href}
                                        target={mark.attrs?.target || "_blank"}
                                        rel={mark.attrs?.rel || "noopener noreferrer"}
                                        className="text-blue-700 underline hover:text-green-600 transition-colors"
                                      >
                                        {text}
                                      </a>
                                    )
                                  }
                                })
                              }
                              return <span key={textIndex}>{text}</span>
                            }
                            return <span key={textIndex}>{textNode.text || ''}</span>
                          })}
                        </div>
                      )
                    }
                    if (paragraphNode.type === 'text') {
                      let text = paragraphNode.text || ''
                      if (paragraphNode.marks) {
                        paragraphNode.marks.forEach((mark: any) => {
                          if (mark.type === 'bold') {
                            text = <strong key={paragraphIndex} className="font-semibold text-blue-700">{text}</strong>
                          }
                          if (mark.type === 'italic') {
                            text = <em key={paragraphIndex} className="italic text-green-600">{text}</em>
                          }
                          if (mark.type === 'link') {
                            text = (
                              <a
                                key={paragraphIndex}
                                href={mark.attrs?.href}
                                target={mark.attrs?.target || "_blank"}
                                rel={mark.attrs?.rel || "noopener noreferrer"}
                                className="text-blue-700 underline hover:text-green-600 transition-colors"
                              >
                                {text}
                              </a>
                            )
                          }
                        })
                      }
                      return <span key={paragraphIndex}>{text}</span>
                    }
                    return <span key={paragraphIndex}>{paragraphNode.text || ''}</span>
                  })}
                </div>
              </div>
            </blockquote>
          )
        }
        if (node.type === 'codeBlock') {
          return (
            <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code className="text-sm text-gray-800">
                {node.content?.map((textNode: any, textIndex: number) =>
                  textNode.type === 'text' ? textNode.text : ''
                ).join('')}
              </code>
            </pre>
          )
        }
        if (node.type === 'table') {
          const rows = node.content || []

          if (rows.length === 0) {
            return null
          }

          const headerRow = rows[0]
          const dataRows = rows.slice(1)

          return (
            <div key={index} className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg overflow-hidden" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-secondary">
                    {headerRow.content?.map((cell: any, cellIndex: number) => (
                      <th
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-3 text-left font-semibold text-white"
                        style={{
                          ...(cell.attrs?.rowspan && {
                            verticalAlign: 'middle',
                            borderRight: '2px solid #1A3D7C'
                          }),
                          ...(cell.attrs?.colspan && {
                            textAlign: 'center',
                            borderBottom: '2px solid #1A3D7C'
                          })
                        }}
                        rowSpan={cell.attrs?.rowspan || undefined}
                        colSpan={cell.attrs?.colspan || undefined}
                      >
                        {cell.content ? renderTextContent(cell.content) : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex} className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      {row.content?.map((cell: any, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-3 text-gray-700"
                          style={{
                            ...(cell.attrs?.rowspan && {
                              verticalAlign: 'middle',
                              borderRight: '2px solid #1A3D7C'
                            }),
                            ...(cell.attrs?.colspan && {
                              textAlign: 'center',
                              borderBottom: '2px solid #1A3D7C'
                            })
                          }}
                          rowSpan={cell.attrs?.rowspan || undefined}
                          colSpan={cell.attrs?.colspan || undefined}
                        >
                          {cell.content ? renderTextContent(cell.content) : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        if (node.type === 'horizontalRule') {
          return <hr key={index} className="my-8 border-t-2 border-gray-300" />
        }
        return null
      }).filter(Boolean)
    }

    if (typeof content === 'string') {
      return content
        .split('\n')
        .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-lg font-bold mt-3 mb-2">{line.substring(5)}</h4>
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>
        }
        if (line.startsWith('1. ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(3)}</li>
        }
        if (line.trim() === '') {
          return <br key={index} />
        }
        if (line.trim()) {
          let processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>')

          return (
            <p key={index}
               className="mb-4 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: processedLine }}
            />
          )
        }
        return null
      })
      .filter(Boolean)
    }
  }

  // If content is a string (markdown), use MarkdownRenderer
  if (typeof content === 'string') {
    return <MarkdownRenderer content={content} />
  }

  // Otherwise use the Tiptap JSON renderer
  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  )
}
