"use client"

import clsx from "clsx"
import { X } from "lucide-react"

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function Modal({ children, open, onClose }: ModalProps) {
  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-10 hidden items-center justify-center bg-black bg-opacity-50",
          {
            "!flex animate-overlayShow": open,
          },
        )}
        onClick={onClose}
      />
      <dialog
        open={open}
        className="fixed inset-0 z-50 max-h-[90vh] w-full max-w-[500px]  overflow-y-auto rounded-md bg-white shadow-lg"
      >
        <div className="flex flex-col">
          <button
            onClick={onClose}
            className="ml-auto"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
          {children}
        </div>
      </dialog>
    </>
  )
}
