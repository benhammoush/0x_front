import Head from "@modules/common/components/head"
import UnderlineLink from "@modules/common/components/underline-link"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import Image from "next/image"


const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the 0X. Worldwide Shipping. Secure Payment."
      />
      <Hero />
      {/* CLOTHES EUROPE */}
      <section className="w-full py-10 bg-gray-50 dark:bg-darkbg dark:text-white">
        <div className="px-10 mx-auto max-w-7xl">
          <div className="px-10 mb-8 space-y-5 lg:mb-16 lg:px-0 lg:text-center">
            <h6 className="mt-0 mb-2 text-xs font-normal tracking-widest text-gray-400 uppercase dark:text-gray-200">
              Responsible brand
            </h6>
            <p className="mb-4 text-gray-900 dark:text-white text-2xl-regular">
              0x StreetWear
            </p>
            <p className="mt-0 mb-10 text-lg leading-8 text-gray-400">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="grid overflow-hidden rounded-lg">
            <div className="grid items-center lg:grid-cols-2">
              <div className="flex flex-col items-start justify-center h-full py-16 pl-16 pr-16 space-y-4 saturate-80 backdrop-brightness-10 lg:py-0 lg:pr-20">
                <h3 className="text-2xl font-semibold dark:text-white sm:text-4xl">
                  Lorem Ipsum
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s{" "}
                </p>
              </div>
              <div className="mx-5 my-5 overflow-hidden scale-90 bg-gray-100 rounded-md h-96 w-30">
              <img
                  src="./work2.webp"
                  className="object-cover w-full h-full duration-500 hover:scale-110"
                  alt=""
                />
              </div>
            </div>

            <div className="grid items-center lg:grid-cols-2">
              <div className="order-last mx-5 my-5 overflow-hidden scale-90 bg-gray-100 rounded-md h-96 lg:order-first">
              <img
                  src="./work.webp"
                  className="object-cover w-full h-full duration-500 hover:scale-110"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start justify-center h-full py-16 pl-16 pr-16 space-y-4 lg:py-0 lg:pr-20">
                <h3 className="text-2xl font-semibold sm:text-4xl dark:text-white">
                  Lorem Ipsum
                </h3>
                <p className="text-lg text-left text-gray-600 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturedProducts />
      {/* PRINT NFT */}
      <section className="relative block py-20 overflow-hidden leading-6 text-left text-black bg-no-repeat bg-cover bg-gray-50 dark:bg-darkbg dark:text-white">
        <div className="w-full max-w-5xl px-8 mx-auto leading-6 text-left xl:px-0">
          <div className="flex flex-wrap items-center justify-center flex-1 text-center text-white lg:text-left">
            <div className="relative flex-none w-full max-w-full px-5 mt-0 mb-16 text-center lg:mb-18 md:w-5/6 md:flex-none lg:w-2/3 lg:flex-none">
              <h6 className="mt-0 mb-2 text-xs font-normal tracking-widest text-gray-400 uppercase">
                nft friendly
              </h6>
              <p className="mb-4 text-gray-900 dark:text-white text-2xl-regular">
                Customize clothes using NFTs.
              </p>
              <p className="mt-0 mb-10 text-lg leading-8 text-gray-400">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </div>
        <div className="grid w-[80%] max-w-[1400px] h-full   mx-auto rounded-md   overflow-hidden md:grid-cols-3">
          <div className="flex flex-wrap justify-center max-w-5xl col-span-2 mx-auto text-white md:scale-75 ov drop-shadow-2xl">
            <div className="relative w-full px-4 mt-5 leading-6 text-left xl:flex-shrink-0 xl:flex-grow-0 md:mt-0">

            <div className="relative w-full px-4 leading-6 text-left xl:flex-shrink-0 xl:flex-grow-0">
              <div className="relative flex h-10 items-center justify-start space-x-1.5 overflow-hidden rounded-t-xl bg-ui-medium dark:bg-darkbg">
                <div className="relative z-10 w-3 h-3 ml-3 bg-green-500 rounded-full dark:bg-gray-700"></div>
                <div className="relative z-10 w-3 h-3 bg-orange-500 rounded-full dark:bg-gray-700"></div>
                <div className="relative z-10 w-3 h-3 bg-red-500 rounded-full dark:bg-gray-700"></div>
              </div>

              <img
                src="/exdesignwhite.png"
                alt=""
                className="block h-auto max-w-full text-white align-middle border-none rounded-lg dark:hidden"
              />

              <img
                src="/exdesign.png"
                alt=""
                className="hidden h-auto max-w-full text-white align-middle border-none rounded-lg dark:block"
              />
            </div>

            </div>
          </div>
          <div className="flex flex-col items-start justify-center h-full py-16 pl-16 pr-16 space-y-4 saturate-80 backdrop-brightness-10 lg:py-0 lg:pr-20">
            <h3 className="text-2xl font-semibold dark:text-white sm:text-4xl">
              Lorem Ipsum
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s{" "}
            </p>
            <UnderlineLink href="/products/custom-tshirt">
              Try now !
            </UnderlineLink>
          </div>
        </div>
      </section>
      {/* NETWORKS */}
      <section className="box-border text-black bg-gray-50 pb-30 dark:bg-darkbg dark:text-white">
        <div className="box-border py-12 leading-7 md:pb-20">
          <div className="relative w-full px-10 mx-auto text-gray-900 md:px-5">
            <div className="flex flex-wrap justify-center mt-0">
              <div className="relative flex-none w-full max-w-full px-5 mt-0 mb-16 text-center md:w-5/6 md:flex-none lg:mb-24 lg:w-2/3 lg:flex-none">
                <h6 className="mt-0 mb-2 text-xs font-normal tracking-widest text-gray-400 uppercase">
                  Web3 Powered
                </h6>
                <p className="mb-4 text-gray-900 dark:text-white text-2xl-regular">
                  Pay using your favorite network.
                </p>
                <p className="mt-0 text-lg leading-8 text-gray-400">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap max-w-6xl px-10 py-10 mx-auto mt-0">
              <div className="relative flex-none w-full max-w-full px-5 mt-0 text-center md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <div className="mb-4">
                  <img src="./Arbitrum.svg" className="w-auto h-12 mx-auto duration-200 hover:scale-110" />
                </div>
                <h3 className="mt-0 mb-2 text-xl font-semibold tracking-normal text-black dark:text-white">
                  Arbitrum
                </h3>
                <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry..
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 mt-0 text-center md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <div className="mb-4">
                  <img src="./Avalanche.svg" className="w-auto h-12 mx-auto duration-200 hover:scale-110" />
                </div>
                <h3 className="mt-0 mb-2 text-xl font-semibold tracking-normal text-black dark:text-white">
                  Avalanche
                </h3>
                <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 mt-10 text-center md:w-1/2 md:flex-none lg:mt-0 lg:w-1/3 lg:flex-none">
                <div className="mb-4">
                  <img src="./Binance.svg" className="w-auto h-12 mx-auto duration-200 hover:scale-110" />
                </div>
                <h3 className="mt-0 mb-2 text-xl font-semibold tracking-normal text-black dark:text-white">
                  Binance Smart Chain
                </h3>
                <p className="mt-0 mb-12 text-gray-400">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 text-center md:mt-10 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <div className="mb-4">
                  <img src="./Ethereum.svg" className="w-auto h-12 mx-auto duration-200 hover:scale-110" />
                </div>
                <h3 className="mt-0 mb-2 text-xl font-semibold tracking-normal text-black dark:text-white">
                  Ethereum
                </h3>
                <p className="mt-0 mb-12 text-gray-400 lg:mb-0">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 text-center md:mt-10 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <div className="mb-4">
                  <img src="./Polygon.svg" className="w-auto h-12 mx-auto duration-200 hover:scale-110" />
                </div>
                <h3 className="mt-0 mb-2 text-xl font-semibold tracking-normal text-black dark:text-white">
                  Polygon
                </h3>
                <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 text-center md:mt-10 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <div className="mb-4">
                  <img src="./stripe.webp" className="w-auto h-12 mx-auto duration-200 hover:scale-110" />
                </div>
                <h3 className="mt-0 mb-2 text-xl font-semibold tracking-normal text-black dark:text-white">
                  Stripe
                </h3>
                <p className="mt-0 mb-12 text-gray-400 lg:mb-0">
                  {" "}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
