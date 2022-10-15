import { Disclosure } from "@headlessui/react"
import { useCheckout } from "@lib/context/checkout-context"
import clsx from "clsx"

type StepContainerProps = {
  index: number
  title: string
  closedState?: React.ReactNode
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const StepContainer = ({
  index,
  title,
  className,
  closedState,
  children,
  ...props
}: StepContainerProps) => {
  const {
    editAddresses: { state },
  } = useCheckout()
  return (
    <div>
      <div
        className={clsx("bg-white dark:border-darkborder border rounded-lg dark:bg-mediumbg dark:text-white", className, {
          "opacity-50 pointer-events-none select-none": state,
        })}
        {...props}
      >
        <div className="flex items-center px-8 pt-8 pb-6 text-xl-semi gap-x-4">
          <div className="flex items-center justify-center w-8 h-8 text-sm text-white bg-gray-900 rounded-full">
            {index}
          </div>
          <h2>{title}</h2>
        </div>
        <Disclosure>
          <Disclosure.Panel
            static
            className={clsx(
              "transition-[max-height,opacity] duration-700 ease-in-out overflow-hidden",
              {
                "max-h-[9999px] opacity-100": !state,
                "max-h-0 opacity-0": state,
              }
            )}
          >
            {children}
          </Disclosure.Panel>
          <Disclosure.Panel
            static
            className={clsx(
              "transition-[max-height,opacity] duration-700 ease-in-out overflow-hidden",
              {
                "max-h-[9999px] opacity-100": state,
                "max-h-0 opacity-0": !state,
              }
            )}
          >
            {closedState}
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  )
}

export default StepContainer
