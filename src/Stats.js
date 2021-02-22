import React, {useState, useEffect} from 'react';
import './Stats.css';
import axios from "axios";
import StatsRow from './StatsRow';
import {db} from './firebase';

const Token = "c0pbsf748v6rvej4ida0";
const BASE_URL="https://finnhub.io/api/v1/quote";

function Stats(){
  const [myStocks,setmyStocks]= useState([])
  const [stockData,setstockData] = useState([])
 const getMyStocks = () => {
 db
 .collection('myStock')
 .onSnapshot(snapshot =>{
   let promises =[];
   let tempData =[];
   snapshot.docs.map((doc)=>{
     console.log(doc.data());
     promises.push(getstockData(doc.data().ticker)
     .then(res => {
       tempData.push({
         id:doc.id,
         data: doc.data(),
          info: res.data
           })
          })
        )})
        Promise.all(promises).then(()=>{
          setmyStocks(tempData);
        })
    })
  }

  const getstockData = (stock) =>{
    return axios
    .get(`${BASE_URL}?symbol=${stock}&token=${Token}`)
    .catch((error)=>{
      console.error("Error", error.message);
    });
  };
  


 useEffect(() => {
   let tempStockData= [];
    const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
    getMyStocks();
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getstockData(stock)
        .then((res) => {
          tempStockData.push({
            name: stock,
            ...res.data
          });
        })
      )
    });

    Promise.all(promises).then(()=>{
      setstockData(tempStockData);
      console.log(tempStockData);
    })
  }, []);


  return(
   <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p> Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats-lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stocksData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Stats;