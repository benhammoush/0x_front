const SkeletonCartTotals = ({ header = true }) => {
  return (
    <div className="flex flex-col">
      {header && <div className="w-32 h-4 mb-4 bg-gray-100 dark:bg-mediumbg"></div>}
      <div className="flex items-center justify-between">
        <div className="w-32 h-3 bg-gray-100 dark:bg-mediumbg"></div>
        <div className="w-32 h-3 bg-gray-100 dark:bg-mediumbg"></div>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="w-24 h-3 bg-gray-100 dark:bg-mediumbg"></div>
        <div className="w-24 h-3 bg-gray-100 dark:bg-mediumbg"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-100 w-28 dark:bg-mediumbg"></div>
        <div className="w-20 h-3 bg-gray-100 dark:bg-mediumbg"></div>
      </div>

      <div className="w-full my-4 border-b border-gray-200 border-dashed"></div>

      <div className="flex items-center justify-between">
        <div className="w-32 h-6 mb-4 bg-gray-100 dark:bg-mediumbg"></div>
        <div className="w-24 h-6 mb-4 bg-gray-100 dark:bg-mediumbg"></div>
      </div>
    </div>
  )
}

export default SkeletonCartTotals
