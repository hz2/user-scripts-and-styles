// ==UserScript==
// @name        Download SVG Element
// @name:zh-CN  下载 SVG 元素
// @description  A tool to help you download svg element from websites
// @description:zh-CN  一个帮你从网站下载 SVG 元素的工具
// @namespace    https://hx.fyi/
// @version     0.1.2
// @license     GPL-3.0
// @icon        data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIgZmlsbD0iI2ZmYTZkYSIvPjxwYXRoIGQ9Im0zNzIuOCAxOTZoLTQuOGMtMi40LTQwLjQtMzUuNi03Mi40LTc2LjQtNzIuNC00IDAtOCAwLjQtMTEuNiAwLjgtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNi01MS4yIDAtOTIuNCA0MS42LTkyLjQgOTIuNCAwIDEwLjggMiAyMS4yIDUuMiAzMC44LTI1LjIgMTAtNDIuOCAzNC00Mi44IDYyLjQgMCAzNi40IDI5LjYgNjYuNCA2Ni40IDY2LjRoMjM3LjJjMzYuNCAwIDY2LjQtMjkuNiA2Ni40LTY2LjQtMC40LTM2LjgtMzAtNjYuNC02Ni40LTY2LjR6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTMyNS4yIDM2Mi40LTY2LjQgNjYuNGMtMi44IDIuOC03LjIgMi44LTEwIDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyIDQuOC0xMmgxNC44YzQgMCA3LjItMy4yIDcuMi03LjJ2LTk2YzAtNCAzLjItNy4yIDcuMi03LjJoNzQuOGM0IDAgNy4yIDMuMiA3LjIgNy4ydjk2YzAgNCAzLjIgNy4yIDcuMiA3LjJoMTQuOGM1LjYgMCA4LjggNy42IDQuNCAxMnoiIGZpbGw9IiNkZTI2ZmYiLz48L3N2Zz4=
// @author      huc < ht@live.se >
// @supportURL  https://github.com/hz2/user-scripts-and-styles/issues/new
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=your.email.here@example.com&item_name=Greasy+Fork+donation
// @contributionAmount 5
// @include     *://*/*

// @noframes
// @grant          unsafeWindow
// @grant          GM_setClipboard
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_info
// @grant          GM_addStyle
// ==/UserScript==

