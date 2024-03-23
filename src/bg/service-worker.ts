// import TradingView from './TradingView';
//import { IBApi, EventName, ErrorCode, Stock, MarketOrder, OrderAction } from "@stoqey/ib";

// const ib = new IBApi({
//   port: 7497,
//   maxReqPerSec: 45
// });

// ib.on(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
//   console.error(`${err.message} - code: ${code} - reqId: ${reqId}`);
// })

// chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
//   const { method, id, channel, username } = message;
//   console.log("Receive message", channel);
//   switch (method) {
//     case "tradingview.user":
//       chrome.storage.local.set({ "TRADINGVIEW": { id, channel, username }});
//       const tradingViewUser = new TradingView(id, username, channel, true);
//       tradingViewUser.listenToWss(undefined,
//         async msg => {
//           const data = JSON.parse(msg);
//           let message: any;
//           try {
//             message = JSON.parse(data.text.content);
//           } catch {
//             message = data.text.content;
//           }
//           if (message["m"] == "event") {
//             const payload = message["p"];
//             const desc = JSON.parse(payload["desc"]);
//             console.log("Message Desc: ", desc);
//             const response = await fetch("http://localhost:50000/sim-trade", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(desc)
//             });
//             console.log("Successfully send to webhook", response);
//           }
//         }, undefined);
//       break;
//     default:
//       break;
//   }
// });

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
//   const msg = `Detect ${e.request.url} on tab ${e.request.tabId}.`;
//   console.log(msg, e);
// });