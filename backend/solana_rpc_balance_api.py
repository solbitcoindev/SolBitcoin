from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os

SOLANA_RPC = os.getenv("SOLANA_RPC", "https://api.mainnet-beta.solana.com")

app = FastAPI(title="Solana SPL Token Balance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BalanceRequest(BaseModel):
    wallet: str
    mint: str

async def get_token_account(wallet: str, mint: str):
    # Get all SPL token accounts for the wallet
    async with httpx.AsyncClient() as client:
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getTokenAccountsByOwner",
            "params": [
                wallet,
                {"mint": mint},
                {"encoding": "jsonParsed"}
            ]
        }
        resp = await client.post(SOLANA_RPC, json=payload, timeout=20.0)
        resp.raise_for_status()
        data = resp.json()
        return data

@app.get("/rpc-balance")
async def rpc_balance(wallet: str, mint: str):
    try:
        data = await get_token_account(wallet, mint)
        accounts = data.get("result", {}).get("value", [])
        if not accounts:
            return {"balance": 0}
        # Usually only one account per mint
        amount = accounts[0]["account"]["data"]["parsed"]["info"]["tokenAmount"]
        ui_amount = amount.get("uiAmountString") or str(amount.get("uiAmount", 0))
        return {"balance": ui_amount}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok"}
