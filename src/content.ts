import TradingView from "./bg/TradingView";

window.onmessage = (message) => {
  const { method, id, channel, username } = message.data;
  switch (method) {
    case "tradingview.user":
      const tradingViewUser = new TradingView(id, username, channel);
      tradingViewUser.listenToWss(undefined,
        async msg => {
          const data = JSON.parse(msg);
          let message: any;
          try {
            message = JSON.parse(data.text.content);
          } catch {
            message = data.text.content;
          }
          if (message["m"] == "event") {
            const payload = message["p"];
            const desc = JSON.parse(payload["desc"]);
            console.log("Message Desc: ", desc);
            const response = await fetch("http://localhost:50000/sim-trade", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(desc)
            });
            console.log("Successfully send to webhook", response);
          }
        }, undefined);
      break;
    default:
      break;
  }

  // chrome.runtime.sendMessage({
  //   method,
  //   id,
  //   channel,
  //   username
  // });
}





function resource(filename: string) {
	let script = document.createElement("script");
	script.src = chrome.runtime.getURL(filename);
	script.type = "text/javascript";

	return script;
}

const element = document.body || document.head || document.documentElement;
const manifest = chrome.runtime.getManifest();
const resources = manifest.web_accessible_resources!;

for (let i = 0; i < resources.length; i++) {
	const resourceDetails = resources[i] as {resources: string[], matches: string[]};
  const scripts = resourceDetails.resources
    .filter(filename => filename.endsWith(".js") && !element.querySelector("script[src*='" + filename + "']"))
    .map(resource);

  for(let j = 0; j < scripts.length; j++) {
    element.appendChild(scripts[i]);
  }
}