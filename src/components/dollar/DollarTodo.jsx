//Componentes
import { Input, Label } from "../ui";
import { useFetch } from "../../hooks/useFetch";
import DollarHeader from "./DollarHeader";
import DollarFooter from "./DollarFooter";
import ButtonTheme from "./ButtonTheme";

//Hook
import { useState, useEffect } from "react";

//Icon
import { IoLogoUsd } from "react-icons/io";

export default function DollarTodo() {
  const [timeClock, setTimeClock] = useState(new Date());
  const [dollar, setDollar] = useState("0.00");
  const [apiDollar, setApiDollar] = useState(import.meta.env.VITE_API);
  const [activeForm, setActiveForm] = useState("usdToBs");

  const { dollarData, loading, error } = useFetch(apiDollar);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeClock(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dollarData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleUsdToBs = (e) => {
    const number = parseFloat(e.target.value);
    const op = number > 0 && dollarData > 0 ? number * dollarData : 0;
    setDollar(formatCurrency(op));
  };

  const handleBsToUsd = (e) => {
    const number = parseFloat(e.target.value);
    const op = number > 0 && dollarData > 0 ? number / dollarData : 0;
    setDollar(formatCurrency(op));
  };

  return (
    <article className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-6 rounded-xl shadow-lg max-w-md w-full h-148 border border-gray-100">
      <div className="relative flex flex-col items-center justify-center h-full">
        {/* Header*/}
        <DollarHeader dollarData={dollarData} />

        {/* Buttons*/}
        <div className="flex items-center justify-center gap-4 mb-10 z-20">
          <button
            onClick={() => setActiveForm("usdToBs")}
            id="buttonUsdToBs"
            className={`py-3 px-4 text-sm rounded-2xl font-semibold cursor-pointer transition-all ${
              activeForm === "usdToBs"
                ? "bg-teal-900 text-white border-b-4 border-blue-500 shadow-2xl"
                : "bg-teal-600 text-white hover:bg-teal-900 dark:bg-teal-500"
            }`}
          >
            Dolares a Bolivares
          </button>
          <button
            id="buttonBsToUsd"
            onClick={() => setActiveForm("bsToUsd")}
            className={`py-3 px-4 text-sm rounded-2xl font-semibold cursor-pointer transition-all ${
              activeForm === "bsToUsd"
                ? "bg-teal-900 text-white border-b-4 border-blue-500 shadow-2xl"
                : "bg-teal-600 text-white hover:bg-teal-900 dark:bg-teal-500"
            }`}
          >
            Bolivares a dolares
          </button>
        </div>

        {loading ? (
          <div className="w-2xs flex flex-col items-center justify-center gap-2 h-48">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Obteniendo tasa de cambio...</p>
          </div>
        ) : error ? (
          <div className="w-2xs flex flex-col items-center justify-center gap-2 h-48 text-center px-4">
            <p className="text-sm font-semibold text-red-600 mt-2">Error de conexión</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{error.message}</p>
          </div>
        ) : activeForm === "usdToBs" ? (
          /* Form usd to bs*/
          <form
            action="#"
            id="formUsdBs"
            className="w-2xs flex relative flex-col items-center justify-center gap-4"
          >
            <div className="w-full mb-4 relative text-gray-700 dark:text-white">
              <Label htmlFor="amount">Cantidad en Dolares</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                onChange={handleUsdToBs}
              />
              <IoLogoUsd className="absolute top-5.5 left-2.5" />
            </div>

            <div className="w-full h-15 mb-4 relative text-gray-700 dark:text-white">
              <Label htmlFor="result">Resultado En Bolivares</Label>
              <Input
                type="text"
                id="result"
                name="result"
                placeholder={dollar}
                disabled
              ></Input>

              <span className="absolute left-3 bottom-5 font-bold text-gray-700 dark:text-white">
                Bs
              </span>
            </div>
          </form>
        ) : (
          /* Form bs to usd*/
          <form
            action="#"
            id="formBsUsd"
            className="w-2xs flex relative flex-col items-center justify-center gap-4"
          >
            <div className="w-full mb-4 relative text-gray-500 dark:text-white">
              <Label htmlFor="amount">Cantidad en Bolivares</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                min="0"
                onChange={handleBsToUsd}
              />
              <span className="absolute left-3 bottom-4 font-bold text-gray-700 dark:text-white">
                Bs
              </span>
            </div>

            <div className="w-full mb-4 relative text-gray-700 dark:text-white font-bold">
              <Label htmlFor="result">Resultado En Dolares</Label>
              <Input
                type="text"
                id="result"
                name="result"
                placeholder={dollar}
                disabled
              />
            </div>

            <IoLogoUsd className="absolute left-2 bottom-9 text-gray-600 dark:text-white" />
          </form>
        )}

        {/* Footer*/}
        <DollarFooter timeClock={timeClock} />

        {/* Modo Oscuro*/}
        <ButtonTheme />
      </div>
    </article>
  );
}
