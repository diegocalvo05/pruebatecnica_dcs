interface Props {
  children: React.ReactNode
  onClose: () => void
}

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-md shadow-lg p-6 w-full max-w-md z-10">
        {children}
      </div>
    </div>
  )
}
