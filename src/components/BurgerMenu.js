import styled from 'styled-components';
import { useState } from 'react';


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    height: 100vh;
    left: -275px;
    width: 300px;
    margin: 8px;
    transition-duration: 0.25s;
    overflow: auto;
    background: #fff;
    &.open {
        left: 0 !important; 
    }
`;

const StyledInput = styled.button`
    width: 15px;
    height: 100px;
    margin-left: 2px;
    margin-right: 10px;
    background-color: #89CFF0;
    border-width: 0px;
    vertical-align: middle;
    border-radius: 20px;
    align-self: center;
    &:hover {
        cursor: pointer;
    }
`;

const StyledContent = styled.div`
    overflow: auto;
    padding: 8px;
`;

const BurgerToggle = ({onClick}) => {
    return <StyledInput onClick={onClick} />
};


const BurgerMenu = ({children}) => {
    const [open, setOpen] = useState(true);

    return (
        <StyledWrapper className={open ? "open" : ""}>
            <StyledContent>
                {children}
            </StyledContent>
            <BurgerToggle onClick={() => setOpen(!open)}/>
        </StyledWrapper>
    )
};

export { BurgerMenu };
