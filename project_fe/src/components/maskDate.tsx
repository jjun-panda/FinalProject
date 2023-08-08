import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const maskDate = ({ writeDate }: { writeDate: string }) => {
    let startTime = new Date(writeDate).getTime();
    let nowTime = Date.now();
    let Time = startTime - nowTime;
    // console.log("게시물시간" + startTime)
    // console.log("현재시간" + nowTime)
    if (Time > -60000) {
        return <Moment format="방금 전">{new Date(startTime).toISOString()}</Moment>;
    } else if (Time >= -3600000) { // 59분 전까지
        let diffInMinutes = Math.floor(Time / -60000);
        return <Moment format={`${diffInMinutes}분 전`}>{new Date(startTime).toISOString()}</Moment>;
    } else if (Time >= -86400000) { // 23시간 전까지
        let diffInHours = Math.floor(Time / -3600000);
        return <Moment format={`${diffInHours}시간 전`}>{new Date(startTime).toISOString()}</Moment>;
    } else if (Time >= -345600000) { // 3일 전까지
        let diffInDays = Math.floor(Time / -86400000);
        return <Moment format={`${diffInDays}일 전`}>{new Date(startTime).toISOString()}</Moment>;
    } else if (Time < -345600000) {
        return writeDate.slice(0, 16);
        // return <Moment format="YYYY년 MM월 DD일">{new Date(startTime).toISOString()}</Moment>;
    }
};    

export default maskDate;
