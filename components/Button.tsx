interface ButtonProps {
  className?: string
  outline?: boolean
  onClick: () => void
  title?: string
  children?: any
}

const Button = ({
  className = '',
  outline = false,
  title,
  children = {},
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`btn ${outline ? 'btn-outline' : ''} ${className}`}
      onClick={onClick}
      {...props}>
      {title || children}
    </button>
  )
}

export default Button