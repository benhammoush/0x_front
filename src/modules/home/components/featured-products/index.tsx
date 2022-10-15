import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="bg-gray-50 dark:bg-darkbg dark:text-white">
      <div className="py-12 content-container">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="mt-0 mb-2 text-xs font-normal tracking-widest text-gray-400 uppercase">
            Latest products
          </span>
          <p className="max-w-lg mb-4 text-gray-900 dark:text-white text-2xl-regular">
            Our newest styles are here to help you look your best.
          </p>
          <UnderlineLink href="/store">Explore products</UnderlineLink>
        </div>
        <ul className="grid grid-cols-2 px-5 py-5 bg-white border rounded-md dark:border-darkborder dark:bg-mediumbg small:grid-cols-4 gap-x-4 gap-y-8">
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
      </div>
    </div>
  )
}

export default FeaturedProducts
