import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import FooterWidget from "@/components/footer/footerWidget";
import TitleWidget from "@/components/title/titleWidget";
import "./aboutUsIndex.less";

function AboutUsIndex() {
  return (
    <div className="aboutUsIndex">
      <HeaderWidget />
      <TitleWidget label="基本说明" />
      <p>DontBuyRocks 是一个发布在 Fantom 网络上的 NFT 项目</p>
      <p>总量 10000 个，NFT 内容以 json 的形式发布在 IPFS上，链接（ABI）：</p>
      <p>Twitter 链接：</p>
      <p>Discord 链接：</p>
      <p>Name：Dont Buy Rocks</p>
      <p>Symbol：DBR</p>
      <p>Description:</p>
      <p>
        Meaningless rocks, it can't even be used to smash the glass of a
        neighbor's house.
      </p>
      <div className="h100"></div>
      <TitleWidget label="Mint说明" />
      <p>
        DBR 单价为 100 FTM，单个用户最多可以 Mint 20 个，超过 20
        则不能点击加号；小于0不能点减号
      </p>
      <p>
        Mint 按钮如果用户第一次进入，提示为 Connect to
        wallet，如果已经链接则显示 mint
      </p>
      <p>
        每 Mint 一个，Remaining
        就会减少一个，当减少至0时，按钮不可点击，文字显示 Sold out
      </p>
      <div className="h100"></div>
      <FooterWidget />
    </div>
  );
}
export default AboutUsIndex;
