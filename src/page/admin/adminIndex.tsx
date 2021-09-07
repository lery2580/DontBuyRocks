import React, { useEffect, useState } from "react";

import HeaderWidget from "@/components/header/headerWidget";
import FooterWidget from "@/components/footer/footerWidget";
import TitleWidget from "@/components/title/titleWidget";

import FormWrapWidget from "@/components/form/formWrapWidget";
import LabelWidget from "@/components/form/labelWidget";
import InputWidget from "@/components/form/inputWidget";
import BtnWidget from "@/components/form/btnWidget";

import {
  flipSaleState,
  getAccounts,
  approve,
  disableAdmin,
  enableAdmin,
  freeze,
  freezeAll,
  mint,
  renounceOwnership,
  reserveDBRs,
  safeTransferFrom,
  setApprovalForAll,
  setBaseTokenURI,
  setMaxPurchase,
  setMaxTokenAmount,
  setPrice,
  setReserveAmount,
  setTokenURI,
  transferOwnership,
  withdraw,
  getERC721Balance,
  allFrozen,
  baseTokenURI,
  DBRPrice,
  totalSupply,
  getApproved,
  isApprovedForAll,
  maxDBRPurchase,
  maxDBRs,
  name,
  owner as erc721Owner,
  ownerOf,
  saleIsActive,
  tokenByIndex,
  symbol,
  tokenURI,
  walletOfOwner,
} from "@/services/web3";

import "./adminIndex.less";
import toast from "@/components/toast";

