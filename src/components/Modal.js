import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        background-color: rgba(0,0,0,0.4);
    }

    to {
        background-color: rgba(0,0,0,0.0);
    }
`;

const fadeOut = keyframes`
    from {
        background-color: rgba(0,0,0,0.0);
    }

    to {
        background-color: rgba(0,0,0,0.4);
    }
`;

const fromTop = keyframes`
    from {
        top: -300px;
        opacity: 0;
    }

    to {
        top: 0px;
        opacity: 1;
    }
`;

const toTop = keyframes`
    from {
        top: 0px;
        opacity: 1;
    }

    to { top: -300px; opacity: 0; }
`;

const ModalContainer = styled.div`
    display: ${props => props.shown ? "block" : "none"};
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4);
}`;

const ModalContent = styled.div`
    position: relative;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    max-width: 800px;
    animation: ${fromTop} 0.25s;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
`;

const Modal = ({children, shown, onOutsideClick}) => {
    return (
        <ModalContainer shown={shown} onClick={onOutsideClick}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalContent>
        </ModalContainer>
    )
};

export { Modal };
