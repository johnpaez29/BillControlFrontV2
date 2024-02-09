import { Option } from '../../types/Option/Option'
type SelectProps = {
    defaultName?: string
    class?: string
    disable?: boolean
    name: string
    onChange : (arg0: any) => void
    data : Option[]
}

export function Select (props : SelectProps) {
    return (
        <select
              className= {props.class}
              disabled={props.disable ?? false}
              name={props.name}
              onChange={props.onChange}>
              <option key='' value=''>{props.defaultName ?? 'Seleccione el nombre ...'}</option>
              {
                props.data.map(option => {
                  return (
                    <option
                      key={option.key}
                      value={option.value}>
                      {option.text}
                    </option>
                  )
                })
              }
            </select>
    )
} 