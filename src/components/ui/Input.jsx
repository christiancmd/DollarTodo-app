export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-4 pl-9 text-right py-4 border-b-2 border-gray-300 rounded-lg z-10 placeholder-gray-800 dark:placeholder-white  focus:outline-none focus:ring-0 focus:ring-offset-0
      [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}
