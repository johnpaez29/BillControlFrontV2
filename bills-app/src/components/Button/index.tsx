type ButtonProps = {
    class?: string,
    onClick: (element: any) => void,
    text: string,
    value?: string
}

export function Button (props : ButtonProps) {
    return <button className={props.class} onClick={props.onClick} value={props.value}>{props.text}</button>
}