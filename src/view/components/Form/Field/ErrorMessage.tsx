import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

interface ErrorMessageProps {
  field: string
}

const Span = styled.span`
  height: 2rem;
  padding: 0 .4rem;
  font-size: 1.2rem;
  color: ${p => p.theme.colors.light.red11};
  width: 100%;
  text-align: start;
`

export function ErrorMessage ({ field }: ErrorMessageProps) {
  const { formState: { errors } } = useFormContext()

  const fieldError = getFieldError(errors, field)

  return (
    <Span>{fieldError?.message.toString()}</Span>
  )
}

function getFieldError (obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result
};
