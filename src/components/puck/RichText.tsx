/**
 * Renders HTML produced by RichTextEditor.
 * - Handles plain-text fallback (old saved data without HTML tags).
 * - `inline` mode: strips the outer <p> wrapper so the content can sit
 *   directly inside heading elements (<h1>, <h2>, etc.) without nesting issues.
 */
export function RichText({
  html,
  className,
  style,
  inline = false,
}: {
  html?: string
  className?: string
  style?: React.CSSProperties
  inline?: boolean
}) {
  if (!html) return null

  const isPlain = !/<[a-z][\s\S]*>/i.test(html)
  let content = isPlain ? `<p>${html}</p>` : html

  if (inline) {
    // Collapse all <p> blocks into inline text: join paragraph boundaries with a
    // space then strip remaining <p> tags. Handles TipTap output like
    // `<p>text</p><p></p>` which would otherwise leave stray block-level tags
    // inside a <span> and cause the browser to break the layout.
    const stripped = content
      .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
      .replace(/<p[^>]*>/gi, '')
      .replace(/<\/p>/gi, '')
      .trim()
    return (
      <span
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: stripped || html }}
      />
    )
  }

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
