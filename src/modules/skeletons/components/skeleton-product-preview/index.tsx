const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[29/34] w-full bg-gray-100 dark:bg-darkbg"></div>
      <div className="mt-2 text-base-regular">
        <div className="w-3/5 h-6 bg-gray-100 dark:bg-darkbg"></div>

        <div className="w-2/5 h-6 mt-2 bg-gray-100 dark:bg-darkbg"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
