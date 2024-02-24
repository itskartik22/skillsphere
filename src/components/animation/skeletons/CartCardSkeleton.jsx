const CartCardSkeleton = () => {
  return (
    <div className="w-full flex rounded-md border-2 p-1 relative">
      <div className="flex w-full gap-2">
        <div
          alt=""
          className="w-24 h-24 bg-skeleton-dark animate-skeleton rounded-md"
        ></div>
        <div className="flex gap-2 w-2/3 flex-col">
          <div className="md:text-lg w-full h-6 bg-skeleton animate-skeleton rounded-sm"></div>
          <p className="w-1/2 h-4 bg-skeleton-lite animate-skeleton"></p>
          <p className="w-1/3 h-4 bg-skeleton animate-skeleton"></p>
          <p className="w-1/4 h-4 bg-skeleton-lite animate-skeleton"></p>
        </div>
      </div>
      <div className="absolute bg-skeleton h-5 w-5 right-1 top-1 text-white p-1 rounded-sm"></div>
    </div>
  );
};

export default CartCardSkeleton;
