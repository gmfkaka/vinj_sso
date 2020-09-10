let scrollBarWidth;

export const getScrollBarWidth = () => {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

// 加载脚本
const loadCache = {};

export const loadScript = (uri) => {
  if (loadCache[uri]) return loadCache[uri];

  const promise = new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.timeout = 120000;
    script.src = uri;

    let onload = () => {
      onerror = onload = null;
      clearTimeout(timeout);
      resolve();
    };

    let onerror = () => {
      reject(new Error(`加载${uri}出错`));
      delete loadCache[uri];
    };

    const timeout = setTimeout(onerror, 120000);

    script.onload = onload;
    script.onerror = onerror;

    head.appendChild(script);
  });
  loadCache[uri] = promise;
  return promise;
};

export const addPrefix = (element, prop) => {
  let prefixProp;
  ['', 'webkit', 'moz', 'ms', 'o'].some(function (prefix) {
    if (prefix !== '') {
      prop = prop[0].toUpperCase() + prop.slice(1);
    }
    let key = prefix + prop;
    if (typeof element[key] !== 'undefined') {
      prefixProp = element[key];
      return true;
    }
    key = prefix + prop.replace(/([f|F]ull)screen/, '$1Screen');
    if (typeof element[key] !== 'undefined') {
      prefixProp = element[key];
      return true;
    }
    return false;
  });

  return prefixProp;
};

export const isFullscreen = () => ['fullscreenElement', 'fullscreen', 'isFullscreen'].some(prop => addPrefix(document, prop));

export const requestFullscreen = (el) => {
  const method = addPrefix(el, 'requestFullscreen');
  method && method.call(el);
};

export const exitFullscreen = () => {
  const method = addPrefix(document, 'exitFullscreen') || addPrefix(document, 'cancelFullscreen');
  method && method.call(document);
};

export const iframeDownload = (url) => {
  const id = '_yindou_download_';
  const oldIframe = document.getElementById(id);
  if (oldIframe) {
    document.body.removeChild(oldIframe);
  }
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.id = id;
  iframe.src = url;
  document.body.appendChild(iframe);
};

export const getScroll = (target, top) => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';

  return target === window ? target[prop] : target[method];
};

export const addEventListener = (target, eventType, callback) => {
  function wrapCallback (e) {
    callback.call(target, e);
  }

  target.addEventListener(eventType, wrapCallback, false);
  return {
    remove () {
      target.removeEventListener(eventType, wrapCallback, false);
    }
  };
};

export const loadStyleString = (css) => {
  const style = document.createElement('style');
  style.type = 'text/css';
  try {
    style.appendChild(document.createTextNode(css));
  } catch (err) {
    style.styleSheet.cssText = css;
  }
  document.getElementsByTagName('head')[0].appendChild(style);
};
