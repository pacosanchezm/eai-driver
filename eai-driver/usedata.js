import axios from "axios"
//import moment from "moment"

// ------------------------------------------------------------------

 let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
// let graphqlserver = "https://smxai.net/graphqleai2"


let usedata = function(StateContextM) {

  return {
    Pedidos: function() {
      return {
        get: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query PedidoResumenSuma($Query: PedidoInput){
                  Pedidos{
                    Consultas{
                      PedidoResumenSuma(Query: $Query ){
                        Id
                        Fecha
                        Cuenta
                        Sucursal
                        SucursalDesc
                        Cliente
                        Nombre
                        Apellido
                        Telefono
                        Status
                        Monto
                        Pagado
                        TipoEntrega
                        Confirmado
                        Atendido
                        Enviado
                        Entregado
                        Proceso
                        ProcesoObv
                        Obv
                        ConsumosMonto
                        ConsumosCuenta
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Codigo: String(e.Codigo),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoResumenSuma

          if (axdataRes) {return axdataRes} else {return 0}
        },



        upProceso : async function(e) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upPedido ($Query: PedidoInput ) {
                  PedidosM {
                    Registro {
                      UpdateProceso (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Number(e.Id),
                  Proceso: e.Proceso,
                  ProcesoObv: e.ProcesoObv
                }
              }
            }
          });
    
          if (axdata.data) {return 1} else return 0
    
        },




        LocationsGet : async function (e) {  
            try{
              var axdata = await axios({
                url: graphqlserver,
                method: "post",
                data: {
                  query: `
                    query PedidosLocation($Query: PedidoLocationInput) {
                      PedidosLocations {
                        Consultas{
                          BaseMax(Query: $Query){
                            Id
                            Status
                            Origen
                            Fecha
                            Distancia
                            Tiempo
                            Marca
                            Color
                            Obv
                          }
                        }
                      }
                    }
                  `,
                  variables: {
                    Query: {
                      Pedido: Number(e.Pedido)
                    }
                  }
                }
              });
          
              let axdataRes = axdata.data.data.PedidosLocations.Consultas.BaseMax;
              //console.log(axdataRes)
              if (axdataRes) {return axdataRes}
                else { return 0}
  
            } catch (e) {console.error(e)
              return 0
            }
          },
  











      }
    },


    Consumos: function() {
      return {

        get2: async function(MiPedido) {
          try {
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query ConsumosResumen($Query: ConsumoInput) {
                    Consumos {
                      Consultas {
                        Resumen1(Query: $Query){
                          Pedido
                          Id
                          Fecha
                          Producto
                          ProductosTitulo
                          ProductosFoto
                          Precio
                          PrecioObv
                          Descuento
                          Cantidad
                          Importe
                          ConsumosExtrasImporte
                          ConsumoTotal
                          Obv
                          Proceso
                          ProcesoObv
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: { Pedido: MiPedido }
                }
              }
            });

             if (axdata.data.data.Consumos.Consultas.Resumen1) {
               return axdata.data.data.Consumos.Consultas.Resumen1
              } else return 0

          } catch (e) {console.error(e)}
        }, // ----get



      }
    },


    Location: function() {
      return {
        insert : async function(e) {
          console.log(e)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation LocationInsert ($Query: PedidoLocationInput ) {
                PedidosLocationsM {
                  Registro {
                    Insert (Query: $Query)
                  }
                }
              }         
              `,
              variables: {
                Query: {
                  "Pedido": Number(e.Pedido),
                  "LocLat": Number(e.LocLat),
                  "LocLong": Number(e.LocLong),
                  "Accuracy": Number(e.Accuracy),
                  Marca: e.Marca,
                  Color: e.Color,
                  Obv: e.Obv
                 // Fecha: e.Fecha,
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.PedidosLocationsM.Registro.Insert;
      
          if (axdataRes) {return axdataRes} else { return 0}
        },

      };
    }, // ------- Location





    Entregas: function() {
      return {
        get: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              query PedidosEntregasBase($Query: PedidoEntregaInput){
                PedidosEntregas{
                  Consultas{
                    Base(Query: $Query ){
                      Id
                      Pedido
                      Status
                      Fecha
                      Repartidor
                      LocLong
                      LocLat
                      Accuracy
                      Titulo
                      Domicilio
                      Colonia
                      Ciudad
                      Estado
                      Pais
                      Cp
                      Referencia
                      Marca
                      Color
                      ReferenciaMedio
                      Obv
                    }
                  }
                }
              }
               `,
              variables: {
                Query: {
                  Pedido: Number(e.Id),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosEntregas.Consultas.Base
          console.log({axdataRes})

          if (axdataRes) {return axdataRes} else {return 0}
        },


        upDomicilio : async function(e) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upDom ($Query: PedidoEntregaInput ) {
                  PedidosEntregasM {
                    Registro {
                      UpdateDom (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Number(e.Id),
                  Titulo: e.Titulo,
                  Domicilio: e.Domicilio,
                  Colonia: e.Colonia,
                  Ciudad: e.Ciudad,
                  Cp: Number(e.Cp),
                  Referencia: e.Referencia,
                  Obv: e.Obv
                }
              }
            }
          });
    
          if (axdata.data.data) { return 1 } else {return 0}
          
        },


        upMedio : async function(e) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upDom ($Query: PedidoEntregaInput ) {
                  PedidosEntregasM {
                    Registro {
                      UpdateMedio (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Number(e.Id),
                  Marca: e.Marca,
                  Color: e.Color,
                  ReferenciaMedio: e.ReferenciaMedio,
                }
              }
            }
          });
    
          if (axdata.data.data) { return 1 } else {return 0}
          
        },


      };
    }, // ------- Entregas








    Procesos: function() {
      return {
        getActivo: async function(e) {
         console.log({e})
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              query PedidosProcesosMax($Query: PedidoProcesoInput){
                PedidosProcesos{
                  Consultas{
                    BaseMax(Query: $Query ){
                      Id
                      Pedido
                      Fecha
                      Proceso
                      Status
                      Origen
                      Califica
                      CalificaObv
                      Obv
                    }
                  }
                }
              }
               `,
              variables: {
                Query: {
                  Pedido: Number(e.Pedido),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosProcesos.Consultas.BaseMax
          console.log({axdataRes})

          if (axdataRes) {return axdataRes} else {return 0}
        },



        Insert : async function(e) {
          console.log(e)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation ProcesoInsert ($Query: PedidoProcesoInput ) {
                PedidosProcesosM {
                  Registro {
                    Insert (Query: $Query)
                  }
                }
              }         
              `,
              variables: {
                Query: {

                  Pedido: Number(e.Pedido),
                  Status: e.Status,
                  Origen: e.Origen,
                  Proceso: e.Proceso,
                  Califica: Number(e.Califica),
                  CalificaObv: e.CalificaObv,
                  Obv: e.Obv,
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.PedidosProcesosM.Registro.Insert;
      
          if (axdataRes) {return axdataRes} else { return 0}
        },

















      };
    }, // ------- Procesos



















    Pagos: function() {
      return {



        Stripe3: async (e) => {
         // console.log("PayStripe: " + JSON.stringify(token));
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation PagoToken ($PayIntent: StripePaymentIntent) {
                PagosM  {
                  Registro {
                    Pagar (Query: $PayIntent)
                  }
                }
              }
            `,
              variables: {
                PayIntent: {
                  Id: Number(e.Pedido),
                  Cart: e.Sucursal,
                  Token: 1234,
                  SToken: e.Token.token.id,
                  Amount: Number(e.Monto) * 100,
                  Descripcion: "Pedido Suc " + e.Sucursal + " # " + e.Pedido,
                  Ip: e.Token.token.client_ip,
                  Servicio: Number(e.Servicio),
                  Obv: e.Obv
                }
              }
            }
          });
    
          console.log(axdata.data);
          if (axdata.data.data.PagosM.Registro.Pagar === 1) {
            // setPayStatus({ Status: "Pagado", Color: "green" });
            return 1;
          } else {
           // setPayStatus({ Status: "Pago No Procesado", Color: "red" });
            return 0;
          }
        },











      };
    }, // ------- Pagos




























  }

}

export default usedata

