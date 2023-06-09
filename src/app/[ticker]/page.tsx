'use client'
import { useRouter } from 'next/navigation'
import Marketverse from '@/components/Marketverse/Marketverse'

export default function Page() {
  const router = useRouter()
  return (
    <div className='relative flex items-center justify-center overflow-x-hidden'>
        <Marketverse/>
    </div>
  )
}
