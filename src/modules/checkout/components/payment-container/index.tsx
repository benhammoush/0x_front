import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentCrypto from "../payment-crypto"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  manual: {
    title: "Crypto",
    description: "Secure payment with metamask",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-y-4 border-b border-gray-200 dark:border-darkborder last:border-b-0",
        {
          "bg-gray-50 dark:bg-darkbg": selected,
        }
      )}
    >
      <button
        className={"grid grid-cols-[12px_1fr] gap-x-4 py-4 px-8"}
        onClick={setSelected}
        disabled={selected}
      >
        <Radio checked={selected} />
        <div className="flex flex-col text-left">
          <h3 className="leading-none text-gray-900 dark:text-white text-base-semi">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span className="mt-2 text-gray-700 dark:text-gray-400 text-small-regular">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
          {selected && (
            <div className="z-0 w-full mt-4">
              <PaymentElement paymentSession={paymentSession} />
            </div>
          )}
        </div>
      </button>
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) => {
  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pt-8 pr-7">
          <PaymentStripe />
        </div>
      )
    case "manual":
      return (
       <PaymentCrypto />
        )
       default:
      return null
  }
}

export default PaymentContainer
