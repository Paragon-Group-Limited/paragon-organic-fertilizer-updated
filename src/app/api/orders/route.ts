import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

function generateOrderNumber() {
  const now = new Date()
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `ORD-${ymd}-${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const {
      customerName, customerPhone, customerEmail,
      shippingAddress, deliveryArea, zipCode,
      items, subtotal, shippingCost, discount, total,
      couponCode, paymentMethod,
    } = body

    if (!customerName || !customerPhone || !shippingAddress || !deliveryArea) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Reject blocked phone numbers
    const blocked = await payload.find({
      collection: 'blocked-phones',
      where: { phone: { equals: customerPhone } },
      limit: 1,
      overrideAccess: true,
    })
    if (blocked.totalDocs > 0) {
      return NextResponse.json({ error: 'আপনার নম্বর থেকে অর্ডার করা সম্ভব হচ্ছে না। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।' }, { status: 403 })
    }

    const orderNumber = generateOrderNumber()

    const order = await payload.create({
      collection: 'orders',
      overrideAccess: true,
      data: {
        orderNumber,
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        shippingAddress,
        deliveryArea,
        zipCode: zipCode || undefined,
        items: (items || []).map((i: Record<string, unknown>) => ({
          productId: String(i.productId),
          productName: String(i.productName),
          slug: String(i.slug),
          price: Number(i.price),
          quantity: Number(i.quantity),
          subtotal: Number(i.subtotal),
        })),
        subtotal: Number(subtotal) || 0,
        shippingCost: Number(shippingCost) || 0,
        discount: Number(discount) || 0,
        total: Number(total) || 0,
        couponCode: couponCode || undefined,
        paymentMethod: paymentMethod || 'cod',
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, orderNumber: order.orderNumber, id: order.id })
  } catch (err) {
    console.error('[orders] create error:', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to create order', detail: message }, { status: 500 })
  }
}
