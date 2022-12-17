import { useEffect, useState } from 'react';
import map from './map.pjpeg';
import styled from 'styled-components';

const Map = () => {

    const markers = [
        {
            left: '620px',
            top: '300px',
            color: '#4A0707',
            id: '16'
        },
        {
            left: '320px',
            top: '390px',
            color: '#4A0707',
            id: '26'
        },
        {
            left: '350px',
            top: '240px',
            color: '#4A0707',
            id: '18'
        },
        {
            left: '150px',
            top: '270px',
            color: '#4A0707',
            id: '19'
        },
        {
            left: '470px',
            top: '210px',
            color: '#4A0707',
            id: '17'
        },
        {
            left: '570px',
            top: '210px',
            color: '#4A0707',
            id: '33'
        },
        {
            left: '550px',
            top: '400px',
            color: '#4A0707',
            id: '24'
        },
        {
            left: '580px',
            top: '150px',
            color: '#4A0707',
            id: '22'
        },
        {
            left: '650px',
            top: '130px',
            color: '#4A0707',
            id: '25'
        },
        {
            left: '725px',
            top: '130px',
            color: '#4A0707',
            id: '31'
        },
        {
            left: '690px',
            top: '160px',
            color: '#4A0707',
            id: '14'
        },
        {
            left: '670px',
            top: '205px',
            color: '#4A0707',
            id: '15'
        },
        {
            left: '800px',
            top: '330px',
            color: '#4A0707',
            id: '8'
        },
        {
            left: '840px',
            top: '370px',
            color: '#4A0707',
            id: '6'
        },
        {
            left: '805px',
            top: '385px',
            color: '#4A0707',
            id: '27'
        },
        {
            left: '890px',
            top: '360px',
            color: '#4A0707',
            id: '5'
        },
        {
            left: '890px',
            top: '330px',
            color: '#4A0707',
            id: '4'
        },
        {
            left: '900px',
            top: '265px',
            color: '#4A0707',
            id: '2'
        },
        {
            left: '880px',
            top: '280px',
            color: '#4A0707',
            id: '3'
        },
        {
            left: '865px',
            top: '300px',
            color: '#4A0707',
            id: '23'
        },
        {
            left: '860px',
            top: '115px',
            color: '#4A0707',
            id: '20'
        },
        {
            left: '757px',
            top: '155px',
            color: '#4A0707',
            id: '11'
        },
        {
            left: '790px',
            top: '180px',
            color: '#4A0707',
            id: '10'
        },
        {
            left: '818px',
            top: '200px',
            color: '#4A0707',
            id: '30'
        },
        {
            left: '770px',
            top: '198px',
            color: '#4A0707',
            id: '29'
        },
        {
            left: '765px',
            top: '218px',
            color: '#4A0707',
            id: '12'
        },
        {
            left: '755px',
            top: '255px',
            color: '#4A0707',
            id: '13'
        },
        {
            left: '790px',
            top: '290px',
            color: '#4A0707',
            id: '9'
        },
        {
            left: '795px',
            top: '240px',
            color: '#4A0707',
            id: '28'
        },
        {
            left: '835px',
            top: '253px',
            color: '#4A0707',
            id: '7'
        },
        {
            left: '843px',
            top: '228px',
            color: '#4A0707',
            id: '1'
        },
        {
            left: '640px',
            top: '320px',
            color: '#4A0707',
            id: '34'
        }
    ]

    const [showPopup, setShowPopup] = useState(false);

    const handlePopup = () => {
        setShowPopup(!showPopup);
    }

    const PopupDiv = styled.div`
        width: 900px;
        height: 500px;
        background-color: white;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        margin-top: calc(50vh - 250px);
        margin-left: calc(50vw - 450px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 20px;
    `
        
    const Background = styled.div`
        width: 150vw;
        height: 150vh;
        background-color: rgba(0, 0, 0, 0.88);
        position: absolute;
        top: 0;
        left: 0;
        margin-left: -50vw;
        margin-top: -25vh;
    `

    const [locality, setLocality] = useState('');
    const [localityIPS, setLocalityIPS] = useState('');
    const [localityPBF, setLocalityPBF] = useState('');
    const [localityViolence, setLocalityViolence] = useState('');
    const [localityPoverty, setLocalityPoverty] = useState('');
    const [localityBairros, setLocalityBairros] = useState('');

    const [localityOpportunity, setLocalityOpportunity] = useState('');
    const [localityNecessities, setLocalityNecessities] = useState('');
    const [localityWelfare, setLocalityWelfare] = useState('');

    const [cityIPS, setCityIPS] = useState(0);
    const [cityPBF, setCityPBF] = useState(0);
    const [cityViolence, setCityViolence] = useState(0);
    const [cityPoverty, setCityPoverty] = useState(0);

    const handleCityLoad = () => {
        var numberBairros = 161;

        var numberZonas = 32;

        fetch('https://seczone-api-hugofolloni.vercel.app/api/ips-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma
            setCityIPS(soma / numberZonas)
        })

        fetch('https://seczone-api-hugofolloni.vercel.app/api/pbf-familias-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma
            setCityPBF(soma / numberBairros)
        })

        fetch('https://seczone-api-hugofolloni.vercel.app/api/pobreza-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma
            setCityPoverty(soma / numberBairros)
        })

        fetch('https://seczone-api-hugofolloni.vercel.app/api/crimes-cidade')
        .then(res => res.json())
        .then(data => {
            const soma = data[0].Soma_Total
            fetch('https://seczone-api-hugofolloni.vercel.app/api/populacao-cidade')
            .then(res => res.json())
            .then(data => {
                const population = data[0].Soma
                setCityViolence(soma * 100 / population)
            })
        })

    }

    useEffect(() => {
        handleCityLoad();
    }, [])


    const openPopup = (id) => {
        handlePopup();

        fetch('https://seczone-api-hugofolloni.vercel.app/api/ips-zona')
        .then(res => res.json())
        .then(data => {
            data.map((zona) => {
                if(zona.ID.toString() === id){
                    const capitalizedName = zona.Nome.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    setLocality(capitalizedName)
                    setLocalityIPS(Number(zona.Conceito_Geral).toFixed(4))
                    return localityIPS;
                }
                return null;
            })  
        })

        fetch('https://seczone-api-hugofolloni.vercel.app/api/crimes-zona')
        .then(res => res.json())
        .then(data => {
            data.map((zona) => {
                if(zona.Zona_ID.toString() === id){
                    const qtde = (Number(zona.Quantidade) * 100)
                    const population = zona.Populacao
                    setLocalityViolence((qtde/population).toFixed(4))
                    return localityViolence;
                }
                return null;
            })  
        }
        )

        
        fetch('https://seczone-api-hugofolloni.vercel.app/api/bairros-por-zona')
        .then(res => res.json())
        .then(data => {
            data.map((zona) => {
                if(zona.ID.toString() === id){
                    const quantidadeBairros = Number(zona.Contagem)
                    setLocalityBairros(quantidadeBairros)

                    fetch('https://seczone-api-hugofolloni.vercel.app/api/pbf-familias-zona')
                    .then(res => res.json())
                    .then(data => {
                        data.map((zona) => {
                            if(zona.Zona_ID.toString() === id){
                                const soma = Number(zona.Familias_com_PBF)
                                setLocalityPBF((parseInt(soma/quantidadeBairros)))
                                return localityPBF;
                            }
                            return null;
                        })  
                    })
            
                    fetch('https://seczone-api-hugofolloni.vercel.app/api/pobreza-zona')
                    .then(res => res.json())
                    .then(data => {
                        data.map((zona) => {
                            if(zona.Zona_ID.toString() === id){
                                const soma = Number(zona.Quantidade)
                                setLocalityPoverty((parseInt(soma/quantidadeBairros)))
                                return localityPoverty;
                            }
                            return null;
                        })  
                    })
                }
                return null;
            })
        })

        fetch('https://seczone-api-hugofolloni.vercel.app/api/zona-detalhada')
        .then(res => res.json())
        .then(data => {
            data.map((zona) => {
                if(zona.ID.toString() === id){
                    setLocalityNecessities(Number(zona.Necessidades_Humanas_Basicas).toFixed(3))
                    setLocalityOpportunity(Number(zona.Oportunidades).toFixed(3))
                    setLocalityWelfare(Number(zona.Fundamentos_Do_Bem_Estar).toFixed(3))
                    return localityNecessities;
                }
                return null;
            })  
        })

    }

    const closePopup = () => {
        handlePopup();
        setLocality('');
        setLocalityIPS('');
        setLocalityPBF('');
        setLocalityViolence('');
        setLocalityPoverty('');
    }
    


    return ( 
        <div className="map">
            <div className="map-div">
                <img src={map} alt="map" />
                {markers.map(marker => (
                    <div className="marker" style={{left: marker.left, top: marker.top, backgroundColor: marker.color}} key={marker.id} onClick={() => openPopup(marker.id)}></div>
                ))}
            </div>
            {showPopup && (
                <div>
                    <Background onClick={() => closePopup()}/>
                        {
                            locality !== '' && localityIPS !==  '' && localityPBF !== '' && localityViolence !== '' && localityPoverty !== '' && cityPoverty !== 0 && cityViolence !== 0 && cityPBF !== 0 && cityIPS !== 0 ? (                              
                                <PopupDiv>

                                <div className="infos-div" style={{padding: '50px 100px'}}>
                                    <div>
                                        <h1>{locality}</h1>
                                    </div>
                                </div>
                                <div className="data-area">
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '250px'}}>
                                        <div className='numbers-div' style={{height: '70px'}}>
                                            <p className="data-p">Fundamentos do Bem Estar: { localityWelfare }</p>
                                            <p className="data-p">Oportunidades: { localityOpportunity }</p>
                                            <p className="data-p">Necessidades Humanas Básicas: { localityNecessities }</p>
                                        </div>
                                        <div className="numbers-div">
                                            <p className="data-p">Índice de Progresso Social: { localityIPS }</p>
                                            <p className="data-p">Taxa de Criminalidade: { localityViolence }</p>
                                            <p className="data-p">Média de Pessoas com Bolsa Família: { localityPBF }</p>
                                            <p className="data-p">Média de Pessoas em Situação de Pobreza: { localityPoverty }</p>
                                        </div>
                                    </div>
                                    <div className="left" style={{width: '300px', marginTop: '80px'}}>

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
                            
                            </PopupDiv>
                            ) : ( <PopupDiv style={{alignItems: 'center', justifyContent: 'center'}}><h1>Carregando...</h1></PopupDiv> )

                        }
                </div>
            )}
            </div>
     );
}
 
export default Map;