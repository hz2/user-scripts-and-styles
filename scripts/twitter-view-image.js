// ==UserScript==
// @name         Twitter View Image
// @name:zh-CN   推特看图
// @namespace    https://huching.net/
// @version      0.0.1
// @description  try to take over the world!
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzFkOWJmMCIgPjxwYXRoIGQ9Ik0yMy42NDMgNC45MzdjLS44MzUuMzctMS43MzIuNjItMi42NzUuNzMzLjk2Mi0uNTc2IDEuNy0xLjQ5IDIuMDQ4LTIuNTc4LS45LjUzNC0xLjg5Ny45MjItMi45NTggMS4xMy0uODUtLjkwNC0yLjA2LTEuNDctMy40LTEuNDctMi41NzIgMC00LjY1OCAyLjA4Ni00LjY1OCA0LjY2IDAgLjM2NC4wNDIuNzE4LjEyIDEuMDYtMy44NzMtLjE5NS03LjMwNC0yLjA1LTkuNjAyLTQuODY4LS40LjY5LS42MyAxLjQ5LS42MyAyLjM0MiAwIDEuNjE2LjgyMyAzLjA0MyAyLjA3MiAzLjg3OC0uNzY0LS4wMjUtMS40ODItLjIzNC0yLjExLS41ODN2LjA2YzAgMi4yNTcgMS42MDUgNC4xNCAzLjczNyA0LjU2OC0uMzkyLjEwNi0uODAzLjE2Mi0xLjIyNy4xNjItLjMgMC0uNTkzLS4wMjgtLjg3Ny0uMDgyLjU5MyAxLjg1IDIuMzEzIDMuMTk4IDQuMzUyIDMuMjM0LTEuNTk1IDEuMjUtMy42MDQgMS45OTUtNS43ODYgMS45OTUtLjM3NiAwLS43NDctLjAyMi0xLjExMi0uMDY1IDIuMDYyIDEuMzIzIDQuNTEgMi4wOTMgNy4xNCAyLjA5MyA4LjU3IDAgMTMuMjU1LTcuMDk4IDEzLjI1NS0xMy4yNTQgMC0uMi0uMDA1LS40MDItLjAxNC0uNjAyLjkxLS42NTggMS43LTEuNDc3IDIuMzIzLTIuNDF6Ij48L3BhdGg+PC9zdmc+
// @author       huc < ht@live.se >
// @supportURL   https://github.com/hz2/user-scripts-and-styles/issues/new
// @include      *://twitter.com/*
// @grant        none
// ==/UserScript==


const init = () => {

  window.addEventListener('mouseover', ({
    target
  }) => {
    const parent = target.parentElement
    if (target.tagName == 'IMG' && parent.dataset?.testid === "tweetPhoto") {
      const dom = target || {}
      const link = dom.src || ''
      console.log('parent, ', link)

    }

  })
}


setTimeout(() => {
  init()
}, 1500);