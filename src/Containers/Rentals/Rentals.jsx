import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import Spinner from "../../Components/Spinner/Spinner";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { ADD_RENT } from "../../redux/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";

const Rentals = (props) => {
  let history = useHistory();
  let token = props.credentials.token;

  const [rentalUsers, setRentalUser] = useState([]);

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";

  useEffect(() => {
    setTimeout(() => {
      getUserRentals();
    }, 1500);
  }, []);

  const getUserRentals = async () => {
    let body = {
      idUser: props.credentials.idUser,
    };

    try {
      let res = await axios.post(
        `https://rentmovie-back3nd.herokuapp.com/orders/orderuserid/`,
        body,
        { headers: { authorization: "Bearer " + token } }
      );
      //GUARDANDO EL REDUX
      // console.log(res)

      setRentalUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const VerPeliculas = async (rentVideo) => {
    props.dispatch({ type: ADD_RENT, payload: rentVideo });

    setTimeout(() => {
      history.push("/rentalVideo");
    }, 500);
  };

  if (rentalUsers === "vacio") {
    return (
      <div className="rentalsNone">
        <h1 classNam="rentalNoneText">
          lo siento {props.credentials.user.name}
          {props.credentials.user.last_name1} aun no tienes ningun alquiler.
        </h1>
      </div>
    );
  } else if (!rentalUsers[0]?.idUser) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="allOrders">
        <div className="orderContent">
          {rentalUsers.map((rentalUsers, index) => (
            <div key={index} className="orderCards">
              <img
                src={`${baseImgUrl}/${size}${rentalUsers.posterMovie}`}
                alt="poster"
              />
              <div className="info">
                <h2>{rentalUsers.movieTitle}</h2>

                <h3 className="order">
                  Rental Date : {moment(rentalUsers.rentalDate).format("LL")}
                </h3>
                <p className="order">
                  Return Date : {moment(rentalUsers.returnDate).format("LL")}
                </p>
                <h3>
                  Rental time left: <br></br>
                  <b>
                    <Moment date={rentalUsers.returnDate} durationFromNow />
                  </b>
                </h3>

                <div>
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="VerPelicula"
                    onClick={() => VerPeliculas(rentalUsers)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  ordersRent: state.ordersRent,
}))(Rentals);
