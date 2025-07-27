# react-store for shows

(async () => {
  // Helper: read all IndexedDB data
  async function readIndexedDB() {
    if (!window.indexedDB) return 'No IndexedDB support';
    let dbs = [];
    if (indexedDB.databases) { 
      dbs = await indexedDB.databases();
    }
    const results = {};
    for (const dbInfo of dbs) {
      const name = dbInfo.name;
      if (!name) continue;
      try {
        const dbOpen = await new Promise((resolve, reject) => {
          const req = indexedDB.open(name);
          req.onsuccess = e => resolve(e.target.result);
          req.onerror = e => reject(e);
        });
        results[name] = {};
        const tx = dbOpen.transaction(dbOpen.objectStoreNames, 'readonly');
        for (const storeName of dbOpen.objectStoreNames) {
          results[name][storeName] = [];
          const store = tx.objectStore(storeName);
          const allReq = store.getAll();
          results[name][storeName] = await new Promise((res, rej) => {
            allReq.onsuccess = e => res(e.target.result);
            allReq.onerror = e => rej(e);
          });
        }
        dbOpen.close();
      } catch(e) {
        results[name] = `Error reading: ${e.message}`;
      }
    }
    return results;
  }

  // Gather localStorage
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      localStorageData[key] = localStorage.getItem(key);
    } catch { localStorageData[key] = 'inaccessible'; }
  }

  // Gather sessionStorage
  const sessionStorageData = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    try {
      sessionStorageData[key] = sessionStorage.getItem(key);
    } catch { sessionStorageData[key] = 'inaccessible'; }
  }

  // Gather cookies
  const cookies = document.cookie;

  // Navigator info
  const navigatorInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    languages: navigator.languages,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
  };

  // Service Workers
  const serviceWorkers = await navigator.serviceWorker.getRegistrations();

  // Window keys & types (limit value length)
  const windowKeys = {};
  Object.keys(window).forEach(k => {
    try {
      const val = window[k];
      let vString = '';
      if (typeof val === 'function') {
        vString = 'function()';
      } else if (typeof val === 'object' && val !== null) {
        vString = JSON.stringify(val).slice(0, 100);
      } else {
        vString = String(val).slice(0, 100);
      }
      windowKeys[k] = vString;
    } catch {
      windowKeys[k] = 'inaccessible';
    }
  });

  // Read IndexedDB data
  const indexedDBData = await readIndexedDB();

  // Output all data nicely:
  console.group('All Storage & Env Data Dump');
  console.log('localStorage:', localStorageData);
  console.log('sessionStorage:', sessionStorageData);
  console.log('cookies:', cookies);
  console.log('navigator:', navigatorInfo);
  console.log('serviceWorkers:', serviceWorkers);
  console.log('indexedDB:', indexedDBData);
  console.log('window keys (sampled values):', windowKeys);
  console.log('current URL:', location.href);
  console.log('document title:', document.title);
  console.groupEnd();
})();

Promise {<pending>}
VM93:94 All Storage & Env Data Dump
VM93:95 localStorage: {}
VM93:96 sessionStorage: {}
VM93:97 cookies: pass=2600%3A4808%3A53b5%3A4400%3A2c9a%3Abf0b%3Ad74a%3Aa228
VM93:98 navigator: {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWeb…KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', platform: 'Win32', languages: Array(2), cookieEnabled: true, onLine: true}
VM93:99 serviceWorkers: []
VM93:100 indexedDB: {}
VM93:101 window keys (sampled values): {0: 'inaccessible', window: 'inaccessible', self: 'inaccessible', document: '{"location":{"ancestorOrigins":{},"href":"https://darksmarket.org/","origin":"https://darksmarket.or', name: '', location: '{"ancestorOrigins":{},"href":"https://darksmarket.org/","origin":"https://darksmarket.org","protocol', …}
VM93:102 current URL: https://darksmarket.org/
VM93:103 document title: Bundle Plans
