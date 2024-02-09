type LayoutProps = 
{
    source: string,
    class: string,
    alt: string
}

export function Image (props : LayoutProps) {
    return (
    <img 
    src={props.source} 
    className={props.class}
    alt={props.alt} ></img>)
}