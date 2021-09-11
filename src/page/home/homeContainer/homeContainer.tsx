import React, { useState, useEffect } from "react";
import BtnWidget from "@/components/form/btnWidget";
import {
  getAccounts,
  name,
  symbol,
  // getERC721Balance,
  // getERC721TokenIdByIndex,
  // getERC721TokenURI,
  maxDBRPurchase as getMaxDBRPurchase,
  totalSupply,
  saleIsActive,
  maxDBRs as getMaxDBRs,
  getETHBalance,
  DBRPrice,
  mint,
} from "@/services/web3";
import Toast from "@/components/toast";

import "./homeContainer.less";
function HomeContainer() {
  const [mintValue, setMintValue] = useState(1);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [account, setAccount] = useState("");
  const [ETHBalance, setETHBalance] = useState("");
  const [maxDBRPurchase, setMaxDBRPurchase] = useState(20);
  const [maxDBRs, setMaxDBRs] = useState(10000);
  const [ERC721DBRTotalSupply, setERC721DBRTotalSupply] = useState(10000);
  const [ERC721SaleIsActive, setERC721SaleIsActive] = useState(true);

  const [ERC721Name, setERC721Name] = useState("");
  const [ERC721Symbol, setERC721Symbol] = useState("");
  const [ERC721Price, setERC721Price] = useState("100000000000000000000");

  // const [ERC721Balance, setERC721Balance] = useState<String>("");
  // const [ERC721Tokens, setERC721Tokens] = useState<{
  //   [token: string]: {
  //     tokenURI: string;
  //     shares?: string | undefined;
  //     balance?: string | undefined;
  //     price?: string | undefined;
  //   };
  // }>({});

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
      setMaxDBRPurchase(Number(await getMaxDBRPurchase()));
      setMaxDBRs(Number(await getMaxDBRs()));
      setERC721DBRTotalSupply(Number(await totalSupply()));
      setERC721SaleIsActive(await saleIsActive());

      setERC721Name(await name());
      setERC721Symbol(await symbol());
      setERC721Price(await DBRPrice());
    })();
  }, []);
  useEffect(() => {
    if (accounts === null) return;
    if (accounts.length === 0) return;
    console.log(accounts);
    setAccount(accounts[0]);
    (async () => {
      setETHBalance(await getETHBalance(accounts[0]));
      // const balance = await getERC721Balance({ contract, account });

      // setERC721Balance(balance);
      // if (Number(balance) > 0) {
      //   const _ERC721Tokens: {
      //     [token: string]: {
      //       tokenURI: string;
      //       shares?: string;
      //       balance?: string;
      //       price?: string;
      //     };
      //   } = {};
      //   console.log("22222aaa", account, contract);
      //   if (ERC721Balance && Number(ERC721Balance) > 0) {
      //     console.log("eeee", account, contract);
      //     for (let i = 0; i < Number(ERC721Balance); i++) {
      //       console.log("22222", account, contract, i);
      //       const tokenId = await getERC721TokenIdByIndex({
      //         account,
      //         contract,
      //         index: i,
      //       });
      //       const tokenURI = await getERC721TokenURI(account, tokenId);
      //       _ERC721Tokens[tokenId] = {
      //         tokenURI,
      //       };
      //     }
      //     setERC721Tokens(_ERC721Tokens);
      //   }
      // }
    })();
  }, [accounts]);
  return (
    <div className="homeContainer">
      <h2>{ERC721Name} on the Fantom</h2>
      <div className="partone">
        <div className="fl">
          <p>
            Launched in 2021, Don’t Buy Rock is one of the last crypto
            collectible NFT-type projects on the Fantom blockchain, having
            launched shortly after EtherRocks. Only 10000 rocks can ever be
            available, and each new virgin rock gets more and more crazy. This
            game is built entirely on the Fantom blockchain, with a
            decentralized smart contract (
            <a href="./" target="_blank">
              deployed here
            </a>
            ) used to manage everything including the buying and selling of
            rocks, their prices and owners.
          </p>
          <p>
            These virtual rocks serve NO PURPOSE beyond being able to be brought
            and sold, and giving you a strong feeling of being teased in being
            an owner of 1 of the only 10000 rocks in the game :)
          </p>
          <p>
            How to play: you must be connected to the Fantom mainnet to view
            info on rocks, and some FTM (the currency of FTM) to buy a rock. The
            easiest way to connect to the Fantom mainnet is to use the MetaMask
            plugin for Chrome -- go ahead and install it (takes 1 minute), then
            refresh this page. To get FTM you will need to buy some from an
            exchange like Coinbase.
          </p>
        </div>
        <div className="fr">
          <ul>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
              <li key={v}>
                <img
                  src={require(`../assets/${v}.${v === 4 ? "gif" : "png"}`)}
                  alt={`NFT-${ERC721Symbol}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="parttwo">
        <div className="fl">
          <p>
            <strong>FAIR DISTRIBUTION</strong>
          </p>
          <p>
            Buying a {ERC721Symbol} costs 100 FTM. There are no price tiers;{" "}
            {ERC721Name}
            membership costs the same for everyone.
          </p>
        </div>
        <div className="fr">
          <div className="mintNum">
            <div
              className="sub"
              onClick={() => {
                console.log(2222);
                if (mintValue > 0) {
                  setMintValue(Math.floor(mintValue - 1));
                }
              }}
            ></div>
            <h3>{mintValue}</h3>
            <div
              className="add"
              onClick={() => {
                if (account) {
                  if (
                    // (ERC721Balance &&
                    //   Number(ERC721Balance) >= maxDBRPurchase) ||
                    maxDBRPurchase < mintValue
                  ) {
                    Toast.show(
                      `Maximum purchase per account ${maxDBRPurchase} ${ERC721Symbol}`
                    );
                    return false;
                  }
                  if (
                    Number(ETHBalance) * Math.pow(10, 18) <
                    Number(ERC721Price) * mintValue
                  ) {
                    Toast.show(
                      `over balance ${ETHBalance}， DBR Price：${
                        Number(ERC721Price) / Math.pow(10, 18)
                      }`
                    );
                  } else {
                    setMintValue(Math.floor(mintValue + 1));
                  }
                } else {
                  Toast.show("failed to connect wallect");
                }
              }}
            ></div>
          </div>
          <BtnWidget
            label="mint"
            onClick={() => {
              if (!ERC721SaleIsActive) {
                Toast.show("coming soon!");
                return false;
              }
              if (maxDBRPurchase < mintValue) {
                Toast.show(`Maximum purchase per account ${maxDBRPurchase} ${ERC721Symbol}`);
                return false;
              }
              if (
                Number(ETHBalance) * Math.pow(10, 18) <
                Number(ERC721Price) * mintValue
              ) {
                Toast.show(
                  `Exceed balance: ${ETHBalance}， DBR Price: ${
                    Number(ERC721Price) / Math.pow(10, 18)
                  }`
                );
                return false;
              }
              console.log(mintValue);
              console.log(ERC721Price);
              mint({
                numberOfTokens: `${mintValue}`,
                price: `${ERC721Price}`,
                account: account,
              });
            }}
          />
          <div className="remaining">
            <p>
              remaining
              <i>
                {maxDBRs - ERC721DBRTotalSupply}/{maxDBRs}
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeContainer;
