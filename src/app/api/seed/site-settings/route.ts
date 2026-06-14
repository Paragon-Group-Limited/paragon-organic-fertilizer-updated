import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'প্যারাগন',
        siteSubtitle: 'Organic Fertilizer',
        ctaLabel: 'এখনই কিনুন',
        ctaHref: '/contact',
        socialLinks: [
          {
            icon: 'link',
            url: 'https://www.paragongroup-bd.com/',
            label: 'Paragon Group Website',
          },
          {
            icon: 'link',
            url: 'https://www.paragongroup-bd.com/business-activities/organic-fertilizer/',
            label: 'Paragon Organic Fertilizer — Group Site',
          },
          {
            icon: 'facebook',
            url: 'https://www.facebook.com/paragongroup.bd/',
            label: 'Paragon Group Facebook',
          },
          {
            icon: 'facebook',
            url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02zu644E8wMvt4xj2X51jgYTp1GWgUHjAZH2XCHtKQRYcqa9ccyop1LBJhF9QqJqNkl&id=61573339337688',
            label: 'Paragon Organic Facebook Post',
          },
          {
            icon: 'linkedin',
            url: 'https://www.linkedin.com/company/paragon-group-bd/',
            label: 'Paragon Group LinkedIn',
          },
        ],
      },
    })

    return NextResponse.json({ success: true, message: 'site-settings seeded with social links' })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
