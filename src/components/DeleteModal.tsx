import { h, Fragment, FunctionalComponent } from 'preact'
import { getString } from '../helpers/i18n'

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
              <h3>{getString('delete_confirm')}</h3>
            </div>
            <div class="modal__content_buttons">
              <button onClick={() => cancel()} class="cancel-btn">
                {getString('cancel')}
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
