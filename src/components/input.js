export default function Input({type, className, ...props}) {
    return(
        <input type={type} className={className} {...props} />
    )
}