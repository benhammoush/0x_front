import { Customer, Order } from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { formatAmount } from "medusa-react"
import Link from "next/link"

type OverviewProps = {
  orders?: Order[]
  customer?: Omit<Customer, "password_hash">
}

const Overview = ({ orders, customer }: OverviewProps) => {
  return (
    <div>
      <div className="small:hidden">
        <div className="px-8 mb-4 text-xl-semi">
          Hello {customer?.first_name}
        </div>
        <div className="text-base-regular">
          <ul>
            <li>
              <Link href="/account/profile">
                <a className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-x-2">
                    <User size={16} />
                    <span>Profile</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/addresses">
                <a className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-x-2">
                    <MapPin size={16} />
                    <span>Addresses</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/orders">
                <a className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-x-2">
                    <Package size={16} />
                    <span>Orders</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden small:block">
        <div className="flex items-start justify-between mb-4 text-xl-semi">
          <span>Hello {customer?.first_name}</span>
          <span className="text-gray-700 dark:text-gray-400 text-small-regular">
            Signed in as:{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col flex-1 h-full col-span-1 row-span-2 gap-y-4">
            <div className="flex items-start mb-6 gap-x-16">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Profile</h3>
                <div className="flex items-end gap-x-2">
                  <span className="leading-none text-3xl-semi">
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="text-gray-500 uppercase text-base-regular">
                    Completed
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Addresses</h3>
                <div className="flex items-end gap-x-2">
                  <span className="leading-none text-3xl-semi">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="text-gray-500 uppercase text-base-regular">
                    Saved
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">Recent orders</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link href={`/order/details/${order.id}`}>
                          <a>
                            <div className="flex items-center justify-between p-4 bg-gray-50">
                              <div className="grid flex-1 grid-cols-3 grid-rows-2 text-small-regular gap-x-4">
                                <span className="font-semibold">
                                  Date placed
                                </span>
                                <span className="font-semibold">
                                  Order number
                                </span>
                                <span className="font-semibold">
                                  Total amount
                                </span>
                                <span>
                                  {new Date(order.created_at).toDateString()}
                                </span>
                                <span>#{order.display_id}</span>
                                <span>
                                  {formatAmount({
                                    amount: order.total,
                                    region: order.region,
                                    includeTaxes: false,
                                  })}
                                </span>
                              </div>
                              <button
                                className="flex items-center justify-between"
                                onClick={close}
                              >
                                <span className="sr-only">
                                  Go to order #{order.display_id}
                                </span>
                                <ChevronDown className="-rotate-90" />
                              </button>
                            </div>
                          </a>
                        </Link>
                      </li>
                    )
                  })
                ) : (
                  <span>No recent orders</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
