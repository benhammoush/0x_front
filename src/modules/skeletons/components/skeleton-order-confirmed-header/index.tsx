const SkeletonOrderConfirmedHeader = () => {
  return (
    <div className="flex flex-col pb-10 gap-y-2 animate-pulse">
      <div className="w-2/5 h-4 bg-gray-100 dark:bg-mediumbg"></div>
      <div className="w-3/6 h-6 bg-gray-100 dark:bg-mediumbg"></div>
      <div className="flex gap-x-4">
        <div className="w-16 h-4 bg-gray-100 dark:bg-mediumbg "></div>
        <div className="w-12 h-4 bg-gray-100 dark:bg-mediumbg"></div>
      </div>
    </div>
  )
}

export default SkeletonOrderConfirmedHeader
