javascript: (function() {
  const obj = {
    'some.location.host:8000': ['user', 'passwd'],
  };
  const [name, pwd] = obj[window.location.host];
  const dom1 = document.getElementById('login-username-local');
  const dom2 = document.getElementById('login-password-local');
  dom1.dispatchEvent(new Event('focus'));
  dom1.value = name;
  dom1.dispatchEvent(new Event('input'));
  dom1.dispatchEvent(new Event('change'));
  dom1.dispatchEvent(new Event('blur'));
  
  dom2.dispatchEvent(new Event('focus'));
  dom2.value = pwd;
  dom2.dispatchEvent(new Event('input'));
  dom2.dispatchEvent(new Event('change'));
  dom2.dispatchEvent(new Event('blur'));
  const btn = document.querySelector('.btn.bg-primary');
  btn.dispatchEvent(new Event('click'));

})()
