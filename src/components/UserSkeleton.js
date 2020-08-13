import React, { Fragment } from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import { CardContent } from "@material-ui/core";

const styles = {
  card: {
    textAlign: "center",
    position: "relative",
    display: "flex",
    marginBottom: 20,
    width: "100%",
    paddingBottom: 10,
  },
  image: {
    marginRight: 10,
  },
  content: {
    padding: 15,
    objectFit: "cover",
    paddingBottom: "0px !important",
  },
};
const PostSkeleton = (props) => {
  const { classes } = props;

  const content = (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Skeleton
          variant="circle"
          width={200}
          height={200}
          className={classes.image}
        ></Skeleton>
        <Skeleton variant="text" width={300}></Skeleton>
        <Skeleton variant="text" width={300}></Skeleton>
        <Skeleton variant="text" width={150}></Skeleton>

        <Skeleton variant="text" width={175}></Skeleton>
      </CardContent>
    </Card>
  );
  return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(PostSkeleton);
