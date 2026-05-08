export default function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={className} {...props}></div>
}
