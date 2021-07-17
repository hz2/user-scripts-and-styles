// Usage : 
// @require https://greasyfork.org/scripts/396752-hx-script-library/code/hx-script-library.js

console.warn('Welcome to %c \ud83d\ude48\ud83d\ude49\ud83d\ude4a\u0020\u0048\u007a\u00b2\u0020\u0053\u0063\u0072\u0069\u0070\u0074\u0020\u004c\u0069\u0062\u0072\u0061\u0072\u0079 %c v0.06 ', 'background-color:teal;color: white;border:1px solid teal;border-radius: 4px 0 0 4px;border-left-width:0;padding:1px;margin:2px 0;font-size:1.1em', 'background-color:#777;color: white;border:1px solid #777;border-radius: 0 4px 4px 0;border-right-width:0;padding:1px;margin:5px 0;');

const openDown = (url, e, name) => {
  e && e.preventDefault();
  e && e.stopPropagation()
  fetch(url, {
      mode: "cors"
    })
    .then(resp => resp.blob())
    .then(r => {
      const blobUrl = URL.createObjectURL(r)
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
    })
    .catch(err => {
      console.log("Request failed", err);
    });
}