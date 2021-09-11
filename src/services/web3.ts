import Portis from "@portis/web3";
import Web3 from "web3";

import config from "@/config/index";
const { nftAddress } = config;

const ERC20_METADATA_ABI = require("../abi/ERC20Metadata.json");
const ERC20_ABI = require("../abi/ERC20.json");
const ERC721_ENUMERABLE_ABI = require("../abi/ERC721Enumerable.json");
const ERC165_ABI = require("../abi/ERC165.json");

const ERC721_ABI = require("../abi/ERC721.json");
const DBR = require("../abi/DBR.json");
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // should wait?
}

if (!window.web3) {
  const DAPP_ID = "a0fa4f71-2d8e-4a67-baa6-33ab41c3ba26";
  const portis = new Portis(DAPP_ID, "mainnet");
  window.web3 = new Web3(portis.provider);
}

const web3 = new Web3(window.web3.currentProvider);

const NFTFY_CONTRACT_RINKEBY = "0xc0D1946C1754d2F94dE4Cf52deF7162f6611316D";

// const ERC721_METADATA_INTERFACE_ID = '0x5b5e139f';
const ERC721_INTERFACE_ID = "0x80ac58cd";
// const ERC721_ENUMERABLE_INTERFACE_ID = '0x780e9d63';

export async function getNftfyContract(): Promise<string> {
  const network = await web3.eth.net.getNetworkType();
  switch (network) {
    // TODO main
    case "main":
      return "0x97fb1e97A05aF8ff862C7f5fA9e28C716660d632";
    case "rinkeby":
      return NFTFY_CONTRACT_RINKEBY;
    default:
      throw new Error("Unsupported network");
  }
}

function toCents(amount: string, decimals: number): string {
  return (Number(amount) * 10 ** decimals).toFixed(0);
}

function fromCents(amount: string, decimals: number): string {
  return (Number(amount) / 10 ** decimals).toFixed(decimals);
}

export function isValidAddress(address: string): boolean {
  return web3.utils.isAddress(address);
}

export async function getAccounts(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if (error) return reject(error);
      return resolve(accounts);
    });
  });
}

export async function getETHBalance(address: string): Promise<string> {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, "latest", (error, balance) => {
      if (error) return reject(error);
      return resolve(web3.utils.fromWei(balance, "ether"));
    });
  });
}

export async function transferETH(
  account: string,
  address: string,
  amount: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction({
        from: account,
        to: address,
        value: web3.utils.toWei(amount, "ether"),
      })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC20_name(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return abi.methods.name().call();
}

async function ERC20_symbol(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return abi.methods.symbol().call();
}

async function ERC20_decimals(contract: string): Promise<number> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return Number(await abi.methods.decimals().call());
}

async function ERC20_balanceOf(
  contract: string,
  address: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_ABI, contract);
  return abi.methods.balanceOf(address).call();
}

async function ERC20_transfer(
  account: string,
  contract: string,
  address: string,
  amount: string
): Promise<void> {
  const abi = new window.web3.eth.Contract(ERC20_ABI, contract);
  return new Promise((resolve, reject) => {
    abi.methods
      .transfer(address, amount)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

export async function getERC20Name(contract: string): Promise<string> {
  return ERC20_name(contract);
}

export async function getERC20Symbol(contract: string): Promise<string> {
  return ERC20_symbol(contract);
}

export async function getERC20Balance({
  contract,
  account,
}: {
  contract: string;
  account: string;
}): Promise<string> {
  const decimals = await ERC20_decimals(contract);
  const balance = await ERC20_balanceOf(contract, account);
  return fromCents(balance, decimals);
}

export async function transferERC20(
  account: string,
  contract: string,
  address: string,
  amount: string
): Promise<void> {
  const decimals = await ERC20_decimals(contract);
  return ERC20_transfer(account, contract, address, toCents(amount, decimals));
}

async function ERC165_supportsInterface(
  contract: string,
  interfaceId: string
): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC165_ABI, contract);
  return abi.methods.supportsInterface(interfaceId).call();
}

async function ERC721_name(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.name().call();
}

async function ERC721_symbol(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.symbol().call();
}

async function ERC721_tokenURI(tokenId: string): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.baseTokenURI(tokenId).call();
}
async function ERC721_price(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.DBRPrice().call();
}
async function ERC721_maxDBRPurchase(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.maxDBRPurchase().call();
}
async function ERC721_maxDBRs(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.maxDBRs().call();
}

