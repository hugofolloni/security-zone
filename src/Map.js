import { useEffect, useState } from 'react';
import map from './map.pjpeg';
import styled from 'styled-components';

const Map = () => {

    const markers = [
        {
            left: '620px',
            top: '300px',
            color: 'red',
            id: '16'
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

    const [cityIPS, setCityIPS] = useState(0);
    const [cityPBF, setCityPBF] = useState(0);
    const [cityViolence, setCityViolence] = useState(0);
    const [cityPoverty, setCityPoverty] = useState(0);
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
            setCityPoverty(soma / numberBairros)
        })
    }

    useEffect(() => {
        handleCityLoad();
    }, [])


    const openPopup = (id) => {
        handlePopup();

        console.log(id)

        fetch('http://localhost:4000/api/ips-zona')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.map((zona) => {
                if(zona.ID.toString() === id){
                    const nome = zona.Nome.toLowerCase()
                    setLocality(nome.charAt(0).toUpperCase() + nome.slice(1))
                    setLocalityIPS(Number(zona.Conceito_Geral).toFixed(4))
                    console.log(zona.Nome)
                    return localityIPS;
                }
                return null;
            })  
        })

        fetch('http://localhost:4000/api/pbf-familias-zona')
        .then(res => res.json())
        .then(data => {
            data.map((zona) => {
                if(zona.ID.toString() === id){
                    setLocalityPBF(zona.Pessoas_com_Bolsa_Familia)
                    return localityPBF;
                }
                return null;
            })  
        })


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
                    <Background onClick={() => handlePopup()}/>
                    <PopupDiv>
                    <div className="infos-div">
                    <div>
                        <h1>{locality}</h1>
                    </div>
                </div>

                <div className="data-area">
                    <div className='numbers-div'>
                        <p className="data-p">Índice de Progresso Social: { localityIPS }</p>
                        <p className="data-p">Taxa de Criminalidade: {}</p>
                        {/* <p className="data-p">Pessoas com Bolsa Família: {localityPBF}</p> */}
                        {/* <p className="data-p">Pessoas em Situação de Pobreza: {localityPoverty}</p> */}
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
                                    <div className='bar' style={{height: `${10}px`, backgroundColor: '#4A0707'}}></div>
                                    <div className='bar' style={{height: `${1* 5}px`, backgroundColor: '#070C3E' }}></div>
                                </div>
                                <p>Violencia</p>
                            </div>
                            <div className="bars-div">
                                <div className="bars-comparision-div">
                                    <div className='bar' style={{height: `${localityPBF * 0.01}px`, backgroundColor: '#4A0707'}}></div>
                                    <div className='bar' style={{height: `${cityPBF * 0.01}px`, backgroundColor: '#070C3E' }}></div>
                                </div>
                                <p>PBF</p>
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
                </div>
            )}
        </div>
     );
}
 
export default Map;