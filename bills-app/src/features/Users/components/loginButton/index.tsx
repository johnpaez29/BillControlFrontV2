import './index.css'

type buttonLoginProps = {
    value : string,
    image : string,
    onClick : (element: any) => void
}

export function LoginButton (props : buttonLoginProps) {

    return (
    <button 
        value={props.value} 
        className="login-button"
        style={{
            background: `url(${props.image}) no-repeat center`}}
        onClick={props.onClick}
        >
    </button>
    )
} 
