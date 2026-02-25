import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner />
        <Categories/>
        <BestSellers/>
        <BottomBanner/>
    </div>
  )
}

export default Home