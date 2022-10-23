import styled from 'styled-components';

const SwitchLabel = styled.label`
    cursor: pointer;
    display: inline-block;
    margin: 2px;
    &:first-of-type {
        margin-top: 0px;
    }
    &:last-of-type {
        margin-bottom: 0px;
    }
`; 

const SwitchInput = styled.input` 
    position: absolute;
    visibility: hidden;
`;

const SwitchToggle = styled.div`
    display: inline-block;
    background: #ccc;
    border-radius: 16px;
    width: 58px;
    height: 32px;
    position: relative;
    vertical-align: middle;
    transition: background 0.25s;
    &:before, &:after {
        content: "";
    }
    &:before {
        display: block;
        background: linear-gradient(to bottom, #fff 0%, #eee 100%);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        width: 24px;
        height: 24px;
        position: absolute;
        top: 4px;
        left: 4px;
        transition: left 0.25s;
    }
    ${SwitchLabel} &:before {
        background: linear-gradient(to bottom, #fff 0%, #fff 100%);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    }
    ${SwitchInput}:checked + && {
        background: ${props => props.activeColor};
    }
    ${SwitchInput}:checked + &:before {
        left: 30px;
    }
`;

const SwitchText = styled.span`
    margin-left: 5px;
    position: relative;
    top: 2px;
`;

const Switch = ({activeColor, labelText, onSwitched, checked}) => {
    return (
        <SwitchLabel>
            <SwitchInput type="checkbox" onChange={(e) => onSwitched(e.target.checked)} checked={checked}/>
            <SwitchToggle activeColor={activeColor} />
            <SwitchText>{labelText}</SwitchText>
        </SwitchLabel>
    )
};

export { Switch };
