import Modal from "@/components/Modal"
import { createContext, useContext, useState } from "react"

interface ModalContextInterface {
  openModal: (content: React.ReactNode) => void
  closeModal?: () => void
}

export const ModalContext = createContext<ModalContextInterface>({
  openModal: () => {},
  closeModal: () => {},
})

export const useModalContext = () => useContext(ModalContext)

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [content, setContent] = useState<React.ReactNode>(null)

  function openModal(content: React.ReactNode) {
    setContent(content)
  }

  function closeModal() {
    setContent(null)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal open={!!content} onClose={closeModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  )
}
