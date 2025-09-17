import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'

const BackButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} className="text-sm text-white mb-4 flex gap-2 items-center">
      <MdArrowBack />
      <p>Back</p>
    </Button>
  )
}
export default BackButton
