import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import Usernames from "constants/Usernames";
import styles from "./UserCard.module.scss";

type UserCardProps = {
  autorID: number;
  bodyText: string;
  title: string;
};

const UserCard = ({ autorID, bodyText, title }: UserCardProps) => {
  return (
    <Card className={styles.UserCard}>
      <CardContent>
        <Typography className={styles.autor} color="textSecondary" gutterBottom>
          {Usernames[autorID]}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {bodyText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
