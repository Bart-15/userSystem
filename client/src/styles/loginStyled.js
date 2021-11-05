import styled from 'styled-components'


const FormContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`

const FormGroup = styled.div`
    margin:10px;
`

const CardContainer = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`

export {
    FormContainer,
    FormGroup,
    CardContainer,
}