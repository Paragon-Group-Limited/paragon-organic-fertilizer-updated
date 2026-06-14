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
    // Strip a single wrapping <p>...</p> so text sits cleanly inside <h1>/<h2>/etc.
    const stripped = content.trim().replace(/^<p>([\s\S]*?)<\/p>$/, '$1').trim()
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
