import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const DEMO_PRODUCTS = [
  {
    name: 'Joibo Sar 01 kg Bag',
    nameBn: 'জৈব সার ০১ কেজি ব্যাগ',
    slug: 'joibo-sar-01kg',
    category: 'organic-fertilizer',
    price: 88,
    comparePrice: 100,
    weight: '1 kg',
    rating: 4.5,
    reviewCount: 32,
    status: 'published',
    featured: false,
    shortDescription: 'ছোট বাগান ও পরীক্ষামূলক চাষের জন্য আদর্শ। উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার।',
  },
  {
    name: 'Joibo Sar 05 Kg Bag',
    nameBn: 'জৈব সার ০৫ কেজি ব্যাগ',
    slug: 'joibo-sar-05kg',
    category: 'organic-fertilizer',
    price: 176,
    comparePrice: 220,
    weight: '5 kg',
    rating: 5,
    reviewCount: 18,
    status: 'published',
    featured: true,
    shortDescription: 'মাঝারি জমির জন্য সবচেয়ে জনপ্রিয় ও সাশ্রয়ী সাইজ।',
  },
  {
    name: 'Joibo Sar 40 Kg Bag',
    nameBn: 'জৈব সার ৪০ কেজি ব্যাগ',
    slug: 'joibo-sar-40kg',
    category: 'organic-fertilizer',
    price: 670,
    comparePrice: null,
    weight: '40 kg',
    rating: 5,
    reviewCount: 12,
    status: 'published',
    featured: false,
    shortDescription: 'বড় ক্ষেত ও বাণিজ্যিক চাষের জন্য। একটি প্যাকেজেই বড় জমির চাষ সহজ হয়ে যায়।',
  },
  {
    name: 'Vermicompost Premium',
    nameBn: 'ভার্মিকম্পোস্ট প্রিমিয়াম',
    slug: 'vermicompost-premium',
    category: 'vermicompost',
    price: 0,
    comparePrice: null,
    weight: null,
    rating: 0.1,
    reviewCount: 1,
    status: 'upcoming',
    featured: false,
    shortDescription: 'শীঘ্রই আসছে — প্রিমিয়াম ভার্মিকম্পোস্ট।',
  },
]

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results = []

    for (const product of DEMO_PRODUCTS) {
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: product.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        results.push({ slug: product.slug, action: 'skipped (already exists)' })
        continue
      }

      const created = await payload.create({
        collection: 'products',
        overrideAccess: true,
        data: {
          name: product.name,
          nameBn: product.nameBn,
          slug: product.slug,
          category: product.category,
          price: product.price,
          ...(product.comparePrice ? { comparePrice: product.comparePrice } : {}),
          weight: product.weight ?? undefined,
          rating: product.rating,
          reviewCount: product.reviewCount,
          status: product.status,
          featured: product.featured,
          shortDescription: product.shortDescription,
        },
      })
      results.push({ slug: product.slug, action: 'created', id: created.id })
    }

    return NextResponse.json({ success: true, results })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
