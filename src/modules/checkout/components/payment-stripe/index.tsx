import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js"
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from "@stripe/stripe-js"
import React, { useMemo } from "react"

const PaymentStripe: React.FC = () => {
  const useOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#808080",
          padding: "10px 12px",
          "::placeholder": {
            color: "#CFD7E0",
          },
        },
      },
    }
  }, [])

  return (
    <div>
      <div className="relative flex flex-col w-full pb-6">
        <CardNumber options={useOptions as StripeCardNumberElementOptions} />
        <div className="relative flex items-center mt-12 gap-x-4">
          <CardExpiry options={useOptions as StripeCardExpiryElementOptions} />
          <CardCVC options={useOptions as StripeCardCvcElementOptions} />
        </div>
      </div>
    </div>
  )
}

const CardNumber = ({
  options,
}: {
  options: StripeCardNumberElementOptions
}) => {
  return (
    <div className="relative py-2 border-b border-gray-200">
      <span className="absolute text-gray-700 dark:text-gray-400 -top-6 text-base-regular">
        Card number
      </span>
      <CardNumberElement options={options} />
    </div>
  )
}

const CardExpiry = ({
  options,
}: {
  options: StripeCardExpiryElementOptions
}) => {
  return (
    <div className="relative w-full py-2 border-b border-gray-200">
      <span className="absolute text-gray-700 dark:text-gray-400 -top-6 text-base-regular">
        Expiration date
      </span>
      <CardExpiryElement options={options} />
    </div>
  )
}

const CardCVC = ({ options }: { options: StripeCardCvcElementOptions }) => {
  return (
    <div className="relative w-full py-2 border-b border-gray-200">
      <span className="absolute text-gray-700 dark:text-gray-400 -top-6 text-base-regular">
        CVC
      </span>
      <CardCvcElement options={{ ...options, placeholder: "123" }} />
    </div>
  )
}

export default PaymentStripe
