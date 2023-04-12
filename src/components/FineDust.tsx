import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrap = styled.div``;

interface Item {
  so2Grade?: string;
  coFlag?: string;
  khaiValue: string;
  so2Value: string;
  coValue: string;
  pm25Flag?: string;
  pm10Flag?: string;
  pm10Value: string;
  o3Grade?: string;
  khaiGrade: any;
  pm25Value: string;
  no2Flag?: string;
  no2Grade?: string;
  o3Flag?: string;
  pm25Grade: any;
  so2Flag?: string;
  dataTime: string;
  coGrade?: string;
  no2Value: string;
  pm10Grade: any;
  o3Value: string;
}

const FineDust = () => {
  const [data, setData] = useState<Item>();
  useEffect(() => {
    const getFineDust = async () => {
      const response = await (
        await fetch(
          `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${process.env.REACT_APP_API_KEY}&returnType=json&numOfRows=3&pageNo=1&stationName=%EA%B8%B0%ED%9D%A5&dataTerm=DAILY&ver=1.0`
        )
      ).json();
      setData(response.response.body.items[0]);
    };
    getFineDust();
  }, []);
  return (
    <Wrap>
      <h1>{data?.dataTime}에 측정함</h1>
      <h2>미세먼지: {data?.pm10Value}</h2>
      <h2>초미세먼지: {data?.pm25Value}</h2>
    </Wrap>
  );
};

export default FineDust;
