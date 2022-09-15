import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        // 누른 index를 구하고
        const currentIndex = Checked.indexOf(value);
        //index가 있으면 해당 값의 index, 없으면 -1
        // 전체 Checked된 State에서 현재 누른 Checkbox 가 이미 있다면 빼주고
        const newChecked = [...Checked];

        if(currentIndex === -1) {
            // 안되었다면 state에 넣어주고
            newChecked.push(value);
            // check되었다면 state를 빼주고
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked); //1,2,3 -> LandingPage -> handlerFilters의 filter
    };

    const renderCheckboxLists = () =>
        props.list &&
        props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)}
            checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>
        </React.Fragment>
    ));

  return (
    <div>
        <Collapse defaultActiveKey={["0"]}>
            <Panel header="Continents" key="1">
                {renderCheckboxLists()}
            </Panel>
        </Collapse>
    </div>
  );
};

export default CheckBox;
