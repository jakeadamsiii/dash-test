import React from "react";
import styled from "styled-components";
import Container from "./Container"
import logoImage from "../../assets/images/logo.png"
import breakpoints from "../../assets/styles/breakpoints";

const Navigation = styled.nav`
    width: 100%;
    background: transparent;
    background: var(--primary);
    box-sizing: border-box;
    padding: 30px 0;
    position: fixed;
    top: 0;
    transition: all .5s ease;
    z-index: 1;

    h1 {
        font-size: 25px;
        font-weight: 700;
        line-height: 40px;
        color: var(--white);
        padding: 30px 0;
        margin: 0;
        transition: opacity .5s ease, height 1s ease;
    }

    label {
        position: relative;

        svg {
            position: absolute;
            height: 18px;
            width: 18px;
            top: 1px;
            left: 15px;
     
        }
    }

    input {
        font-size: 18px;
        line-height: 20px;
        width: 100%;
        background: var(--inactive);
        padding: 15px 15px 15px 40px;
        box-sizing: border-box;
        border-radius: 10px;
        border: none;
        font-family: Outfit, ariel;
        color: var(--white);

        &::placeholder {
            color: var(--white);
        }

        &:focus {
           background: var(--white);
           color: var(--active);
           outline: 2px solid var(--border);

           & + svg circle,
           & + svg path {
            stroke: var(--active);
           }

           & + svg path {
            fill: var(--active);
           }
        }
    }

    &.small {
        top: -120px;
    }


    @media only screen and (min-width: ${breakpoints.desktop}){
        padding: 50px 0;

        h1 {
            font-size: 50px;
            line-height: 63px;
            padding: 50px 0;
        }

        label svg {
            height: 23px;
            width: 23px;
            top: -4px;
            left: 20px;
        }

        input {
            line-height: 30px;
            padding: 20px 20px 20px 60px;
            font-size: 24px;
        }

        &.small {
            top: -200px;
        }
    }
`

const Logo = styled.img`
    height: 18px;
    @media only screen and (min-width: ${breakpoints.desktop}){
        height: 32px;
    }
`

export default function Header({nav, fetchPatientData}) {

    const handleFilter = (e) => {
        fetchPatientData(e.target.value);
    }

    return (
        <Navigation data-testid="nav" ref={nav}>
            <Container>
                <Logo src={logoImage}/>
                <h1>accuBook Dashboard</h1>
                <label>
                    <input type="text" aria-label="patient lookup" placeholder="Search for a patient..." onChange={(e)=> handleFilter(e)}/>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10.5" r="8.5" stroke="white" strokeWidth="3"/>
                        <path d="M21.9393 23.5607C22.5251 24.1464 23.4749 24.1464 24.0607 23.5607C24.6464 22.9749 24.6464 22.0251 24.0607 21.4393L21.9393 23.5607ZM14.9393 16.5607L21.9393 23.5607L24.0607 21.4393L17.0607 14.4393L14.9393 16.5607Z" fill="white"/>
                    </svg>
                </label>
            </Container>
        </Navigation>  
    );
}