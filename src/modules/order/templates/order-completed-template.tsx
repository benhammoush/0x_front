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

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })


type OrderCompletedTemplateProps = {
  order: Order
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const [CryptoPayment, setCryptoPayment] = useState()
  const [bool, setBool] = useState(true)
  var cartId = order.cart_id

  {bool ? medusa.carts.retrieve(cartId)
    .then(({ cart }) => {
      setCryptoPayment(cart.context.CryptoPayment)
      setBool(false)
    }) : ""}   
  
 
  return (
    <div className="bg-gray-50 dark:bg-darkbg dark:text-gray-400 py-6 min-h-[calc(100vh-64px)]">
      <div className="flex justify-center content-container">
        <div className="w-full h-full max-w-4xl bg-white rounded dark:textw dark:bg-mediumbg dark:border dark:border-darkborder">
          <OrderDetails order={order} />
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <div className="grid grid-cols-1 gap-4 p-10 border-b border-gray-200 dark:border-darkborder lg:grid-cols-2">
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

export default OrderCompletedTemplate
