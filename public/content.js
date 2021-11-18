let channels = []
let contentObserver

chrome.storage.local.get(['channels'], result => {
  if (result.channels) {
    channels = result.channels

    if (
      document.location.href.indexOf(
        'https://www.youtube.com/feed/subscriptions',
      ) === 0
    ) {
      observeContent()
    }
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

function observeContent() {
  highlight(document)

  const target = document.getElementById('contents')

  contentObserver = new MutationObserver(function (mutations) {
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

  contentObserver.observe(target, {
    attributes: true,
    childList: true,
    characterData: true,
  })
}

let oldHref = document.location.href

const pageObserver = new MutationObserver(mutations => {
  mutations.forEach(() => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href
      if (
        document.location.href.indexOf(
          'https://www.youtube.com/feed/subscriptions',
        ) === 0
      ) {
        setTimeout(() => {
          observeContent()
        }, 500)
      } else {
        contentObserver?.disconnect()
      }
    }
  })
})

pageObserver.observe(document.body, {
  childList: true,
  subtree: true,
})
