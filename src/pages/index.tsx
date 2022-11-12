import Head from "@modules/common/components/head"
import UnderlineLink from "@modules/common/components/underline-link"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import Image from "next/image"
import { useRouter } from "next/router"

const Home: NextPageWithLayout = () => {
  const { push } = useRouter()
  return (
    <>
      <Head
        title="Home"
        description="Discover the latest clothing inovation out 0x Clothes."
      />
      <Hero />
      <section className="relative block leading-6 text-left text-black bg-no-repeat bg-cover bg-gray-50 dark:bg-darkbg dark:text-white">
        <div className="w-full max-w-5xl px-8 mx-auto leading-6 text-left xl:px-0">
          <div className="items-center justify-center w-full pb-20">
            <div className="grid max-w-4xl pt-20 mx-auto md:flex md:pb-96">
              <div className="relative flex-none w-full max-w-full px-5 mt-0 text-center md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
              <h3 className="mt-0 mb-2 text-xl font-normal tracking-widest text-black uppercase dark:text-white">
                  Conscienscous
                </h3>
                <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                  Clothes are made in Europe, certified GOTS*. <h4 className="text-xs italic">Global Organic Textile Standard</h4>
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 mt-0 text-center md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
                <h3 className="mt-0 mb-2 text-xl font-normal tracking-widest text-black uppercase dark:text-white">
                  Digital
                </h3>
                <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                  Be able to pay using most common tokens and personalize clothes using nfts. 
                </p>
              </div>

              <div className="relative flex-none w-full max-w-full px-5 mt-0 text-center md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
              <h3 className="mt-0 mb-2 text-xl font-normal tracking-widest text-black uppercase dark:text-white">
                  Delivery
                </h3>
                <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                  Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.
                </p>
              </div>
            </div>
          </div>
          <img
            src="/cta_0x.jpg"
            alt=""
            className="text-white align-middle scale-105 border-none pb-28 md:pb-72 md:scale-150"
          />
          <div className="items-center justify-center w-full">
            <div className="relative flex-none w-full px-5 mt-0 text-center">
              <h3 className="mt-0 mb-2 text-xl font-normal tracking-widest text-black uppercase dark:text-white">
                Collections
              </h3>
              <p className="mt-0 mb-12 text-gray-400 md:mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </p>
            </div>
          </div>
        </div>
        <div className="items-center justify-center w-full bg-gray-50 dark:bg-darkbg dark:text-white">
          <div className="grid items-center max-w-5xl gap-20 py-20 mx-auto md:flex">
            <div className="w-full">
              <figure>
                <img
                  src="/cta_one.jpg"
                  onClick={() =>
                    push("/collections/pcol_01GHHQXJGESFRPF67XGH0VYM4N")
                  }
                  className="duration-500 hover:border-2 dark:hover:border-white hover:border-black md:hover:scale-105"
                  alt="cta_one"
                />
              </figure>
              <div className="text-center card-body">
                <h2 className="absolute mt-4 font-semibold tracking-widest uppercase card-title">
                  Classics
                </h2>
                <div className="justify-end card-actions"></div>
              </div>
            </div>
            <div className="w-full">
              <figure>
                <img
                  src="/cta_two.jpg"
                  onClick={() =>
                    push("collections/pcol_01GHHQY4A022RSX06W8PJB37N8")
                  }
                  className="duration-500 hover:border-2 dark:hover:border-white hover:border-black md:hover:scale-105"
                  alt="cta_two"
                />
              </figure>
              <div className="text-center card-body">
                <h2 className="absolute mt-4 font-semibold tracking-widest uppercase card-title">
                  NFTS
                </h2>
                <div className="justify-end card-actions"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center justify-center w-full py-10">
          <div className="relative flex-none w-full px-5 mt-0 text-center">
            <h3 className="mt-0 mb-2 text-xl font-normal tracking-widest text-black uppercase dark:text-white">
              Latest products
            </h3>
            <p className="mt-0 mb-12 text-gray-400 md:mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry..
            </p>
          </div>
        </div>
        <FeaturedProducts />
      </section>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
