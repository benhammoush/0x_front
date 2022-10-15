import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${handle}`}>
      <a>
        <div>
          <Thumbnail thumbnail={thumbnail} size="full" />
          <div className="mt-2 text-base-regular">
            <span>{title}</span>
            <div className="flex items-center mt-1 gap-x-2">
              {price ? (
                <>
                  {price.price_type === "sale" && (
                    <span className="text-gray-500 line-through dark:text-white">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={clsx("font-semibold", {
                      "text-rose-500": price.price_type === "sale",
                    })}
                  >
                    {price.calculated_price}
                  </span>
                </>
              ) : (
                <div className="w-20 h-6 bg-gray-100 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductPreview
