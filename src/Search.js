import {useState, useEffect} from 'react'

const Search = () => {

    const [locality, setLocality] = useState(null);
    const [locationMessage, setLocationMessage] = useState("Baseado na sua localização");
    const [region, setRegion] = useState(null);

    const [localityIPS, setLocalityIPS] = useState(null);
    const [localityViolence, setLocalityViolence] = useState(null);
    const [localityPBF, setLocalityPBF] = useState(null);
    const [localityPoverty, setLocalityPoverty] = useState(null);

    const [cityIPS, setCityIPS] = useState(null);
    const [cityViolence, setCityViolence] = useState(null);
    const [cityPBF, setCityPBF] = useState(null);
    const [cityPoverty, setCityPoverty] = useState(null);
    

    const handleZoneChange = (locality) => {
        var insideZone = null
        fetch('http://localhost:4000/api/bairros-zonas')
        .then(res => res.json())
        .then(data => {
            data.map((bairro) => {
                if(bairro.Bairro.trim() === locality){
                    const nome = bairro.Zona.toLowerCase()
                    const capitalizedName = nome.charAt(0).toUpperCase() + nome.slice(1)
                    setRegion(capitalizedName)
                    insideZone = bairro.Zona;
                    return capitalizedName;
                }
                return bairro.Zona;
            })  
        
        })
        .then(() => handleLocationChange(locality, insideZone))
    }

    const handleLocationChange = (locality, zone) => {
         fetch('http://localhost:4000/api/ips-zona')
        .then(res => res.json())
        .then(data => {
                data.map((zona) => {
                    if(zona.Nome === zone){
                        setLocalityIPS(Number(zona.Conceito_Geral).toFixed(4))
                        return localityIPS;
                    }
                    return localityIPS;
                })  
            })

        fetch('http://localhost:4000/api/pbf-familias-bairro')
        .then(res => res.json())
        .then(data => {
            data.map((bairro) => {
                if(bairro.Bairro.trim() === locality){
                    setLocalityPBF(bairro.Familias_com_PBF)
                    return localityPBF;
                }
                return localityPBF;
            })  
        })

        fetch('http://localhost:4000/api/pobreza-bairro')
        .then(res => res.json())
        .then(data => {
            data.map((bairro) => {
                if(bairro.Nome.trim() === locality){
                    setLocalityPoverty(bairro.Quantidade)
                    return localityPoverty;
                }
                return localityPoverty;
            })  
            
        })

        fetch('http://localhost:4000/api/crimes-zona')
        .then(res => res.json())
        .then(data => {
            data.map((zona) => {
                if(zona.Nome === zone){
                    const qtde = (Number(zona.Quantidade) * 100)
                    const population = zona.Populacao
                    setLocalityViolence((qtde/population).toFixed(4))
                    return localityViolence;
                }
                return localityViolence;
            })  
        })

    }

    const handleCityLoad = () => {
        var numberBairros = 161;
        var numberZonas = 32;
     
        fetch('http://localhost:4000/api/ips-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma
            setCityIPS(soma / numberZonas)
        })

        fetch('http://localhost:4000/api/pbf-familias-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma
            setCityPBF(soma / numberBairros)
        })

        fetch('http://localhost:4000/api/pobreza-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma
            console.log(soma / numberBairros)
            setCityPoverty(soma / numberBairros)
        })

        fetch('http://localhost:4000/api/crimes-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma_Total
            fetch('http://localhost:4000/api/populacao-cidade')
            .then(res => res.json())
            .then(data => {
                const population = data[0].Soma
                console.log(soma, population)
                setCityViolence(soma * 100 / population)
            })
        })

    }

    useEffect(() => {
        var geolocation = []
        navigator.geolocation.getCurrentPosition((position) => {
            geolocation.push(position.coords.latitude)
            geolocation.push(position.coords.longitude)
            console.log(geolocation)
        })

        handleCityLoad()

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${geolocation[0]}&longitude=${geolocation[1]}&localityLanguage=pt`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setLocality(data.locality)
            handleZoneChange(data.locality)
        })
    }, [])

    const [searchLocation, setSearchLocation] = useState(null);

    const handleSearch = (e) => {
        if(e.key === "Enter"){
            setLocalityPBF('')
            setLocalityPoverty('')
            setLocalityIPS('')
            setLocalityViolence('')
            setLocality(searchLocation)
            setLocationMessage("Pesquisa por")
            handleZoneChange(searchLocation)
        }
    }

    return ( 
        <div className="search">
            <div className="container">
                <div className="infos-div">
                    <input className='location-input' type="text" placeholder="Pesquisar localidade" onChange={(e) => setSearchLocation(e.target.value)} onKeyDown={(e) => handleSearch(e)}/>
                    <div>
                        <p className='access-p'>{locationMessage}</p>
                        <h1>{locality}</h1>
                        <h4>Zona Administrativa: {region}</h4>
                    </div>
                </div>

                <div className="data-area">
                    <div className='numbers-div'>
                        <p className="data-p">Índice de Progresso Social: { localityIPS }</p>
                        <p className="data-p">Criminalidade: {localityViolence}</p>
                        <p className="data-p">Pessoas com Bolsa Família: {localityPBF}</p>
                        <p className="data-p">Pessoas em Situação de Pobreza: {localityPoverty}</p>
                    </div>
                    <div className="left">

                        <div className="bars-area">
                            <div className="bars-div">
                                    <div className="bars-comparision-div">
                                        <div className='bar' style={{height: `${localityIPS}px`, backgroundColor: '#4A0707'}}></div>
                                        <div className='bar' style={{height: `${cityIPS}px`, backgroundColor: '#070C3E' }}></div>
                                    </div>
                                <p>IPS</p>
                            </div>
                            <div className="bars-div">
                                <div className="bars-comparision-div">
                                    <div className='bar' style={{height: `${localityViolence * 5}px`, backgroundColor: '#4A0707'}}></div>
                                    <div className='bar' style={{height: `${cityViolence * 5}px`, backgroundColor: '#070C3E' }}></div>
                                </div>
                                <p>Criminalidade</p>
                            </div>
                            <div className="bars-div">
                                <div className="bars-comparision-div">
                                    <div className='bar' style={{height: `${localityPBF * 0.01}px`, backgroundColor: '#4A0707'}}></div>
                                    <div className='bar' style={{height: `${cityPBF * 0.01}px`, backgroundColor: '#070C3E' }}></div>
                                </div>
                                <p>PBF</p>
                            </div>
                            <div className="bars-div">
                                <div className="bars-comparision-div">
                                    <div className='bar' style={{height: `${localityPoverty * 0.01}px`, backgroundColor: '#4A0707'}}></div>
                                    <div className='bar' style={{height: `${cityPoverty * 0.01}px`, backgroundColor: '#070C3E' }}></div>
                                </div>
                                <p>Pobreza</p>
                            </div>
                        </div>
                        <div className="legenda">
                            <div className="legenda-div">
                                <div className="legenda-color" style={{ backgroundColor: '#4A0707'}}></div>
                                <p>{locality}</p>
                            </div>
                            <div className="legenda-div">
                                <div className="legenda-color" style={{ backgroundColor: '#070C3E'}}></div>
                                <p>Cidade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Search;

<div className="container"></div>