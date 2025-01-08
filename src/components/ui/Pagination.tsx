const Pagination = () => {
  return (
    <div className="py-4  flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-1 md:py-2 px-2 md:px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex gap-2 items-center text-sm">
        <button className="px-2 rounded-sm bg-sky">1</button>
        <button className="px-2 rounded-sm ">2</button>
        <button className="px-2 rounded-sm ">3</button>
        ...
        <button className="px-2 rounded-sm ">10</button>
      </div>
      <button
        disabled
        className="py-1 md:py-2 px-2 md:px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