async function ERC721_saleIsActive(): Promise<boolean> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.saleIsActive().call();
}
async function ERC721_tokenByIndex({ index }: { index: string }) {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.tokenByIndex(index).call();
}
async function ERC721_reserved() {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.reserved().call();
}
async function ERC721_totalSupply(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.totalSupply().call();
}
async function ERC721_owner() {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.owner().call();
}

async function ERC721_ownerOf(tokenId: string) {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.ownerOf(tokenId).call();
}
async function ERC721_isApprovedForAll({
  _owener,
  index,
}: {
  _owener: string;
  index: string;
}) {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.isApprovedForAll(_owener, index).call();
}

async function ERC721_getMyAssets({
  _owener,
  index,
}: {
  _owener: string;
  index: string;
}) {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.getMyAssets(_owener, index).call();
}

async function ERC721_getApproved(tokenId: string) {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods.getApproved(tokenId).call();
}

async function ERC721_balanceOf({
  account,
}: {
  account: string;
}): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC721_ABI, nftAddress);
  const balance = await abi.methods.balanceOf(account).call();
  return balance;
}

async function ERC721_allfrozen(): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.allfrozen().call();
}

async function ERC721_walletOfOwner({
  _owner,
}: {
  _owner: string;
}): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.walletOfOwner(_owner).call();
}

async function ERC721_admins({
  address,
}: {
  address: string;
}): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.admins(address).call();
}
async function ERC721_baseTokenURI(): Promise<string> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return abi.methods._baseTokenURI().call();
}

async function ERC721_tokenOfOwnerByIndex({
  account,
  index,
}: {
  account: string;
  index: string;
}): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC721_ENUMERABLE_ABI, nftAddress);
  return abi.methods.tokenOfOwnerByIndex(account, index).call();
}

