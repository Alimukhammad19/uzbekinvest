import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import invest from "../../Images/news/invest.png";

const NewCard = ({ innovation }) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [newobj, setNewObj] = useState(innovation)
  const T = useTranslation();

  const changeLanguageInfo = async() => {
    if(T.i18n.language === 'uz'){
      setLoading(true)
      const res = await axios.get(`https://uzbekinvest.herokuapp.com/uz/news/news-detail/${innovation.id}/`);
      setNewObj(res.data)
      setLoading(false)
    }
    else{
      setLoading(true)
      const res = await axios.get(`https://uzbekinvest.herokuapp.com/ru/news/news-detail/${innovation.id}/`);
      setNewObj(res.data)
      setLoading(false)
    }
  };

  useEffect(() => {
    changeLanguageInfo();
    window.scrollTo(0, 0);
  }, [pathname, T.i18n.language]);

  return (
    <>
      <div className="cards">
        <div className="container">
          {!loading &&
            <div className="card">
              <img className="card__img" src={invest} alt="" />
              <div className="card__info">
                <h2>{newobj?.title}</h2>
                <h4>{newobj?.subtitle}</h4>
                <p>{newobj?.content}</p>
              </div>
            </div>
          }
          <div className="spinner">
            <ClipLoader size={50} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCard;
