import React, { useEffect, useState } from 'react'
import { AbsoluteContainer, Aside, ToggleGroupRoot } from './style'
import { PageButton } from './PageButton'
import { Link, useLocation } from 'react-router-dom'
import { useSideBarShow } from '../../hooks/useSideBarShow'
import { ShowSideBarButton } from '../ShowSideBarButton'

export function Sidebar () {
  const { pathname } = useLocation()
  const [alignment, setAlignment] = useState(pathname)
  const { showSideBar, setShowSideBar } = useSideBarShow()

  useEffect(() => {
    setAlignment(pathname)
    if (window.innerWidth < 800) {
      setShowSideBar(false)
    }
  }, [pathname])

  return (
    <>
      <Aside
      data-show={showSideBar ? 'on' : 'off'}
    >

      <header>
        <ShowSideBarButton onClick={() => { setShowSideBar(false) }} />
        <Link to='/'>
          <h2>
            Service<span>Orders</span>
          </h2>
        </Link>
      </header>

      <ToggleGroupRoot
        type='single'
        value={alignment}
      >

        <PageButton value="/" >Dashboard</PageButton>
        <PageButton value="/preventives" >Preventivas</PageButton>

      </ToggleGroupRoot>
    </Aside >
    {
      window.innerWidth < 1000 && showSideBar &&
      <AbsoluteContainer
        onClick={() => {
          if (window.innerWidth < 1000) {
            setShowSideBar(false)
          }
        }}
      />
    }
    </>
  )
}
