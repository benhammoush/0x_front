const SkeletonLineItem = () => {
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4 animate-pulse">
      <div className="w-[122px] h-[143px] bg-gray-200 dark:bg-mediumbg" />
      <div className="flex items-start justify-between text-base-regular">
        <div>
          <div className="flex flex-col gap-y-2">
            <div className="h-3 w-[120px] bg-gray-200 dark:bg-mediumbg" />
            <div className="h-3 w-[65px] bg-gray-200 dark:bg-mediumbg" />
          </div>
        </div>
        <div className="h-3 w-[65px] bg-gray-200 dark:bg-mediumbg" />
      </div>
    </div>
  )
}

export default SkeletonLineItem
