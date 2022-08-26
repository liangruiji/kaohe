let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  const console = iframe.contentWindow.console
  window.console = console