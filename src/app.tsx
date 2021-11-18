import { h, FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Channel from './components/Channel'
import ColorModal from './components/ColorModal'
import DeleteModal from './components/DeleteModal'
import InputForm from './components/InputForm'
import { IChannel } from './interfaces/IChannel'

const App: FunctionalComponent = () => {
  const [search, setSearch] = useState('')
  const [errorTimeout, setErrorTimeoutId] = useState<NodeJS.Timeout | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)
  const [channels, setChannels] = useState<IChannel[]>([])
  const [inputActive, setInputActive] = useState(false)
  const [deleteModalState, setDeleteModalState] = useState<{
    visible: boolean
    callback?: () => void
  }>({
    visible: false,
  })
  const [colorModalState, setColorModalState] = useState<{
    visible: boolean
    callback?: (color: string) => void
  }>({
    visible: false,
  })

  useEffect(() => {
    chrome.storage.local.get(['channels'], result => {
      if (result.channels) {
        setChannels(result.channels)
      }
    })
  }, [])

  useEffect(() => {
    save()
  }, [channels])

  function save() {
    chrome.storage.local.set({ channels: channels })
  }

  function addChannel(channel: IChannel) {
    const link = channel.link

    if (
      link.indexOf('youtube.com/c/') === -1 &&
      link.indexOf('youtube.com/channel/') === -1
    ) {
      showError('некорректная ссылка')
      return false
    }

    channel.link = link.slice(link.indexOf('/c'))

    if (channels.find(c => c.link === channel.link)) {
      showError('этот канал уже есть в списке')
      return false
    }

    setChannels([channel, ...channels])
    console.log('save', channels)

    return true
  }

  function deleteHandler(link: string) {
    setDeleteModalState({
      visible: true,
      callback: () => {
        setChannels(channels.filter(c => c.link !== link))
      },
    })
  }

  function showError(text: string) {
    if (errorTimeout) clearTimeout(errorTimeout)

    setError(text)
    const id = setTimeout(() => {
      hideError()
    }, 3000)
    setErrorTimeoutId(id)
  }

  function hideError() {
    if (errorTimeout) clearTimeout(errorTimeout)
    setError(null)
  }

  function changeColor(callback: (color: string) => void) {
    setColorModalState({
      visible: true,
      callback,
    })
  }

  function changeChannelColor(link: string) {
    setColorModalState({
      visible: true,
      callback: color => {
        const channel = channels.find(c => c.link === link)
        if (channel) {
          channel.color = color
        }
        setChannels(channels)
        save()
      },
    })
  }

  const filteredChannels = channels.filter(c => c.link.indexOf(search) !== -1)

  return (
    <div class={'container'}>
      <DeleteModal
        visible={deleteModalState.visible}
        confirm={deleteModalState.callback}
        cancel={() => setDeleteModalState({ visible: false })}
      />
      <ColorModal
        visible={colorModalState.visible}
        confirm={colorModalState.callback}
        cancel={() => setColorModalState({ visible: false })}
      />
      <input
        value={search}
        onInput={e => setSearch(e.currentTarget.value)}
        placeholder="Поиск по добавленным"
        type="text"
        class="search"
        autoFocus
      />
      <div class="channels">
        {filteredChannels.map(c => (
          <Channel
            key={c.link}
            {...c}
            onDelete={() => deleteHandler(c.link)}
            onChangeColor={() => changeChannelColor(c.link)}
          />
        ))}
      </div>
      {error && (
        <div onClick={() => hideError()} class="error">
          {error}
        </div>
      )}
      <div>
        {inputActive ? (
          <InputForm
            cancel={() => setInputActive(false)}
            add={addChannel}
            changeColor={changeColor}
          />
        ) : (
          <button onClick={() => setInputActive(true)} class="add-btn">
            Добавить канал
          </button>
        )}
      </div>
    </div>
  )
}

export default App
