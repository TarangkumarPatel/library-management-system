import BookCard from "@/components/BookCard";
import PageHeader from "@/components/PageHeader";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Col, Row } from "react-bootstrap";

export default function Favourites() {

    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null; // Handle the case where favouritesList is undefined (e.g., before it's loaded)

    if (favouritesList.length === 0) {
        return (
            <>
                <PageHeader 
                    text="Nothing Here" 
                    subtext="Add a book to favourites first for the book appear here." 
                />
            </>
        );
    }
    return (
        <>
            <PageHeader 
                text="Favourite Books" 
                subtext="Here are all the your favourite books." 
            />
            <Row className="gy-4">
                {favouritesList.map((workId) => (
                    <Col lg={3} md={6} key={workId}>
                        <BookCard workId={workId} />
                    </Col>
                ))}
            </Row>
        </>
    );
}