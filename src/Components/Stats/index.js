import React,{useEffect,useState} from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useSelector, useDispatch } from 'react-redux';

function Stats(props) {
    const state = useSelector(state => state);
    const tasks = state && state.dashboard && state.dashboard.taskList;
    const [taskData,setTaskData] = useState([]);
    
    const shiftSize = 7;
   
    useEffect(() => {
        let data = [];
                let arr1 = tasks.filter(ele => ele.status ==="Todo");
                data.push({title:"Todo", value: arr1.length, color: '#E38627'})
         
                let arr2 = tasks.filter(ele => ele.status ==="running");
                data.push({title:"Doing", value: arr2.length, color: '#C13C37'})
          
                let arr3 = tasks.filter(ele => ele.status ==="Done");
                data.push({title:"Done", value: arr3.length, color: 'green'})

                setTaskData(data);

    },[tasks])
    return (
        <div style={{ width: 'auto', textAlign: 'center', height: 400 }}>
            <h2>Task Pie Chart</h2>
            <PieChart
            radius={PieChart.defaultProps.radius - shiftSize}
            segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
            label={({ dataEntry }) => dataEntry.value}
                data={taskData}
            />;

        </div>
    );
}

export default Stats;