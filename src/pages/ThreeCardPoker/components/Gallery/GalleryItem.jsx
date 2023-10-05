import React from "react";
import { Paper } from "@mui/material";
import { getCardImage } from "./Gallery";

const GalleryItem = ({ value }) => {
    return (
        <Paper className="card" variant="elevation" elevation={4}>
            <img src={getCardImage(value)} />
        </Paper>
    );
};

export default GalleryItem;
