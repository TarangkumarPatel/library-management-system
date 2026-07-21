import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import MainNav from './MainNav';
import Footer from './Footer';
import RouteProgress from './RouteProgress';

export default function Layout(props){
    const router = useRouter();
    return (
    <>
        <div className="bg-orbs" aria-hidden="true" />
        <RouteProgress />
        <MainNav /> {/*Imports MainNav.js code and displays Navigation bar at the top of the page */}
        <Container as="main" className="pb-5">
            <div key={router.asPath} className="route-fade">
                {props.children}
            </div>
        </Container>
        <Container>
            <Footer />
        </Container>
    </>);
}
