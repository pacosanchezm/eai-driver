import React, { useState, useEffect, useContext, createContext, Suspense } from "react"




/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Textarea, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"

// import Dropbox from "react-select"
// import DropboxCss from "./select"

// import ReactTooltip from "react-tooltip";

var { renderToString, renderToStaticMarkup } = require("react-dom/server");


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const Colores = [
  { value: "Otro", label: "Otro" },
  { value: "Blanco", label: "Blanco" },
  { value: "Negro", label: "Negro" },
  { value: "Gris", label: "Gris" },
  { value: "Rojo", label: "Rojo" },
  { value: "Azul", label: "Azul" },
  { value: "Amarillo", label: "Amarillo" },
  { value: "Verde", label: "Verde" },
  { value: "Cafe", label: "Cafe" },
];



const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Extended: useState(useContext(createContext(false))),
    MarcaLocal: useState(useContext(createContext(""))),
    EditMedio: useState(useContext(createContext(false))),

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


const Body = props => {
  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = props.useContext.Loading.DataMain
  const [PedidoData, setPedidoData] = props.useContext.PedidoData

  const [EntregasData, setEntregasData] = props.useContext.EntregasData




  const [Extend, setExtend] = props.useContext.Extend.Deliver
  const Images = props.useContext.Images

  const [Marca, setMarca] = props.marca
  const [Color, setColor] = props.useContext.Location.Color
  const [Obv, setObv] = props.useContext.Location.Obv
  const [Share, setShare] = props.useContext.Location.Share
  const [LocationProceso, setLocationProceso] = props.useContext.Location.Proceso
  // const [MarcaLocal, setMarcaLocal] = props.useContext.MarcaLocal
  const [EditMedio, setEditMedio] = useContext(StateContext).EditMedio



const Tooltip1  = () => {

  return (
    <div 
    css={{ maxWidth: "350px", minWidth: "200px" }}
    >
      <Flex sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Text sx={{color: "white", fontSize:2}}>Compartir Ubicación: </Text>
        </Box>
      </Flex>

      <Flex sx={{ width: "100%" }}>
      <Box sx={{ width: "5%" }}/>
        <Box sx={{ width: "90%" }}>
          <Text sx={{color: "white", fontSize:1}}>
            Selecciona "Compartir Ubicación" y después autoriza compartir tu ubicacaión para que podamos saber cuando vas llegando por tu pedido.
          </Text>
        </Box>
      </Flex>


      <Flex sx={{ width: "100%" }}>
      <Box sx={{ width: "5%" }}/>
        <Box sx={{ width: "90%" }}>
          <Text sx={{color: "white", fontSize:1}}>
            Mantén lo más posible esta pantalla activa en tu teléfono para poder tomar tu ubicación.
          </Text>
        </Box>
      </Flex>

      <Flex sx={{ width: "100%" }}>
      <Box sx={{ width: "5%" }}/>
        <Box sx={{ width: "90%" }}>
          <Text sx={{color: "white", fontSize:1}}>
            Solo recibiremos tu ubicación mientras tengas esta pantalla abierta y el botón activado. Una vez que cierres esta ventana no recibiremos tu ubicación.
          </Text>
        </Box>
      </Flex>

    </div>



  )
}

// --------------------



// ----------------------------------

const ModuloSlim  = () => {
  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "21px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>
              <Text sx={Estilo.d1sb}>Entrega:  
              </Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(true)
                }}
              >
                <Image  src={Images.Flechad[0].src} />
              </Button>
            </Box>
          </Flex>

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------





const ModuloSimple  = () => {

  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "27px", borderBottomStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "0px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>
              <Text sx={Estilo.d1sb}>Entrega: </Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(false)
                }}
              >
                <Image  src={Images.Flechau[0].src} />
              </Button>
            </Box>
          </Flex>



          <Flex sx={{ width: "100%", pl: 3, pr:3 }}>
            <Box sx={{ width: "100%" }}>



          {/* <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%", mr:2 }}>
              <Text sx={Estilo.t3s}> ¿Qué modelo es tu auto?</Text>
            </Box>

            <Box sx={{ width: "50%", mr:2 }}>
              <Input
                {...props.useAcciones.useChangeArray(EntregasData, "Marca", setEntregasData, setEditMedio)}
                onBlur={async e => {
                  if (EditMedio) {
                    try {
                      let up = props.useAcciones.upMedio({
                        Id: EntregasData.Id,
                        Marca: EntregasData.Marca,
                        Color: EntregasData.Color,
                        ReferenciaMedio: EntregasData.ReferenciaMedio,
                      })
                      if (up) {setEditMedio(false)}
                    } catch (err) {console.error(err)}
                  }
                }}
              />
            </Box>
          </Flex>

          <Box css={{ height: 5 }} /> */}

          {/* <Flex>
            <Box sx={{ width: "50%", mr:2 }}>
              <Text sx={Estilo.t3s}> ¿Qué color?</Text>
            </Box>

            <Box sx={{ width: "50%" }}>
                <Dropbox
                  name="Color"
                  isSearchable={false}
                  styles={DropboxCss.filtro2}
                  value={{
                    value: EntregasData.Color,
                    label: EntregasData.Color
                  }}
                  options={Colores}
                  onChange={async e => {
                    setEntregasData({ ...EntregasData, "Color": e.value });
                    setEditMedio(true)
                  }}

                  onBlur={async e => {
                    if (EditMedio) {
                      try {
                        let up = props.useAcciones.upMedio({
                          Id: EntregasData.Id,
                          Marca: EntregasData.Marca,
                          Color: EntregasData.Color,
                          ReferenciaMedio: EntregasData.ReferenciaMedio,
                        })
                        if (up) {setEditMedio(false)}
                      } catch (err) {console.error(err)}
                    }
                  }}
                />
            </Box>


          </Flex> */}




          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%", mr:2 }}>
              <Text sx={Estilo.h2}>Comparte tu ubicación</Text>
            </Box>

            {/* <Box sx={{ width: "10%", mr:2 }}>
              <Image  src={Images.Ayuda[0].src}
                data-tip={renderToStaticMarkup(Tooltip1())}
                data-for='Tooltip1' 
                width='25' height='25'
                data-html={true}
                pt={3}
              />

              <ReactTooltip
                id='Tooltip1'
                place="top"
                type="info"
                effect="solid"
                html={true}
              />
            </Box> */}



            <Box sx={{ width: "50%", mr:2 }}>


            </Box>
          </Flex>

          <Flex sx={{ width: "100%", bg: Color }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={Share ? "green":"#A52A2A"}
              Disabled={false}
              onClick={ async () => {
                await setShare(!Share)
                if(!Share) {props.useAcciones.addPosition()}
              }}
            >
              {Share ? "Compartiendo": "Compartir Ubicación"}
            </Button>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", mr:2 }}>
              <Text sx={Estilo.h2}>o indica cómo vas</Text>
            </Box>

          </Flex>

          <Flex sx={{ width: "100%", bg: Color }}>

            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===1 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(1)
                props.useAcciones.addProceso({
                  Proceso: "RutaTogo",
                  Obv: "El repartidor marcó que está en camino"
                })


              }}
            >
              En Camino
            </Button>



            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===2 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(2)
                props.useAcciones.addProceso({
                  Proceso: "Llegando",
                  Obv: "El repartidor marcó que está llegando"
                })
              }}
            >
              Llegando
            </Button>



            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===3 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(3)
                props.useAcciones.addProceso({
                  Proceso: "EnEspera",
                  Obv: "El repartidor marcó que está esperando"
                })
              }}
            >
              Esperando
            </Button>



            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===4 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(4)
                props.useAcciones.addProceso({
                  Proceso: "Entregado",
                  Obv: "El repartidor marcó que ha entregado el pedido"
                })
              }}
            >
              Entregado
            </Button>







          </Flex>



          <Text sx={Estilo.h2}>Referencia:</Text>

          <Flex>
            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Textarea
                  rows={3}
                  {...props.useAcciones.useChangeArray(EntregasData, "ReferenciaMedio", setEntregasData, setEditMedio)}
                  onBlur={async e => {
                    if (EditMedio) {
                      try {
                        let up = props.useAcciones.upMedio({
                          Id: EntregasData.Id,
                          Marca: EntregasData.Marca,
                          Color: EntregasData.Color,
                          ReferenciaMedio: EntregasData.ReferenciaMedio,
                        })
                        if (up) {setEditMedio(false)}
                      } catch (err) {console.error(err)}
                    }
                  }}                
                />
              </Box>
            </Flex>
          </Flex>



          </Box>
        </Flex>

        <Box css={{ height: 5 }} />

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------

  try {

    return (
      <Grid sx={{p:0, m: 0, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            {(props.useStatus.deliver()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.deliver()===1 & !Extend) ? ModuloSlim() : <div/>}

          </div>
        }

      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>
          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------
