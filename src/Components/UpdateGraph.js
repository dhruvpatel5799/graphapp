import { useContext, useEffect, useState } from "react";
import { centralState } from "../App";

const UpdateGraph = (props) => {
    //read the central state
    const cState = useContext(centralState);

    const [formData, setFormData] = useState([]);

    const getformData = () => {
        const temp_formData = cState.store[props.dataId].elements;
        setFormData(temp_formData);
    }

    useEffect(() => {
        getformData();
    }, []);

    const handleInputChange = (e) => {

        //copy the data
        const copy_formData = [...formData];

        //update the value
        copy_formData[e.target.id] = Number(e.target.value);
        setFormData(copy_formData);

        //copy store data
        const copy_store = { ...cState.store }

        //update the store
        copy_store[props.dataId].elements = copy_formData

        //set the new store
        cState.setStore(copy_store);

        //draw the graph again
        props.reDraw();

    }

    return (
        <form style={{ maxWidth: '50%' }} className="row g-3">
            {
                formData.map((eachEntry, index) => <div className="row g-3" style={{ maxWidth: '25%' }} key={index}>
                    <div className="col-auto" style={{ maxWidth: '25%' }}>
                        <label className="form-label">{String.fromCharCode(65+index)}</label>
                    </div>
                    <div className="col-auto" style={{ maxWidth: '55%' }}>
                        <input type="number"
                            value={formData[index]}
                            onChange={handleInputChange}
                            className="form-control"
                            id={index} />
                    </div>
                </div>


                )
            }
        </form>

    );
}

export default UpdateGraph;