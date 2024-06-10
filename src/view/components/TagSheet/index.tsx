import { type Product } from '../../../server/entities/Product'
import { Tag } from './Tag'
import { Container } from './style'

interface TagSheetProps {
  productInfo?: {
    data: Product
    isFractional: boolean
  }
  scale: 'full' | 'reduce'
}

export function TagSheet ({ productInfo, scale }: TagSheetProps) {
  const id = '0'.repeat(24)

  if (productInfo === undefined) {
    return <></>
  }

  return (
    <Container>
      <Tag {...{ id, productInfo, scale, printDate: new Date().toLocaleDateString() }}/>
      <Tag {...{ id, productInfo, qrcode: true, scale, printDate: new Date().toLocaleDateString() }}/>
    </Container>
  )
}
