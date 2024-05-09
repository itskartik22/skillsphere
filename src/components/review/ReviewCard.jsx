const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-100 px-4 py-3 flex flex-col gap-1 rounded-md">
      <div className="flex items-center">
        <div className="font-medium">
          <p className="text-lg">Jese Leos </p>
          <time
            datetime="2014-08-16 19:00"
            className="block text-sm font-normal"
          >
            12 March 2021
          </time>
        </div>
      </div>
      <p className="mb-2 italic">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time,
      </p>
    </div>
  );
};

export default ReviewCard;
