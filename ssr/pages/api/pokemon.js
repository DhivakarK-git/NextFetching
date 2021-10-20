import pokemon from "../../pokemon.json" 

const Pokemon = (req,res) => {
    if (!req.query.name){
        res.statusCode=400
        res.end("Must Have A Name")
    }
    else{
        const found = pokemon.filter(
            ({ name: { english } }) => english === req.query.name
          )
        if(found.length === 0){
            res.statusCode=404
            res.end("Resource Not Found")
        }
        else{
        res.statusCode=200
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(found[0]))
            }
    }
}
 
export default Pokemon;