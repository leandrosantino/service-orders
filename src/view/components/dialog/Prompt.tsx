import { useEffect, useState } from 'react'
import { type DialogProps } from '../../contexts/dialogContext'
import { Content, Overlay, PromptInput } from './style'
import { Button } from '../Form/Button'

export function Prompt (props: DialogProps) {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(false)
    document.getElementById('input')?.focus()
  }, [value])

  function handleSubmit () {
    if (value !== '') {
      props.finally()
      if (props.accept) {
        props.accept(value)
      }
      return
    }
    setError(true)
  }

  return (
    <>
      <Overlay
        onClick={() => { props.finally() }}
      />

      <Content
        error={false}
      >

        <h4>{props.title}</h4>
        <p dangerouslySetInnerHTML={{ __html: props.message }} />

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >

          <PromptInput
            id='input'
            error={error}
            type={props.type}
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            min={1}
          />

          <div>
            <Button
              type='button'
              onClick={() => {
                if (props.refuse) {
                  props.refuse()
                }
                props.finally()
              }}
            >
              Cancelar
            </Button>
            <Button type='submit'>Concluir</Button>
          </div>
        </form>

      </Content>

    </>
  )
}