const head = document.getElementsByTagName('head');
head[0].insertAdjacentHTML('beforeend', `<style type="text/css">
.hx-download-svg-el-tool{
    position: absolute;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIgZmlsbD0iI2ZmYTZkYSIvPjxwYXRoIGQ9Im0zNzIuOCAxOTZoLTQuOGMtMi40LTQwLjQtMzUuNi03Mi40LTc2LjQtNzIuNC00IDAtOCAwLjQtMTEuNiAwLjgtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNi01MS4yIDAtOTIuNCA0MS42LTkyLjQgOTIuNCAwIDEwLjggMiAyMS4yIDUuMiAzMC44LTI1LjIgMTAtNDIuOCAzNC00Mi44IDYyLjQgMCAzNi40IDI5LjYgNjYuNCA2Ni40IDY2LjRoMjM3LjJjMzYuNCAwIDY2LjQtMjkuNiA2Ni40LTY2LjQtMC40LTM2LjgtMzAtNjYuNC02Ni40LTY2LjR6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTMyNS4yIDM2Mi40LTY2LjQgNjYuNGMtMi44IDIuOC03LjIgMi44LTEwIDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyIDQuOC0xMmgxNC44YzQgMCA3LjItMy4yIDcuMi03LjJ2LTk2YzAtNCAzLjItNy4yIDcuMi03LjJoNzQuOGM0IDAgNy4yIDMuMiA3LjIgNy4ydjk2YzAgNCAzLjIgNy4yIDcuMiA3LjJoMTQuOGM1LjYgMCA4LjggNy42IDQuNCAxMnoiIGZpbGw9IiNkZTI2ZmYiLz48L3N2Zz4=);
    background-size: cover;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: .35;
    z-index: 50000;
    transform: scale(.75);
    transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 250ms;
}
.hx-download-svg-el-tool.white{
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9ImluaGVyaXQiIGltcGxpY2l0LWNvbnNlbnQtc291cmNlPSJ0cnVlIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMDEyMiAwIDAgMS4wMTIyIC0yOC42ODQgLTMuNDMzOSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjMiPgogIDxjaXJjbGUgY3g9IjQwLjE5NCIgY3k9IjE1LjI0OCIgcj0iOC45ODI0Ii8+CiAgPHBhdGggZD0ibTQ1IDE3LTQuNTMzIDMuNTQ3Yy0wLjE2NjU5IDAuMTMwMzUtMC4zODQ2MSAwLjE0OTU3LTAuNTM0MTggMGwtNC41NjY0LTMuNTQ3Yy0wLjIzNTA0LTAuMjM1MDQtMC4wNjQxLTAuNjQxMDIgMC4yNTY0MS0wLjY0MTAyaDIuNDM2MmMwLjIxMzY3IDAgMC4zODQ2MS0wLjE3MDk0IDAuMzg0NjEtMC4zODQ2MXYtNS43MzI5YzAtMC4yMTM2NyAwLjE3MDk0LTAuMzg0NjEgMC4zODQ2MS0wLjM4NDYxaDIuNzAzNmMwLjIxMzY3IDAgMC4zODQ2MSAwLjE3MDk0IDAuMzg0NjEgMC4zODQ2MXY1LjczMjljMCAwLjIxMzY3IDAuMTcwOTQgMC4zODQ2MSAwLjM4NDYxIDAuMzg0NjFoMi40NjM5YzAuMjk5MTQgMCAwLjQ5NjgyIDAuNDM2MTggMC4yMzUwNCAwLjY0MTAyeiIvPgogPC9nPgo8L3N2Zz4K);
    width: 24px;
    height: 24px;
}
.hx-download-svg-el-tool:hover {
    opacity:1;
    transform: scale(.9);
}
.hx-download-svg-el-tool:active {
    opacity:.8;
    transform: scale(.7)  rotateZ(360deg);
}
.hx-download-svg-el-tool-msg {
  position: fixed;
  left: -250px;
  bottom: 50px;
  width: 250px;  
  background: linear-gradient(to bottom right, #00000037, #0004 , #00000057 );
  box-shadow: 1px 0 20px 1px #64646433;
  padding: 2px 20px;
  z-index: 65536;
  border-radius: 100px;
  color: #fff;
  transform: translateX(280px) translateY(0);
  transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 250ms;
}
</style>`);


console.warn('Welcome to %c \ud83d\ude48\ud83d\ude49\ud83d\ude4a\u0020\u0048\u007a\u00b2\u0020\u0053\u0063\u0072\u0069\u0070\u0074\u0020\u004c\u0069\u0062\u0072\u0061\u0072\u0079 %c v0.06 ', 'background-color:teal;color: white;border:1px solid teal;border-radius: 4px 0 0 4px;border-left-width:0;padding:1px;margin:2px 0;font-size:1.1em', 'background-color:#777;color: white;border:1px solid #777;border-radius: 0 4px 4px 0;border-right-width:0;padding:1px;margin:5px 0;');

try {
  customElements.define('hxdownload-message',
    class extends HTMLElement {
      constructor() {
        super();

        const divElem = document.createElement('div');
        // divElem.textContent = this.getAttribute('text');
        divElem.className = 'text-node'
        // style
        const style = document.createElement('style');
        style.append(document.createTextNode(`
      .text-node{
        font-size: 14px;
        line-height: 21px;
        font-family: sans-serif;
        width: 100%;
        overflow: hidden;
        word-break: break-word;
      }      
      `))
        const shadowRoot = this.attachShadow({
          mode: 'open'
        });
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(divElem);
      }
    }
  );
} catch (error) {

}


globalThis.__hx_Msg_list = new Set();

