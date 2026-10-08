window.onerror = function(msg, src, line) {
  var d = document.createElement('div');
  d.style = 'position:fixed;top:60px;left:0;right:0;background:red;color:white;font-size:14px;padding:8px;z-index:99999';
  d.textContent = msg + ' | ' + src + ' | ligne ' + line;
  document.body.appendChild(d);
};
