const Header = () => {
    return ( 
        <header className="header">
            <div className='left-header'>
                <h1>SecZone</h1>
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