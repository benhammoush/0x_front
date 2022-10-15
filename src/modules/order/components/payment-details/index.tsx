import { Payment, PaymentStatus } from "@medusajs/medusa"
import { SetStateAction, useEffect, useState } from "react"
import Spinner from "@modules/common/icons/spinner"

type PaymentDetailsProps = {
  payments: Payment[]
  paymentStatus: PaymentStatus
  paymentCrypto: any
}

const PaymentDetails = ({
  payments,
  paymentStatus,
  paymentCrypto,
}: PaymentDetailsProps) => {
  return (
    <div>
      <h2 className="text-base-semi dark:text-white">Payment</h2>
      <div className="my-2">
        {payments.map((p) => {
          switch (p.provider_id) {
            case "stripe":
              return <StripeDetails key={p.id} payment={p} />
            case "paypal":
              return <PayPalDetails key={p.id} />
            case "manual":
              return <CryptoDetails key={p.id} cryptoInfos={paymentCrypto} />
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

const PayPalDetails = () => {
  return (
    <div className="flex flex-col text-base-regular">
      <span className="text-gray-700 dark:text-gray-400 text-small-regular">
        PayPal
      </span>
      <span>PayPal payment</span>
    </div>
  )
}

const StripeDetails = ({ payment }: { payment: Payment }) => {
  const card: {
    brand: string
    last4: string
    exp_year: number
    exp_month: number
  } = (payment.data.charges as any).data[0].payment_method_details.card

  return (
    <div className="flex flex-col text-base-regular">
      <span className="text-gray-700 text-small-regular">
        {card.brand.substring(0, 1).toUpperCase()}
        {card.brand.substring(1)}
      </span>
      <span>************{card.last4}</span>
      <span>
        {card.exp_month > 9 ? card.exp_month : `0${card.exp_month}`} /{" "}
        {card.exp_year.toString().slice(2)}
      </span>
    </div>
  )
}

const CryptoDetails = (cryptoInfos: { cryptoInfos: SetStateAction<undefined> }) => {
  const [details, setDetails] = useState()
  useEffect(() => {
    {
      cryptoInfos.cryptoInfos != undefined
        ? setDetails(cryptoInfos.cryptoInfos)
        : ""
    }
  })
  return (
    <div className="flex flex-col w-full h-full text-base-regular">
      {details ? (
        <>
          <span className="text-gray-700 dark:text-gray-200 text-medium-regular">
            Hash
          </span>
          <span className="overflow-hidden text-[10px] text-gray-700 dark:text-gray-400">
            {details ? details[1] : ""}
          </span>
          <span className="text-gray-700 dark:text-gray-200 text-medium-regular">
            Network{" "}
          </span>
          <span className="overflow-hidden text-gray-700 dark:text-gray-400 text-small-regular">
            {details ? details[0] : ""}
          </span>
          <span className="text-gray-700 dark:text-gray-200 text-medium-regular">
            Currency{" "}
          </span>
          <span className="overflow-hidden text-gray-700 dark:text-gray-400 text-small-regular">
            {details ? details[3] : ""}
          </span>
          <span className="text-gray-700 dark:text-gray-200 text-medium-regular">
            Value{" "}
          </span>
            <span className="overflow-hidden text-gray-700 dark:text-gray-400 text-small-regular">
              {details ? details[2] : ""}
            </span>
        </>
      ) : (
        <div className="w-auto justify-centertext-center pt-[20%] items-center mx-auto">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default PaymentDetails
