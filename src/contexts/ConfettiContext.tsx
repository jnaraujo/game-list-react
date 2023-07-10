"use client"

import { createContext, useContext, useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

interface ConfettiContextInterface {
  confetti: (duration?: number) => void
}

export const ConfettiContext = createContext<ConfettiContextInterface>(
  {} as ConfettiContextInterface,
)

export const useConfettiContext = () => useContext(ConfettiContext)

export default function ConfettiProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [show, setShow] = useState<boolean>(false)
  const [screen, setScreen] = useState<{ width: number; height: number }>({
    width: 500,
    height: 500,
  })

  useEffect(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  function confetti(duration = 5000) {
    setShow(true)

    setTimeout(() => {
      setShow(false)
    }, duration)
  }

  const numberOfPieces = screen.width > 600 ? 500 : 200

  return (
    <ConfettiContext.Provider value={{ confetti }}>
      {children}

      <ReactConfetti
        width={screen.width}
        height={screen.height}
        style={{
          position: "fixed",
          pointerEvents: "none",
        }}
        numberOfPieces={show ? numberOfPieces : 0}
        recycle={show}
      />
    </ConfettiContext.Provider>
  )
}
