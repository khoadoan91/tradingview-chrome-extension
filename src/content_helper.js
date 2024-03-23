function document_init() {
	if (window.hasOwnProperty("user")) {
		const id = window.user.id || 0;
		const channel = window.user.private_channel || null;
		const username = window.user.username || null;
    console.log("Send Message");
    window.postMessage({
			method: "tradingview.user",
      id,
      channel,
      username
		}, location.origin);
	}
}

function init() {
	console.log("Autoview Content Helper initialized.");

  // setTimeout(document_init, 3000);
	document_init();
}

if (document.readyState !== "loading") {
	init();
} else {
	document.addEventListener("DOMContentLoaded", init);
}

// (() => {
//   init();
// })();
