'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import { Extension } from '@tiptap/core'
import { useEffect, useRef, useState } from 'react'

// ─── Custom extensions ────────────────────────────────────────────────────────
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: { setFontSize: (size: string) => ReturnType; unsetFontSize: () => ReturnType }
    fontWeight: { setFontWeight: (w: string) => ReturnType; unsetFontWeight: () => ReturnType }
  }
}

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] } },
  addGlobalAttributes() {
    return [{ types: ['textStyle'], attributes: {
      fontSize: {
        default: null,
        parseHTML: (el: HTMLElement) => el.style.fontSize || null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderHTML: (attrs: any) => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
      },
    }}]
  },
  addCommands() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFontSize: (size: string) => ({ chain }: any) =>
        chain().setMark('textStyle', { fontSize: size }).run(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      unsetFontSize: () => ({ chain }: any) =>
        chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

const FontWeight = Extension.create({
  name: 'fontWeight',
  addOptions() { return { types: ['textStyle'] } },
  addGlobalAttributes() {
    return [{ types: ['textStyle'], attributes: {
      fontWeight: {
        default: null,
        parseHTML: (el: HTMLElement) => el.style.fontWeight || null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderHTML: (attrs: any) => attrs.fontWeight ? { style: `font-weight: ${attrs.fontWeight}` } : {},
      },
    }}]
  },
  addCommands() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFontWeight: (w: string) => ({ chain }: any) =>
        chain().setMark('textStyle', { fontWeight: w }).run(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      unsetFontWeight: () => ({ chain }: any) =>
        chain().setMark('textStyle', { fontWeight: null }).removeEmptyTextStyle().run(),
    }
  },
})

// ─── Constants ────────────────────────────────────────────────────────────────
const PX_SIZES = [8,9,10,11,12,13,14,15,16,17,18,20,22,24,26,28,30,32,36,40,44,48,52,56,64,72,80,96]
const WEIGHTS  = [{ v:'400',t:'Regular' },{ v:'500',t:'Medium' },{ v:'600',t:'Semibold' },{ v:'700',t:'Bold' }]
const PRESETS  = ['#1a2e1a','#1B4D3E','#2D7A3A','#D4A017','#F5C842','#e53e3e','#3182ce','#805ad5','#718096','#000000','#4a5568','#ffffff']

// ─── Toolbar ──────────────────────────────────────────────────────────────────
// All interactions use onMouseDown + e.preventDefault() so editor focus is NEVER lost.
// This works for all blocks — new or existing.

type EditorInstance = NonNullable<ReturnType<typeof useEditor>>

function Sep() {
  return <div style={{ width:1, height:14, background:'#e2e8f0', margin:'0 2px', flexShrink:0 }} />
}

function Btn({
  active, title, onMD, children,
}: { active: boolean; title: string; onMD: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onMD() }}
      style={{
        padding:'2px 6px', borderRadius:4, lineHeight:1.3, flexShrink:0,
        border:'1px solid transparent',
        background: active ? '#1B4D3E' : 'transparent',
        color: active ? 'white' : '#1a2e1a',
        cursor:'pointer', fontSize:12, fontWeight:600,
      }}
    >{children}</button>
  )
}

