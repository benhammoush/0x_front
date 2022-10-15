import { CheckoutProvider } from "@lib/context/checkout-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Footer from "@modules/layout/templates/footer"
import Link from "next/link"
import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"

if (typeof window !== `undefined`) {
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("color-theme", "dark")
    }
  }else{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.documentElement.classList.add("dark")
      localStorage.setItem("color-theme", "dark")
    }
  }
}

const toggleDarkMode = function () {
  if (typeof window !== `undefined`) {
    const html = document.querySelector("html")
    if(html){
    if (localStorage.theme == "light") {
      html.classList.add("dark")
      localStorage.theme = "dark"
      localStorage.setItem("color-theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.theme = "light"
      localStorage.setItem("color-theme", "light")
    }
  }}
}

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="relative bg-gray-100 dark:bg-darkbg small:min-h-screen">
        <div className="h-16 bg-white dark:border-b dark:border-darkborder dark:bg-darkbg dark:text-white">
          <nav className="flex items-center justify-between h-full content-container">
            <Link href="/cart">
              <a className="flex items-center flex-1 text-gray-700 uppercase dark:text-gray-400 text-small-semi gap-x-2 basis-0">
                <ChevronDown className="rotate-90" size={16} />
                <span className="hidden mt-px small:block">
                  Back to shopping cart
                </span>
                <span className="block mt-px small:hidden">Back</span>
              </a>
            </Link>
            <Link href="/">
              <a className="text-xl-semi">0X</a>
            </Link>
            <div className="flex-1 basis-0" />
            <button
                    id="theme-toggle"
                    type="button"
                    className=" rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 border dark:border-white focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    onClick={toggleDarkMode}
                  >
                    <svg
                      id="theme-toggle-dark-icon"
                      className="w-4 h-4 dark:hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                      id="theme-toggle-light-icon"
                      className="hidden w-4 h-4 dark:block"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
          </nav>
        </div>
        <div className="relative">
          <CheckoutLoader />
          <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] gap-y-8 content-container gap-x-8 py-12">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          {/* <MedusaCTA /> */}
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
