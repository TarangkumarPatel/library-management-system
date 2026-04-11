import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function PageHeader({text, subtext}){
    return (
        <>
            <Card className = "p-4 mb-4 bg-light rounded-3 text-center">
                <Card.Body>
                    <h1 class = "display-4">{text}</h1>
                    {subtext && <p class="lead">{subtext}</p>}
                </Card.Body>
            </Card>
            <br />
        </>
    );
}