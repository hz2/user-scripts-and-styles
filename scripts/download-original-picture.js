// ==UserScript==
// @name        Download Original Picture
// @name:zh-CN  下载原始图片工具
// @description        Download Original Picture
// @description:zh-CN  下载原始图片工具
// @namespace   huching.net
// @include     *://medium.com/*
// @include     *://twitter.com/*
// @version     0.0.1
// @license     MIT License
// @icon        data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRDA1QjsiIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIvPiA8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM3Mi44LDE5NkgzNjhjLTIuNC00MC40LTM1LjYtNzIuNC03Ni40LTcyLjRjLTQsMC04LDAuNC0xMS42LDAuOGMtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNiBjLTUxLjIsMC05Mi40LDQxLjYtOTIuNCw5Mi40YzAsMTAuOCwyLDIxLjIsNS4yLDMwLjhjLTI1LjIsMTAtNDIuOCwzNC00Mi44LDYyLjRjMCwzNi40LDI5LjYsNjYuNCw2Ni40LDY2LjRoMjM3LjIgYzM2LjQsMCw2Ni40LTI5LjYsNjYuNC02Ni40QzQzOC44LDIyNS42LDQwOS4yLDE5NiwzNzIuOCwxOTZ6Ii8+IDxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzI1LjIsMzYyLjRsLTY2LjQsNjYuNGMtMi44LDIuOC03LjIsMi44LTEwLDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyLDQuOC0xMmgxNC44IGM0LDAsNy4yLTMuMiw3LjItNy4ydi05NmMwLTQsMy4yLTcuMiw3LjItNy4yaDc0LjhjNCwwLDcuMiwzLjIsNy4yLDcuMnY5NmMwLDQsMy4yLDcuMiw3LjIsNy4yaDE0LjggQzMyNi40LDM1MC40LDMyOS42LDM1OCwzMjUuMiwzNjIuNHoiLz4gPC9zdmc+IA==
// @supportURL  http://huching.net
// @grant       none
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
.hx-download-original-images-tool:hover {
    opacity:1;
    transform: scale(.9);
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


const createDom = (item, link) => {
  let domDL = document.createElement('a');
  domDL.className = 'hx-download-original-images-tool'
  domDL.title = '下载原始图片'
  domDL.href = link
  domDL.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation()
    openDown(link, e)
  })
  item.insertAdjacentElement('afterEnd', domDL)
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
} else if (hostname === "medium.com") {
  // medium
  document.querySelector('article').querySelectorAll('img').forEach(x => (x.width > 80) && createDomAll(x, src => src.replace(/max\/\d+\//g, 'max/30000/')))
}