async function ERC721_mint({
  numberOfTokens,
  price,
  account,
}: {
  numberOfTokens: string;
  account: string;
  price: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .mintDBRs(numberOfTokens)
      .send({ from: account, value: +price * +numberOfTokens, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_flipSaleState({
  account,
}: {
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .flipSaleState()
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_approve({
  to,
  tokenId,
  account,
}: {
  to: string;
  tokenId: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .approve(to, tokenId)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_disableAdmin({
  _addr,
  account,
}: {
  _addr: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .disableAdmin(_addr)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_enableAdmin({
  _addr,
  account,
}: {
  _addr: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .enableAdmin(_addr)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_freeze({
  tokenId,
  account,
}: {
  tokenId: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .freeze(tokenId)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_freezeAll({
  account,
}: {
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .freezeAll()
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_renounceOwnership({
  account,
}: {
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .renounceOwnership()
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_reserveDBRs({
  account,
  _to,
  _amount,
}: {
  account: string;
  _to: string;
  _amount: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .reserveDBRs(_to, _amount)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_safeTransferFrom({
  account,
  _to,
  _from,
  _tokenId,
}: {
  account: string;
  _to: string;
  _from: string;
  _tokenId: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .safeTransferFrom(_to, _from, _tokenId)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_withdraw({
  account,
}: {
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .withdraw()
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_transferOwnership({
  newOwner,
  account,
}: {
  newOwner: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .transferOwnership(newOwner)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_transferFrom({
  _to,
  _from,
  _tokenId,
  account,
}: {
  _to: string;
  _from: string;
  _tokenId: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .transferFrom(_to, _from, _tokenId)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_setTokenURI({
  tokenId,
  _tokenURI,
  account,
}: {
  tokenId: string;
  _tokenURI: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setTokenURI(tokenId, _tokenURI)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_setReserveAmount({
  _value,
  account,
}: {
  _value: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setReserveAmount(_value)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_setPrice({
  _price,
  account,
}: {
  _price: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setPrice(_price)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC721_setMaxTokenAmount({
  _value,
  account,
}: {
  _value: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setMaxTokenAmount(_value)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_setMaxPurchase({
  _value,
  account,
}: {
  _value: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setMaxPurchase(_value)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}
async function ERC721_setBaseTokenURI({
  baseTokenURI_,
  account,
}: {
  baseTokenURI_: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setBaseTokenURI(baseTokenURI_)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

// todo
async function ERC721_setApprovalForAll({
  operator,
  approved,
  account,
}: {
  operator: string;
  approved: string;
  account: string;
}): Promise<void> {
  const abi = new window.web3.eth.Contract(DBR, nftAddress);
  return new Promise((resolve, reject) => {
    abi.methods
      .setApprovalForAll(operator, approved)
      .send({ from: account, gas: 3000000 })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

export async function getERC721TokenIdByIndex({
  account,
  index,
}: {
  account: string;
  index: number;
}): Promise<string> {
  return ERC721_tokenOfOwnerByIndex({
    account,
    index: String(index),
  });
}

export async function supportsInterface(contract: string): Promise<boolean> {
  return ERC165_supportsInterface(contract, ERC721_INTERFACE_ID);
}

// post erc721
export async function approve({
  to,
  tokenId,
  account,
}: {
  to: string;
  tokenId: string;
  account: string;
}): Promise<void> {
  return ERC721_approve({ to, tokenId, account });
}
export async function disableAdmin({
  _addr,
  account,
}: {
  _addr: string;
  account: string;
}): Promise<void> {
  return ERC721_disableAdmin({ _addr, account });
}

export async function enableAdmin({
  _addr,
  account,
}: {
  _addr: string;
  account: string;
}): Promise<void> {
  return ERC721_enableAdmin({ _addr, account });
}

export async function flipSaleState({
  account,
}: {
  account: string;
}): Promise<void> {
  return ERC721_flipSaleState({ account });
}

export async function freeze({
  tokenId,
  account,
}: {
  tokenId: string;
  account: string;
}): Promise<void> {
  return ERC721_freeze({ tokenId, account });
}

export async function freezeAll({
  account,
}: {
  account: string;
}): Promise<void> {
  return ERC721_freezeAll({ account });
}

export async function mint({
  numberOfTokens,
  price,
  account,
}: {
  numberOfTokens: string;
  account: string;
  price: string;
}): Promise<void> {
  return ERC721_mint({ numberOfTokens, account, price });
}

export async function renounceOwnership({
  account,
}: {
  account: string;
}): Promise<void> {
  return ERC721_renounceOwnership({ account });
}

export async function reserveDBRs({
  account,
  _to,
  _amount,
}: {
  account: string;
  _to: string;
  _amount: string;
}): Promise<void> {
  return ERC721_reserveDBRs({ _to, _amount, account });
}
export async function safeTransferFrom({
  account,
  _to,
  _from,
  _tokenId,
}: {
  account: string;
  _to: string;
  _from: string;
  _tokenId: string;
}): Promise<void> {
  return ERC721_safeTransferFrom({ _to, _from, _tokenId, account });
}

export async function setApprovalForAll({
  operator,
  approved,
  account,
}: {
  operator: string;
  approved: string;
  account: string;
}): Promise<void> {
  return ERC721_setApprovalForAll({ operator, approved, account });
}

export async function setBaseTokenURI({
  baseTokenURI_,
  account,
}: {
  baseTokenURI_: string;
  account: string;
}): Promise<void> {
  return ERC721_setBaseTokenURI({ baseTokenURI_, account });
}

export async function setMaxPurchase({
  _value,
  account,
}: {
  _value: string;
  account: string;
}): Promise<void> {
  return ERC721_setMaxPurchase({ _value, account });
}

export async function setMaxTokenAmount({
  _value,
  account,
}: {
  _value: string;
  account: string;
}): Promise<void> {
  return ERC721_setMaxTokenAmount({ _value, account });
}

export async function setPrice({
  _price,
  account,
}: {
  _price: string;
  account: string;
}): Promise<void> {
  return ERC721_setPrice({ _price, account });
}

export async function setReserveAmount({
  _value,
  account,
}: {
  _value: string;
  account: string;
}): Promise<void> {
  return ERC721_setReserveAmount({ _value, account });
}

export async function setTokenURI({
  tokenId,
  _tokenURI,
  account,
}: {
  tokenId: string;
  _tokenURI: string;
  account: string;
}): Promise<void> {
  return ERC721_setTokenURI({ tokenId, _tokenURI, account });
}

export async function transferFrom({
  _to,
  _from,
  _tokenId,
  account,
}: {
  _to: string;
  _from: string;
  _tokenId: string;
  account: string;
}): Promise<void> {
  return ERC721_transferFrom({ _to, _from, _tokenId, account });
}

export async function transferOwnership({
  newOwner,
  account,
}: {
  newOwner: string;
  account: string;
}): Promise<void> {
  return ERC721_transferOwnership({ newOwner, account });
}

export async function withdraw({
  account,
}: {
  account: string;
}): Promise<void> {
  return ERC721_withdraw({ account });
}

// get
export async function baseTokenURI(): Promise<string> {
  return ERC721_baseTokenURI();
}

export async function admins({
  address,
}: {
  address: string;
}): Promise<boolean> {
  return ERC721_admins({ address });
}

export async function allFrozen(): Promise<boolean> {
  return ERC721_allfrozen();
}

export async function getERC721Balance({
  account,
}: {
  account: string;
}): Promise<string> {
  const balance = await ERC721_balanceOf({
    account,
  });
  return balance;
}
export async function DBRPrice(): Promise<string> {
  return ERC721_price();
}

export async function getApproved(tokenId: string): Promise<string> {
  return ERC721_getApproved(tokenId);
}
export async function isApprovedForAll({
  _owener,
  index,
}: {
  _owener: string;
  index: string;
}): Promise<string> {
  return ERC721_isApprovedForAll({
    _owener,
    index,
  });
}

export async function getMyAssets({
  _owener,
  index,
}: {
  _owener: string;
  index: string;
}): Promise<string> {
  return ERC721_getMyAssets({
    _owener,
    index,
  });
}

export async function maxDBRPurchase(): Promise<string> {
  return ERC721_maxDBRPurchase();
}

export async function maxDBRs(): Promise<string> {
  return ERC721_maxDBRs();
}

export async function name(): Promise<string> {
  return ERC721_name();
}

export async function owner(): Promise<string> {
  return ERC721_owner();
}

export async function ownerOf(tokenId: string): Promise<string> {
  return ERC721_ownerOf(tokenId);
}

export async function symbol(): Promise<string> {
  return ERC721_symbol();
}

export async function tokenURI(tokenId: string): Promise<string> {
  return ERC721_tokenURI(tokenId);
}

export async function totalSupply(): Promise<string> {
  return ERC721_totalSupply();
}
export async function saleIsActive(): Promise<boolean> {
  return ERC721_saleIsActive();
}

export async function tokenByIndex({
  index,
}: {
  index: string;
}): Promise<boolean> {
  return ERC721_tokenByIndex({ index });
}

export async function reserved(): Promise<boolean> {
  return ERC721_reserved();
}

export async function walletOfOwner({
  _owner,
}: {
  _owner: string;
}): Promise<string> {
  return ERC721_walletOfOwner({ _owner });
}
