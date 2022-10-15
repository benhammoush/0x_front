import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import Link from "next/link"
import { CalculatedVariant } from "types/medusa"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)
  const openModel = (url: any) => {
    var image = new Image();
        image.src = url;
        var w = window.open("");
        w?.document.write(image.outerHTML);
  }
  const openNfts = (nfts: any) => {
    var i = 0
    nfts?.forEach((element: string | URL | undefined) => {
      window.open(element, '_blank' + i)
      i++;
    });
  }
  return (
    <div className="flex flex-col p-10 border-b border-gray-200 dark:text-white dark:border-darkborder gap-y-4">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
                <div className="w-[122px]">
                  <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col flex-1 text-small-regular">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mr-4 overflow-hidden text-base-regular overflow-ellipsis whitespace-nowrap">
                          <Link
                            href={`/products/${item.variant.product.handle}`}
                          >
                            <a>{item.title}</a>
                          </Link>
                        </h3>
                        <LineItemOptions variant={item.variant} />
                        <span>Quantity: {item.quantity}</span>
                        {typeof item.metadata.model != "undefined" ? (
                          <div className="flex flex-col justify-center">
                          <span className="truncate inter-small-regular text-grey-50">
                              <button className="underline" onClick={() => openModel(item.metadata.model)}>View model</button>
                          </span>
                          <span className="truncate inter-small-regular text-grey-50">
                              <button className="underline" onClick={() => openNfts(item.metadata.sources)}>View sources</button>
                          </span>
                            </div>
                        ) : ""}
                      </div>
                      <div className="flex justify-end">
                        <LineItemPrice
                          quantity={item.quantity}
                          region={region}
                          variant={item.variant as CalculatedVariant}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default Items
