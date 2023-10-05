import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from './Admit.module.css';

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const isUniqueNumber = (queues, number) => {
    let isUnique = true;

    for (let queue in queues) {
        for (let item in queue) {
            if (item.priorityNumber === number) isUnique = false;
        }
    }

    return isUnique;
}

const Admit = ({ queues, callback }) => {
    const [entityBuffer, setEntityBuffer] = useState([]);
    const [entity, setEntity] = useState({
        "priorityNumber": 0,
        "duration": 0,
        "isHighPriority": false
    });

    const [disabledAdmitButton, setDisabledAdmitButton] = useState(false);

    const handleGenerate = () => {
        let updatedEntityBuffer = [...entityBuffer];

        if (updatedEntityBuffer.length + 1 > 10) updatedEntityBuffer.splice(0, 1);

        if (entity.priorityNumber !== 0) {
            updatedEntityBuffer.push(entity);
            setEntityBuffer(updatedEntityBuffer);
        }

        let priorityNumber = getRandomInt(1, 100);
        while (!isUniqueNumber(queues, priorityNumber) && !isUniqueNumber([entityBuffer, []], priorityNumber)) priorityNumber = getRandomInt(1, 100);
        const duration = getRandomInt(3, 30);
        const isHighPriority = (getRandomInt(1, 100) > 75) ? true : false;

        setEntity({
            "priorityNumber": priorityNumber,
            "duration": duration,
            "initialDuration": duration,
            "isHighPriority": isHighPriority
        });

        setDisabledAdmitButton(false);
    }

    const handleAdmit = () => {
        callback(entity);

        setEntity({
            "priorityNumber": 0,
            "duration": 0,
            "initialDuration": 0,
            "isHighPriority": false
        });

        setDisabledAdmitButton(true);
    }

    return (
        <div className={`${styles.admitting}`} >
            <div className={`${styles['entity-buffer']}`}>
                {entityBuffer.map((value, index) => (
                    <div className={`${styles['buffer-item']}`}>
                        <h4>#<b>{value.priorityNumber}</b></h4>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => {
                                callback({
                                    "priorityNumber": value.priorityNumber,
                                    "duration": value.duration,
                                    "initialDuration": value.duration,
                                    "isHighPriority": value.isHighPriority
                                });

                                for (let i = 0; i < entityBuffer.length; i++) {
                                    if (entityBuffer[i].priorityNumber === value.priorityNumber) {
                                        const newEntityBuffer = [...entityBuffer];
                                        newEntityBuffer.splice(i, 1);
                                        setEntityBuffer(newEntityBuffer);
                                    }
                                }

                                setEntity({
                                    "priorityNumber": 0,
                                    "duration": 0,
                                    "initialDuration": 0,
                                    "isHighPriority": false
                                });
                            }}>Admit</Button>
                    </div>
                ))}
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className={`${styles.label}`}>Priority number:</td>
                        <td className={`${styles.number}`}>{entity.priorityNumber}</td>
                    </tr>
                    <tr>
                        <td className={`${styles.label}`}>Time to complete (in seconds):</td>
                        <td>{entity.duration}</td>
                    </tr>
                    <tr>
                        <td className={`${styles.label}`}>Priority:</td>
                        <td><b>{(entity.isHighPriority) ? 'HIGH' : 'Normal'}</b></td>
                    </tr>
                </tbody>
            </table>
            <div className={`${styles['button-container']}`}>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleGenerate}>Get number</Button>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleAdmit}
                    disabled={entity.priorityNumber === 0 || disabledAdmitButton}>Admit</Button>
            </div>
        </div>
    );
}

export default Admit;