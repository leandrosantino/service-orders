import { useFormContext } from 'react-hook-form'
import { SwitchRoot, SwitchThumb } from './styles'
import { useEffect } from 'react'

interface SwitchProps {
  name: string
}

export function Switch ({ name }: SwitchProps) {
  const {
    watch,
    register,
    setValue
  } = useFormContext()

  useEffect(() => {
    setValue('fractional', false)
  }, [])

  return (
    <SwitchRoot
      id='fractional'
      defaultChecked={false}
      {...register(name)}
      checked={watch().fractional}
      onCheckedChange={(value) => {
        setValue(name, value)
      }}
    >
      <SwitchThumb/>
    </SwitchRoot>
  )
}
