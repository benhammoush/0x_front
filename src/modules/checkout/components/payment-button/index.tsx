import { Transition } from "@headlessui/react"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { useCheckout } from "@lib/context/checkout-context"
import { PaymentSession } from "@medusajs/medusa"
import Medusa from "@medusajs/medusa-js"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useCart } from "medusa-react"
import React, { useEffect, useState } from "react"
import * as data from "../payment-crypto/json/datas.json"
import { utils } from "ethers"

declare var window: any

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const { cart } = useCart()

  useEffect(() => {
    setNotReady(true)

    if (!cart) {
      return
    }

    if (!cart.shipping_address) {
      return
    }

    if (!cart.billing_address) {
      return
    }

    if (!cart.email) {
      return
    }

    if (cart.shipping_methods.length < 1) {
      return
    }

    setNotReady(false)
  }, [cart])

  switch (paymentSession?.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton session={paymentSession} notReady={notReady} />
      )
    case "manual":
      return <CryptoPaymentButton notReady={notReady} />
    case "paypal":
      return (
        <PayPalPaymentButton notReady={notReady} session={paymentSession} />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("cardNumber")

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [stripe, elements])

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address.first_name +
              " " +
              cart.billing_address.last_name,
            address: {
              city: cart.billing_address.city ?? undefined,
              country: cart.billing_address.country_code ?? undefined,
              line1: cart.billing_address.address_1 ?? undefined,
              line2: cart.billing_address.address_2 ?? undefined,
              postal_code: cart.billing_address.postal_code ?? undefined,
              state: cart.billing_address.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        disabled={submitting || disabled || notReady}
        onClick={handlePayment}
      >
        {submitting ? <Spinner /> : "Checkout"}
      </Button>
      {errorMessage && (
        <div className="mt-2 text-red-500 text-small-regular">
          {errorMessage}
        </div>
      )}
    </>
  )
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

const PayPalPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: cart?.region.currency_code.toUpperCase(),
        intent: "authorize",
      }}
    >
      {errorMessage && (
        <span className="mt-4 text-rose-500">{errorMessage}</span>
      )}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async () => session.data.id as string}
        onApprove={handlePayment}
        disabled={notReady || submitting}
      />
    </PayPalScriptProvider>
  )
}

const CryptoPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const { onPaymentCompleted } = useCheckout()
  const { ethers } = require("ethers")
  const cart = useCart()
  const [alertText, setAlertText] = useState<any>()
  const [alertType, setAlertType] = useState("info")
  const [isShowing, setIsShowing] = useState(false)
  const datas = data

  /**
   *
   */
  async function checkWeb3Ready() {
    try {
      setIsShowing(true)
      setAlertType("info")
      setAlertText("waiting for wallet")
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      const accounts = await provider
        .send("eth_requestAccounts", [])
        .catch((err: { toString: () => any }) => isError("Wallet canceled"))
      {
        accounts ? sendPayment() : ""
      }
    } catch (error) {
      isError("Missing wallet extension")
    } finally {
    }
  }

  /**
   *
   */
  async function sendPayment() {
    setAlertText("waiting user confirmation")
    let docelem1 = document.getElementById("network")
    let docelem2 = document.getElementById("currency")

    let networkIndex = docelem1?.getAttribute("networkIndex") || 1
    let currencyIndex = docelem2?.getAttribute("currencyIndex") || 1

    const clientNetwork = datas.supportednetworks[Number(networkIndex)]
    const clientCurrency =
      datas.supportednetworks[Number(networkIndex)].accept[
        Number(currencyIndex)
      ]
    const isNative =
      datas.supportednetworks[Number(networkIndex)].accept[
        Number(currencyIndex)
      ].isnative
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const accounts = await provider
      .send("eth_requestAccounts", [])
      .catch((err: { toString: () => any }) => isError("Wallet canceled"))
    const walletNetwork = await provider.getNetwork()
    const signer = provider.getSigner()

    {
      clientNetwork.chainId != walletNetwork.chainId
        ? await changeNetwork(
            clientNetwork.name,
            clientNetwork.chainId,
            clientNetwork.rpc
          )
        : isNative
        ? nativeTransfert()
        : externalTransfert()
    }

    /**
     *
     * @param network
     * @param id
     * @param rpc
     */
    async function changeNetwork(network: any, id: any, rpc: any) {
      setIsShowing(true)
      setAlertType("info")
      setAlertText("Switching network")
      var idhex = utils.hexValue(id)
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: idhex }],
        })
        {
          isNative ? nativeTransfert() : externalTransfert()
        }
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: idhex,
                  chainName: network,
                  rpcUrls: [rpc] /* ... */,
                },
              ],
            })
          } catch (addError) {}
        }
        isError(switchError.message)
      }
    }

    /**
     *
     */
    async function nativeTransfert() {
      setIsShowing(true)
      setAlertText("Preparing transaction")
      const tx = {
        from: accounts[0],
        to: datas.owner,
        value: ethers.utils.parseEther(
          localStorage.getItem(clientCurrency.symb)
        ),
        nonce: await provider.getTransactionCount(accounts[0], "latest"),
        gasLimit: ethers.utils.hexlify(21000),
        gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice())),
      }
      signer
        .sendTransaction(tx)
        .then(
          (transaction: { value: any; hash: any; from: any; to: string }) => {
            let paymentState = true
            {
              Number(transaction.value) ==
              Number(
                ethers.utils.parseEther(
                  localStorage.getItem(clientCurrency.symb)
                )
              )
                ? ""
                : (isError("Invalid value sent, order didn't proceed"),
                  (paymentState = false))
            }
            {
              transaction.to == data.owner
                ? ""
                : (isError("Invalid address, order didn't proceed"),
                  (paymentState = false))
            }

            {
              paymentState && cart.cart?.id != undefined
                ? (medusa.carts.update(cart.cart.id, {
                    context: {
                      CryptoPayment: [
                        clientNetwork.name,
                        transaction.hash,
                        Number(transaction.value) / 1000000000000000000,
                        clientCurrency.symb,
                        transaction.from,
                        transaction.to,
                      ],
                    },
                  }),
                  validatePayment())
                : ""
            }
          }
        )
        .catch((e: { toString: () => any }) => {
          var error = e.toString()
          isError(error.substring(0, 32))
        })
    }

    /**
     *
     */
    async function externalTransfert() {
      setIsShowing(true)
      setAlertType("info")
      setAlertText("Waiting approval")
      var contract = new ethers.Contract(
        clientCurrency.contract,
        clientCurrency.abi,
        signer
      )
      {
        contract
          ? contract
              .approve(
                datas.owner,
                ethers.utils.parseEther(
                  localStorage.getItem(clientCurrency.symb)
                )
              )
              .then(function () {
                contract
                  .transfer(
                    datas.owner,
                    ethers.utils.parseEther(
                      localStorage.getItem(clientCurrency.symb)
                    )
                  )
                  .then(
                    (transaction: {
                      data: any
                      value: any
                      hash: any
                      from: any
                      to: string
                    }) => {
                      let paymentState = true
                      let data = transaction.data
                      data = ethers.utils.defaultAbiCoder.decode(
                        ["address", "uint256"],
                        ethers.utils.hexDataSlice(data, 4)
                      )
                      let dataTo = data[0]
                      let dataValue = Number(data[1])
                      {
                        Number(dataValue) ==
                        Number(
                          ethers.utils.parseEther(
                            localStorage.getItem(clientCurrency.symb)
                          )
                        )
                          ? ""
                          : (isError(
                              "Invalid value sent, order didn't proceed"
                            ),
                            (paymentState = false))
                      }
                      {
                        dataTo == datas.owner
                          ? ""
                          : (isError("Invalid address, order didn't proceed"),
                            (paymentState = false))
                      }
                      {
                        paymentState && cart.cart?.id != undefined
                          ? (medusa.carts.update(cart.cart.id, {
                              context: {
                                CryptoPayment: [
                                  clientNetwork.name,
                                  transaction.hash,
                                  Number(transaction.value) /
                                    1000000000000000000,
                                  clientCurrency.symb,
                                  transaction.from,
                                  transaction.to,
                                ],
                              },
                            }),
                            validatePayment())
                          : ""
                      }
                    }
                  )
              })
              .catch((e: { toString: () => any }) => {
                var error = e.toString()
                isError(error.substring(0, 32))
              })
          : ""
      }
    }
  }

  /**
   *
   */
  const validatePayment = () => {
    setIsShowing(true)
    setAlertType("info")
    setAlertText("Transaction confirmed, redirecting ...")
    setSubmitting(true)
    onPaymentCompleted()
    setSubmitting(false)
  }

  /**
   *
   * @param error
   */
  const isError = (error: string) => {
    setIsShowing(true)
    setAlertText(error)
    setAlertType("error")
    setTimeout(() => {
      setIsShowing(false)
    }, 5000)
  }

  return (
    <>
      <Button disabled={submitting || notReady} onClick={checkWeb3Ready}>
        {submitting ? <Spinner /> : "Checkout"}
      </Button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-750"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-750"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inline-flex items-center gap-5 px-6 py-3 mb-3 text-gray-800 duration-300 border rounded text-md dark:text-gray-500 dark:bg-mediumbg bg-ui-light dark:border-darkborder bottom-10 right-10 w-50"
          role="alert"
        >
          {alertType == "info" && (
            <div
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {alertType == "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          )}
          <div>{alertText}</div>
        </div>
      </Transition>
    </>
  )
}

export default PaymentButton
