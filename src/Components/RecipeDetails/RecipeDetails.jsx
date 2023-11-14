import { Divider, Image, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FcApproval, FcNext } from "react-icons/fc";
import { GiCampCookingPot } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState();
  const { id } = useParams();
  const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${
    import.meta.env.VITE_APP_ID
  }&app_key=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => setRecipe(data[0]));
    };
    getData();
  }, [id]);

  if (!recipe) return <Spin fullscreen size="middle" />;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <span style={{ color: "skyblue" }}>Home</span> &nbsp;/ &nbsp;
        {recipe.label}
      </Link>
      <div className={styles.main}>
        <Image src={recipe.image} className={styles.img} />
        <div className={styles.content}>
          <p className={styles.mc}>{recipe.label}</p>
          <div className={styles.type}>
            <p className={styles.sc}>{recipe.cuisineType}</p>
            <p className={styles.sc}>{recipe.dishType}</p>
          </div>

          <p className={styles.sc}>
            Calories : &nbsp;
            {recipe.calories.toFixed(2)}&nbsp;&nbsp;&nbsp;
            <AiFillFire className={styles.icon} />
          </p>
          <p>
            Timeing : &nbsp;{recipe.totalTime}&nbsp;&nbsp;&nbsp;
            <BiTimeFive className={styles.icon} />
          </p>
          <p>
            Servings : &nbsp; {recipe.yield}&nbsp;&nbsp;&nbsp;
            <GiCampCookingPot className={styles.icon} />
          </p>
        </div>
      </div>
      <div className={styles.list}>
        <div>
          <Divider
            orientation="left"
            style={{ borderColor: "gray", color: "white", paddingTop: "30px" }}
          >
            INGREDIENTS
          </Divider>
          <div className={styles.ingredient}>
            {recipe.ingredientLines.map((item, index) => {
              return (
                <p key={index}>
                  <FcNext className={styles.icon} />
                  &nbsp;&nbsp;&nbsp;{item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.healthLabels}>
          <Divider
            orientation="left"
            style={{ borderColor: "gray", color: "white", paddingTop: "30px" }}
          >
            HEALTH LABELS
          </Divider>
          <div className={styles.ingredient}>
            {recipe.healthLabels.slice(0, 10).map((item, index) => {
              return (
                <p key={index}>
                  <FcApproval className={styles.icon} />
                  &nbsp;&nbsp;&nbsp;{item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
