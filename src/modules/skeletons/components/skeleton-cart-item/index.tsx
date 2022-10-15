const SkeletonCartItem = () => {
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <div className="w-[122px] bg-gray-100 dark:bg-mediumbg aspect-[29/34]"></div>
      <div className="flex flex-col text-base-regular gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="w-32 h-6 bg-gray-100 dark:bg-mediumbg"></div>
            <div className="w-24 h-3 bg-gray-100 dark:bg-mediumbg"></div>
            <div className="w-24 h-3 bg-gray-100 dark:bg-mediumbg"></div>
          </div>
          <div className="w-20 h-8 bg-gray-100 dark:bg-mediumbg"></div>
        </div>
        <div className="flex items-end justify-between flex-1 text-small-regular">
          {/* <div>
              <button
                className="flex items-center text-gray-500 gap-x-1"
                onClick={() => deleteItem(item.id)}
              >
                <Trash size={14} />
                <span>Remove</span>
              </button>
            </div>
            <div>
              <LineItemPrice
                variant={item.variant as CalculatedVariant}
                quantity={item.quantity}
                region={region}
              />
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartItem
