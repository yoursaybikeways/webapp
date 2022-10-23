import { useState } from 'react';
import { Card, Spin, Checkbox, Tag, Select } from 'antd';
import { get, map, filter, concat, remove } from 'lodash/fp';
import { colorOfStateHex } from '../colors';
import { Switch } from './Switch';


// const tagRender = ({label, value, closable, onClose}) => {
//     return (
//         <Tag
//             color={colorOfStateHex({'key': value})}
//             closable={closable}
//             onClose={onClose}
//         >
//             {label}
//         </Tag>
//     )
// };
// 
// 
// const ProjectStatusCard = ({loading, stateOptions, selectedStates, setSelectedStates}) => {
//     return (
//         <Spin spinning={loading}>
//             <Card style={{marginBottom: 4}} title="Project status">
//                 <Select
//                     mode="multiple"
//                     showArrow
//                     tagRender={tagRender}
//                     options={stateOptions}
//                     value={selectedStates}
//                     onChange={setSelectedStates}
//                     loading={loading}
//                     style={{width: "100%" }}
//                 />
//             </Card>
//         </Spin>
//     )
// };

const OptionSwitch = ({value, label, selectedStates, setSelectedStates}) => {
    const color = colorOfStateHex({'key': value});
    const onSwitched = (on) => {
        on 
            ? setSelectedStates(concat(selectedStates)([value]))
            : setSelectedStates(remove(x => x === value, selectedStates))
    };
    return <Switch
        activeColor={color}
        onSwitched={onSwitched}
        labelText={label}
        checked={selectedStates.includes(value)}
    />
};

const onSwitchedFactory = ({selectedStates, setSelectedStates, stateValue}) => {
    const addItIn = concat(selectedStates)([stateValue]);
    const takeItOut = filter(selectedStates)(s => s.value != stateValue);
    return (on) => {
        on ? setSelectedStates(addItIn) : setSelectedStates(takeItOut)
    }
}

const ProjectStatusCard = ({loading, stateOptions, selectedStates, setSelectedStates}) => {
    return (
        <Spin spinning={loading}>
            <Card style={{marginBottom: 4}} title="Project status">
                <div style={{display: "flex", flexDirection: "column"}}>
                    {
                        map(
                            (so) => {
                                return <OptionSwitch 
                                    key={so.value}
                                    value={so.value} 
                                    label={so.label} 
                                    selectedStates={selectedStates}
                                    setSelectedStates={setSelectedStates}
                                />
                            }
                        )(stateOptions)
                    }
                </div>
            </Card>
        </Spin>
    )
};

export { ProjectStatusCard };
