import styled from 'styled-components';


const SpanStyled = styled.span`
    border-radius: 4px;
    padding: 2px 5px;
    background-color: ${props => props.color };
    color: ${props => props.dark ? "white" : "black" };
    width: max-content;
    margin-inline: 0px 4px;
`;

const Pill = ({children, color, isDark=false}) => {
    return (
        <SpanStyled
            color={color ? color : "hsl(0 0% 80%)"}
            dark={isDark}
        >
            {children}
        </SpanStyled>
    )
}

export { Pill };
