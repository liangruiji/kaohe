content_script.js = > main.js => msycm_mixins.js

~~~js
script  = document['createElement']('script');
script["innerHTML"] = 'var a =6',// script["textContent"] = 'var a =6',
document.head.appendChild(script),
document.head.removeChild(script);
~~~

