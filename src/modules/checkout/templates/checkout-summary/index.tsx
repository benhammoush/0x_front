import DiscountCode from "@modules/checkout/components/discount-code"
import GiftCard from "@modules/checkout/components/gift-card"
import PaymentButton from "@modules/checkout/components/payment-button"
import CartTotals from "@modules/common/components/cart-totals"
import { useCart } from "medusa-react"

const CheckoutSummary = () => {
  const { cart } = useCart()

  if (!cart?.id) {
    return null
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8">
      <div className="flex flex-col w-full p-6 bg-white border rounded-lg dark:border-darkborder dark:bg-mediumbg gap-y-6">
        <CartTotals cart={cart} />
        <PaymentButton paymentSession={cart?.payment_session} />
      </div>
      <div className="p-6 bg-white border rounded-lg dark:bg-mediumbg dark:border-darkborder">
        <DiscountCode cart={cart} />
      </div>
      <GiftCard cart={cart} />
    </div>
  )
}

export default CheckoutSummary
