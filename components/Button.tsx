interface ButtonProps {
  className?: string
  outline?: boolean
  processing?: boolean
  type?: "button" | "submit"
  onClick: () => void
  title?: string
  children?: any
}

const Button = ({
  className = '',
  outline = false,
  processing = false,
  type = "button",
  title,
  children = {},
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn ${outline ? 'btn-outline' : ''} ${processing? 'disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={processing}
      {...props}>
      {title || children}
    </button>
  )
}

export default Button