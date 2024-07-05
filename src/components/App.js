import React, {useEffect , useRef, useState} from "react";
import styled from "styled-components";
import GlobalStyles from "../assets/styles/globalStyles";
import Container from "./layout/Container";
import Header from "./layout/Header"
import breakpoints from "../assets/styles/breakpoints";
import ArrowIcon from  "../assets/images/arrow.svg";


const Wrapper = styled.section`
`

const Body = styled.section`
  background: var(--white);
  position: absolute;
  width: 100%;
  top: 0;
  transition: all .5s ease;

  &.small {
    top: -120px;
  }

  @media only screen and (min-width: ${breakpoints.desktop}){
    &.small {
      top: -200px;
    }
  }
`

const Content = styled.div`
  padding-top: 232px;
  @media only screen and (min-width: ${breakpoints.desktop}){
    padding-top: 369px;
  }
`

const Sort = styled.div`
  position: fixed;
  z-index: 20;
  height: 70px;
  width: calc(100% - 3rem);
  max-width: 1030px;
  display: flex;
  justify-content: end;
  align-items: center;
  background: white;

  @media only screen and (min-width: ${breakpoints.desktop}){
    width: 100%;

  }
`

const SortButton = styled.button`
  padding: 8px 50px 8px 30px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  background: var(--border);
  font-family: Outfit;
  height: 45px;

  &:after {
    content: "";
    height: 10px;
    width: 10px;
    background: url(${ArrowIcon});
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    right: 30px;
    top: 47%;
  }

  &[value="ascend"] {
    &:after {
      transform: rotate(180deg);
      transform-origin: center;
      top: 38%;
    }
  }

  @media only screen and (min-width: ${breakpoints.desktop}){
    font-size: 20px;
    padding: 13px 56px 13px 47px;
    height: 60px;

    &:after {
      height: 15px;
      width: 15px;
    }
  }
`

const TableCont = styled.table`

  font-family: Verdana;
  font-size: 14px;
  border-collapse: collapse;
  position: absolute;
  overflow-x: scroll;
  width: calc(100% - 3rem);
  max-width: 1030px;
  margin-top: 80px;

  td, th {
    padding: 10px;
    text-align: left;
    margin: 0;
  }

  tbody tr:nth-child(2n){
    background-color: #eee;
  }

  th {
    position: sticky;
    top: 180px;
    background-color: var(--white);
    font-family: Outfit;
    font-size: 18px;
    font-weight: 700;
  }

  @media only screen and (min-width: ${breakpoints.desktop}){
    width: 100%;

    th {
      font-size: 24px;
      top: 235px;
    }
  }
`

const NoResults = styled.p`
  margin-top: 140px;
`

function App() {  
  const [patients, setPatients] = useState();

  const container = useRef();
  const nav = useRef();
  const button = useRef();

  const scrollFunction = () => {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      container.current.classList.add("small");
      nav.current.classList.add("small");
    } else {
      container.current.classList.remove("small");
      nav.current.classList.remove("small");
    }
  }

  window.onscroll = function() {
      scrollFunction()
  };

  function fetchPatientData(name) {
    let url = "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

    if (name && name.length >= 2) url = `https://61ba219448df2f0017e5a929.mockapi.io/api/patients?search=${name}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          setPatients(false);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
  }

  function nameSort(descend) {
    if (descend === "descend"){
      descend = true;
      button.current.value = "ascend"
    } else {
      descend = false;
      button.current.value = "descend"
    }

    // create shallow clone of patients to rerender patients on state change 
    const clonePatients = [...patients];

    let sortedPatients = clonePatients.sort((a, b) => {
      let textA = a.lastName.toUpperCase();
      let textB = b.lastName.toUpperCase();
      return (textA < textB) ? (descend ? -1 : 1) : (textA > textB) ? (descend ? 1 : -1) : 0;
    });
    setPatients(sortedPatients);
  }

  useEffect(() => {
      fetchPatientData();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      <Header 
        nav={nav} 
        fetchPatientData={fetchPatientData}
      />
      <Body ref={container}>
        <Container>
          <Content>
            <Sort>
              <SortButton ref={button} value="descend" onClick={(e)=>nameSort(e.target.value)}>Sort by name</SortButton>
            </Sort>
            <TableCont>
              <thead>
              <tr>
                  <th>Name</th>
                  <th>NHS number</th>
                  <th>Vacine type</th>
              </tr>
              </thead>
              { patients && patients.length > 0 && <tbody>
                  { patients.map((patient, index)=> {
                      return(
                          <tr key={index} id={patient.id}>
                          <td>{`${patient.firstName} ${patient.lastName}`}</td>
                          <td>{patient.nhsNumber}</td>
                          <td>{patient.vaccineType}</td>
                      </tr>
                      )
                  })
                  }
              </tbody>}
            </TableCont>
            { !patients && <NoResults>No patients could be found, please adjust your search</NoResults>}
          </Content>
        </Container>
      </Body>
    </Wrapper>
  );
}

export default App;