function AdminIndex() {
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [account, setAccount] = useState("");

  // input 变量
  const [to, setto] = useState("");
  const [tokenId, settokenId] = useState("");
  const [_addr, set_addr] = useState("");
  const [numberOfTokens, setnumberOfTokens] = useState("");
  const [_to, set_to] = useState("");
  const [_amount, set_amount] = useState("");
  const [from, setfrom] = useState("");
  const [operator, setoperator] = useState("");
  const [approved, setapproved] = useState("");
  const [baseTokenURI_, setbaseTokenURI_] = useState("");
  const [_value, set_value] = useState("");
  const [_price, set_price] = useState("");
  const [_reserveAmount, set_reserveAmount] = useState("");
  const [_tokenURI, set_tokenURI] = useState("");
  const [newOwner, setnewOwner] = useState("");
  const [owner, setowner] = useState("");
  const [index, setindex] = useState("");
  const [_owner, set_owner] = useState("");

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
    })();
  }, []);
  useEffect(() => {
    if (accounts === null) return;
    if (accounts.length === 0) return;
    console.log(accounts);
    setAccount(accounts[0]);
  }, [accounts]);
  return (
    <div className="adminIndex">
      <HeaderWidget />
      <h2>只有管理员才能使用哦</h2>
      <div className="fl">
        <TitleWidget label="操作" />
        <div className="contianer">
          <FormWrapWidget>
            <TitleWidget label="approve" />
            <LabelWidget
              label="to"
              children={
                <InputWidget
                  value={to}
                  type="text"
                  placeholder="to  address"
                  onChange={(e) => {
                    setto(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  uint256"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await approve({ to, tokenId, account });
                toast.show(`approve: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="disableAdmin" subLable="删除管理员" />
            <LabelWidget
              label="_addr"
              children={
                <InputWidget
                  value={_addr}
                  type="text"
                  placeholder="_addr  address"
                  onChange={(e) => {
                    set_addr(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await disableAdmin({
                  _addr,
                  account,
                });
                toast.show(`disableAdmin: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="enableAdmin" subLable="添加管理员" />
            <LabelWidget
              label="_addr"
              children={
                <InputWidget
                  value={_addr}
                  type="text"
                  placeholder="_addr  address"
                  onChange={(e) => {
                    set_addr(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await enableAdmin({
                  _addr,
                  account,
                });
                toast.show(`enableAdmin: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="flipSaleState" subLable="NFT 开关" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await flipSaleState({
                  account: account,
                });
                toast.show(`flipSaleState: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="freeze" subLable="冻结当前选定tokenId" />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  uint256"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await freeze({
                  tokenId,
                  account,
                });
                toast.show(`freeze: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="freezeAll" subLable="冻结所有tokenId" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await freezeAll({
                  account,
                });
                toast.show(`freezeAll: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="mint" subLable="购买DBR" />
            <LabelWidget
              label="numberOfTokens"
              children={
                <InputWidget
                  value={numberOfTokens}
                  type="text"
                  placeholder="numberOfTokens  uint256"
                  onChange={(e) => {
                    setnumberOfTokens(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const price = await DBRPrice();
                mint({
                  numberOfTokens,
                  price,
                  account,
                });
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="renounceOwnership" subLable="放弃所有权" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await renounceOwnership({
                  account,
                });
                toast.show(`renounceOwnership: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="reserveDBRs" />
            <LabelWidget
              label="_to"
              children={
                <InputWidget
                  value={_to}
                  type="text"
                  placeholder="_to  address"
                  onChange={(e) => {
                    set_to(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="_amount"
              children={
                <InputWidget
                  value={_amount}
                  type="text"
                  placeholder="_amount  uint256"
                  onChange={(e) => {
                    set_amount(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await reserveDBRs({
                  account,
                  _to,
                  _amount,
                });
                toast.show(`reserveDBRs: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="safeTransferFrom" subLable="tokenid 划转" />
            <LabelWidget
              label="from"
              children={
                <InputWidget
                  value={from}
                  type="text"
                  placeholder="from  address"
                  onChange={(e) => {
                    setfrom(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="to"
              children={
                <InputWidget
                  value={to}
                  type="text"
                  placeholder="to  address"
                  onChange={(e) => {
                    setto(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  uint246"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await safeTransferFrom({
                  account,
                  _to: to,
                  _from: from,
                  _tokenId: tokenId,
                });
                toast.show(`safeTransferFrom: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="setApprovalForAll" />
            <LabelWidget
              label="operator"
              children={
                <InputWidget
                  value={operator}
                  type="text"
                  placeholder="operator  address"
                  onChange={(e) => {
                    setoperator(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="approved"
              children={
                <InputWidget
                  value={approved}
                  type="text"
                  placeholder="approved  bool"
                  onChange={(e) => {
                    setapproved(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setApprovalForAll({
                  operator,
                  approved,
                  account,
                });
                toast.show(`setApprovalForAll: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="setBaseTokenURI" subLable="设置BaseTokenURI" />
            <LabelWidget
              label="baseTokenURI_"
              children={
                <InputWidget
                  value={baseTokenURI_}
                  type="text"
                  placeholder="baseTokenURI_  string"
                  onChange={(e) => {
                    setbaseTokenURI_(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setBaseTokenURI({
                  baseTokenURI_,
                  account,
                });
                toast.show(`setBaseTokenURI: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget
              label="setMaxPurchase"
              subLable="设置单个钱包最大持有量"
            />
            <LabelWidget
              label="_value"
              children={
                <InputWidget
                  value={_value}
                  type="text"
                  placeholder="_value  uint256"
                  onChange={(e) => {
                    set_value(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setMaxPurchase({
                  _value,
                  account,
                });
                toast.show(`setMaxPurchase: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="setMaxTokenAmount" subLable="设置NFT最大量" />
            <LabelWidget
              label="_value"
              children={
                <InputWidget
                  value={_value}
                  type="text"
                  placeholder="_value  uint256"
                  onChange={(e) => {
                    set_value(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setMaxTokenAmount({
                  _value,
                  account,
                });
                toast.show(`setMaxTokenAmount: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="setPrice" subLable="设置NFT单个价格（wei）" />
            <LabelWidget
              label="_price"
              children={
                <InputWidget
                  value={_price}
                  type="text"
                  placeholder="_price  uint256"
                  onChange={(e) => {
                    set_price(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setPrice({
                  _price,
                  account,
                });
                toast.show(`setPrice: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="setReserveAmount" subLable="设置NFT预留数量" />
            <LabelWidget
              label="_reserveAmount"
              children={
                <InputWidget
                  value={_reserveAmount}
                  type="text"
                  placeholder="_reserveAmount  uint256"
                  onChange={(e) => {
                    set_reserveAmount(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setReserveAmount({
                  _value,
                  account,
                });
                toast.show(`setReserveAmount: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="setTokenURI" subLable="设置TokenURI" />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  uint256"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="_tokenURI"
              children={
                <InputWidget
                  value={_tokenURI}
                  type="text"
                  placeholder="_tokenURI  string"
                  onChange={(e) => {
                    set_tokenURI(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await setTokenURI({
                  tokenId,
                  _tokenURI,
                  account,
                });
                toast.show(`setTokenURI: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            {/*         
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _setOwner(newOwner); 
        */}
            <TitleWidget label="transferOwnership" />
            <LabelWidget
              label="newOwner"
              children={
                <InputWidget
                  value={newOwner}
                  type="text"
                  placeholder="newOwner  address"
                  onChange={(e) => {
                    setnewOwner(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await transferOwnership({
                  newOwner,
                  account,
                });
                toast.show(`transferOwnership: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="withdraw" subLable="提币" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await withdraw({
                  account,
                });
                toast.show(`withdraw: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
        </div>
      </div>
      <div className="fr">
        <TitleWidget label="查询" />
        <div className="contianer">
          <FormWrapWidget>
            <TitleWidget label="allFrozen" subLable="nft是否开启" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await allFrozen();
                toast.show(`allFrozen: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget
              label="balanceOf"
              subLable="某个地址nft持有的所有tokenId"
            />
            <LabelWidget
              label="owner"
              children={
                <InputWidget
                  value={owner}
                  type="text"
                  placeholder="owner  address"
                  onChange={(e) => {
                    setowner(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const _value = await getERC721Balance({
                  account,
                });
                toast.show(`balanceOf ${owner}: ${_value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="baseTokenURI" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await baseTokenURI();
                toast.show(`baseTokenURI: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="DBRPrice" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const _value = await DBRPrice();
                toast.show(`DBRPrice: ${_value} wei`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="totalSupply" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const _value = await totalSupply();
                toast.show(`totalSupply: ${_value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="getApproved" />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  uint256"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await getApproved(tokenId);
                toast.show(`getApproved: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            {/* _operatorApprovals[owner][operator]; */}
            <TitleWidget label="isApprovedForAll" />
            <LabelWidget
              label="owner"
              children={
                <InputWidget
                  value={owner}
                  type="text"
                  placeholder="owner  address"
                  onChange={(e) => {
                    setowner(e.target.value);
                  }}
                />
              }
            />
            <LabelWidget
              label="operator"
              children={
                <InputWidget
                  value={operator}
                  type="text"
                  placeholder="operator  address"
                  onChange={(e) => {
                    setoperator(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await isApprovedForAll({
                  _owener: owner,
                  index,
                });
                toast.show(`isApprovedForAll: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="maxDBRPurchase" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await maxDBRPurchase();
                toast.show(`maxDBRPurchase: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="maxDBRs" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await maxDBRs();
                toast.show(`maxDBRs: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="name" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await name();
                toast.show(`name: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
          <FormWrapWidget>
            <TitleWidget label="owner" subLable="当前合约持有者" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await erc721Owner();
                toast.show(`erc721Owner: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="ownerOf" subLable="当前tokenId持有者" />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  address"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await ownerOf(tokenId);
                toast.show(`ownerOf: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="saleIsActive" subLable="NFT是否可交易" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await saleIsActive();
                toast.show(`saleIsActive: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="symbol" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await symbol();
                toast.show(`symbol: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget
              label="tokenByIndex"
              subLable="tokenId index的token URL"
            />
            <LabelWidget
              label="index"
              children={
                <InputWidget
                  value={index}
                  type="text"
                  placeholder="index  uint256"
                  onChange={(e) => {
                    setindex(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await tokenByIndex({ index });
                toast.show(`tokenByIndex: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="tokenURI" subLable=" 查询tokenURI" />
            <LabelWidget
              label="tokenId"
              children={
                <InputWidget
                  value={tokenId}
                  type="text"
                  placeholder="tokenId  uint256"
                  onChange={(e) => {
                    settokenId(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await tokenURI(tokenId);
                toast.show(`tokenURI: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget label="totalSupply" subLable="剩余" />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await totalSupply();
                toast.show(`totalSupply: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>

          <FormWrapWidget>
            <TitleWidget
              label="walletOfOwner"
              subLable="所查地址的所有tokenId"
            />
            <LabelWidget
              label="_owner"
              children={
                <InputWidget
                  value={_owner}
                  type="text"
                  placeholder="_owner  address"
                  onChange={(e) => {
                    set_owner(e.target.value);
                  }}
                />
              }
            />
            <BtnWidget
              label="transact"
              onClick={async () => {
                const __value = await walletOfOwner({ _owner });
                toast.show(`walletOfOwner: ${__value}`, 5000);
              }}
            />
          </FormWrapWidget>
        </div>
      </div>
      <FooterWidget />
    </div>
  );
}
export default AdminIndex;
