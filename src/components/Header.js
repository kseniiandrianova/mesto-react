import logo from '../images/logo.svg';

export default function Header() {
    return (
        <header className="header">
                <img className="logo" src={logo} alt="Mesto" />
            </header>
    )
}