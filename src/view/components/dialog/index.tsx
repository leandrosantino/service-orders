import { Content, Overlay } from './style'
import { type DialogProps } from '../../contexts/dialogContext'
import { Button } from '../Form/Button'

export function Dialog (props: DialogProps) {
  return (
    <>
      <Overlay
        onClick={() => { props.finally() }}
      />
      <Content
        error={props.error ?? false}
      >
        <h4>{props.title}</h4>
        <p dangerouslySetInnerHTML={{ __html: props.message }} />
        {props.isQuestion
          ? <div>
            <Button
              onClick={() => {
                if (props.refuse) {
                  props.refuse()
                }
                props.finally()
              }}
            >não</Button>
            <Button
              onClick={() => {
                props.finally()
                if (props.accept) {
                  props.accept()
                }
              }}
            >sim</Button>
          </div>
          : <div>
            <Button
              onClick={() => { props.finally() }}
            >ok</Button>
          </div>
        }
      </Content>
    </>
  )
}
