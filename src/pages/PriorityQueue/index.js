import React, { useEffect, useRef, useState } from 'react';
import styles from './PriorityQueue.module.css';
import Admit from './components/Admit';
import PriorityNumber from './components/PriorityNumber';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const getTotalDuration = (queue) => {
  /* Calculates the total duration of a queue */
  if (queue.length === 0) return 0;

  let totalDuration = 0;

  for (let i = 0; i < queue.length; i++) {
    totalDuration = totalDuration + queue[i].duration;
  }

  return totalDuration;
}

const getShortestQueueIndex = (queues) => {
  /* Finds the shortest queue */
  let shortestQueueIndex = 0;

  for (let i = 1; i < queues.length; i++) {
    if (getTotalDuration(queues[i]) < getTotalDuration(queues[shortestQueueIndex]))
      shortestQueueIndex = i;
  }

  return shortestQueueIndex;
}

const getInsertIndex = (queue) => {
  /* Finds the index to insert */
  let idx = 0;

  for (let i = 0; i < queue.length; i++) {
    if (queue[i].duration !== queue[i].initialDuration)
      idx++;
    else if (queue[i].isHighPriority)
      idx++;
  }

  return idx;
}

const App = () => {
  const entityKey = useRef(0);

  const [queues, setQueues] = useState([[], [], [], []]);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleAdmit = (entity) => {
    const queueIndex = getShortestQueueIndex(queues);

    /* Update queues state */
    const updatedQueues = [...queues];

    if (entity.isHighPriority) {
      updatedQueues[queueIndex].splice(getInsertIndex(updatedQueues[queueIndex]), 0, entity);
    } else {
      updatedQueues[queueIndex].push(entity);
    }

    setQueues(updatedQueues);
  }

  const processQueue = () => {
    const updatedQueues = [...queues];

    /* Decrements the first item in each queue */
    for (let x = 0; x < updatedQueues.length; x++) {
      if (updatedQueues[x].length === 0) continue;
      else if (updatedQueues[x][0].duration <= 0.1) {
        /* Removes the first item if duration runs out */
        updatedQueues[x].splice(0, 1);
      } else {
        updatedQueues[x][0] = {
          ...updatedQueues[x][0],
          "duration": updatedQueues[x][0].duration - 0.1
        }
      }

    }

    setQueues(updatedQueues);
  }

  useEffect(() => {
    /* Handles decrementing of duration */
    const intervalId = setInterval(() => {
      processQueue();
    }, 100);


    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.col1}`}>
        <Admit
          queues={queues}
          callback={handleAdmit} />
        <div className={`${styles['checkbox-container']}`}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Pause Timer"
          />
        </div>
      </div>
      <div className={`${styles.col2}`}>
        {queues.map((queue, queueIndex) => (
          <div key={entityKey.current++} className={`${styles['queue-block']}`}>
            <h4>Queue #{queueIndex + 1} ({Math.round(getTotalDuration(queue))}) s.</h4>
            {queue.map((entity) => (
              <PriorityNumber
                key={entityKey.current++}
                number={entity.priorityNumber}
                duration={entity.duration}
                initialDuration={entity.initialDuration}
                isHighPriority={entity.isHighPriority} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
