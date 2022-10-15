import repeat from "@lib/util/repeat"

const SkeletonProductTabs = () => {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="flex items-center pb-2 border-b border-gray-100 gap-x-6">
        {repeat(2).map((index) => (
          <div
            key={index}
            className="flex-1 w-12 h-6 pb-2 bg-gray-100 dark:bg-mediumbg basis-0"
          ></div>
        ))}
      </div>
      <div className="py-8">
        <div className="grid grid-cols-2 gap-x-8">
          {repeat(2).map((index) => (
            <div className="flex flex-col gap-y-4" key={index}>
              {repeat(3).map((index) => (
                <div className="flex flex-col gap-y-2" key={index}>
                  <div className="w-32 h-4 bg-gray-100 dark:bg-mediumbg"></div>
                  <div className="w-16 h-2 bg-gray-100 dark:bg-mediumbg"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductTabs
