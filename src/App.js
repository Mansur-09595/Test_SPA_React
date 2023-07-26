import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/postActions";
import { Container } from "@material-ui/core";
import Table from "./components/Table/Table";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(50));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Table />
    </Container>
  );
};

export default App;
