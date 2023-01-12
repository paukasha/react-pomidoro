import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {Pause, PlayArrow, Stop} from "@mui/icons-material";
import Countdown from "react-countdown";

const Timer = () => {
    return (
        <div>
            <Countdown
                date={Date.now() +currentTimer.value}

                autoStart={false}
                key={Date.now() + currentTimer.value}
                ref={countdownRef}
                onComplete={(timeDelta, completedOnStart) => goToNextTimer(timeDelta, completedOnStart)}
                renderer={({formatted, api, completed}) => (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant='h1'>
                            {formatted.minutes}:{formatted.seconds}
                        </Typography>
                        <Box>
                            <IconButton size='large'
                                        onClick={(e) => stopTimer(e)}
                            >
                                <Stop fontSize='large'/>
                            </IconButton>

                            <IconButton size='large'
                                        onClick={() => toggleTimer()}
                            >
                                {api.isStopped() || api.isPaused() ? <PlayArrow fontSize='large'/> :
                                    <Pause fontSize='large'/>}
                            </IconButton>
                        </Box>
                    </Box>
                )}></Countdown>
        </div>
    );
};

export default Timer;