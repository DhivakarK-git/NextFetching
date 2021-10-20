import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Grid , Card , CardMedia , TextField ,Container, Typography , CardContent } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import useSWR from 'swr'


const fetcher = url => axios.get(url).then(res => res.data.map((pokemon)=> ({
  ...pokemon,
  image: `/pokemon/${pokemon.name.english
    .toLowerCase()
    .replace(" ", "-")}.jpg`,
})
))

export default function Home() {
  const [query,setQuery] = useState("")
  const { data } = useSWR('/api/search?q='+encodeURI(query), fetcher)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Pokepoke" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{ width: '100vw', height: '100vh', paddingTop: 48}}>
      <Container maxWidth="md">
          <TextField id="outlined-search" label="Search" type="search" fullWidth={ true } value={ query } onChange = { (e)=>setQuery(e.target.value) }/>
      </Container> 
      <div style={{ paddingTop: 24 , paddingBottom: 48 }}>
      {data && 
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {data.map(({id,name,type,image})=>(
            <Grid item xs={12} sm={6} md={4}>
              <Link href={`/pokemon/${name.english}`}>
              <Card sx={{ minWidth: 275}} >
                <CardContent>
                  <div style={{height:300, justifyContent:'center' , display: 'flex', alignItems: 'center',}}>
                  <CardMedia
                    component="img"
                    width='100%'
                    image={image}
                  />
                  </div>
                  <Typography variant="h5" component="div"> 
                    { name.english }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    { type.join(", ") }
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </Grid>))}
          </Grid>
        </Container>
      }
      </div>
    </div>
    </div>
  )
}
