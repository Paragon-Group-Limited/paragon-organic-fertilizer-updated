'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { richTextField } from '@/puck/fields/richTextField'
import { RichText } from '@/components/puck/RichText'
import { useT } from '@/hooks/useT'

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([^?&\s/]+)/
  )
  return match ? match[1] : null
}

function VideoCard({
  url,
  title,
  index,
  inView,
}: {
  url: string
  title?: string
  index: number
  inView: boolean
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const videoId = getYouTubeId(url)

  if (!videoId) return null

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12, duration: 0.65 }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={title || 'ভিডিও দেখুন'}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            cursor: 'pointer',
            aspectRatio: '9/16',
            background: '#0a1f14',
            boxShadow: hovered
              ? '0 28px 56px rgba(0,0,0,0.45)'
              : '0 8px 28px rgba(0,0,0,0.25)',
            transition: 'box-shadow 0.35s ease',
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
            }}
          />

          {/* Play button */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.93)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hovered ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: hovered
                  ? '0 0 0 10px rgba(255,255,255,0.2), 0 8px 28px rgba(0,0,0,0.45)'
                  : '0 4px 18px rgba(0,0,0,0.35)',
              }}
            >
              <span
                style={{ fontSize: 22, color: '#1B4D3E', marginLeft: 3, lineHeight: 1 }}
              >
                ▶
              </span>
            </div>
          </div>

          {/* Title at bottom */}
          {title && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px 14px 16px',
              }}
            >
              <p
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.45,
                  textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                  fontFamily: 'var(--font-hind)',
                }}
              >
                {title}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0,0,0,0.93)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 880,
              aspectRatio: '16/9',
              cursor: 'default',
            }}
          >
            <iframe
              src={embedUrl}
              title={title || 'YouTube video'}
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: 12 }}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 700,
                color: '#1a2e1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function YouTubeVideoGridRender(props: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t = useT()

  const videos: { url: string; title?: string }[] = props.videos || []
  const validVideos = videos.filter((v) => v.url && getYouTubeId(v.url))

  if (validVideos.length === 0) {
    return (
      <section
        ref={ref}
        style={{ background: props.bgColor || '#0F2E24', padding: '80px 20px' }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'var(--font-hind)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
          <p>Puck editor থেকে YouTube video URL যোগ করুন</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: props.bgColor || '#0F2E24' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        {props.heading && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {props.tagText && (
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
                style={{
                  background: 'rgba(212,160,23,0.18)',
                  color: '#F5C842',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <RichText html={t(props.tagText)} inline />
              </span>
            )}
            <h2
              className="text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: 'var(--font-hind)' }}
            >
              <RichText html={t(props.heading)} inline />{' '}
              {props.headingHighlight && (
                <span style={{ color: '#F5C842' }}>
                  <RichText html={t(props.headingHighlight)} inline />
                </span>
              )}
            </h2>
            {props.subheading && (
              <RichText
                html={t(props.subheading)}
                className="mt-4 text-base max-w-2xl mx-auto"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-hind)' }}
              />
            )}
          </motion.div>
        )}

        {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {validVideos.map((video, i) => (
            <VideoCard
              key={i}
              url={video.url}
              title={video.title}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const youTubeVideoGridBlock = {
  YouTubeVideoGridBlock: {
    label: '🎬 YouTube Video Grid',
    fields: {
      tagText: richTextField('Tag (pill badge)'),
      heading: richTextField('Section Heading'),
      headingHighlight: richTextField('Heading Highlight (gold)'),
      subheading: richTextField('Subheading (optional)'),
      bgColor: { type: 'text' as const, label: 'Background Color (CSS)' },
      videos: {
        type: 'array' as const,
        label: 'Videos',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getItemSummary: (item: any) => item.title || item.url || 'Video',
        arrayFields: {
          url: { type: 'text' as const, label: 'YouTube URL (youtube.com/watch?v=... বা youtu.be/...)' },
          title: { type: 'text' as const, label: 'Title (optional — ভিডিওর নিচে দেখাবে)' },
        },
        defaultItemProps: { url: '', title: '' },
      },
    },
    defaultProps: {
      tagText: 'আমাদের ভিডিও',
      heading: 'কৃষকের',
      headingHighlight: 'সাফল্যের ভিডিও',
      subheading: '',
      bgColor: '#0F2E24',
      videos: [],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (props: any) => <YouTubeVideoGridRender {...props} />,
  },
}
