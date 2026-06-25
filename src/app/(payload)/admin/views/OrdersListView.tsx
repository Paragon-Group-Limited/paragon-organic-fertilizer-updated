'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AdminTable, type TableColumn } from '@/components/payload/AdminTable'

type OrderItem = {
  productId?: string
  productName?: string
  slug?: string
  price?: number
  quantity?: number
  subtotal?: number
}

type Order = {
  id: string
  orderNumber?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  shippingAddress?: string
  deliveryArea?: string
  zipCode?: string
  paymentMethod?: string
  status?: string
  subtotal?: number
  shippingCost?: number
  discount?: number
  total?: number
  couponCode?: string
  notes?: string
  items?: OrderItem[]
  createdAt?: string
}

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  pending:    { label: 'Pending',    bg: '#fef9c3', color: '#92400e' },
  confirmed:  { label: 'Confirmed',  bg: '#dbeafe', color: '#1e40af' },
  processing: { label: 'Processing', bg: '#ede9fe', color: '#5b21b6' },
  shipped:    { label: 'Shipped',    bg: '#d1fae5', color: '#065f46' },
  delivered:  { label: 'Delivered',  bg: '#dcfce7', color: '#166534' },
  cancelled:  { label: 'Cancelled',  bg: '#fee2e2', color: '#991b1b' },
}
const STATUS_KEYS = Object.keys(STATUS_META)

function StatusBadge({ status }: { status?: string }) {
  const s = status ?? 'pending'
  const m = STATUS_META[s] ?? STATUS_META.pending
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: m.bg, color: m.color, whiteSpace: 'nowrap' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
      {m.label}
    </span>
  )
}

function fmtDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' })
}

function buildSuspectPhones(orders: Order[]): Set<string> {
  const byPhone: Record<string, Order[]> = {}
  for (const o of orders) {
    if (!o.customerPhone) continue
    if (!byPhone[o.customerPhone]) byPhone[o.customerPhone] = []
    byPhone[o.customerPhone].push(o)
  }
  const suspects = new Set<string>()
  for (const [phone, ords] of Object.entries(byPhone)) {
    if (ords.length >= 2 && !ords.some(o => o.status === 'delivered')) {
      suspects.add(phone)
    }
  }
  return suspects
}

// ── Drawer sub-components (module-level) ──────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '18px 28px', borderBottom: '1px solid #f3f4f6' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</h3>
      {children}
    </div>
  )
}
function Row({ label, value, highlight }: { label: string; value?: string | null; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14, color: highlight ? '#1B4D3E' : '#374151', fontWeight: highlight ? 700 : 400, textAlign: 'right', wordBreak: 'break-word' }}>{value || '—'}</span>
    </div>
  )
}
function SummaryRow({ label, value, red }: { label: string; value: string; red?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: red ? '#dc2626' : '#374151' }}>{value}</span>
    </div>
  )
}

