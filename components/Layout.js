import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
import Footer from './Footer';

export default function Layout(props){
    return (
    <>
        <div className="bg-orbs" aria-hidden="true" />
        <MainNav /> {/*Imports MainNav.js code and displays Navigation bar at the top of the page */}
        <Container as="main" className="pb-5">
            {props.children}
        </Container>
        <Container>
            <Footer />
        </Container>
    </>);
}
