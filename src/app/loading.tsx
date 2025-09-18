'use client'
import Spinner from '@/components/Spinner'

const loading = () => {
  return (
    <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
      <Spinner />
    </div>
  )
}
export default loading
