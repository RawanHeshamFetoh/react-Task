import { useEffect , useState } from "react"
import { useParams  } from "react-router-dom"
import { fetchActorDetails } from "../../Controller/MovieController"
import { Card , CardContent ,CardMedia ,Container, Typography ,Button } from "@mui/material"
import { Link } from "react-router-dom"
import loadingImg from "../../Assets/Loading-pana.svg"
import ErrorImg from "../../Assets/404 error with people holding the numbers-rafiki.svg"
import HelpComponents from "../../Components/HelpingComponent"
import { DetailsPage } from "../../Components/DetaildCard"
export function ActorDetailsPage(){
    const [actor, setActor] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const {id} =useParams()
    useEffect(()=>{
        const fetchDetails =async()=>{
            try{
                const data = await fetchActorDetails(id)
                setActor(data)
                setLoading(false)
            }catch(e){
                console.log(e);
                setLoading(false)
                setError(true)
                throw e
            
            }
        }
        fetchDetails()
    },[id])
    if(loading){
        return <HelpComponents srcimg={loadingImg} text={"please wait"} altText={"wait img"}/>
    }
    if(error){
        <HelpComponents srcimg={ErrorImg} text={"error"} altText={"error img"}/>
    }
    return (
        
        <div className="details-center">
            <DetailsPage item={{ ...actor , img:`https://image.tmdb.org/t/p/w500${actor.profile_path}`}} home="/actors"/>
        </div>
    )
}