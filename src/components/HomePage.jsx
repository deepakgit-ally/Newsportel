import React from 'react'
import Navbar from './Navbar'
import NewsItem from './NewsItem'
import VoiceSearch from './VoiceSearch'
function HomePage() {
  return (
    <div>
        <Navbar/>
     <VoiceSearch/>
      <NewsItem/>
    </div>
  )
}

export default HomePage
