import Card from 'react-bootstrap/Card';

export default function PageHeader({text, subtext}){
    return (
        <Card className="hero-header mb-4 fade-in-up">
            <Card.Body>
                <h1 className="display-4 gradient-text">{text}</h1>
                {subtext && <p className="lead">{subtext}</p>}
            </Card.Body>
        </Card>
    );
}
