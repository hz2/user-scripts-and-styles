// ==UserScript==
// @name         大字不识一个
// @name:en      I don't know any character
// @description  清风不识字，何故乱翻书
// @description:en  Breeze can't read
// @namespace    http://huching.net/
// @version      0.1
// @author       Uncle Five < ht@live.se >
// @include        *//weibo.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const num2han = num => String.fromCharCode(num)
  const han2num = han => han.charCodeAt()
  const reverseHan = han => {
    // 0x4E00—0x9FA5
    let num = han2num(han)

    if (19968 <= num && num <= 40869) {
      return num2han(40869 - (num - 19968))

    } else {
      return han
    }
  }
  // 加密
  setTimeout(_ => {
    const dom = document.querySelector('[title="微博输入框"]');
    let fakeDom = document.createElement('textarea')
    fakeDom.addEventListener('input', ({
      target: {
        value: value
      }
    }) => {
      console.log('value111', value)
      let output = value && value.split('').map(x => reverseHan(x)).join('')
      dom.value = output ? ('釟蠞硳' + output) : ''
    })
    dom.insertAdjacentElement('beforebegin', fakeDom)
  }, 2000)
  // 尝试解密

  const getText = (val) => {
    if (val.startsWith('釟蠞硳')) {
      let output = val.slice(3).split('').map(x => reverseHan(x))
      return '[明文]' + output.join('')
    } else {
      return val
    }
  }

  window.addEventListener('mouseover', e => {
    if ([...e.target.classList].includes('WB_text')) {
      let text = e.target.innerText

      if (text.includes('//')) {
        e.target.innerText = text.split('//').map(x => x.replace(/(\@\S+\:)(\S+)?/g, (a, b, c, d) => b + (c && getText(c) || ''))).join('//')
      } else {
        e.target.innerText = getText(text)

      }
    }
  })

})();