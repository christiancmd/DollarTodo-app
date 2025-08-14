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

  const { dollarData } = useFetch(
    "https://pydolarve.org/api/v2/dollar?page=alcambio&format_date=default&rounded_price=true"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeClock(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleUsdToBs = (e) => {
    const number = parseFloat(e.target.value);
    const op = number > 0 ? number * dollarData.price : 0;
    setDollar(formatCurrency(op));
  };

  const handleBsToUsd = (e) => {
    const number = parseFloat(e.target.value);
    const op = number > 0 ? number / dollarData.price : 0;
    setDollar(formatCurrency(op));
  };
  const changeForm = (e) => {
    const formUsdBs = document.getElementById("formUsdBs");
    const formBsUsd = document.getElementById("formBsUsd");
    const buttonUsdBs = document.getElementById("buttonUsdToBs");
    const buttonBsUsd = document.getElementById("buttonBsToUsd");

    // Quitar estilos activos
    buttonUsdBs.classList.remove("border-b-4", "border-blue-500", "bg-blue-50");
    buttonBsUsd.classList.remove("border-b-4", "border-blue-500", "bg-blue-50");

    if (e.target.id === "buttonBsToUsd") {
      formUsdBs.style.display = "none";
      formBsUsd.style.display = "flex";
      buttonBsUsd.classList.add("border-b-4", "border-blue-500", "bg-blue-50");
    } else {
      formUsdBs.style.display = "flex";
      formBsUsd.style.display = "none";
      buttonUsdBs.classList.add(
        "border-b-4",
        "border-blue-500",
        "bg-blue-50",
        "shadow-2xl"
      );
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-6 rounded-xl shadow-lg max-w-md w-full h-148 border border-gray-100">
      <div className="relative flex flex-col items-center justify-center h-full">
        {/* Header*/}
        <DollarHeader dollarData={dollarData} />

        {/* Buttons*/}
        <div className="flex items-center justify-center gap-4 mb-10 z-20">
          <button
            onClick={changeForm}
            id="buttonUsdToBs"
            className="py-3 px-4 text-sm rounded-2xl bg-teal-600 text-white font-semibold cursor-pointer hover:bg-teal-900 dark:bg-teal-500"
          >
            Dolares a Bolivares
          </button>
          <button
            id="buttonBsToUsd"
            onClick={changeForm}
            className="py-3 px-4 text-sm rounded-2xl bg-teal-600 text-white font-semibold cursor-pointer hover:bg-teal-900 dark:bg-teal-500"
          >
            Bolivares a dolares
          </button>
        </div>

        {/* Form usd to bs*/}
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

        {/* Form bs to usd*/}
        <form
          action="#"
          id="formBsUsd"
          className="w-2xs hidden relative flex-col items-center justify-center gap-4"
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

        {/* Footer*/}
        <DollarFooter timeClock={timeClock} />

        {/* Modo Oscuro*/}
        <ButtonTheme />
      </div>
    </article>
  );
}
