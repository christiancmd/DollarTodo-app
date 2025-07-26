function DollarHeader({ modeDark, dollarData }) {
  return (
    <header className="w-full absolute top-0 flex-1 flex flex-col items-center justify-center py-4">
      <div className="text-center mb-18">
        <p className="text-gray-500 text-sm">Valor actual del dólar</p>
        <div className="mt-2 text-sm flex items-center flex-col justify-center text-green-500">
          <p
            className={`text-4xl font-bold mt-2
                ${modeDark === false ? " text-blue-800" : "text-white"}`}
          >
            {dollarData.price} Bs
          </p>
          <div>
            {dollarData.symbol} {dollarData.change}%{" "}
            <span className="ml-1">respecto a ayer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DollarHeader;
