import { Fragment, useContext, useEffect, useState } from "react"
import { centralState } from "../App";
import Graph from './Graph'

const ChartData = () => {
    //read the central state
    const cState = useContext(centralState);
    
    const [chartData, setChartData] = useState([]);

    const getChartData = async () => {
        try {
            const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json');
            const data = await response.json();
            cState.setStore(data);
            setChartData(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getChartData();
    }, []);

    return (
        <Fragment>
            {
                chartData.map((eachEntry, index) =>
                    <div className="row" key={index} >
                        <h4>Graph {index + 1}</h4>
                        <Graph {...eachEntry}
                        dataId = { index }/>    
                        <hr/>
                    </div>)
            }
        </Fragment>
    );
}

export default ChartData;