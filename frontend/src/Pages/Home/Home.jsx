import React from 'react'
import Hero from '../../components/Hero/Hero'
import BestSeller from '../../components/BestSeller/BestSeller'
import LatestCollection from '../../components/LatestCollection/LatestCollection'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <BestSeller></BestSeller>
      <LatestCollection></LatestCollection>
    </div>
  )
}

export default Home
