interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-1 md:px-4">
      {children}
    </div>
  )
}