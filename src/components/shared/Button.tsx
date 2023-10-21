interface ButtonProps{
    label:string
}
const Button:React.FC<ButtonProps> = ({label}) => {
  return (
    <button className='bg-yellow-green p-4 w-full'>{label}</button>
  )
}

export default Button