class __hx_MsgIns {
  constructor(text) {
    this.text = text;
    this.el = document.createElement('hxdownload-message')
    document.body.insertAdjacentElement('beforeend', this.el)
    this.el.className = 'hx-download-svg-el-tool-msg';
    this.textEl = this.el.shadowRoot.querySelector('.text-node')
    this.textEl.innerText = text;
    __hx_Msg_list.add(this);
    this.el.style.transform = `translateX(280px) translateY(-${ (__hx_Msg_list.size -1 )* 50}px)`
  }
  /**
   * @param {any} text
   */
  update(text) {
    this.textEl.innerText = text
  }
  close() {
    this.textEl.innerText = ''
    this.el.parentElement.removeChild(this.el)
    __hx_Msg_list.delete(this);
  }
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const openDown = (url, e, name) => {
  e && e.preventDefault();
  e && e.stopPropagation()


  const downBlobUrl = (blobUrl) => {
    let el = document.createElement("a");
    el.setAttribute("href", blobUrl);
    if (name) {
      el.setAttribute("download", name)
    }
    if (document.createEvent) {
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      el.dispatchEvent(event);
    } else {
      el.click();
    }

  }

  if (url.startsWith('blob')) {
    downBlobUrl(url)
    return

  }

  fetch(url, {
      mode: "cors"
    })
    .then(async resp => {
      // instead of response.json() and other methods
      const reader = resp.body.getReader();
      const contentLength = +resp.headers.get('Content-Length');
      const ct = (resp.headers && resp.headers.get('Content-Type')) || '';
      console.log('ct', ct);
      // Step 3: read the data
      let receivedLength = 0; // received that many bytes at the moment
      let chunks = []; // array of received binary chunks (comprises the body)


      const __hx_Msg = new __hx_MsgIns('Loading');


      // infinite loop while the body is downloading
      while (true) {
        // done is true for the last chunk
        // value is Uint8Array of the chunk bytes
        const {
          done,
          value
        } = await reader.read();

        if (done) {
          break;
        }
        chunks.push(value);
        receivedLength += value.length;
        const text =
          __hx_Msg.update(`Received ${ formatBytes( receivedLength )} / ${ formatBytes( contentLength ) }`)
      }
      __hx_Msg.close()
      return new Blob(chunks, {
        type: ct
      });


      // // Step 4: concatenate chunks into single Uint8Array
      // let chunksAll = new Uint8Array(receivedLength); // (4.1)
      // let position = 0;
      // for(let chunk of chunks) {
      //   chunksAll.set(chunk, position); // (4.2)
      //   position += chunk.length;
      // }

      // // Step 5: decode into a string
      // let result = new TextDecoder("utf-8").decode(chunksAll);

      // // We're done!
      // let commits = JSON.parse(result);
      // alert(commits[0].author.login);

      // return resp.blob()
    })
    .then(r => {
      const blobUrl = URL.createObjectURL(r)
      downBlobUrl(blobUrl)
    })
    .catch(err => {
      console.log("Request failed", err);
    });
}

const hostname = window.location.hostname

const lastItem = (arr, index = 0) => arr.length ? arr[arr.length - 1 - index] : ''

const createDomAll = (item, fn) => {
  let domDL = document.createElement('a');
  domDL.className = 'hx-download-svg-el-tool'
  domDL.title = '下载 SVG 元素'

  // item.addEventListener('load', _ => {
  let link = fn(item.src)
  domDL.href = link || item.src
  domDL.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    openDown(link, e, lastItem(link.split('/')))
  })
  // })
  item.insertAdjacentElement('afterEnd', domDL)
}

const createDom = (cfg) => {
  const {
    parent,
    link,
    name,
    className = '',
    style = '',
    target,
    postion = 'afterEnd',
    linkArr
  } = cfg

  const genDomDL = (dom) => {
    let domDL = dom || document.createElement('a');
    Object.assign(domDL, {
      title: '下载原始图片',
      className: 'hx-download-svg-el-tool ' + className,
      style: style,
      href: link,
    })
    domDL.onclick = e => {
      e && e.preventDefault();
      e && e.stopPropagation()
      const newName = name || lastItem(link.split('/'))
      if (linkArr) {
        linkArr.forEach(({
          link,
          name
        }) => openDown(link, e, name))
      } else {
        openDown(link, e, newName);
      }
    }
    return domDL
  }

  let parent2 = parent
  if (!parent && target) {
    parent2 = target.parentElement
  }
  // if (['afterEnd', 'beforeBegin'].includes(postion)) {
  //   parent2 = target.parentElement.parentElement
  // }
  const exist = parent2 && parent2.querySelector('.hx-download-svg-el-tool')
  if (exist) {
    genDomDL(exist)
  } else {
    parent2 && parent2.insertAdjacentElement(postion, genDomDL())
  }
}

const updateLink = (dom, link) => {
  dom.href = link
  const newName = lastItem(link.split('/'))
  dom.onclick = e => openDown(link, e, newName)
}


const findFatherElement = (el, tag) => {
  const parent = el && el.parentElement
  const tagName = parent.tagName.toUpperCase() || '--';
  if (!el || tagName === "HTML") {
    return null
  } else if (tagName === tag.toUpperCase()) {
    return parent
  } else if (tagName !== tag.toUpperCase()) {
    return findFatherElement(parent, tag)
  }
}


