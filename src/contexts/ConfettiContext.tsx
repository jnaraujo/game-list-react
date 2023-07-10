"use client"

import { createContext, useContext, useState } from "react"
import ReactConfetti from "react-confetti"
import { useWindowSize } from "react-use"

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

  function confetti(duration = 5000) {
    setShow(true)

    setTimeout(() => {
      setShow(false)
    }, duration)
  }

  const numberOfPieces = window.innerWidth > 600 ? 500 : 200

  return (
    <ConfettiContext.Provider value={{ confetti }}>
      {children}

      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
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
