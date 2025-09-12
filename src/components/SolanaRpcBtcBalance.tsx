import React, { useEffect, useState } from "react";

const WALLET = "FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5";
const MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const API_URL = "https://parser-jgup.onrender.com/rpc-balance"; // production URL или локалка

export default function SolanaRpcBtcBalance() {
  const [balance, setBalance] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchBalance = async () => {
      try {
        setError(null);
        const res = await fetch(`${API_URL}?wallet=${WALLET}&mint=${MINT}`);
        const data = await res.json();

        if (typeof data.balance !== "undefined" && data.balance !== null) {
          setBalance(String(data.balance));
          setHasLoaded(true);
        } else {
          setError("No balance data");
        }
      } catch (e) {
        setError("API error");
      }
    };

    fetchBalance();
    timer = setInterval(fetchBalance, 600000);

    return () => clearInterval(timer);
  }, []);

  // Функция для форматирования с разделением разрядов
  const formatNumber = (value: number, showDecimals: boolean) => {
    const [intPart, decimals] = value.toFixed(2).split(".");

    // Разбиваем целую часть по группам тысяч
    const groups = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ").split(" ");

    return showDecimals ? [...groups, ".", decimals] : groups;
  };

  let groups: string[] = [];
  if (balance && hasLoaded) {
    const num = Number(balance);
    const showDecimals =
      typeof window !== "undefined" ? window.innerWidth >= 640 : true; // только на десктопе
    groups = formatNumber(num, showDecimals);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center flex-wrap gap-3.5 sm:gap-4">
        {!hasLoaded ? (
          <div className="text-2xl sm:text-3xl font-bold gradient-text font-space">
            Loading ...
          </div>
        ) : (
          groups.map((block, i) => (
            <div
              key={i}
              className={`flex ${
                block.length > 1 || block === "." ? "gap-2 sm:gap-2" : ""
              }`}
            >
              {block.split("").map((char, j) => (
                <div
                  key={j}
                  className="countdown-box w-8 h-12 sm:w-12 sm:h-16 flex items-center justify-center"
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-3xl font-bold gradient-text font-space">
                      {char}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      {/* <div className="text-sm text-muted-foreground mt-2">BTC</div> */}
    </div>
  );
}
