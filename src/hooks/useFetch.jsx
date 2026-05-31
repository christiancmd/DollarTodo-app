import { useEffect, useState } from "react";

export function useFetch(url) {
  const [dollarData, setDollarData] = useState([]);
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDollarData(data.dolar);
        setDateData(data.datetime);
      })
      .catch((error) => {
        console.log("Error al hacer solicitud:", error);
      });
  }, []);

  return {
    dollarData,
    setDollarData,
    dateData,
    setDateData,
  };
}
