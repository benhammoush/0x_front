import { useAccount } from "@lib/context/account-context"
import UnderlineLink from "@modules/common/components/underline-link"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect } from "react"
import AccountNav from "../components/account-nav"

const AccountLayout: React.FC = ({ children }) => {
  const { customer, retrievingCustomer, checkSession } = useAccount()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (retrievingCustomer || !customer) {
    return (
      <div className="flex items-center justify-center w-full min-h-[640px] h-full text-gray-900">
        <Spinner size={36} />
      </div>
    )
  }

  return (
    <div className="flex-1 small:py-12 dark:bg-mediumbg dark:text-white small:bg-gray-50">
      <div className="flex flex-col flex-1 h-full max-w-5xl mx-auto bg-white dark:bg-darkbg">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] small:px-8 py-6 small:py-12 ">
          <div>
            <AccountNav />
          </div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-between px-8 py-12 border-gray-200 small:flex-row small:border-t gap-x-8">
          <div>
            <h3 className="mb-4 text-xl-semi">Got questions?</h3>
            <span className="text-small-regular">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout