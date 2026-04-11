import { Container } from 'react-bootstrap'; 
import MainNav from './MainNav';

export default function Layout(props){
    return (
    <>
        <MainNav /> {/*Imports MainNav.js code and displays Navigation bar at the top of the page */}
        <br />
        <Container> {/*to center the content a prebuilt bootstrap class like a div with class "container" and some margin */}
            {props.children}
        </Container>
        <br />
    </>);
}