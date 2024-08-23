import { useEffect , useState } from "react"
import { useParams  } from "react-router-dom"
import { fetchMoiveDetails } from "../../Controller/MovieController"
import { Card , CardContent ,CardMedia ,Container, Typography ,Button } from "@mui/material"
import { Link } from "react-router-dom"
import HelpComponents from "../../Components/HelpingComponent"
import loadingImg from "../../Assets/Loading-pana.svg"
import ErrorImg from "../../Assets/404 error with people holding the numbers-rafiki.svg"
import { DetailsPage } from "../../Components/DetaildCard"

export function MovieDetailsPage(){
    const [movie, setMovie] = useState({})
    const {id} =useParams()
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState(false)
    
    useEffect(()=>{
        const fetchDetails =async()=>{
            try{
                const data = await fetchMoiveDetails(id)
                setMovie(data)
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

        <DetailsPage item={movie} home="/" />
        </div>
    )
}