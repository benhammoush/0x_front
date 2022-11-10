import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { Product, Variant } from "types/medusa"
import html2canvas from "html2canvas"
import Medusa from "@medusajs/medusa-js"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { useCart } from "medusa-react"
import Items from "@modules/order/components/items"
import { Transition } from "@headlessui/react"

type ProductActionsProps = {
  product: Product
}
const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const cart = useCart()
  const [alertText, setAlertText] = useState("")
  const [alertType, setAlertType] = useState("info")
  const [isShowing, setIsShowing] = useState(false)

  var isCustom = false
  const {
    updateOptions,
    addToCart,
    decreaseQuantity,
    options,
    inStock,
    variant,
  } = useProductActions()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  product.tags.forEach(function (value) {
    if (value.value == "Custom" || value.value == "custom") {
      isCustom = true
    }
  })

  /**
   *  this function get datas from canvas
   */
  const AddCustomToCart = (variant : Variant | undefined) => {
    setIsShowing(true)
    setAlertText("adding custom product to cart...")
    setAlertType("info")
    html2canvas(document.querySelector("#canvafull")!, {
      allowTaint: true,
    }).then(async (canvas) => {
      if (
        localStorage.getItem("nftsArray")?.length! > 0 &&
        variant
      ) {
        const url = canvas.toDataURL("image/jpeg", 0.5)
        const nfts = JSON.parse(localStorage.getItem("nftsArray")!)
        console.log(nfts)
        console.log(url)
         sendLink(url, nfts, variant)
      } else {
        setAlertText("No Nfts added or size not specified !")
        setAlertType("error")
        setTimeout(() => {
          setIsShowing(false)
        }, 3000)
      }
    })
  }

  /**
   *  this function adds the custom product to cart with parameters neccessary
   */
  const sendLink = (url: string, nfts: string | null, variant: Variant | undefined) => {
    var variant_id = variant?.id
    if (cart.cart && variant_id ) {
    medusa.carts.lineItems.create(cart.cart.id, {
      variant_id,
      quantity: 1,
      metadata: { model: url, sources: nfts },
    })
  }
    // window.location.reload()
    // localStorage?.setItem("nftsArray", "") 
  }

  /**
   *  this function triggers the right function for each cart type
   */
     const typeOfCart = () => {
      console.log("custom " && isCustom)
      if (isCustom) {
        console.log("AddCustomToCart"),
        AddCustomToCart(variant)
      }else{
        console.log("addToCart"),
        addToCart
      }
    }


  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-gray-700 text-small-regular">
            {product.collection.title}
          </a>
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="flex flex-col my-8 gap-y-6">
          {product.options.map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-gray-700 dark:text-white">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
              {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500 ">Original: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Button onClick={typeOfCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
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
    </div>
  )
}

export default ProductActions