const svgStr2b64 = (str = '', val = false) => {
  let out = str
    .replace(/(<\?xml[\w ".=-]+\?>\n*)|version *= *"[\d.]+" |(<!-.*->)/g, '')
    .replace(/(\n +)|[\n\r\t]+/g, ' ')
  if (!/http:\/\/\www\.w3\.org\/2000\/svg/i.test(str)) {
    out = str.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
  }
  const output = out.replace(/>[\n\r \t]+</g, '><').replace(/[\n\r \t]+/g, ' ')

  if (val === 'orgin') {
    return output
  } else if (val) {
    return 'data:image/svg+xml;base64,' + window.btoa(output)
  } else {
    return (
      'data:image/svg+xml,' +
      output.replace(/[^\d\w ="'/]/g, x => encodeURIComponent(x))
    )
  }
}

const svgStr2BlobUrl = (str) => {
  let out = svgStr2b64(str, 'orgin')
  const blob = new Blob([out], {
    type: 'image/svg+xml'
  })
  return URL.createObjectURL(blob)
}

const init = () => {
  function throttle(callback, delay = 300) {
    let shouldWait = false;
    return (...args) => {
      if (shouldWait) return;

      callback(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  }

  window.addEventListener('mouseover', throttle(
      (event) => {
        const {
          target
        } = event
        if (!event.ctrlKey || !target) {
          return
        }
        if (!['G', 'PATH', 'RECT', 'USE', 'SVG', 'IMG'].includes(target.tagName.toUpperCase())) {
          return
        }

        const cfg = {
          link: '',
          style: 'left: 10px;top: 10px;',
          parent: null,
          postion: 'beforeEnd',
          name: '',
        }

        // remote svg
        if (target.tagName.toUpperCase() === 'IMG' && target.src.includes('.svg')) {
          Object.assign(cfg, {
            link: target.src,
            style: 'left: -10px;top: -10px;',
            parent: target.parentElement,
            postion: 'beforeEnd',
          })
          createDom(cfg)
          return
        }
        // inline svg
        const parentSvg = findFatherElement(target, 'svg');
        if (parentSvg) {
          Object.assign(cfg, {
            link: svgStr2BlobUrl(parentSvg.outerHTML),
            style: 'left: -10px;top: -10px;',
            parent: parentSvg.parentElement,
            postion: 'beforeEnd',
            name: parentSvg.attributes['aria-label'] && parentSvg.attributes['aria-label'].value || parentSvg.id || parentSvg.className.baseVal
          })
          createDom(cfg)
          return
        }

        // svg symbol
        let baseVal = '';
        let container = null
        if (target.tagName.toUpperCase() === 'USE') {
          baseVal = target.href.baseVal;
          container = target.parentElement.parentElement
        } else if (target.tagName.toUpperCase() === 'SVG' &&
          target.firstChild && target.firstChild.tagName && target.firstChild.tagName.toUpperCase() === 'USE'
        ) {
          baseVal = target.firstChild.href.baseVal
          container = target.parentElement
        }
        if (baseVal) {
          const symbol = document.querySelector(baseVal)
          const dom2Arr = (x) => {
            const d = x;
            d.removeAttribute('xmlns');
            return [x.id, d.outerHTML]
          }
          const GradientList = Object.fromEntries([...Array.from(document.querySelectorAll('svg>linearGradient,svg>radialGradient'))].map(x => dom2Arr(x)))
          const fillUrl = [...Array.from(symbol.querySelectorAll("[fill^=url]"))].map(y => {
            const key = y.attributes.getNamedItem('fill').value.replace(/^url\(#|\)$/gi, '');
            return GradientList[key || ''] || ''
          }).join('');
          if (!fillUrl) {
            console.log('! fillUrl')
          } else if (symbol.querySelector('defs')) {
            symbol.querySelector('defs').insertAdjacentHTML('beforeend', fillUrl)
          } else if (fillUrl) {
            symbol.insertAdjacentHTML('afterbegin', `<defs>${fillUrl}</defs>`)
          }

          Object.assign(cfg, {
            link: svgStr2BlobUrl(symbol.outerHTML.replace(/symbol/g, 'svg')),
            style: 'left: 10px;top: 10px;',
            parent: container,
            postion: 'beforeEnd',
            name: symbol.id,
          })

        }
        createDom(cfg)

      })

  )

}

setTimeout(() => {
  init()
}, 1200);