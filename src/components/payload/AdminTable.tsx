'use client'

import { useState, useEffect, useRef } from 'react'

export type TableColumn<T> = {
  key: string
  header: string
  width?: string
  render: (row: T) => React.ReactNode
}

type RowBg = { bg: string; hoverBg: string }

type AdminTableProps<T extends { id: string }> = {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  defaultPageSize?: number
  getRowBg?: (row: T) => RowBg | undefined
}

const PAGE_SIZES = [10, 20, 50]

export function AdminTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data',
  defaultPageSize = 10,
  getRowBg,
}: AdminTableProps<T>) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [selected, setSelected] = useState<string[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const cbRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setPage(1) }, [data.length])

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const pageData = data.slice(start, start + pageSize)
  const pageIds = pageData.map(r => r.id)

  const allSelected = pageIds.length > 0 && pageIds.every(id => selected.includes(id))
  const someSelected = pageIds.some(id => selected.includes(id))

  useEffect(() => {
    if (cbRef.current) cbRef.current.indeterminate = someSelected && !allSelected
  }, [someSelected, allSelected])

  const toggleAll = () => {
    if (allSelected) {
      setSelected(s => s.filter(id => !pageIds.includes(id)))
    } else {
      setSelected(s => [...new Set([...s, ...pageIds])])
    }
  }

  const toggleRow = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  const pageChips = buildPageChips(currentPage, totalPages)

  const cbStyle: React.CSSProperties = { width: 15, height: 15, cursor: 'pointer', accentColor: '#1B4D3E' }

  return (
    <div>
      {/* Selection banner */}
      {selected.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
          background: 'rgba(27,77,62,0.08)', borderRadius: 8, padding: '8px 14px',
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1B4D3E' }}>
            {selected.length} selected
          </span>
          <button
            onClick={() => setSelected([])}
            style={{ fontSize: 12, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontFamily: 'inherit' }}
          >
            Deselect all
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ width: 44, padding: '10px 14px', textAlign: 'center' }}>
                  <input
                    ref={cbRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    style={cbStyle}
                  />
                </th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#6b7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                      width: col.width,
                    }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                    ⏳ Loading...
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : pageData.map(row => {
                const isSelected = selected.includes(row.id)
                const isHovered = hoveredId === row.id
                const rowBg = getRowBg?.(row)
                const bg = isSelected
                  ? 'rgba(27,77,62,0.07)'
                  : isHovered
                    ? (rowBg?.hoverBg ?? '#f9fafb')
                    : (rowBg?.bg ?? '#fff')

                return (
                  <tr
                    key={row.id}
                    style={{ borderBottom: '1px solid #f3f4f6', background: bg, transition: 'background 0.12s' }}
                    onMouseEnter={() => setHoveredId(row.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                        style={cbStyle}
                      />
                    </td>
                    {columns.map(col => (
                      <td key={col.key} style={{ padding: '11px 16px' }}>
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 16, flexWrap: 'wrap', gap: 10,
        }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>
            Showing {start + 1}–{Math.min(start + pageSize, data.length)} of {data.length}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
              style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid #e5e7eb', fontSize: 12, color: '#374151', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {PAGE_SIZES.map(n => <option key={n} value={n}>{n} per page</option>)}
            </select>
            <div style={{ display: 'flex', gap: 3 }}>
              <PagBtn label="«" disabled={currentPage === 1} onClick={() => setPage(1)} />
              <PagBtn label="‹" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))} />
              {pageChips.map((chip, i) =>
                chip === '...' ? (
                  <span key={`e${i}`} style={{ width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#9ca3af' }}>…</span>
                ) : (
                  <PagBtn
                    key={chip}
                    label={String(chip)}
                    active={chip === currentPage}
                    onClick={() => setPage(chip as number)}
                  />
                )
              )}
              <PagBtn label="›" disabled={currentPage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
              <PagBtn label="»" disabled={currentPage === totalPages} onClick={() => setPage(totalPages)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PagBtn({ label, disabled, active, onClick }: {
  label: string
  disabled?: boolean
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 7,
        border: active ? '1.5px solid #1B4D3E' : '1px solid #e5e7eb',
        background: active ? '#1B4D3E' : disabled ? '#f9fafb' : '#fff',
        color: active ? '#fff' : disabled ? '#d1d5db' : '#374151',
        fontSize: 13,
        fontWeight: active ? 700 : 400,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  )
}

function buildPageChips(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set<number>()
  set.add(1)
  set.add(total)
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) set.add(i)
  const sorted = [...set].sort((a, b) => a - b)
  const result: (number | '...')[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) result.push('...')
    result.push(p)
    prev = p
  }
  return result
}
