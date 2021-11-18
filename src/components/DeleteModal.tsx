import { h, Fragment, FunctionalComponent } from 'preact'

interface IDeleteModal {
  visible: boolean
  cancel: () => void
  confirm?: () => void
}

const DeleteModal: FunctionalComponent<IDeleteModal> = ({
  confirm,
  cancel,
  visible,
}) => {
  return (
    <>
      {visible && (
        <div class="modal">
          <div class="modal__content">
            <div class="modal__content_label">
              <h3>Подтвердите удаление</h3>
            </div>
            <div class="modal__content_buttons">
              <button onClick={() => cancel()} class="cancel-btn">
                Отмена
              </button>
              <button
                onClick={() => {
                  confirm!()
                  cancel()
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteModal
