import React, { Component } from 'react';
import './App.css';
import  Stripi  from "strapi-sdk-javascript/build/main"
import {Link} from 'react-router-dom'
import {Container, Box, Heading,Card,Image,Text,SearchField,Icon} from 'gestalt'
const Api_Url = process.env.API_URL || 'http://localhost:1337/'
const strapi = new Stripi(Api_Url)


class App extends Component {
  state ={
    brands :[

    ]
  }

  async componentDidMount() {
    try {
      const {data} = await strapi.request('POST','graphql',{
        data:{
          query: `query{
            brands{
              id,
              Name,
              Description
              Image {
                name,
                url
              }
            }
          }`
        }
      })
     console.log(data)
     this.setState({brands : data.brands})
    
    } catch (error) {
       console.log(" add error occured")
    }   
  }

  render() {
    const brands  = this.state.brands
    return (
       <Container >
         <SearchField />
      {  /* The container */}
      <Box  display="flex"  justifyContent="center" marginBottom={2}  >

        {/*  The heading */}
        <Heading color ="midnight" size="md" >
          Free Beer
         </Heading>
       </Box>

      {/* brands */}
       <Box 
       dangerouslySetInlineStyle ={{
        __style :{
          backgroundColor: '#d6c8ec'
        }
       }}
       wrap  shape="rounded" margin={5} display="flex" justifyContent="around" >
           {
              brands.map( ( (brand,i) =>(
                <Box paddingY={4}  width={200}  key={i}>
                  <Card
                  image = {
                    <Box height={200} width={200}>
                        <Image
                        fit="cover"
                        alt="brand"
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${Api_Url}${brand.Image.url}`}
                        />
                    </Box>
                  }
                  >
                    <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                     direction="column"
                    >
                       <Text bold size="xl"> {brand.Name}</Text>
                       <Text> {brand.Description}</Text>
                       <Text bold size="xl"> 
                         <Link to={`${brand.id}`} > See more info</Link>
                       </Text>
                    </Box>
                  </Card>
              </Box>
                )))
           }    
         </Box>
       </Container>
    );
  }
}

export default App;
