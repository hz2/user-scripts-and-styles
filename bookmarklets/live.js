javascript:(()=>{
    const host = window.location.hostname;
    if (host === 'v.6.cn') {
      document.querySelector('.player-video').setAttribute('style', `width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999; `);
      document.querySelector('.player-float').setAttribute('style', 'filter: none;');
    };
    if (host === 'live.bilibili.com') {
      document.querySelector('.player-section').setAttribute('style', `width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99999; `);
      document.querySelector('#link-navbar-vm').setAttribute('style', 'display: none;');
      document.querySelector('#aside-area-vm').setAttribute('style', 'display: none;');
    }
})()

