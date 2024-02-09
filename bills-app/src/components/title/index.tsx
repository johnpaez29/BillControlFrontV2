export type titleProps = {
    text : string,
    class? : string
}

export function Title (props : titleProps) {
    return (<h1 className={props.class}>{props.text}</h1>)
} 