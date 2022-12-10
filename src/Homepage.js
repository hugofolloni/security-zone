import image from './image.svg';
const Homepage = () => {
    return ( 
        <div className="homepage" style={{ppsition: 'relative'}}>
            <div className="container" style={{padding: '50px', width: '900px', height: '300px', marginTop: '30px'}}>
                <p style={{fontSize: '18px'}}>
                    O Security Zone é um site feito para análises geográficas sobre população, segurança e desenvolvimento social. Utilizando dados de fontes oficiais do governo, traçamos estatíticas e fornecemos informações sobre índices de criminalidade por Região Administrativa da cidade do Rio de Janeiro e dados socioeconômicos da população residente dos bairros do município. A visualização dessas informações pode ser feita através da navegação em um mapa ou no setor de consulta. 
                </p>
                <p>
                    Os dados foram retirados do CECAD, ISP e DataRio. Todas as tabelas selecionados dizem respeito ao ano de 2020.
                </p>
            </div>
            <img src={image} alt="" style={{position: 'absolute', width: '300px', right: '20px', bottom: '10px'}}/>
        </div>
     );
}
 
export default Homepage;