function SizeDropdown({ editor }: { editor: EditorInstance }) {
  const [open, setOpen] = useState(false)
  const ref  = useRef<HTMLDivElement>(null)
  const active = editor.getAttributes('textStyle').fontSize || ''

  // close if click outside this component (not preventing default — click goes through normally)
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} style={{ position:'relative', display:'inline-block' }}>
      <button
        type="button"
        title="Font size"
        onMouseDown={e => { e.preventDefault(); setOpen(v => !v) }}
        style={{
          fontSize:11, padding:'2px 5px', borderRadius:4, cursor:'pointer', fontWeight:600,
          border:'1px solid #d1d5db', width:66,
          background: active ? '#e8f5e9' : 'white', color:'#1a2e1a',
        }}
      >
        {active || '-- px --'}
      </button>
      {open && (
        <div style={{
          position:'absolute', top:'100%', left:0, zIndex:9999,
          background:'white', border:'1px solid #d1d5db', borderRadius:4,
          maxHeight:180, overflowY:'auto', minWidth:70, boxShadow:'0 4px 12px rgba(0,0,0,.12)',
        }}>
          <div
            onMouseDown={e => { e.preventDefault(); editor.chain().focus().unsetFontSize().run(); setOpen(false) }}
            style={{ padding:'3px 8px', fontSize:11, cursor:'pointer', color:'#94a3b8' }}
          >
            Default
          </div>
          {PX_SIZES.map(s => (
            <div
              key={s}
              onMouseDown={e => { e.preventDefault(); editor.chain().focus().setFontSize(`${s}px`).run(); setOpen(false) }}
              style={{
                padding:'3px 8px', fontSize:11, cursor:'pointer',
                background: active === `${s}px` ? '#e8f5e9' : 'transparent',
                color: active === `${s}px` ? '#1B4D3E' : '#1a2e1a',
                fontWeight: active === `${s}px` ? 700 : 400,
              }}
            >
              {s}px
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ColorPicker({ editor }: { editor: EditorInstance }) {
  const nativeRef = useRef<HTMLInputElement>(null)
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:3, alignItems:'center', width:'100%', paddingTop:3 }}>
      <span style={{ fontSize:10, color:'#94a3b8', fontWeight:700, marginRight:2 }}>রং:</span>
      {PRESETS.map(c => (
        <button
          key={c} type="button" title={c}
          onMouseDown={e => { e.preventDefault(); editor.chain().focus().setColor(c).run() }}
          style={{
            width:17, height:17, borderRadius:3, cursor:'pointer', flexShrink:0,
            background:c,
            border: editor.isActive('textStyle', { color: c }) ? '2.5px solid #1B4D3E' : '1px solid #cbd5e1',
            boxShadow: c === '#ffffff' ? 'inset 0 0 0 1px #ccc' : 'none',
          }}
        />
      ))}
      <Sep />
      <button
        type="button"
        onMouseDown={e => { e.preventDefault(); nativeRef.current?.click() }}
        style={{
          display:'flex', alignItems:'center', gap:3, padding:'1px 6px',
          borderRadius:4, border:'1px solid #d1d5db', background:'white',
          fontSize:11, color:'#374151', fontWeight:600, cursor:'pointer',
        }}
      >
        <div style={{
          width:12, height:12, borderRadius:2, flexShrink:0, pointerEvents:'none',
          background:'conic-gradient(from 0deg,#e53e3e,#D4A017,#2D7A3A,#3182ce,#805ad5,#e53e3e)',
        }}/>
        Custom
      </button>
      {/* Native color input — triggered programmatically, doesn't steal focus */}
      <input
        ref={nativeRef} type="color" defaultValue="#1B4D3E"
        tabIndex={-1}
        style={{ width:0, height:0, opacity:0, position:'absolute', pointerEvents:'none' }}
        onInput={e => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
      />
    </div>
  )
}

function Toolbar({ editor }: { editor: EditorInstance }) {
  return (
    <div
      style={{
        display:'flex', flexWrap:'wrap', gap:2, alignItems:'center',
        padding:'5px 8px', borderBottom:'1px solid #e2e8f0',
        background:'#f8fafc', borderRadius:'6px 6px 0 0',
      }}
    >
      <div style={{ display:'flex', flexWrap:'wrap', gap:2, alignItems:'center', width:'100%' }}>
        <Btn active={editor.isActive('bold')}      title="Bold"      onMD={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </Btn>
        <Btn active={editor.isActive('italic')}    title="Italic"    onMD={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </Btn>
        <Btn active={editor.isActive('underline')} title="Underline" onMD={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </Btn>
        <Sep />
        {WEIGHTS.map(w => (
          <Btn key={w.v} active={editor.isActive('textStyle', { fontWeight: w.v })} title={w.t}
            onMD={() => editor.chain().focus().setFontWeight(w.v).run()}>
            <span style={{ fontWeight: w.v }}>{w.v}</span>
          </Btn>
        ))}
        <Sep />
        <SizeDropdown editor={editor} />
        <Sep />
        <Btn active={false} title="Clear formatting" onMD={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>✕</Btn>
      </div>
      <ColorPicker editor={editor} />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  minHeight?: number
}

export function RichTextEditor({ value, onChange, placeholder = 'Text লিখুন...', minHeight = 50 }: Props) {
  const [focused, setFocused] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, Underline, FontSize, FontWeight],
    content: value || '',
    // TipTap v3 in Next.js defaults immediatelyRender to false (to avoid
    // hydration mismatches). The Puck editor is client-only, so we force
    // immediate creation — otherwise the editor starts as null, misses the
    // async Puck field-value update, and the panel shows blank forever.
    immediatelyRender: true,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        style: [
          `min-height: ${minHeight}px`,
          'outline: none',
          'padding: 8px 10px',
          'font-family: var(--font-hind), sans-serif',
          'font-size: 14px',
          'line-height: 1.7',
          'color: #1a2e1a',
        ].join('; '),
        'data-placeholder': placeholder,
      },
    },
  })

  // Sync external value.
  // NOTE: `editor` is in the dep array so this runs when TipTap finishes
  // initialising (null → Editor object). Without it the effect exits early on
  // first mount (editor is still null), TipTap then initialises but the effect
  // never re-runs, leaving the field blank.
  useEffect(() => {
    if (!editor) return
    const incoming = value || ''
    const editorHTML = editor.getHTML()
    const isPlain = !/<[a-z][\s\S]*>/i.test(incoming)
    const normalized = isPlain && incoming ? `<p>${incoming}</p>` : incoming
    if (normalized !== editorHTML) {
      editor.commands.setContent(incoming, { emitUpdate: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) return (
    <div style={{ minHeight: `${minHeight}px`, border: '1px solid #d1d5db', borderRadius: 6, background: '#f9fafb' }} />
  )

  const stopProp = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <>
      <style>{`
        .rte-wrap [data-placeholder]:empty::before {
          content: attr(data-placeholder); color: #9ca3af; pointer-events: none;
        }
        .rte-wrap .tiptap p { margin: 0 0 4px; }
        .rte-wrap .tiptap p:last-child { margin-bottom: 0; }
      `}</style>
      <div
        className="rte-wrap"
        style={{
          border: `1px solid ${focused ? '#1B4D3E' : '#d1d5db'}`,
          borderRadius: 6,
          background: 'white',
        }}
        onMouseDown={stopProp}
        onClick={stopProp}
        onPointerDown={stopProp}
        onKeyDown={stopProp}
      >
        {focused && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
