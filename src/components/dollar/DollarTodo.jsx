//Componentes
import { Input, Label } from "../ui";
import { useFetch } from "../../hooks/useFetch";
import DollarHeader from "./DollarHeader";
import DollarFooter from "./DollarFooter";

//Hook
import { useState, useEffect } from "react";

//Icon
import { FaMoon } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";

function DollarToday() {
  const [timeClock, setTimeClock] = useState(new Date());
  const [dollar, setDollar] = useState("0.00");
  const [modeDark, setModeDark] = useState(false);

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

  const handleModeDark = () => {
    if (!modeDark) {
      setModeDark(true);
    }

    if (modeDark) {
      setModeDark(false);
    }
  };

  const handleUsdToBs = (e) => {
    const number = e.target.value;
    const op = number > 0 ? (number * dollarData.price).toFixed(2) : "0.00";
    setDollar(op);
  };

  const handleBsToUsd = (e) => {
    const number = e.target.value;
    const op = number > 0 ? (number / dollarData.price).toFixed(2) : "0.00";
    setDollar(op);
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
    <article
      className={`p-6 rounded-xl shadow-lg max-w-md w-full h-148 border border-gray-100
        ${modeDark === false ? "bg-white" : "bg-gray-900"}
        `}
    >
      <div className="relative flex flex-col items-center justify-center h-full">
        {/* Header*/}

        <DollarHeader dollarData={dollarData} modeDark={modeDark} />

        {/* Buttons*/}

        <div className="flex items-center justify-center gap-4 mb-10 z-20">
          <button
            onClick={changeForm}
            id="buttonUsdToBs"
            className="py-3 px-4 text-sm rounded-2xl bg-teal-600 text-white font-semibold cursor-pointer hover:bg-teal-900"
          >
            Dolares a Bolivares
          </button>
          <button
            id="buttonBsToUsd"
            onClick={changeForm}
            className="py-3 px-4 text-sm rounded-2xl bg-teal-600 text-white font-semibold cursor-pointer hover:bg-teal-900"
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
          <div
            className={`w-full mb-4  relative 
            ${modeDark === false ? "text-gray-700" : "text-white"}`}
          >
            <Label htmlFor="amount">Cantidad en Dolares</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              onChange={handleUsdToBs}
            />
            <IoLogoUsd className="absolute top-5.5 left-2.5" />
          </div>

          <div
            className={`w-full h-15 mb-4 relative
            ${modeDark === false ? "text-gray-700" : "text-white"}`}
          >
            <Label htmlFor="result">Resultado En Bolivares</Label>
            <Input
              type="text"
              id="result"
              name="result"
              placeholder={dollar}
              disabled
            ></Input>

            <span className="absolute left-3 bottom-5 font-bold text-gray-700">
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
          <div
            className={`w-full mb-4  relative 
            ${modeDark === false ? "text-gray-500" : "text-white"}`}
          >
            <Label htmlFor="amount">Cantidad en Bolivares</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              min="0"
              onChange={handleBsToUsd}
            />
            <span className="absolute left-3 bottom-4 font-bold text-gray-700">
              Bs
            </span>
          </div>

          <div
            className={`w-full mb-4 relative 
            ${modeDark === false ? "text-gray-700" : "text-white"}`}
          >
            <Label htmlFor="result">Resultado En Dolares</Label>
            <Input
              type="text"
              id="result"
              name="result"
              placeholder={dollar}
              disabled
            />
          </div>

          <IoLogoUsd className="absolute left-2 bottom-9 text-gray-600 " />
        </form>

        {/* Footer*/}

        <DollarFooter modeDark={modeDark} timeClock={timeClock} />

        {/* Modo Oscuro*/}

        <button
          onClick={handleModeDark}
          className={`absolute top-0 right-0 flex items-center justify-center rounded-2xl cursor-pointer transition-colors hover:shadow-lg hover:border
          ${
            modeDark === false
              ? "bg-blue-950 text-white hover:bg-white hover:text-blue-950 hover:shadow-gray"
              : "bg-white text-blue-950 hover:bg-blue-950 hover:text-white hover:shadow-white hover:shadow-sm"
          } size-10`}
        >
          <FaMoon />
        </button>
      </div>
    </article>
  );
}

export default DollarToday;
