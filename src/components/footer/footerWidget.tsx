import React from "react";
import "./footerWidget.less";
function FooterWidget() {
  return (
    <div className="footerWidget">
      <p>©{new Date().getFullYear()} DontBuyRocks on the Fantom</p>
    </div>
  );
}
export default FooterWidget;
