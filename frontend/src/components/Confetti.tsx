import { useEffect } from 'react'
import Confetti from 'react-confetti'

interface ConfettiProps {
  show: boolean
  onComplete?: () => void
}

const ConfettiEffect = ({ show, onComplete }: ConfettiProps) => {
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false}
      numberOfPieces={200}
      colors={['#00ffff', '#8b5cf6', '#ff6b35', '#ffffff']}
      gravity={0.3}
      initialVelocityY={20}
    />
  )
}

export default ConfettiEffect



