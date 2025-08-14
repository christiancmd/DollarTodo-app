export default function DollarFooter({ modeDark, timeClock }) {
  return (
    <footer
      className={`w-full absolute bottom-0 py-8 px-3 border-b  rounded-sm shadow-lg 
            ${
              modeDark === false
                ? "bg-green-100 shadow-gray-400 border-gray-100 "
                : "bg-gray-700 shadow-gray-800 border-none"
            }
            `}
    >
      <div className="flex items-center justify-between">
        <h1
          className={`${
            modeDark === false ? "text-gray-600" : "text-gray-200"
          }`}
        >
          DollarTodo
        </h1>
        <p
          className={`${
            modeDark === false ? "text-gray-600" : "text-gray-200"
          }`}
        >
          {timeClock.toLocaleString()}
        </p>
      </div>
    </footer>
  );
}
