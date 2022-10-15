import SkeletonCartTotals from "@modules/skeletons/components/skeleton-cart-totals"

const SkeletonOrderInformation = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 py-10 border-b border-gray-200 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="w-32 h-4 mb-4 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-2/6 h-3 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-3/6 h-3 my-2 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-1/6 h-3 bg-gray-100 dark:bg-mediumbg"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-32 h-4 mb-4 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-2/6 h-3 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-3/6 h-3 my-2 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-2/6 h-3 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-1/6 h-3 mt-2 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-32 h-4 my-4 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-1/6 h-3 bg-gray-100 dark:bg-mediumbg"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 py-10 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="w-32 h-4 mb-4 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-2/6 h-3 bg-gray-100 dark:bg-mediumbg"></div>
          <div className="w-3/6 h-3 my-4 bg-gray-100 dark:bg-mediumbg"></div>
        </div>

        <SkeletonCartTotals />
      </div>
    </div>
  )
}

export default SkeletonOrderInformation
