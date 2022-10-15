export const SkeletonCodeForm = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-24 mb-4 bg-gray-100 dark:bg-mediumbg h-7"></div>
      <div className="grid grid-cols-[1fr_80px] gap-x-2">
        <div className="h-12 bg-gray-100 dark:bg-mediumbg"></div>
        <div className="h-12 bg-gray-100 dark:bg-mediumbg"></div>
      </div>
    </div>
  )
}

export default SkeletonCodeForm
