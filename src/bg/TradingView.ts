
export default class TradingView {
  id: string;
  username: string;
  channel: string;
  webSocket: WebSocket | null;
  #shouldKeepAlive: boolean;

  constructor(
    id: string,
    username: string,
    channel: string,
    shouldKeepAlive: boolean = false
  ) {
    this.id = id;
    this.username = username;
    this.channel = channel;
    this.webSocket = null;
    this.#shouldKeepAlive = shouldKeepAlive;
  }

  listenToWss(
    onSocketOpen?: () => void,
    onMessageReceived?: (msg: any) => void,
    onSocketClosed?: () => void)
  {
    this.webSocket = new WebSocket(`wss://pushstream.tradingview.com/message-pipe-ws/private_${this.channel}`);
    this.webSocket.onopen = (event) => {
      console.log('websocket open', event);
      if (this.#shouldKeepAlive) {
        this.#keepAlive();
      }
      if (onSocketOpen) {
        onSocketOpen();
      }
    };
  
    this.webSocket.onmessage = (event) => {
      console.log(`websocket received message: ${event.data}`);
      if (onMessageReceived) {
        onMessageReceived(event.data);
      }
    };
  
    this.webSocket.onclose = (event) => {
      console.log('websocket connection closed', event);
      this.webSocket = null;
      if (onSocketClosed) {
        onSocketClosed();
      }
    };
  }

  disconnect() {
    if (this.webSocket == null) {
      return;
    }
    this.webSocket.close();
  }

  async #runHeartbeat() {
    console.debug("keepalive");
    await chrome.storage.local.set({ 'last-heartbeat': new Date().getTime() });
  }

  async #keepAlive() {
    // Run the heartbeat once at service worker startup.
    const keepAliveIntervalId = setInterval(async () => {
        if (this.webSocket) {
          await this.#runHeartbeat();
        } else {
          clearInterval(keepAliveIntervalId);
        }
      },
      // Set the interval to 20 seconds to prevent the service worker from becoming inactive.
      20 * 1000 
    );
  }
}