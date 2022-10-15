import { MEDUSA_BACKEND_URL } from "@lib/config"
import { Order } from "@medusajs/medusa"
import Medusa from "@medusajs/medusa-js"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import React, { useState } from "react"

type OrderDetailsTemplateProps = {
  order: Order
}

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })


const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const [CryptoPayment, setCryptoPayment] = useState<any>()
  const [bool, setBool] = useState(true)
  var cartId = order.cart_id

  {bool ? medusa.carts.retrieve(cartId)
    .then(({ cart }) => {
      setCryptoPayment(cart.context.CryptoPayment)
      setBool(false)
    }) : ""}   
  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="flex justify-center content-container">
        <div className="w-full h-full max-w-4xl bg-white">
          <OrderDetails order={order} showStatus />
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <div className="grid grid-cols-1 gap-4 p-10 border-b border-gray-200 lg:grid-cols-2">
            <PaymentDetails
              payments={order.payments}
              paymentStatus={order.payment_status}
              paymentCrypto={CryptoPayment}
            />
            <ShippingDetails
              shippingMethods={order.shipping_methods}
              address={order.shipping_address}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 p-10 lg:grid-cols-2">
            <Help />
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
