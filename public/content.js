let channels = []

chrome.storage.local.get(['channels'], result => {
  if (result.channels) {
    channels = result.channels
    highlight(document)
  }
})

function highlight(node) {
  const videos = node.getElementsByTagName('ytd-grid-video-renderer')

  for (const el of videos) {
    const linkElement = el.getElementsByClassName('yt-formatted-string')[0]
    const link = linkElement.getAttribute('href')

    for (const channel of channels) {
      if (link === channel.link) {
        el.style['outline'] = `1px solid ${channel.color}`
        el.style[
          'boxShadow'
        ] = `0 0 20px ${channel.color}, inset 0px -100px 100px -100px ${channel.color}`
      }
    }
  }
}

var target = document.getElementById('contents')

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      for (const node of mutation.addedNodes) {
        if (node.tagName === 'YTD-ITEM-SECTION-RENDERER') {
          highlight(node)
        }
      }
    }
  })
})

var config = { attributes: true, childList: true, characterData: true }
observer.observe(target, config)
