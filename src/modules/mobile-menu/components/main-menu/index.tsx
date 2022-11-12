import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import Search from "@modules/common/icons/search"
import X from "@modules/common/icons/x"
import { useCollections, useMeCustomer } from "medusa-react"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"

const MainMenu = () => {
  const { collections } = useCollections()
  const { customer } = useMeCustomer()
  const { countryCode } = useStore()

  const countries = useCountryOptions()

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-200">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={setScreenCountry}
          >
            <ReactCountryFlag countryCode={countryCode || "us"} svg />
            <ChevronDown />
          </button>
        </div>
        <div>
          <h1 className="uppercase text-xl-semi">0X</h1>
        </div>
        <div className="flex justify-end flex-1 basis-0">
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 p-6 space-y-6">
        {process.env.FEATURE_SEARCH_ENABLED && (
          <button
            className="flex items-center px-4 py-2 text-gray-500 bg-gray-50 gap-x-2"
            onClick={setScreenSearch}
          >
            <Search size={24} />
            <span placeholder="Search products" className="text-base-regular">
              Search products
            </span>
          </button>
        )}

        <div className="flex flex-col flex-1 text-gray-900 text-large-regular">
          <ul className="flex flex-col gap-y-2">
            <li className="p-4 bg-gray-50 dark:bg-darkbg">
            <Link href="/">
                <a>
                  <button
                    className="flex items-center justify-between w-full dark:text-white"
                    onClick={close}
                  >
                    <span className="sr-only">Go to Home</span>
                    <span>Home</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </a>
              </Link>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-darkbg">
            <Link href="/about">
                <a>
                  <button
                    className="flex items-center justify-between w-full dark:text-white"
                    onClick={close}
                  >
                    <span className="sr-only">Go to About</span>
                    <span>About</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </a>
              </Link>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-darkbg">
            <Link href="/store">
                <a>
                  <button
                    className="flex items-center justify-between w-full dark:text-white"
                    onClick={close}
                  >
                    <span className="sr-only">Go to Store</span>
                    <span>Store</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </a>
              </Link>
            </li>
            {collections ? (
              <>
                {collections.map((collection) => (
                  <li key={collection.id} className="p-4 bg-gray-50 dark:bg-darkbg">
                    <Link href={`/collections/${collection.id}`}>
                      <a>
                        <button
                          className="flex items-center justify-between w-full dark:text-white"
                          onClick={close}
                        >
                          <span className="sr-only">
                            Go to {collection.title} collection
                          </span>
                          <span>{collection.title}</span>
                          <ChevronDown className="-rotate-90" />
                        </button>
                      </a>
                    </Link>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-y-8 text-small-regular">
            {!customer ? (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase dark:text-gray-400">Account</span>
                <Link href={`/account/login`} passHref>
                  <a>
                    <button
                      className="flex items-center justify-between w-full py-2 border-b border-gray-200"
                      onClick={close}
                    >
                      <span className="sr-only">Go to sign in page</span>
                      <span className="normal-case">Sign in</span>
                      <ChevronDown className="-rotate-90" />
                    </button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase dark:text-gray-400">Signed in as</span>
                <Link href={`/account`} passHref>
                  <a>
                    <button
                      className="flex items-center justify-between w-full py-2 border-b border-gray-200"
                      onClick={close}
                    >
                      <span className="sr-only">Go to account page</span>
                      <span className="normal-case">{customer.email}</span>
                      <ChevronDown className="-rotate-90" />
                    </button>
                  </a>
                </Link>
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              <span className="text-gray-700 uppercase dark:text-gray-400">Delivery</span>
              <button
                className="flex items-center justify-between py-2 border-b border-gray-200"
                onClick={setScreenCountry}
              >
                <span className="sr-only">
                  Click to select shipping country
                </span>
                <div className="flex items-center gap-x-2">
                  <ReactCountryFlag countryCode={countryCode || "us"} svg />
                  <span className="normal-case">
                    Shipping to{" "}
                    {countries?.find((c) => c.country === countryCode)?.label}
                  </span>
                </div>
                <ChevronDown className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
