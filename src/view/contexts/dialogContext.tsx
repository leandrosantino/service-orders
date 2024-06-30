import { type ReactNode, createContext, useState, useEffect } from 'react'
import { Dialog } from '../components/dialog'
import { Prompt } from '../components/dialog/Prompt'
import { DialogCustom } from '../components/dialog/Custom'
import { useLocation } from 'react-router-dom'
import React from 'react'

export interface DialogProps {
  title: string
  message: string
  isQuestion?: boolean
  accept?: (value?: any) => void
  refuse?: () => void
  finally: () => void
  error?: boolean
  type?: 'text' | 'password' | 'number'
  params?: any
}

interface AlertProps { title: string, message: string, error?: boolean }

interface QuestionProps extends AlertProps {
  accept: () => void
  refuse: () => void
}

interface PromptProps extends AlertProps {
  type: DialogProps['type']
  accept?: (value?: any) => void
  refuse: () => void
}

interface CustomProps {
  Child: (props: DialogProps) => JSX.Element
  accept?: (value?: any) => void
  refuse?: () => void
  params?: any
}

interface DialogContextProps {
  alert: (props: AlertProps) => void
  question: (props: QuestionProps) => void
  prompt: (props: PromptProps) => void
  custom: (props: CustomProps) => void
}

export const DialogContext = createContext({} as DialogContextProps)
const { Provider } = DialogContext

export function DialogProvider ({ children }: { children: ReactNode }) {
  const [isPrompt, setIsPrompt] = useState(false)
  const [show, setShow] = useState(false)
  const [dialogPorps, setDialogProps] = useState<DialogProps>({} as DialogProps)
  const [content, setContent] = useState<JSX.Element>()
  const [asChild, setAsChild] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setShow(false)
  }, [pathname])

  function alert ({ message, title, error }: AlertProps) {
    setAsChild(false)
    setShow(true)
    setIsPrompt(false)
    setDialogProps({
      error,
      title,
      message,
      finally: () => { setShow(false) }
    })
  }

  function question ({ message, title, accept, refuse }: QuestionProps) {
    setAsChild(false)
    setShow(true)
    setIsPrompt(false)
    setDialogProps({
      isQuestion: true,
      title,
      message,
      accept,
      refuse,
      finally: () => { setShow(false) }
    })
  }

  function prompt ({ message, refuse, title, type, accept }: PromptProps) {
    setAsChild(false)
    setShow(true)
    setIsPrompt(true)
    setDialogProps({
      isQuestion: true,
      title,
      message,
      accept,
      refuse,
      type,
      finally: () => { setShow(false) }
    })
  }

  function custom ({ Child, refuse, accept, params }: CustomProps) {
    setShow(true)
    setIsPrompt(true)
    setAsChild(true)
    const props: DialogProps = {
      isQuestion: true,
      title: '',
      message: '',
      accept,
      refuse,
      params,
      finally: () => { setShow(false); setAsChild(false) }
    }
    setContent(<Child {...props} />)
    setDialogProps(props)
  }

  function DialogContent () {
    if (asChild && content) {
      return (
        <DialogCustom onFinally={dialogPorps.finally}>
          {content}
        </DialogCustom>
      )
    }
    if (isPrompt) {
      return <Prompt {...dialogPorps} />
    }
    return <Dialog {...dialogPorps} />
  }

  return (
    <Provider
      value={{
        alert, question, prompt, custom
      }}
    >
      {show && <><DialogContent /></>}
      {children}
    </Provider>
  )
}
