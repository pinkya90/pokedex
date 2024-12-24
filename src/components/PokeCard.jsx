import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard from "./TypeCard"

export default function PokeCard(props) {
    const { selectedPokemon } = props

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const { name, height, abilities, types, stats, moves, sprites } = data || {}
    const imgList =Object.keys(sprites ||{}).filter(val=>{
        if(!sprites[val]){return false}
        if(['versions','other'].includes(val)) {return false}
            return true 
    })

    useEffect(() => {

        //if loading,exit logic
        if (loading || !localStorage) { return }

        //check if the selected pokemon information is available  in the cache
        // 1. define the cache 

        let Cache = {}
        if (localStorage.getItem('pokedex')) {
            Cache == JSON.parse(localStorage.getItem('pokedex'))
        }

        //2. check if the selected pokemon is in the cache , otherwise fetch the data from the api 

        if (selectedPokemon in Cache) {
            // read data from the cache
            setData(Cache[selectedPokemon])
            return
        }
        // we passed all the cache stuff to no avail and now we need to fetch the data from api

        async function fetchPokemonData() {
            setLoading(true)
            try {

                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                console.log(selectedPokemon)
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)
                Cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(Cache))
            }
            catch (err) {
                console.log(err.message)
            }
            finally {
                setLoading(false)
            }
        }

        // if we fetch from the api make sure to save the information in the cache for the next time 
        fetchPokemonData()

    }, [selectedPokemon])
    if (loading || !data) {
        return (
            <div>
                <h4>loading....</h4>
            </div>
        )
    }

    return (
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div >
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj ?. type?.name} />
                    )
                }
                )}

            </div>
            <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon)+'.png'} alt={'${name}-large-img'}/>
            <div className="img-container">
                {imgList.map((spriteUrl, spriteIndex)=>{
                    const imgUrl=sprites[spriteUrl]
                    return(
                        <img key={spriteIndex} src={imgUrl} alt={"${name}-img-${spriteUrl}"}/>
                    )
                })}
            </div>
            <h3>stats</h3>
            <div className="stats-card">
                {stats.map((statObj,statIndex)=>{
                    const{stat,base_stat}=statObj   
                    return(
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name.replaceAll('-','')}</p>
                            <h4>{base_stat}</h4>
                            </div>
                    )
                })}
                

            </div>
        </div>
    )
}