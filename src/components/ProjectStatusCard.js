import { useState } from 'react';
import { Card, Spin, Checkbox, Tag, Select } from 'antd';
import { get, map } from 'lodash/fp';
import { colorOfStateHex } from '../colors';


const tagRender = ({label, value, closable, onClose}) => {
    return (
        <Tag
            color={colorOfStateHex({'key': value})}
            closable={closable}
            onClose={onClose}
        >
            {label}
        </Tag>
    )
};


const ProjectStatusCard = ({loading, stateOptions, selectedStates, setSelectedStates}) => {
    return (
        <Spin spinning={loading}>
            <Card style={{marginBottom: 4}} title="Project status">
                <Select
                    mode="multiple"
                    showArrow
                    tagRender={tagRender}
                    options={stateOptions}
                    value={selectedStates}
                    onChange={setSelectedStates}
                    loading={loading}
                    style={{width: "100%" }}
                />
            </Card>
        </Spin>
    )
};

export { ProjectStatusCard };
