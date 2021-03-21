import React, { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import Loader from "react-loader-spinner";

import PostType from "models/Posts";
import UserCard from "components/UserCard";
import Button from "@material-ui/core/Button";

import styles from "./DataView.module.scss";

const DataView = () => {
  const defaultPosts: PostType[] = [];

  const [posts, setPosts]: [PostType[], (posts: PostType[]) => void] = useState(
    defaultPosts
  );
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");
  const cancelToken = axios.CancelToken;
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = useState(cancelToken.source());

  useEffect(() => {
    axios
      .get<PostType[]>("https://jsonplaceholder.typicode.com/posts", {
        cancelToken: cancelTokenSource.token,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        const error = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred :("
          : ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  });

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("User cancelled operation");
    }
  };

  return (
    <div className={styles.DataView}>
      <h2>Ejemplo de uso de axios para peticiones HTTP</h2>
      {loading && (
        <>
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelClick}
          >
            Cancel loading
          </Button>
        </>
      )}
      <div className={styles.Users}>
        {posts.map((post) => (
          <UserCard
            key={post.id}
            title={post.title}
            autorID={post.userId - 1}
            bodyText={post.body}
          />
        ))}
        {error && <p className={styles.ErrorMsg}>{error}</p>}
      </div>
    </div>
  );
};

export default DataView;
