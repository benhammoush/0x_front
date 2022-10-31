import { Dialog, Transition } from "@headlessui/react"
import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import useToggleState from "@lib/hooks/use-toggle-state"
import Button from "@modules/common/components/button"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import clsx from "clsx"
import React, { Fragment, useMemo } from "react"
import { Product } from "types/medusa"
import OptionSelect from "../option-select"

type MobileActionsProps = {
  product: Product
  show: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({ product, show }) => {
  const { variant, addToCart, options, inStock, updateOptions } = useProductActions()
  const { state, open, close } = useToggleState()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <>
      <div
        className={clsx("lg:hidden sticky inset-x-0 bottom-0", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white border-t border-gray-200 dark:border-darkborder dark:bg-darkbg dark:text-white gap-y-3 text-large-regular">
            <div className="flex items-center gap-x-2">
              <span>{product.title}</span>
              <span>—</span>
              {selectedPrice ? (
                <div className="flex items-end text-gray-700 dark:text-white gap-x-2">
                  {selectedPrice.price_type === "sale" && (
                    <p>
                      <span className="line-through text-small-regular">
                        {selectedPrice.original_price}
                      </span>
                    </p>
                  )}
                  <span
                    className={clsx({
                      "text-rose-600": selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="grid w-full grid-cols-2 gap-x-4">
              <Button onClick={open} variant="secondary" className="dark:bg-darkbg">
                <div className="flex items-center justify-between w-full dark:text-white ">
                  <span>
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Select Options"}
                  </span>
                  <ChevronDown />
                </div>
              </Button>
              <Button onClick={addToCart}>{!inStock ? "Out of stock" : "Add to cart"}</Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0">
            <div className="flex items-center justify-center h-full min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="flex flex-col w-full h-full overflow-hidden text-left transform gap-y-3">
                  <div className="flex justify-end w-full pr-6">
                    <button
                      onClick={close}
                      className="flex items-center justify-center w-12 h-12 text-gray-900 bg-white rounded-full"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="px-6 py-12 bg-white dark:bg-mediumbg dark:text-white">
                    {product.variants.length > 1 && (
                      <div className="flex flex-col gap-y-6">
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
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
