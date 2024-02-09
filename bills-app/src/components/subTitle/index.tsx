import { titleProps } from "../title";

export function SubTitle (props : titleProps) {
    return (<h3 className={props.class}>{props.text}</h3>)
}   