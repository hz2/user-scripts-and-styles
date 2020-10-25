// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require https://greasyfork.org/scripts/396752-hx-script-library/code/hx-script-library.js
// @match        *
// @match        https://www.example.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // download inline svg
    [...document.querySelectorAll('svg')].forEach(x=>{
        const dom = x;
        const title = dom.querySelector('title')&&dom.querySelector('title').innerHTML || dom.parentElement.className || window.location.hostname.replace(/www|com|org|\./g,'') + '_' + Math.random().toString().substr(2,4);
        let text = dom.outerHTML
        if ( !text.includes('xmlns')) {
            text = text.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg" ')
        }
        const content = 'data:text/html;base64,' + btoa(text)
        dom.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation()
            window.openDown(content,title + '.svg',e)
        })
    });
    [...document.querySelectorAll('img')].filter(x=>(x.src.startsWith("data:image/svg+xml")||x.src.endsWith(".svg"))).forEach(x=>{
        const dom = x;
        const nameArr = dom.src.split('/')
        const lastName = nameArr[nameArr.length-1]
        const title = dom.alt || lastName;
        const setFileExt = title => title.endsWith(".svg") ? title : ( title + '.svg' )
        dom.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation()
            window.openDown( dom.src ,setFileExt(title),e)
        })
    })

    // Your code here...
})();
