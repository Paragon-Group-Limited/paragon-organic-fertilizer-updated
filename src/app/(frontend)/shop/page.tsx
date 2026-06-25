import { Suspense } from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import { Leaf } from 'lucide-react'
import ShopClientLayout from '@/components/shop/ShopClientLayout'
import type { ShopProduct } from '@/components/shop/ShopClientLayout'

type SearchParams = { category?: string; sort?: string; status?: string; q?: string }

async function fetchProducts(params: SearchParams) {
  try {
    const payload = await getPayload({ config })

    let where: Where = {}

    if (params.q) {
      where = {
        or: [
          { name: { like: params.q } },
          { nameBn: { like: params.q } },
        ],
      }
    } else if (params.status === 'upcoming') {
      where = { status: { equals: 'upcoming' } }
    } else if (params.category && params.category !== 'all') {
      where = { and: [{ category: { equals: params.category } }, { status: { equals: 'published' } }] }
    } else {
      where = { status: { in: ['published', 'upcoming'] } }
    }

    let sort = '-createdAt'
    if (params.sort === 'price-asc') sort = 'price'
    if (params.sort === 'price-desc') sort = '-price'
    if (params.sort === 'rating') sort = '-rating'

    const result = await payload.find({
      collection: 'products',
      where,
      sort,
      limit: 60,
      depth: 1,
    })

    return result.docs
  } catch {
    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const products = await fetchProducts(params)

  const activeCategory = params.category || 'all'
  const activeSort = params.sort || 'newest'
  const activeStatus = params.status

  const searchQuery = params.q || ''
  const heading = searchQuery
    ? `"${searchQuery}" এর ফলাফল`
    : activeStatus === 'upcoming' ? 'Upcoming Products'
    : activeCategory === 'organic-fertilizer' ? 'Organic Fertilizer'
    : activeCategory === 'vermicompost' ? 'Vermicompost'
    : 'All Products'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F7F4' }}>

      {/* Hero banner */}
      <div className="pt-24 pb-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A5B 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #D4A017 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4ade80 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid rgba(212,160,23,0.4)' }}>
              <Leaf className="w-4 h-4" style={{ color: '#D4A017' }} />
            </div>
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#D4A017' }}>
              Paragon Organic
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-hind)' }}>
            {heading}
          </h1>
          <p className="text-white/60 text-sm">
            {products.length} product{products.length !== 1 ? 's' : ''} {searchQuery ? 'found' : 'available'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex gap-8">
            <div className="hidden lg:block w-64 shrink-0 rounded-2xl bg-white h-48 animate-pulse" />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-2xl bg-white h-72 animate-pulse" />
              ))}
            </div>
          </div>
        }>
          <ShopClientLayout
            products={products.map((p): ShopProduct => ({
              id: String(p.id),
              name: p.name,
              nameBn: (p as Record<string, unknown>).nameBn as string | undefined,
              slug: p.slug,
              price: p.price as number | undefined,
              comparePrice: (p as Record<string, unknown>).comparePrice as number | undefined,
              category: p.category as string | undefined,
              status: p.status as string | undefined,
              image: p.image as { url?: string | null; alt?: string } | null,
              rating: (p as Record<string, unknown>).rating as number | undefined,
              reviewCount: (p as Record<string, unknown>).reviewCount as number | undefined,
              weight: (p as Record<string, unknown>).weight as string | undefined,
              shortDescription: (p as Record<string, unknown>).shortDescription as string | undefined,
            }))}
            activeCategory={activeCategory}
            activeSort={activeSort}
            activeStatus={activeStatus}
          />
        </Suspense>
      </div>
    </div>
  )
}
