import { Image } from "../../components/image";
import { Title } from "../../components/title";
import Logo from '../../assets/Logo1.png';
import './Layout.css';

export function Layout () {
    return (
        <div className='navbar navbar-light row mb-1 layout' style={{ backgroundColor: 'lightblue' }}>
            <div>
                <Image 
                    source={Logo}
                    class="logo nav-item"
                    alt="logo" />
                <Title 
                    text="BillsApp"
                    class="col-12 mr-5 text-light nav-item"
                 />
            </div>
        </div>
    )
}