import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment } from "react"
import { CalculatedVariant } from "types/medusa"

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()

  return (
    <div className="z-50 h-full" onMouseEnter={open} onMouseLeave={close}>
      <Popover className="relative h-full">
        <Link href="/cart" passHref>
          <Popover.Button className="h-full">{`My Bag (${totalItems})`}</Popover.Button>
        </Link>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 dark:bg-mediumbg bg-white rounded border-x border-b border-gray-200 dark:border-darkborder w-[382px] dark:text-white text-gray-900"
          >
            <div className="flex items-center justify-center p-4">
              <h3 className="text-large-semi">Shopping Bag</h3>
            </div>
            {cart && items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                      >
                        <div className="w-[122px]">
                          <Thumbnail thumbnail={item.thumbnail} size="full" />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
                                  <Link
                                    href={`/products/${item.variant.product.handle}`}
                                  >
                                    <a>{item.title}</a>
                                  </Link>
                                </h3>
                                <LineItemOptions variant={item.variant} />
                                <span>Quantity: {item.quantity}</span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  region={cart.region}
                                  variant={item.variant as CalculatedVariant}
                                  quantity={item.quantity}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-end justify-between flex-1 text-small-regular">
                            <div>
                              <button
                                className="flex items-center text-gray-500 gap-x-1"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col p-4 gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 dark:text-gray-400">
                      Subtotal{" "}
                      <span className="font-normal">(incl. taxes)</span>
                    </span>
                    <span className="text-large-semi">
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <Link href="/cart" passHref>
                    <a>
                      <Button>Go to bag</Button>
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center py-16 gap-y-4">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-gray-900 rounded-full text-small-regular">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <a>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
