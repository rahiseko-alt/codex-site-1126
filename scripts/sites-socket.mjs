// The static preview has no WebSocket server. Keep the UI and its protocol
// working across tabs in the same browser using a channel scoped to each room.
export class SitesSocket extends EventTarget {
  readyState = 0;
  bufferedAmount = 0;
  peers = new Set();

  constructor(address) {
    super();
    const url = new URL(address);
    this.id = url.searchParams.get('_pk') ?? crypto.randomUUID();
    this.radio = url.pathname.includes('/now-playing/');
    this.channel = new BroadcastChannel(url.pathname);
    this.channel.onmessage = ({ data }) => this.receive(data);
    setTimeout(() => {
      if (this.readyState !== 0) return;
      this.readyState = 1;
      this.dispatchEvent(new Event('open'));
      if (this.radio) this.emit({ type: 'nowplaying', live: false, track: null });
      else {
        this.sendMessage({ type: 'hello' });
        this.count();
      }
    }, 0);
    this.onHide = () => this.close();
    window.addEventListener('pagehide', this.onHide, { once: true });
  }

  emit(message) {
    this.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(message) }));
  }

  count() {
    this.emit({ type: 'count', n: this.peers.size + 1, top: [] });
  }

  sendMessage(message) {
    this.channel.postMessage({ ...message, id: this.id });
  }

  receive(message) {
    if (this.radio || this.readyState !== 1 || message.id === this.id) return;
    if (message.type === 'leave') {
      this.peers.delete(message.id);
      this.emit(message);
      this.count();
    } else {
      if (!this.peers.has(message.id)) {
        this.peers.add(message.id);
        this.count();
      }
      if (message.type === 'hello') this.sendMessage({ type: 'present' });
      if (['cursor', 'chat'].includes(message.type)) this.emit(message);
    }
  }

  send(data) {
    const message = JSON.parse(data);
    if (['cursor', 'chat'].includes(message.type)) this.sendMessage(message);
  }

  close() {
    if (this.readyState === 3) return;
    this.readyState = 3;
    if (!this.radio) this.sendMessage({ type: 'leave' });
    this.channel.close();
    window.removeEventListener('pagehide', this.onHide);
    this.dispatchEvent(new CloseEvent('close', { code: 1000, wasClean: true }));
  }
}

Object.assign(SitesSocket, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 });
