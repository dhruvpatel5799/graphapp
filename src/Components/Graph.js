import { useContext, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { centralState } from "../App";
import UpdateGraph from "./UpdateGraph";

const Graph = (props) => {
    //read the central state
    const cState = useContext(centralState);

    const [graphData, setGraphData] = useState([['Elements', 'Values']]);

    const arrangeData = () => {
        var i = 65
        var copy_graphData = [...graphData];
        for (let x of props.elements) {
            copy_graphData.push([String.fromCharCode(i), Number(x)]);
            i += 1;
        }
        setGraphData(copy_graphData);
    }

    useEffect(() => {
        arrangeData();
    }, []);

    const drawGraph = () => {
        if (props.type === 'Bar') {
            return (
                <div style={{ display: 'flex', maxWidth: '50%' }}>
                    <Chart
                        width={600}
                        height={300}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={graphData}
                        options={{
                            title: 'Bar Chart',
                            chartArea: { width: '30%' },
                            hAxis: {
                                title: '',
                                minValue: 0,
                            },
                            vAxis: {
                                title: '',
                            },
                        }}
                        legendToggle
                    />
                </div>
            )
        }
        else if (props.type === 'Pie') {
            return (
                <div style={{ display: 'flex', maxWidth: '50%' }}>
                    <Chart
                        width={600}
                        height={300}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={graphData}
                        options={{
                            title: 'Pie Chart',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            )
        }
        else {
            return null;
        }
    }

    const updateGraph = () =>{
        //copy graph data
        var copy_graphData = [...graphData];

        //update graph data
        for(let i = 1; i<copy_graphData.length; i++){
            copy_graphData[i][1] = cState.store[props.dataId].elements[i-1]
        }
        setGraphData(copy_graphData)
    }

    return (
        <>
            {drawGraph()}
            <UpdateGraph {...props}
            reDraw = {updateGraph.bind(this)}/>
        </>
    );
}

export default Graph;