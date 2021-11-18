import { h, FunctionalComponent } from 'preact'
import { IChannel } from '../interfaces/IChannel'

const Channel: FunctionalComponent<
  IChannel & { onDelete: () => void; onChangeColor: () => void }
> = ({ link, color, onDelete, onChangeColor }) => {
  return (
    <div class="channel">
      <div class="link">{link}</div>
      <div
        onClick={() => onChangeColor()}
        class="color-circle"
        style={`background: ${color}`}
      />
      <button onClick={() => onDelete()} type="button" class="delete-btn">
        <svg width="25" height="25">
          <image
            width="25"
            height="25"
            href="img/trash-delete-bin-svgrepo-com.svg"
          />
        </svg>
      </button>
    </div>
  )
}

export default Channel
