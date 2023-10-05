import React from "react";
import styles from './PriorityNumber.module.css';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const PriorityNumber = ({ number, duration, initialDuration, isHighPriority }) => {
    return (
        <Box >
            <div className={`${styles.entity} ${isHighPriority ? styles['high-priority'] : ''}`}>
                <h1>{number}</h1>
                <LinearProgress
                    className={`${styles.progress}`}
                    variant="determinate"
                    style={{
                        height: "10px",
                        borderRadius: "0px 0px 5px 5px"
                    }}
                    value={(duration / initialDuration) * 100} />
            </div>
        </Box>

    );
}

export default PriorityNumber;