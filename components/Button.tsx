interface ButtonProps {
  className?: string
  outline?: boolean
  type?: "button" | "submit"
  onClick: () => void
  title?: string
  children?: any
}

const Button = ({
  className = '',
  outline = false,
  type = "button",
  title,
  children = {},
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn ${outline ? 'btn-outline' : ''} ${className}`}
      onClick={onClick}
      {...props}>
      {title || children}
    </button>
  )
}

export default Button