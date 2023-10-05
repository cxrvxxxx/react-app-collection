import React from "react";
import { Paper } from "@mui/material";
import { getCardImage } from "./Gallery";
import styles from './Gallery.module.css';

const GalleryItem = ({ value }) => {
    return (
        <Paper className={`${styles.card}`} variant="elevation" elevation={4}>
            <img src={getCardImage(value)} />
        </Paper>
    );
};

export default GalleryItem;
