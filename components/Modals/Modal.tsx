interface ModalProps {
  children: any,
  open: boolean
}

const Footer = ({ children }: any) => {
  return (
    <div className="modal-footer">
      {children}
    </div>
  )
}

const Content = ({ children, useClose = false }: any) => {
  return (
    <div className="modal-content">
      {useClose && <span className="modal-close">&times;</span>}
      {children}
    </div>
  )
}

const Modal = ({
  children,
  open = false
}: ModalProps) => {
  return (
    <div className={` modal ${open ? 'open' : ''}`}>
      {children}
    </div>
  )
}

Modal.Content = Content
Modal.Footer = Footer

export default Modal