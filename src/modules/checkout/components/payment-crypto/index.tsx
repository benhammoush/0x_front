import { Menu, Transition } from "@headlessui/react"
import {
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useCart } from "medusa-react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import * as data from "../payment-crypto/json/datas.json"

const PaymentCrypto = () => {
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => localStorage.setItem("ethprice", data["ethereum"]["usd"]))
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("avaxprice", data["avalanche-2"]["usd"])
      )
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=jarvis-synthetic-euro&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("jeurprice", data["jarvis-synthetic-euro"]["usd"])
      )
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("maticprice", data["matic-network"]["usd"])
      )
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => localStorage.setItem("usdtprice", data["tether"]["usd"]))
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("usdcprice", data["usd-coin"]["usd"])
      )
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => localStorage.setItem("daiprice", data["dai"]["usd"]))
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("bnbprice", data["binancecoin"]["usd"])
      )

    localStorage.setItem("cryptosel", "ETH")
    localStorage.setItem("networksel", "Ethereum")
    localStorage.setItem("isnative", "true")

    document.getElementById("network")?.setAttribute("networkIndex", "0")
    document.getElementById("currency")?.setAttribute("currencyIndex", "0")
  }, [])

  /**
   *
   * @param carttotal
   */
  const calculatePrices = (carttotal: number | any) => {
    carttotal = carttotal / 100
    let totaleth = carttotal / Number(localStorage.getItem("ethprice")!)
    localStorage.setItem("ETH", parseFloat(totaleth.toString()).toFixed(5))
    let totalusdt = carttotal / Number(localStorage.getItem("usdtprice")!)
    localStorage.setItem("USDT", parseFloat(totalusdt.toString()).toFixed(2))
    let totalavax = carttotal / Number(localStorage.getItem("avaxprice")!)
    localStorage.setItem("AVAX", parseFloat(totalavax.toString()).toFixed(3))
    let totaljeur = carttotal / Number(localStorage.getItem("jeurprice")!)
    localStorage.setItem("JEUR", parseFloat(totaljeur.toString()).toFixed(2))
    let totalmatic = carttotal / Number(localStorage.getItem("maticprice")!)
    localStorage.setItem("MATIC", parseFloat(totalmatic.toString()).toFixed(3))
    let totalusdc = carttotal / Number(localStorage.getItem("usdcprice")!)
    localStorage.setItem("USDC", parseFloat(totalusdc.toString()).toFixed(2))
    let totaldai = carttotal / Number(localStorage.getItem("daiprice")!)
    localStorage.setItem("DAI", parseFloat(totaldai.toString()).toFixed(2))
    let totalbnb = carttotal / Number(localStorage.getItem("bnbprice")!)
    localStorage.setItem("BNB", parseFloat(totalbnb.toString()).toFixed(2))
  }

  const updateSelection = (
    index1: string | SetStateAction<number>,
    index2: string | SetStateAction<number>
  ) => {
    setId_1(Number(index1))
    setId_2(Number(index2))
    document.getElementById("network")?.setAttribute("networkIndex", index1.toString())
    document.getElementById("currency")?.setAttribute("currencyIndex", index2.toString())
  }

  const { cart } = useCart()
  {
    cart ? calculatePrices(cart.total) : ""
  }

  const supportednetworks = data.supportednetworks
  const [id_1, setId_1] = useState(0)
  const [id_2, setId_2] = useState(0)

  return (
    <div className="w-full">
      {/* 
      !! ALERT, CAN BE USEFULL !!
      <div className="flex items-center w-full p-2 bg-yellow-100 rounded dark:bg-darkbg gap-x-2">
        <Alert size={16} className="text-yellow-700 dark:text-gray-400" />
        <span className="text-yellow-700 dark:text-gray-400 text-small-regular">
          <span className="font-semibold">Attention:</span> Web3 wallet needed.
          (cf Metamask, Coinbase, Binance ...)
        </span>
      </div> */}

      <div className="sm:flex grid gape-5 w-[100%] mt-5 py-10 sm:divide-x divide-gray-400 h-[450px] sm:h-[200px] dark:divide-gray4">
        <div
          id="network"
          className="cursor-default w-full sm:w-[50%] justify-center text-center"
        >
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md bg-ui-light dark:bg-mediumbg dark:text-white dark:border-darkborder focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <div className="grid grid-cols-4 gap-2 divide-x divide-gray-400 dark:divide-gray-600">
                    <div>
                      <img
                        src={supportednetworks[id_1].icon}
                        className="justify-center w-auto h-5"
                        alt=""
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="ml-2">{supportednetworks[id_1].name}</div>
                    </div>
                  </div>
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 bg-opacity-100 border divide-y divide-gray-100 rounded-md shadow-lg opacity-100 w-60 md:w-72 bg-ui-light ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-mediumbg dark:border-darkborder">
                  <div className="grid grid-cols-2 px-1 py-1 gap-x-0 md:gap-x-5">
                    {supportednetworks.map((key, index) => {
                      return (
                        <div key={id_1}>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => updateSelection(index, id_2)}
                                className={`${
                                  active ? "scale-105 duration-300" : ""
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <div className="grid grid-cols-4 gap-2 text-gray-500 divide-x divide-gray-400 hover:text-gray-900 hover:dark:text-white dark:divide-gray-600">
                                  <div>
                                    <img
                                      src={key.icon}
                                      className="justify-center w-auto h-5"
                                      alt=""
                                    />
                                  </div>
                                  <div className="col-span-3">
                                    <div className="ml-3">{key.name}</div>
                                  </div>
                                </div>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      )
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div
          id="currency"
          className="justify-center text-center w-full sm:w-[50%]"
        >
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md bg-ui-light dark:bg-mediumbg dark:text-white dark:border-darkborder focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <div className="grid grid-cols-4 gap-2 divide-x divide-gray-400 hover:text-gray-900 hover:dark:text-white dark:divide-gray-600">
                    <div>
                      <img
                        src={supportednetworks[id_1].accept[id_2].icon}
                        className="justify-center w-auto h-5"
                        alt=""
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="ml-3">
                        {supportednetworks[id_1].accept[id_2].symb}
                      </div>
                    </div>
                  </div>
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-opacity-100 border divide-y divide-gray-100 rounded-md shadow-lg opacity-100 bg-ui-light ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-mediumbg dark:border-darkborder">
                  <div className="px-1 py-1 ">
                    {supportednetworks[id_1].accept.map((key, index) => {
                      return (
                        <div key={id_1}>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => updateSelection(id_1, index)}
                                className={`${
                                  active ? "scale-105 duration-300" : ""
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <div className="grid w-full grid-cols-4 gap-2 text-gray-500 divide-x divide-gray-400 hover:text-gray-900 hover:dark:text-white dark:divide-gray-600">
                                  <div>
                                    <img
                                      src={key.icon}
                                      className="justify-center w-auto h-5"
                                      alt=""
                                    />
                                  </div>
                                  <div className="w-full col-span-3">
                                    <div className="w-full">{key.symb}</div>
                                  </div>
                                </div>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      )
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCrypto
