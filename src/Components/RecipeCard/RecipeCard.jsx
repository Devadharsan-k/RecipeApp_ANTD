import { Badge, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";
const { Meta } = Card;

const RecipeCard = ({ recipe }) => {
  const id = recipe.recipe.uri?.split("#")[1];
  return (
    <Link to={`/recipes/${id}`}>
      <Badge.Ribbon
        text={recipe.recipe.dishType}
        color="#6818a5"
        className={styles.badge}
      >
        <Card
          className={styles.card}
          hoverable
          cover={<img src={recipe.recipe.image} />}
        >
          <Meta title={recipe.recipe.label} />
          <div className={styles.types}>
            <p>{recipe.recipe.cuisineType}</p>
            <p>{recipe.recipe.mealType}</p>
          </div>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};

export default RecipeCard;
