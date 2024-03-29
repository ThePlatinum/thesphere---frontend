import { useEffect } from "react"

interface ModalProps {
  children: any
  open?: boolean
  className?: string
  onClose?: () => void
  requestClose?: () => void
}

const Footer = ({ children }: any) => {
  return (
    <div className="modal-footer">
      {children}
    </div>
  )
}

const Content = ({ children, className, useClose = false, requestClose }: any) => {
  return (
    <div className={`modal-content ${className}`}>
      {useClose && <span className="modal-close" onClick={requestClose}>&times;</span>}
      {children}
    </div>
  )
}

const Modal = ({
  children,
  open = false,
  className,
  onClose
}: ModalProps) => {

  useEffect(() => {
    (!open && onClose) && onClose()
  }, [open, onClose])

  return (
    <div className={`modal ${open ? 'open' : ''} ${className}`}>
      {children}
    </div>
  )
}

Modal.Content = Content
Modal.Footer = Footer

export default Modal