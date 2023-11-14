import {
  Button,
  Card,
  Col,
  Empty,
  FloatButton,
  Input,
  Row,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "../Recipe/Recipe.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

const { Search } = Input;

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("vegan");
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const [loadingBar, setLoadingBar] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.edamam.com/search?q=${
          query ? query : "vegan"
        }&app_id=${import.meta.env.VITE_APP_ID}&app_key=${
          import.meta.env.VITE_API_KEY
        }&from=0&to=${limit}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRecipes(data.hits);
        setTimeout(() => {
          setInitialLoading(false);
        }, 4000);
      } catch (error) {
        <h2>Come back after some time...</h2>;
        setInitialLoading(false);
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

  const handleSearch = (value) => {
    if (value.length > 0) {
      setLoadingBar(true);
      setQuery(value);
      setTimeout(() => {
        setLoadingBar(false);
      }, 3000);
    }
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
          onSearch={(value) => handleSearch(value)}
          loading={loadingBar}
        />
      </div>

      {initialLoading ? (
        <Row justify="space-evenly" align="middle">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xxl={6}
              className={styles.col}
            >
              <Card
                style={{ width: "100%", marginBottom: 16 }}
                cover={
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: "250px" }}
                  />
                }
              >
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
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
      )}

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
