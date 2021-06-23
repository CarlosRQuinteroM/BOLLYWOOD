import axios from "axios";
import React, { useState, useEffect } from "react";
// import { Card, Avatar } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

// const { Meta } = Card;

const Home = (props) => {
  const [moviesTopRate, setMoviesTopRate] = useState([]);

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200"

  useEffect(() => {
    setTimeout(() => {
      findTopRated();
    }, 500);
  }, []);

  const findTopRated = async () => {
    try {
      let res = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1"
      );
      setMoviesTopRate(res.data.results);
      console.log(res.data.results);
    } catch (error) {
        console.log(error)
    }
  };

  if (moviesTopRate === "") {
      return(

        <div>cargando</div>
      )
  } else {
      return(

      <div className="HomeVista">
          {moviesTopRate?.map((TopRate)=>{
              return(
                <div >
                  <div className="Home" key={TopRate.id}>
                        <div className="cardMovie">
                            <img className="imgMovie" src={`${baseImgUrl}/${size}${TopRate.poster_path}`} alt="poster_path" />
                               <div className="infoMovie">
                                   <h2>${TopRate.title}</h2>
    
                               </div>
                         </div>
                    </div>
                    </div>
            
              )
      })}
          
        
      </div>
      
      )
  
};
}
export default Home;

