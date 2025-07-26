function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute text-sm bottom-12 left-2  text-gray-500 z-0 pointer-events-none "
    >
      {children}
    </label>
  );
}

export default Label;
