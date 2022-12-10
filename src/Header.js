import logo from './logo.png';


const Header = () => {
    return ( 
        <header className="header">
            <div className='left-header'>
                <img src={logo} width='120px' alt="" />
            </div>
            <div className='right-header'>
                <div><a href="/">Início</a></div>
                <div><a href="/map">Mapa</a></div>
                <div><a href="/search">Consulta</a></div>
            </div>
        </header>
     );
}
 
export default Header;