// ── Order detail drawer ───────────────────────────────────────────────────────
function OrderDrawer({ order, onClose, onStatusChange, isSuspect, isBlocked, onBlockToggle }: {
  order: Order
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
  isSuspect: boolean
  isBlocked: boolean
  onBlockToggle: (phone: string, block: boolean, orderCount: number) => Promise<void>
}) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState(order.status ?? 'pending')
  const [savingStatus, setSavingStatus] = useState(false)
  const [blockingPhone, setBlockingPhone] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const saveStatus = async () => {
    setSavingStatus(true)
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status }),
      })
      if (res.ok) onStatusChange(order.id, status)
    } finally { setSavingStatus(false) }
  }

  const handleBlockToggle = async () => {
    if (!order.customerPhone) return
    const confirmed = isBlocked
      ? confirm(`Unblock ${order.customerPhone}? They will be able to place orders again.`)
      : confirm(`Block ${order.customerPhone}? They will not be able to place any future orders.`)
    if (!confirmed) return
    setBlockingPhone(true)
    try {
      await onBlockToggle(order.customerPhone, !isBlocked, order.items?.length ?? 0)
    } finally { setBlockingPhone(false) }
  }

  const items = order.items ?? []
  const payLabel = order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, backdropFilter: 'blur(3px)' }} />
      <div ref={drawerRef} style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 620,
        background: '#fff', zIndex: 1001,
        boxShadow: '-16px 0 60px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-hind, system-ui, sans-serif)',
        animation: 'slideIn 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <style>{`@keyframes slideIn { from { transform: translateX(80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 14, background: 'linear-gradient(135deg,#1B4D3E,#2D7A5B)', flexShrink: 0 }}>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 9, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              {order.orderNumber ?? '—'}
              {isSuspect && <span title="Suspicious customer — multiple orders, none delivered" style={{ fontSize: 14 }}>⚠️</span>}
              {isBlocked && <span title="Phone is blocked" style={{ fontSize: 14 }}>🚫</span>}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{fmtDate(order.createdAt)}</div>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}>

          {(isSuspect || isBlocked) && (
            <div style={{ margin: '16px 28px 0', borderRadius: 10, overflow: 'hidden' }}>
              {isSuspect && !isBlocked && (
                <div style={{ padding: '10px 16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>Suspicious Activity Detected</div>
                    <div style={{ fontSize: 12, color: '#78350f', marginTop: 1 }}>This phone has multiple orders with none delivered. Possible fake order.</div>
                  </div>
                </div>
              )}
              {isBlocked && (
                <div style={{ padding: '10px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>🚫</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#991b1b' }}>Phone Number Blocked</div>
                    <div style={{ fontSize: 12, color: '#7f1d1d', marginTop: 1 }}>This number cannot place new orders. Unblock from the button below.</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <Section title="👤 Customer Info">
            <Row label="Name"    value={order.customerName} />
            <Row label="Phone"   value={order.customerPhone} highlight />
            <Row label="Email"   value={order.customerEmail || '—'} />
            <Row label="Address" value={order.shippingAddress} />
            <Row label="Area"    value={order.deliveryArea} />
            {order.zipCode && <Row label="ZIP" value={order.zipCode} />}
            {order.customerPhone && (
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={handleBlockToggle}
                  disabled={blockingPhone}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: `1px solid ${isBlocked ? '#d1d5db' : '#fecaca'}`,
                    background: isBlocked ? '#f0fdf4' : '#fff5f5', cursor: blockingPhone ? 'default' : 'pointer',
                    fontSize: 12, fontWeight: 700, color: isBlocked ? '#166534' : '#dc2626',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {blockingPhone ? '⏳' : isBlocked ? '✅ Unblock Phone' : '🚫 Block This Phone'}
                </button>
              </div>
            )}
          </Section>

          <Section title={`🛒 Products (${items.length} item${items.length !== 1 ? 's' : ''})`}>
            {items.length === 0 ? (
              <p style={{ fontSize: 13, color: '#9ca3af', padding: '4px 0' }}>No items</p>
            ) : (
              <div style={{ borderRadius: 10, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px', background: '#f9fafb', padding: '8px 14px', gap: 8 }}>
                  {['Product', 'Qty', 'Price', 'Total'].map(h => (
                    <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
                  ))}
                </div>
                {items.map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px', padding: '10px 14px', gap: 8, borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2e1a', lineHeight: 1.3 }}>{item.productName ?? '—'}</div>
                      {item.slug && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{item.slug}</div>}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#374151', textAlign: 'center' }}>{item.quantity ?? 0}</div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>Tk {item.price?.toLocaleString() ?? 0}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1B4D3E' }}>Tk {item.subtotal?.toLocaleString() ?? 0}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="💳 Payment Summary">
            <div style={{ borderRadius: 10, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
              <SummaryRow label="Subtotal"       value={`Tk ${order.subtotal?.toLocaleString() ?? 0}`} />
              <SummaryRow label="Shipping"       value={`Tk ${order.shippingCost?.toLocaleString() ?? 0}`} />
              {(order.discount ?? 0) > 0 && <SummaryRow label="Discount" value={`− Tk ${order.discount?.toLocaleString()}`} red />}
              {order.couponCode && <SummaryRow label="Coupon" value={order.couponCode} />}
              <SummaryRow label="Payment Method" value={payLabel ?? '—'} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#1B4D3E', borderTop: '2px solid #d4a017' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Total</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#D4A017' }}>Tk {order.total?.toLocaleString() ?? 0}</span>
              </div>
            </div>
          </Section>

          <Section title="🔄 Update Status">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                style={{ flex: 1, padding: '9px 12px', borderRadius: 9, border: '1px solid #d1d5db', fontSize: 14, outline: 'none', fontFamily: 'inherit', background: '#fff' }}
              >
                {STATUS_KEYS.map(val => (
                  <option key={val} value={val}>{STATUS_META[val].label}</option>
                ))}
              </select>
              <button
                onClick={saveStatus}
                disabled={savingStatus || status === order.status}
                style={{ padding: '9px 16px', borderRadius: 9, border: 'none', cursor: savingStatus || status === order.status ? 'default' : 'pointer', fontWeight: 700, fontSize: 13, background: savingStatus || status === order.status ? '#e5e7eb' : '#1B4D3E', color: savingStatus || status === order.status ? '#9ca3af' : '#fff' }}
              >
                {savingStatus ? '⏳' : '💾'} Save
              </button>
            </div>
          </Section>

          {order.notes && (
            <Section title="📝 Notes">
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0, padding: '10px 14px', background: '#fffbeb', borderRadius: 9, border: '1px solid #fde68a' }}>{order.notes}</p>
            </Section>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 28px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 10, background: '#fafafa', flexShrink: 0 }}>
          <a href={`/admin/collections/orders/${order.id}`}
            style={{ flex: 1, padding: '10px', borderRadius: 9, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
            ✏️ Full Edit
          </a>
          <button onClick={onClose}
            style={{ flex: 1, padding: '10px', borderRadius: 9, border: 'none', background: '#1B4D3E', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}

// ── Inline status dropdown (module-level) ─────────────────────────────────────
function InlineStatusSelect({ orderId, current, onChange }: {
  orderId: string
  current?: string
  onChange: (id: string, status: string) => void
}) {
  const [saving, setSaving] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setSaving(true)
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      })
      if (res.ok) onChange(orderId, newStatus)
    } finally { setSaving(false) }
  }

  const s = current ?? 'pending'
  const m = STATUS_META[s] ?? STATUS_META.pending

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {saving && (
        <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 10, pointerEvents: 'none' }}>⏳</span>
      )}
      <select
        value={s}
        onChange={handleChange}
        disabled={saving}
        style={{
          padding: '4px 28px 4px 10px', borderRadius: 999, border: `1.5px solid ${m.color}40`,
          background: m.bg, color: m.color, fontWeight: 700, fontSize: 12,
          fontFamily: 'inherit', cursor: 'pointer', outline: 'none',
          appearance: 'none', WebkitAppearance: 'none', paddingRight: 24,
        }}
      >
        {STATUS_KEYS.map(val => (
          <option key={val} value={val}>{STATUS_META[val].label}</option>
        ))}
      </select>
      <span style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: m.color, pointerEvents: 'none' }}>▼</span>
    </div>
  )
}

// ── Main list view ────────────────────────────────────────────────────────────
export default function OrdersListView() {
  const [orders, setOrders]               = useState<Order[]>([])
  const [loading, setLoading]             = useState(true)
  const [drawerOrder, setDrawerOrder]     = useState<Order | null>(null)
  const [deletingId, setDeletingId]       = useState<string | null>(null)
  const [search, setSearch]               = useState('')
  const [blockedPhones, setBlockedPhones] = useState<Set<string>>(new Set())

  const loadBlockedPhones = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blocked-phones')
      const data = await res.json()
      setBlockedPhones(new Set(data.phones ?? []))
    } catch { /* ignore */ }
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data.docs ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    load()
    loadBlockedPhones()
  }, [load, loadBlockedPhones])

  const suspectPhones = buildSuspectPhones(orders)

  const handleDelete = async (order: Order) => {
    if (!confirm(`Delete order ${order.orderNumber}?\nThis cannot be undone.`)) return
    setDeletingId(order.id)
    try {
      await fetch(`/api/admin/orders?id=${order.id}`, { method: 'DELETE' })
      setOrders(prev => prev.filter(o => o.id !== order.id))
      if (drawerOrder?.id === order.id) setDrawerOrder(null)
    } finally { setDeletingId(null) }
  }

  const handleStatusChange = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setDrawerOrder(prev => prev?.id === id ? { ...prev, status } : prev)
  }

  const handleBlockToggle = async (phone: string, block: boolean, orderCount: number) => {
    if (block) {
      await fetch('/api/admin/blocked-phones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, reason: 'Blocked by admin from Orders list', orderCount }),
      })
      setBlockedPhones(prev => new Set([...prev, phone]))
    } else {
      await fetch(`/api/admin/blocked-phones?phone=${encodeURIComponent(phone)}`, { method: 'DELETE' })
      setBlockedPhones(prev => { const s = new Set(prev); s.delete(phone); return s })
    }
  }

  const displayed = search.trim()
    ? orders.filter(o =>
        (o.orderNumber ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (o.customerName ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (o.customerPhone ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : orders

  // Column definitions — closed over component state
  const columns: TableColumn<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Order Number',
      render: (order) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1B4D3E', fontFamily: 'monospace' }}>
            {order.orderNumber ?? '—'}
          </span>
          {blockedPhones.has(order.customerPhone ?? '') && (
            <span title="Phone blocked" style={{ fontSize: 13 }}>🚫</span>
          )}
          {suspectPhones.has(order.customerPhone ?? '') && !blockedPhones.has(order.customerPhone ?? '') && (
            <span title="Suspicious customer" style={{ fontSize: 13 }}>⚠️</span>
          )}
        </div>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer Name',
      render: (order) => (
        <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{order.customerName ?? '—'}</span>
      ),
    },
    {
      key: 'customerPhone',
      header: 'Phone',
      render: (order) => (
        <a href={`tel:${order.customerPhone}`} style={{ fontSize: 13, color: '#1B4D3E', fontWeight: 600, textDecoration: 'none' }}>
          {order.customerPhone ?? '—'}
        </a>
      ),
    },
    {
      key: 'total',
      header: 'Total (BDT)',
      render: (order) => (
        <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
          {order.total != null ? `Tk ${order.total.toLocaleString()}` : '—'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (order) => (
        <InlineStatusSelect orderId={order.id} current={order.status} onChange={handleStatusChange} />
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (order) => (
        <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDate(order.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (order) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setDrawerOrder(order)}
            style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1B4D3E', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            👁 Details
          </button>
          <button
            onClick={() => handleDelete(order)}
            disabled={deletingId === order.id}
            style={{ padding: '5px 10px', borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 11, fontWeight: 700, color: '#dc2626', cursor: deletingId === order.id ? 'default' : 'pointer' }}
          >
            {deletingId === order.id ? '⏳' : '🗑️'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '32px 32px 48px', minHeight: '100vh', background: '#f9fafb', fontFamily: 'var(--font-hind, system-ui, sans-serif)' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#111827' }}>Orders</h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {loading ? '…' : `${orders.length} total orders`}
            {blockedPhones.size > 0 && (
              <span style={{ marginLeft: 12, padding: '2px 10px', borderRadius: 999, background: '#fee2e2', color: '#991b1b', fontSize: 12, fontWeight: 700 }}>
                🚫 {blockedPhones.size} blocked {blockedPhones.size === 1 ? 'number' : 'numbers'}
              </span>
            )}
            {suspectPhones.size > 0 && (
              <span style={{ marginLeft: 8, padding: '2px 10px', borderRadius: 999, background: '#fffbeb', color: '#92400e', fontSize: 12, fontWeight: 700 }}>
                ⚠️ {suspectPhones.size} suspicious
              </span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>🔄 Refresh</button>
          <a href="/admin/collections/blocked-phones" style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #fecaca', background: '#fff5f5', fontSize: 12, fontWeight: 700, color: '#dc2626', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            🚫 Blocked Numbers
          </a>
          <a href="/admin/collections/orders/create" style={{ padding: '8px 16px', borderRadius: 8, background: '#1B4D3E', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            + Create New
          </a>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 14px', marginBottom: 16, maxWidth: 400 }}>
        <span style={{ fontSize: 14, color: '#9ca3af' }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by order #, name, or phone…"
          style={{ border: 'none', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit', background: 'transparent', color: '#374151' }}
        />
        {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9ca3af' }}>✕</button>}
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={displayed}
        loading={loading}
        emptyMessage={search ? `No orders match "${search}"` : 'No orders yet'}
        defaultPageSize={10}
        getRowBg={(order) => {
          if (blockedPhones.has(order.customerPhone ?? '')) return { bg: '#fff5f5', hoverBg: '#fff0f0' }
          if (suspectPhones.has(order.customerPhone ?? '')) return { bg: '#fffff5', hoverBg: '#fffbeb' }
          return undefined
        }}
      />

      {/* Drawer */}
      {drawerOrder && (
        <OrderDrawer
          order={drawerOrder}
          onClose={() => setDrawerOrder(null)}
          onStatusChange={handleStatusChange}
          isSuspect={suspectPhones.has(drawerOrder.customerPhone ?? '')}
          isBlocked={blockedPhones.has(drawerOrder.customerPhone ?? '')}
          onBlockToggle={handleBlockToggle}
        />
      )}
    </div>
  )
}
