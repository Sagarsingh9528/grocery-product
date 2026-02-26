import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsEmail from '../components/NewsEmail'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner />
        <Categories/>
        <BestSellers/>
        <BottomBanner/>
        <NewsEmail/>
        
    </div>
  )
}

export default Home