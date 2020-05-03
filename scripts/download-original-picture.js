// ==UserScript==
// @name        Download Original Picture
// @name:zh-CN  下载原始图片
// @description  A tool to help you download full size images from websites
// @description:zh-CN  一个帮你从网站下载原始尺寸图片的工具
// @namespace    https://huching.net/
// @version     0.0.3
// @license     GPL-3.0
// @icon        data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRDA1QjsiIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIvPiA8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM3Mi44LDE5NkgzNjhjLTIuNC00MC40LTM1LjYtNzIuNC03Ni40LTcyLjRjLTQsMC04LDAuNC0xMS42LDAuOGMtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNiBjLTUxLjIsMC05Mi40LDQxLjYtOTIuNCw5Mi40YzAsMTAuOCwyLDIxLjIsNS4yLDMwLjhjLTI1LjIsMTAtNDIuOCwzNC00Mi44LDYyLjRjMCwzNi40LDI5LjYsNjYuNCw2Ni40LDY2LjRoMjM3LjIgYzM2LjQsMCw2Ni40LTI5LjYsNjYuNC02Ni40QzQzOC44LDIyNS42LDQwOS4yLDE5NiwzNzIuOCwxOTZ6Ii8+IDxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzI1LjIsMzYyLjRsLTY2LjQsNjYuNGMtMi44LDIuOC03LjIsMi44LTEwLDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyLDQuOC0xMmgxNC44IGM0LDAsNy4yLTMuMiw3LjItNy4ydi05NmMwLTQsMy4yLTcuMiw3LjItNy4yaDc0LjhjNCwwLDcuMiwzLjIsNy4yLDcuMnY5NmMwLDQsMy4yLDcuMiw3LjIsNy4yaDE0LjggQzMyNi40LDM1MC40LDMyOS42LDM1OCwzMjUuMiwzNjIuNHoiLz4gPC9zdmc+IA==
// @author      huc < ht@live.se >
// @supportURL  http://huching.net
// @require https://greasyfork.org/scripts/396752-hx-lib/code/hx-lib.js
// @resource HxLib https://greasyfork.org/scripts/396752-hx-lib/code/hx-lib.js
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=your.email.here@example.com&item_name=Greasy+Fork+donation
// @contributionAmount 5
// @include     *://medium.com/*
// @include     *://twitter.com/*
// @include     *://weibo.com/*
// @include     *://*.weibo.com/*
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
.hx-download-original-images-tool{
    position: absolute;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRDA1QjsiIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIvPiA8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM3Mi44LDE5NkgzNjhjLTIuNC00MC40LTM1LjYtNzIuNC03Ni40LTcyLjRjLTQsMC04LDAuNC0xMS42LDAuOGMtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNiBjLTUxLjIsMC05Mi40LDQxLjYtOTIuNCw5Mi40YzAsMTAuOCwyLDIxLjIsNS4yLDMwLjhjLTI1LjIsMTAtNDIuOCwzNC00Mi44LDYyLjRjMCwzNi40LDI5LjYsNjYuNCw2Ni40LDY2LjRoMjM3LjIgYzM2LjQsMCw2Ni40LTI5LjYsNjYuNC02Ni40QzQzOC44LDIyNS42LDQwOS4yLDE5NiwzNzIuOCwxOTZ6Ii8+IDxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzI1LjIsMzYyLjRsLTY2LjQsNjYuNGMtMi44LDIuOC03LjIsMi44LTEwLDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyLDQuOC0xMmgxNC44IGM0LDAsNy4yLTMuMiw3LjItNy4ydi05NmMwLTQsMy4yLTcuMiw3LjItNy4yaDc0LjhjNCwwLDcuMiwzLjIsNy4yLDcuMnY5NmMwLDQsMy4yLDcuMiw3LjIsNy4yaDE0LjggQzMyNi40LDM1MC40LDMyOS42LDM1OCwzMjUuMiwzNjIuNHoiLz4gPC9zdmc+IA==);
    background-size: cover;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 10px;
    opacity: .35;
    transform: scale(.75);
    transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 250ms;
}
.hx-download-original-images-tool.weibo{
    top: 40px;
    right: 10px;
}
.hx-download-original-images-tool:hover {
    opacity:1;
    transform: scale(.9);
}
.hx-download-original-images-tool:active {
    opacity:.8;
    transform: scale(.7)  rotateZ(360deg);
}
</style>`);


const hostname = window.location.hostname

const openDown = (url, event) => {
  event.preventDefault();
  event.stopPropagation()
  fetch(url, {
      mode: "cors"
    })
    .then(function (response) {
      return response.blob();
    })
    .then(r => {
      let file = new FileReader();
      file.onload = function (e) {
        let el = document.createElement("a");
        el.setAttribute("href", e.target.result);
        let arr = url.split('/')
        el.setAttribute("download", arr[arr.length - 1].replace(/jfif|jpeg/, 'jpg')
          .replace(/\?format=(\w+)\&name=orig/g, (a, b) => `.${b}`) // twittter
        )
        if (document.createEvent) {
          var event = document.createEvent("MouseEvents");
          event.initEvent("click", true, true);
          el.dispatchEvent(event);
        } else {
          el.click();
        }
      };
      file.readAsDataURL(r);
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}
const createDomAll = (item, fn) => {
  let domDL = document.createElement('a');
  domDL.className = 'hx-download-original-images-tool'
  domDL.title = '下载原始图片'

  item.addEventListener('load', _ => {
    let link = fn(item.src)
    domDL.href = link
    domDL.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation()
      openDown(link, e)
    })
  })
  item.insertAdjacentElement('afterEnd', domDL)
}

const opendownFn = (e, link) => {
  e.preventDefault();
  e.stopPropagation()
  openDown(link, e)
}

const createDom = (item, link, site) => {
  let domDL = document.createElement('a');
  domDL.className = 'hx-download-original-images-tool ' + site
  domDL.title = '下载原始图片'
  domDL.href = link
  // domDL.addEventListener('click', e=>opendownFn(e,link) )
  domDL.onclick = e => opendownFn(e, link)
  item.insertAdjacentElement('afterEnd', domDL)
}

const updateLink = (dom, link, site) => {
  dom.href = link
  dom.onclick = e => opendownFn(e, link)
}

if (hostname === "twitter.com") {
  //twitter
  window.addEventListener('mouseover', e => {
    if (e.target.tagName == 'IMG' &&
      !(e.target.parentElement.nextElementSibling && e.target.parentElement.nextElementSibling.className == "hx-download-original-images-tool") &&
      !/profile_images|video_thumb/g.test(e.target.src)) {
      createDom(e.target.parentElement, e.target.src.replace(/\&name=\w+/g, '&name=orig'))
    }
  })
} else if (hostname.includes('weibo')) {
  const isWeiboNode = dom => {
    if (dom.parentElement.attributes['node-type'].nodeValue === 'artwork_box' ||
      dom.attributes['node-type'].nodeValue === 'img_box') {
      return true
    } else {
      return false
    }
  }
  window.addEventListener('mouseover', e => {
    if (e.target.tagName == 'IMG' && isWeiboNode(e.target.parentElement) ) {
      if (e.target.parentElement.nextElementSibling && e.target.parentElement.nextElementSibling.className == "hx-download-original-images-tool weibo") {
        updateLink(e.target.parentElement.nextElementSibling, e.target.src.replace(/mw\d+/g, 'large'), 'weibo')
      } else {
        createDom(e.target.parentElement, e.target.src.replace(/mw\d+/g, 'large'), 'weibo')
      }
    }
  })
} else if (hostname === "medium.com") {
  // medium
  document.querySelector('article').querySelectorAll('img').forEach(x => (x.width > 80) && createDomAll(x, src => src.replace(/max\/\d+\//g, 'max/30000/')))
}
