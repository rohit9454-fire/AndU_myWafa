import { useState, useEffect, FC } from 'react';
import { View, Text, Button } from 'react-native';
import createStyle from './Styles';

interface TimerProps {
    isRunning: boolean;
    setIsRunning: (val: boolean) => void;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>
}


const Timer: FC<TimerProps> = ({ isRunning, setIsRunning,setTime,time }) => {
    const styles = createStyle();

    useEffect(() => {
        let timer: any;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime:number) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timer);
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, time]);

    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
    );
};



export default Timer;