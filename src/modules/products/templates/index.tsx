import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useEffect, useRef, useState } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import { fabric } from "fabric"
import Button from "@modules/common/components/button"
import { ethers } from "ethers"
import { Transition, Dialog } from "@headlessui/react"
import Spinner from "@modules/common/icons/spinner"


type ProductTemplateProps = {
  product: Product
}

declare var window: any

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const [assets, setassets] = useState<any>()
  const [assetsnb, setassetsnb] = useState(0)
  const [loading, isLoading] = useState(false)
  const [canvas, setCanvas] = useState<any>()
  var iscustom = false
  const info = useRef<HTMLDivElement>(null)
  const inView = useIntersection(info, "0px")
  const [alertText, setAlertText] = useState("")

  product.tags.forEach(function (value) {
    if (value.value == "Custom" || value.value == "custom") {
      iscustom = true
    }
  })

  useEffect(() => {
    setCanvas(initCanvas)
  }, [])

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 600,
    })

  function addImage(url: string) {
    fabric.Image.fromURL(
      url,
      function (myImg) {
        //i create an extra var for to change some image properties
        myImg.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
        })
        myImg.set({
          scaleY: 0.4,
          scaleX: 0.4,
          transparentCorners: false,
          borderColor: "black",
          cornerColor: "black",
          cornerSize: 6,
        })
        myImg.objectCaching = false
        myImg.on("mousedblclick", function () {
          canvas.remove(myImg)
          getCanvasImageLinks()
        })
        canvas.add(myImg)
        getCanvasImageLinks()
      },
      { crossOrigin: "anonymous" }
    )
  }


  const getCanvasImageLinks = () => {
    let nftArray = [canvas.getObjects().length]
    let i = 0
    canvas.getObjects().forEach((element: { _element: { src: any } }) => {
      nftArray[i] = element._element.src
      i++
    })
    localStorage.setItem("nftsArray", JSON.stringify(nftArray))
  }

  const handleMetamask = async () => {
    isLoading(true)
    setAlertText("waiting wallet...")
    checkWeb3Ready()

    async function checkWeb3Ready() {
      try {
        setAlertText("waiting for wallet")
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        )
        const accounts = await provider
          .send("eth_requestAccounts", [])
          .catch((err) => setAlertText(err.toString()))
          fetchNFT()
      } catch (error) {
        setAlertText("Missing wallet extension")
      }
    }

    const fetchNFT = async () => {
      setAlertText("fetching nfts...")
      var nextpage = ""
      var nftarray = []
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY":
            "guillaumeamm_sk_9e27cc35-9591-46b9-82a1-0042bccb7f1f_osn8u7vl20h4kpko",
        },
      }
      while (nextpage != "lastpage") {
        try {
          const res = await fetch(
            "https://api.simplehash.com/api/v0/nfts/owners?chains=arbitrum,ethereum,polygon,solana&wallet_addresses=" +
              "0xFCba0693FC16DCb2a4E8FA7eD3DA31f5296993E4" +
              nextpage,
            options
          ).then((response) => response.json())
          if (res.next != null) {
            var splited = res.next.split("&")
            nextpage = "&" + splited[1]
          } else {
            nextpage = "lastpage"
          }
          nftarray.push(...res.nfts)
        } catch (err: any) {
          isLoading(false)
          setAlertText(err)
        }
        setassetsnb(nftarray.length)
        setassets(nftarray)
        setAlertText("found " + nftarray.length + " nfts...")
        if (nextpage == "lastpage") {
          setTimeout(() => {
            isLoading(false)
          }, 1000)
        }
      }
    }
  }

  return (
    <ProductProvider product={product}>
      <div className="relative flex flex-col py-6 content-container dark:bg-darkbg dark:text-white small:flex-row small:items-start">
        <div className="flex flex-col w-full gap-y-8">
          {iscustom ? (
            <div className="lg:w-[90%] sm:w-[100%] overflow-hidden rounded-lg">
              <div
                id="canvafull"
                className="flex items-center  justify-center md:h-[800px]  bg-ui-light rounded-md h-[600px] bg-[url('/template.png')] w-full max-h-[800px] text-center bg-center bg-no-repeat bg-contain dark:border-darkborder"
              >
                <div>
                  <canvas id="canvas" className="mx-auto border-red-500" />
                </div>
              </div>
            </div>
          ) : (
            <ImageGallery images={product.images} />
          )}
        </div>
        <div
          className="small:sticky small:top-20   w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
          ref={info}
        >
          {iscustom ? (
            <div className="md:w-full bg-ui-light dark:bg-mediumbg max-w-lg border px-5 dark:border-darkborder rounded-lg max-h-[40vh] no-scrollbar overflow-y-auto">
              <div>
                <div className="h-[35vh]">
                  <div className="grid items-center justify-center h-full row-span-1 gap-0 rounded-lg">
                    {loading == true ? (
                      <Transition show={loading}>
                        <Transition.Child
                          enter="ease-out duration-500"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-500"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div>
                            <div className="inset-0 grid items-center justify-center text-center ">
                              <Spinner size={24} />
                            </div>
                            <div className="mt-2 text-xs text-gray-400 opacity-40">
                              {alertText}
                            </div>
                          </div>
                        </Transition.Child>
                      </Transition>
                    ) : (
                      <div>
                        {assetsnb == 0 && (
                          <div>
                            <Button onClick={handleMetamask}>
                              Connect wallet
                            </Button>
                          </div>
                        )}
                        {assetsnb > 0 && (
                          <div className="grid justify-center max-w-xl grid-cols-3 gap-5 mx-5 my-5 text-gray-400 min-w-4xl">
                            {assets.map((index: React.Key | any) => {
                              if (
                                index?.previews?.image_medium_url != null
                              ) {
                                return (
                                  <button
                                    className="w-full card-compact"
                                    onClick={() =>
                                      addImage(
                                        index?.previews?.image_large_url
                                      )
                                    }
                                    key={index}
                                  >
                                    {index?.chain == "ethereum" ? (
                                        <img
                                          src={
                                            index?.previews
                                              ?.image_small_url
                                          }
                                          alt={index?.name}
                                          className="mx-auto h-30 w-[90%]  rounded-md duration-200 hover:shadow hover:shadow-gray-500 card hover:scale-105 focus:scale-105 focus:outline-none focus:ring focus:ring-blue-700"
                                        />
                                    ) : (
                                      ""
                                    )}
                                    {index?.chain == "polygon" ? (
                                        <img
                                          src={
                                            index?.previews
                                              ?.image_small_url
                                          }
                                          alt={index?.name}
                                          className="mx-auto h-30 w-[90%]  rounded-md duration-200 hover:shadow hover:shadow-purple-500 card hover:scale-105 focus:scale-105 focus:outline-none focus:ring focus:ring-blue-700"
                                        />
                                    ) : (
                                      ""
                                    )}
                                    {index?.chain == "avalanche" ? (
                                        <img
                                          src={
                                            index?.previews
                                              ?.image_small_url
                                          }
                                          alt={index?.name}
                                          className="mx-auto h-30 w-[90%]  rounded-md duration-200 hover:shadow hover:shadow-red-500 card hover:scale-105 focus:scale-105 focus:outline-none focus:ring focus:ring-blue-700"
                                        />
                                    ) : (
                                      ""
                                    )}
                                    {index?.chain == "arbitrum" ? (
                                        <img
                                          src={
                                            index?.previews
                                              ?.image_small_url
                                          }
                                          alt={index?.name}
                                          className="mx-auto h-30 w-[90%]  rounded-md duration-200 hover:shadow hover:shadow-blue-500 card hover:scale-105 focus:scale-105 focus:outline-none focus:ring focus:ring-blue-700"
                                        />
                                    ) : (
                                      ""
                                    )}
                                  </button>
                                )
                              }
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
      </div>
      {iscustom ? (
        ""
      ) : (
        <div className="px-6 my-16 content-container small:px-8 small:my-32">
          <RelatedProducts product={product} />
        </div>
      )}
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
  )
}

export default ProductTemplate
