import React, {useEffect, useState} from "react";

const Weather = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Punjab");
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchApi = () => {
            setLoading(true)
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=007958288357c8f23f591bfc21f2dbc0`
            fetch(url).then(response => {
                setLoading(false)
                if (response.status >= 400) {
                    return undefined;
                }
                return response.json();
            }).then(res => {
                setCity(res)
            })

        };
        fetchApi();
    }, [search])
    return <div>
        <div className="box">
            <div><input
                type="search"
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
            />
            </div>
            {
                loading && <div>
                    Searching...
                </div>
            }
            {
                !loading && !city && <div>
                    Not found
                </div>
            }
            {
                !loading && city &&
                <div>
                    <div className='info'>
                        <h1><i className="fa fa-street-view "/>{search}</h1>
                    </div>
                    <div>
                        <div className="wave"/>
                        <div className="wave-two"/>
                        <div className="wave-three"/>
                        <h2>{city && city.main && city.main.temp} Celsius </h2>
                        <h3> Max :{city.main.temp}Cel - Min :{city.main.temp} Cel</h3>
                    </div>
                </div>
            }
        </div>
    </div>
}
export default Weather;