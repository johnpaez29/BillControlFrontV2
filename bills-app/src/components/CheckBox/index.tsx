type CheckBoxProps = {
    name: string
    class: string,
    text?: string
    onChange : (arg0: any) => void
}

export function CheckBox (props : CheckBoxProps) {

    return (
        <div className="row">
            <input
                type='checkbox'
                name= {props.name}
                onChange={props.onChange}
                className={props.class}
        />
        {props.text}
        </div> )
}