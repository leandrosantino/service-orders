import { QRCodeSVG } from 'qrcode.react'
import { type Product } from '../../../server/entities/Product'
import { TagContent } from './style'

interface TagProps {
  qrcode?: boolean
  id: string
  printDate: string
  productInfo: {
    data?: Product | null
    isFractional: boolean
  }
  scale: 'full' | 'reduce'
}

export function Tag ({ id, productInfo, qrcode, scale, printDate }: TagProps) {
  const qrcodeElement = (
    <>
      {qrcode &&
        < QRCodeSVG
        id="qrCode"
        value={JSON.stringify({
          productId: productInfo?.data?.id,
          tagId: id,
          isFractional: productInfo.isFractional
        })}
        size={scale === 'reduce' ? 150 : 256}
        fgColor='#002060'
        bgColor={'#fff '} level={'H'}
      />
      }
    </>
  )

  return (
    <TagContent
      data-qrcode={qrcode ? 'on' : 'off'}
      data-scale={scale}
      {...{ scale }}
    >

      <header>
        <span>ETIQUETA DE PRODUTO ACABADO</span>
        <span>ADLER PELZER PE</span>
        <span id='date' >{printDate}</span>
      </header>

      <div className='idCase' >
        <span className='label' >DESCRIÇÃO:</span>
        <span className='label' >ID: {id.toUpperCase()}</span>
      </div>

      <div className='description' >
        <div>
          <span>{productInfo.data?.description}</span>
          <span>{productInfo.data?.technicalDescription}</span>
        </div>
        <span>{productInfo.data?.ute}</span>
      </div>

      <div className="body">
        <div>

          <span className="label">PROJETO:</span>
          <div className='dataCase' >{productInfo.data?.projectNumber}</div>

          <span className="label">CÓDIGO ADLER:</span>
          <div className='dataCase' >{productInfo.data?.sapCode}</div>

          <span className="label">QUANTIDADE:</span>
          <div className='dataCase largeText' >{
          productInfo.isFractional
            ? '.'
            : productInfo.data?.amount
          }</div>

          <span className="label">CÓDIGO JEEP:</span>
          <div className='dataCase largeText' >{productInfo.data?.partNumber}</div>

        </div>

        <div>

          <span className="label">{qrcode ? 'QRCODE:' : 'FIFO:'}</span>
          <div className='dataCase fullheight displayCenter' >
            {qrcodeElement}
          </div>

          {
            !qrcode &&
            <div className='form'>

              <div className='formFrame' >
                <span className='label' >RESPONSÁVEL:</span>
                <div className='formInput'></div>
              </div>

              <div className='formFrame' >
                <span className='label' >OPERADOR:</span>
                <div className='formInput'></div>
              </div>

              <div className='formFrame' >
                <span className='label' >TURNO:</span>
                <div className='widthTurno formInput'></div>
              </div>

            </div>
          }

        </div>

      </div>

    </TagContent>
  )
}
