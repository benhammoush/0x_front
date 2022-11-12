import { Popover, Transition } from "@headlessui/react"
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import clsx from "clsx"
import { chunk } from "lodash"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"

const DropdownMenu = () => {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const { data: collections, isLoading: loadingCollections } =
    useNavigationCollections()
  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery()

  return (
    <div className="flex h-full gap-5">
      <button
        className={clsx(
          "relative h-full font-normal leading-6 tracking-widest uppercase flex items-center transition-all ease-out duration-200"
        )}
        onClick={() => push("/")}
      >
        Home
      </button>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="h-full"
      >
        <div className="flex items-center h-full">
          <Popover className="flex h-full">
            <>
              <Link href="/shop" passHref>
                <a className="relative flex h-full">
                  <Popover.Button
                    className={clsx(
                      "relative h-full font-normal leading-6 tracking-widest uppercase flex items-center transition-all ease-out duration-200"
                    )}
                    onClick={() => push("/store")}
                  >
                    Store
                  </Popover.Button>
                </a>
              </Link>

              <Transition
                show={open}
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  static
                  className="absolute inset-x-0 z-30 text-sm text-gray-700 border-gray-200 dark:border-darkborder dark:text-white top-full border-y"
                >
                  <div className="relative py-8 bg-white dark:bg-darkbg">
                    <div className="flex items-start content-container">
                      <div className="flex flex-col flex-1 max-w-[30%]">
                        <h3 className="mb-4 tracking-widest text-gray-900 uppercase dark:text-white text-base-semi">
                          Collections
                        </h3>
                        <div className="flex items-start">
                          {collections &&
                            chunk(collections, 6).map((chunk, index) => {
                              return (
                                <ul
                                  key={index}
                                  className="min-w-[152px] max-w-[200px] pr-4"
                                >
                                  {chunk.map((collection) => {
                                    return (
                                      <div key={collection.id} className="pb-3">
                                        <Link
                                          href={`/collections/${collection.id}`}
                                        >
                                          <a onClick={() => setOpen(false)}>
                                            {collection.title}
                                          </a>
                                        </Link>
                                      </div>
                                    )
                                  })}
                                </ul>
                              )
                            })}
                          {loadingCollections &&
                            repeat(6).map((index) => (
                              <div
                                key={index}
                                className="w-12 h-4 bg-gray-100 animate-pulse"
                              />
                            ))}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-4">
                          {products?.slice(0, 3).map((product) => (
                            <ProductPreview {...product} key={product.id} />
                          ))}
                          {loadingProducts &&
                            repeat(3).map((index) => (
                              <SkeletonProductPreview key={index} />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      </div>
      <button
        className={clsx(
          "relative h-full font-normal leading-6 tracking-widest uppercase flex items-center transition-all ease-out duration-200"
        )}
        onClick={() => push("/about")}
      >
        About
      </button>
    </div>
  )
}

export default DropdownMenu
