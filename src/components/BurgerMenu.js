import styled from 'styled-components';
import { useState } from 'react';


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    height: 100vh;
    left: -285px;
    width: 310px;
    transition-duration: 0.25s;
    overflow: auto;
    background: #fff;
    &.open {
        left: 0 !important; 
    }
`;

const StyledInput = styled.button`
    width: 20px;
    padding: 0;
    height: 80px;
    margin-left: 4px;
    margin-right: 4px;
    border-width: 0px;
    background-color: #89CFF0;
    color: white;
    vertical-align: middle;
    text-align: center;
    border-radius: 20px;
    align-self: center;
    &:hover {
        cursor: pointer;
    }
`;

const StyledContent = styled.div`
    overflow: auto;
    padding: 8px;
    width: 100%;
`;

const BurgerToggle = ({open, onClick}) => {
    return <StyledInput onClick={onClick}>
        {open ? "<" : ">"}
    </StyledInput>
};


const BurgerMenu = ({children}) => {
    const [open, setOpen] = useState(true);

    return (
        <StyledWrapper className={open ? "open" : ""}>
            <StyledContent>
                {children}
            </StyledContent>
            <BurgerToggle open={open} onClick={() => setOpen(!open)}/>
        </StyledWrapper>
    )
};

export { BurgerMenu };
