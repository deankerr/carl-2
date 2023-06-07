type Props = {
  value: string
  position: number
}

export function UIDemoComponent({ value, position }: Props) {
  return (
    <div
      className={`w-48 bg-red-200 text-center text-amber-800 hover:bg-red-400`}
    >
      {value ? value : 'UI Test Component'}
    </div>
  )
}
