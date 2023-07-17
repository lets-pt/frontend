import React, { useEffect } from 'react'
import Header from '../component/Header'
import Script from '../component/Script'
import { useDispatch } from 'react-redux'
import PptList from '../component/PptList'


const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <hr />
      <Script />
      <hr />
      <PptList />
    </div>
  )
}

export default HomePage
