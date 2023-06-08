import Image from 'next/image'
import Link from 'next/link'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import SearchBar from '@/components/ui/SearchBar'
import Marketverse from '@/components/Marketverse/Marketverse'


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MarketView | Home',
  description: 'Free & open-source market sentiment visualization tool.',
}

export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pb-80 max-w-7xl  mx-auto h-1/2'>
        
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center  '>
          <LargeHeading
            size='lg'
            className='three-d text-black dark:text-white'>
            Visualize Market Sentiment in 3D: Uncover Insights, Make Informed Decisions
          </LargeHeading>

          <Paragraph className='lg:text-left'>
            With MarketView, you can visualize
            market sentiment at a glance.
          </Paragraph>
          {/* <SearchBar placeholder="Enter a stock symbol ... eg. AAPL"/> */}
         
        </div>

        <div style={{ maxWidth: '500px' }} className=" justify-center mx-auto">
          <SearchBar placeholder="Enter a stock symbol ... eg. AAPL" />
        </div>
      
      </div>
      
    </div>
  )
}