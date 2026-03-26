"use client"

import React from 'react'
import Image from 'next/image'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let codeBlockLanguage = ''
    let inTable = false
    let tableRows: string[][] = []

    while (i < lines.length) {
      const line = lines[i]

      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          elements.push(
            <pre key={`code-${i}`} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code className="text-sm text-gray-800">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          )
          codeBlockContent = []
          inCodeBlock = false
        } else {
          // Start of code block
          codeBlockLanguage = line.substring(3).trim()
          inCodeBlock = true
        }
        i++
        continue
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        i++
        continue
      }

      // Handle tables
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
          inTable = true
          tableRows = []
        }

        // Skip separator row (| --- | --- |)
        if (line.includes('---')) {
          i++
          continue
        }

        const cells = line
          .split('|')
          .slice(1, -1)
          .map(cell => cell.trim())
        tableRows.push(cells)
        i++

        // Check if next line is still part of table
        if (i >= lines.length || (!lines[i].trim().startsWith('|') || !lines[i].trim().endsWith('|')) && !lines[i].includes('---')) {
          // End of table
          if (tableRows.length > 0) {
            const headerRow = tableRows[0]
            const dataRows = tableRows.slice(1)

            elements.push(
              <div key={`table-${i}`} className="overflow-x-auto my-8">
                <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-teal-500">
                      {headerRow.map((cell, idx) => (
                        <th
                          key={idx}
                          className="border border-gray-300 px-4 py-3 text-left font-semibold text-white"
                        >
                          {renderInlineMarkdown(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className={`hover:bg-gray-50 transition-colors ${
                          rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="border border-gray-300 px-4 py-3 text-gray-700"
                          >
                            {renderInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          inTable = false
          tableRows = []
        }
        continue
      }

      // Handle headings
      if (line.startsWith('#')) {
        const match = line.match(/^(#{1,6})\s+(.+)$/)
        if (match) {
          const level = match[1].length
          const text = match[2]
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
          const headingClasses = {
            1: 'text-3xl font-bold mt-8 mb-4 text-blue-700',
            2: 'text-2xl font-bold mt-6 mb-3 text-blue-700',
            3: 'text-xl font-bold mt-4 mb-2 text-green-600',
            4: 'text-lg font-bold mt-3 mb-2 text-blue-700',
            5: 'text-base font-bold mt-2 mb-1 text-gray-700',
            6: 'text-sm font-bold mt-2 mb-1 text-gray-700',
          }
          elements.push(
            <HeadingTag key={i} className={headingClasses[level as keyof typeof headingClasses]}>
              {renderInlineMarkdown(text)}
            </HeadingTag>
          )
          i++
          continue
        }
      }

      // Handle blockquotes
      if (line.startsWith('>')) {
        const blockquoteLines: string[] = []
        while (i < lines.length && (lines[i].startsWith('>') || lines[i].trim() === '')) {
          if (lines[i].startsWith('>')) {
            blockquoteLines.push(lines[i].substring(1).trim())
          }
          i++
        }
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="border-l-4 border-yellow-400 bg-yellow-50 p-4 my-6 italic text-gray-700"
          >
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0 text-lg">◆</span>
              <div>
                {blockquoteLines.map((line, idx) => (
                  <React.Fragment key={`blockquote-line-${idx}`}>
                    {renderInlineMarkdown(line)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </blockquote>
        )
        continue
      }

      // Handle horizontal rules
      if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
        elements.push(<hr key={i} className="my-8 border-t-2 border-gray-300" />)
        i++
        continue
      }

      // Handle images
      if (line.trim().startsWith('![')) {
        const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
        if (match) {
          const alt = match[1]
          const src = match[2]
          elements.push(
            <div key={i} className="my-8 text-center">
              <div className="relative w-full h-auto max-h-[500px] mx-auto">
                <img
                  src={src}
                  alt={alt || 'Image'}
                  className="max-w-full h-auto mx-auto rounded-lg"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
            </div>
          )
          i++
          continue
        }
      }

      // Handle unordered lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const listItems: string[] = []
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().substring(2))
          i++
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc ml-6 mb-4 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Handle ordered lists
      if (line.trim().match(/^\d+\.\s/)) {
        const listItems: string[] = []
        while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''))
          i++
        }
        elements.push(
          <ol key={`ol-${i}`} className="list-decimal ml-6 mb-4 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        )
        continue
      }

      // Handle paragraphs (skip empty lines)
      if (line.trim() === '') {
        i++
        continue
      }

      // Regular paragraph
      elements.push(
        <p key={i} className="mb-4 leading-relaxed text-gray-700">
          {renderInlineMarkdown(line)}
        </p>
      )
      i++
    }

    return elements
  }

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // Handle inline elements: bold, italic, links, code, images
    const parts: React.ReactNode[] = []
    let currentText = text
    let key = 0

    // Process the text to find markdown patterns
    const patterns = [
      // Images: ![alt](url)
      {
        regex: /!\[([^\]]*)\]\(([^)]+)\)/g,
        render: (match: RegExpMatchArray) => (
          <img
            key={`img-${key++}`}
            src={match[2]}
            alt={match[1]}
            className="inline-block max-w-full h-auto"
          />
        ),
      },
      // Links: [text](url)
      {
        regex: /\[([^\]]+)\]\(([^)]+)\)/g,
        render: (match: RegExpMatchArray) => (
          <a
            key={`link-${key++}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            {match[1]}
          </a>
        ),
      },
      // Bold and italic: ***text***
      {
        regex: /\*\*\*(.+?)\*\*\*/g,
        render: (match: RegExpMatchArray) => (
          <strong key={`bold-italic-${key++}`} className="font-semibold italic">
            {match[1]}
          </strong>
        ),
      },
      // Bold: **text**
      {
        regex: /\*\*(.+?)\*\*/g,
        render: (match: RegExpMatchArray) => (
          <strong key={`bold-${key++}`} className="font-semibold">
            {match[1]}
          </strong>
        ),
      },
      // Italic: *text*
      {
        regex: /\*(.+?)\*/g,
        render: (match: RegExpMatchArray) => (
          <em key={`italic-${key++}`} className="italic">
            {match[1]}
          </em>
        ),
      },
      // Code: `text`
      {
        regex: /`(.+?)`/g,
        render: (match: RegExpMatchArray) => (
          <code key={`code-${key++}`} className="bg-gray-100 px-1 py-0.5 rounded text-sm">
            {match[1]}
          </code>
        ),
      },
      // Strikethrough: ~~text~~
      {
        regex: /~~(.+?)~~/g,
        render: (match: RegExpMatchArray) => (
          <del key={`strike-${key++}`}>{match[1]}</del>
        ),
      },
    ]

    // Simple approach: replace all patterns sequentially
    let result: React.ReactNode[] = [currentText]

    patterns.forEach(({ regex, render }) => {
      const newResult: React.ReactNode[] = []

      result.forEach((part) => {
        if (typeof part === 'string') {
          const matches = [...part.matchAll(regex)]
          if (matches.length === 0) {
            newResult.push(part)
          } else {
            let lastIndex = 0
            matches.forEach((match) => {
              const matchIndex = match.index!
              // Add text before match
              if (matchIndex > lastIndex) {
                newResult.push(part.substring(lastIndex, matchIndex))
              }
              // Add rendered match
              newResult.push(render(match))
              lastIndex = matchIndex + match[0].length
            })
            // Add remaining text
            if (lastIndex < part.length) {
              newResult.push(part.substring(lastIndex))
            }
          }
        } else {
          newResult.push(part)
        }
      })

      result = newResult
    })

    return <>{result}</>
  }

  return <div className="prose prose-lg max-w-none">{renderMarkdown(content)}</div>
}
