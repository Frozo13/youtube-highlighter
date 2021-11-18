import { h, Fragment, FunctionalComponent } from 'preact'

interface IColorModal {
  visible: boolean
  cancel: () => void
  confirm?: (color: string) => void
}

const colors = [
  '#FF00FF',
  '#800080',
  '#FF0000',
  '#FFFF00',
  '#00FF00',
  '#008000',
  '#00FFFF',
  '#0000FF',
]

const ColorModal: FunctionalComponent<IColorModal> = ({
  visible,
  confirm,
  cancel,
}) => {
  return (
    <>
      {visible && (
        <div class="modal modal-colors">
          <div class="modal__content">
            <div class="modal__content_colors">
              {colors.map(c => (
                <div
                  onClick={() => {
                    confirm!(c)
                    cancel()
                  }}
                  class="color-circle "
                  style={`background-color: ${c}`}
                />
              ))}
            </div>
            <button onClick={() => cancel()}>Отмена</button>
          </div>
        </div>
      )}
    </>
  )
}

export default ColorModal
