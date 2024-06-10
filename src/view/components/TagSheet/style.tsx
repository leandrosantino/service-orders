import styled from 'styled-components'

const blue = '#002060'

export const Container = styled.div`
  width: 100%;
  aspect-ratio: 7/10;
  display: flex;
  flex-direction: column;
  font-family: Arial;
  gap: 10px;
  font-size: 5px;
`

export const TagContent = styled.div<{ scale: 'full' | 'reduce' }>`

  *{
    font-family: Arial;
  }
  color: black;

  --padding: ${p => p.scale === 'reduce' ? '2px' : '4px'};
  --border-width: 2px;
  --font-weight: 600;
  --font-size: ${p => p.scale === 'reduce' ? '28px' : '40px'};

  flex: 1;
  border: var(--border-width) solid black;
  font-size: ${p => p.scale === 'reduce' ? '12px' : ''};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  header{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: var(--padding) ;
    border-bottom: var(--border-width) solid black;
    position: relative;
    &>span{
      width: 100%;
      text-align: center;
    }
    #date{
      font: 1.2rem;
      font-weight: normal;
      width: fit-content;
      position: absolute;
      right: 0;
      margin-right: .4rem;
      margin-top: .4rem;
      top: 0;
    }
  }

  .idCase{
    display: flex;
    justify-content: space-between;
  }

  .label{
    padding: var(--padding);
    font-weight: var(--font-weight);
  }

  .description{

    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc(var(--padding)*2);
    background-color: black;
    color: white;

    div{
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }

    &>span{
      width: 10%;
      height: fit-content;
      text-align: center;
    }

  }


  .body{
    display: flex;
    width: 100%;
    height: 100%;
    gap: calc(var(--padding));
    padding: var(--padding);
    &>div{
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }

  .dataCase{
    width: 100%;
    padding: var(--padding);
    border: var(--border-width) solid black;
  }

  .largeText{
    font-size: var(--font-size);
    text-align: center;
  }

  .fullheight{
    height: 100%;
  }

  .displayCenter{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form{
    background-color: #c2c2c2;
    margin-top: var(--padding);
    padding: var(--padding);
    gap: var(--padding);

    &>div{
      display: flex;
      height: 33.33%;
      width: 100%;

      span{
        min-width: 50%;
        padding: var(--padding) 0;
        margin-right: var(--padding);
        text-align: end;
      }

      div{
        border: 1px solid #000;
        width: 100%;
        height: 100%;
        background-color: #fff;
      }

    }

  }


  &[data-scale='full']{
    .description{
      font-size: 18px;
      font-weight: 500;
    }
    header{
      font-size: 20px;
      font-weight: 600;
    }
    .dataCase{
      font-size: 28px;
      font-weight: 600;
    }
    .largeText{
      padding: 0px;
      font-size: 80px;
      font-weight: 600;
      height: 100%;
    }
    .label{
      font-size: 14px;
    }
    #date{
      font-size: 14px;
    }
  }


  &[data-qrcode='on']{
    border-color: ${blue};
    color: ${blue};
    .description{
      background-color: ${blue};
    }
    .dataCase, header{
      border-color: ${blue};
    }
  }

`
