import { Button, Col, Empty, FloatButton, Row } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import styles from "../Recipe/Recipe.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("vegan");
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.edamam.com/search?q=${query}&app_id=${
          import.meta.env.VITE_APP_ID
        }&app_key=${import.meta.env.VITE_API_KEY}&from=0&to=${limit}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRecipes(data.hits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    }

    fetchData();
  }, [query, limit]);

  const handleClick = () => {
    setLoading(true);
    setLimit((prevLimit) => prevLimit + 10);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <Search
          className={styles.inp}
          allowClear={true}
          placeholder="eg: Cake, Chicken, Egg, etc...,"
          enterButton="Search"
          size="large"
          onSearch={(value) => setQuery(value)}
        />
      </div>

      <Row justify="space-evenly" align="middle">
        {recipes.map((item, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xxl={6}
            className={styles.col}
          >
            <RecipeCard recipe={item} key={index} />
          </Col>
        ))}
      </Row>
      {recipes.length > 0 ? (
        <Row justify="center">
          <Button
            loading={loading}
            className={styles.btn}
            onClick={() => handleClick()}
          >
            Show More
          </Button>
        </Row>
      ) : (
        <Empty className={styles.empty} />
      )}

      <FloatButton.BackTop visibilityHeight={700} duration={300} />
    </div>
  );
};

export default Recipe;
