import Head from 'next/head'
import Image from 'next/image'
import pokemon from "../../pokemon.json" 
import { Grid , Container , Typography} from '@mui/material';

export async function getStaticPaths() {
    return {
      paths:pokemon.map(({name:{english}})=>({
          params:{
              name:english
          }
      })),
      fallback: false}
  }

export async function getStaticProps(context) {
return {
    props: {
        data:pokemon.filter(
            ({ name: { english } }) => english === context.params.name
          )[0]
    }, // will be passed to the page component as props
}
}

const Name = ({data}) => {
    return ( 
        <div key={data.id}>
        <Head>
        <title>{(data && "Pokemon | " + data.name.english) || "Pokemon"}</title>
        <meta name="description" content= {(data && "Pokemon | " + data.name.english) || "Pokemon Details"} />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        {data && 
        <div style={{ width: '100vw', height: '100vh', paddingTop: 48}}>
        <Container maxWidth="md">
        <Grid container spacing={8}>
            
            <Grid item xs={12}>
                <Grid item xs={4}>
                    <Typography variant="h4" component="div" align="center"> 
                        { data.name.english }
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={4}>
            <Image src= {`/pokemon/${data.name.english.toLowerCase().replace(" ", "-")}.jpg`}
            width="100%"
            height="100%"
            alt={data.name.english}
            layout="responsive" />
            </Grid>
            
            <Grid item xs={8}>
            {Object.entries(data.name).map(([key,value])=>(
                <Grid key={data.id} container spacing={8}>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 14 , fontWeight: 700}} gutterBottom>
                            {key}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ fontSize: 14 , fontWeight: 400 }} gutterBottom>
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
            
            <div style={{paddingTop:16}}>
            <Typography variant="body1" component="div"> 
                Type - { data.type.join(", ") }
            </Typography>
            </div>
            <div style={{paddingTop:16}}>
            {Object.entries(data.base).map(([key,value])=>(
                <Grid key={data.id} container spacing={8}>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 14 , fontWeight: 700}} gutterBottom>
                            {key}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ fontSize: 14 , fontWeight: 400 }} gutterBottom>
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
            </div>
            </Grid>
        </Grid>
        </Container>
        </div>
        }   
        </div>
     );
}
 
export default Name;