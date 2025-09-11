import React, { useEffect, useState } from "react";

const WALLET = "GfQRKRTQKcQmtFfWCBNvw6652fZW5GUoDacL6Svu5mD4";
const MINT = "BTCBZ6hrcn5g8MANyQep6QVqZWpD5TqjSUKTUKHivkfa";
const API_URL = "https://585f7ffdefb1.ngrok-free.app/rpc-balance"; // если backend на другом сервере, укажите production URL http://localhost:8010/rpc-balance

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
    timer = setInterval(fetchBalance, 60000);
    return () => clearInterval(timer);
  }, []);

  let formatted = balance;
  if (balance && hasLoaded) {
    const num = Number(balance);
    formatted = num.toFixed(2); // только точка, без запятых
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 justify-center">
        {!hasLoaded ? (
          <div className="text-3xl font-bold gradient-text font-space">Loading...</div>
        ) : (
          formatted!.split("").map((char, i) => (
            <div key={i} className="countdown-box">
              <div className="relative z-10">
                <div className="text-3xl font-bold gradient-text font-space">{char}</div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* <div className="text-sm text-muted-foreground mt-2">BTC</div> */}
    </div>
  );
}
