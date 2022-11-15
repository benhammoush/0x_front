import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="bg-none dark:text-white">
      <div className="py-12 content-container">
        <ul className="grid grid-cols-2 px-5 py-5 small:grid-cols-4 gap-x-4 gap-y-8">
          {data
            ? data.map((product) => (
                <li key={product.id}>
                  <ProductPreview {...product} />
                </li>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </ul>
        {/* <div className="flex flex-col items-center mb-16 text-center">
          <UnderlineLink href="/store">SHOP</UnderlineLink>
        </div> */}
      </div>
    </div>
  )
}

export default FeaturedProducts
