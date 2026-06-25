import type { CollectionConfig } from 'payload'

export const DELIVERY_AREAS = [
  { name: 'Inside Dhaka', cost: 60 },
  { name: 'Outside Dhaka', cost: 120 },
]

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'customerPhone', 'total', 'status', 'createdAt'],
    description: 'Customer orders',
    components: {
      views: {
        list: {
          Component: '@/app/(payload)/admin/views/OrdersListView',
        },
      },
    },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Order Number',
      admin: { readOnly: true },
    },
    {
      name: 'customerName',
      type: 'text',
      label: 'Customer Name',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      label: 'Phone Number',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      label: 'Email (Optional)',
    },
    {
      name: 'shippingAddress',
      type: 'textarea',
      label: 'Street Address',
      required: true,
    },
    {
      name: 'deliveryArea',
      type: 'text',
      label: 'Delivery Area',
      required: true,
    },
    {
      name: 'zipCode',
      type: 'text',
      label: 'ZIP Code',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Order Items',
      fields: [
        { name: 'productId', type: 'text', label: 'Product ID' },
        { name: 'productName', type: 'text', label: 'Product Name' },
        { name: 'slug', type: 'text', label: 'Slug' },
        { name: 'price', type: 'number', label: 'Unit Price' },
        { name: 'quantity', type: 'number', label: 'Quantity' },
        { name: 'subtotal', type: 'number', label: 'Item Subtotal' },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      label: 'Subtotal (BDT)',
    },
    {
      name: 'shippingCost',
      type: 'number',
      label: 'Shipping Cost (BDT)',
    },
    {
      name: 'discount',
      type: 'number',
      label: 'Discount (BDT)',
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      label: 'Total (BDT)',
    },
    {
      name: 'couponCode',
      type: 'text',
      label: 'Coupon Code Used',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Payment Method',
      options: [
        { label: 'Cash on Delivery', value: 'cod' },
      ],
      defaultValue: 'cod',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Order Status',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
    },
  ],
}
