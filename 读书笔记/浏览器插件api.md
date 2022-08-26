#### chrome.runtime

chrome.runtime.id



chrome.runtime.connect

runtime.sendMessage(extensionId?: string, message: any, options: object, responseCallback: function)

chrome.runtime.getManifest()

chrome.runtime.getURL() 将插件安装目录中的相对路径转换为标准URL。

chrome.runtime.reload()

chrome.runtime.getPackageDirectoryEntry(callback: function)



runtime.onConnect.addListener(listener: function)

runtime.onInstalled.addListener(listener: function)

runtime.onMessage.addListener(listener: function)

runtime.onStartup.addListener(listener: function)

#### chrome.extension

extension.getBackgroundPage()

extension.getViews(fetchProperties: object)

#### chrome.tabs

tabs.connect(tabId: number, connectInfo: object)

chrome.tabs.create()

 chrome.tabs.sendMessage(details.tabId, {act: 'url',data: details.url,})

chrome.tabs.query()

chrome.tabs.reload()

tabs.get(tabId: number, callback: function)



#### chrome.scripting

scripting.executeScript(injection: [ScriptInjection](https://developer.chrome.com/docs/extensions/reference/scripting/#type-ScriptInjection), callback: function)

scripting.insertCSS(injection: [CSSInjection](https://developer.chrome.com/docs/extensions/reference/scripting/#type-CSSInjection), callback: function)

scripting.removeCSS(injection: [CSSInjection](https://developer.chrome.com/docs/extensions/reference/scripting/#type-CSSInjection), callback: function)



#### chrome.cookies

#### chrome.storage.

#### chrome.browserAction

#### chrome.webRequest

#### chrome.management