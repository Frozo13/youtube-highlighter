import { h, FunctionalComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { IChannel } from '../interfaces/IChannel'

interface IInputForm {
  cancel: () => void
  add: (channel: IChannel) => boolean
  changeColor: (callback: (colot: string) => void) => void
}

const InputForm: FunctionalComponent<IInputForm> = ({
  cancel,
  add,
  changeColor,
}) => {
  const [link, setLink] = useState('')
  const [color, setColor] = useState('#00FFFF')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function clear() {
    setLink('')
    cancel()
  }

  function addChanel(e: h.JSX.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault()
    if (link !== '') {
      if (add({ link, color })) {
        clear()
      }
    } else {
      clear()
    }
  }

  function handleChangeColor() {
    changeColor((color: string) => {
      setColor(color)
    })
  }

  return (
    <form onSubmit={addChanel} class={'input-form'}>
      <button onClick={() => handleChangeColor()} type="button">
        <div class="color-circle" style={`background-color: ${color}`} />
      </button>
      <input
        value={link}
        onInput={e => setLink(e.currentTarget.value)}
        ref={inputRef}
        type="text"
        placeholder="ссылка на канал"
        class="link-input"
      />
      <button onClick={clear} type="button" class="cancel">
        <svg width="32" height="32">
          <image width="32" height="32" href="img/arrow-left-svgrepo-com.svg" />
        </svg>
      </button>
      <button type="submit" class="ok">
        <svg width="32" height="32">
          <image
            width="32"
            height="32"
            href="img/check-good-yes-svgrepo-com.svg"
          />
        </svg>
      </button>
    </form>
  )
}

export default InputForm
