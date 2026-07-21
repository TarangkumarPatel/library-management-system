import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { ArrowRightIcon } from "@/components/Icons";

export default function BookCard({workId}){
    const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);
    if (error || (data && !data.title)) {
        return <Error statusCode={404} />;
    }
    if (!data) {
        return (
            <Card className="book-card">
                <div className="skeleton skeleton-cover" />
                <Card.Body>
                    <div className="skeleton skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton skeleton-line" style={{ width: "50%" }} />
                    <div className="skeleton skeleton-line" style={{ width: "40%", height: "2.2rem", marginTop: "1rem", borderRadius: "10px" }} />
                </Card.Body>
            </Card>
        );
    }
    return(
        <Card className="book-card">
            <div className="book-cover-wrap">
                <img
                    onError={(event) => {
                      event.target.onerror = null; // Remove the event handler to prevent infinite loop
                      event.target.src =
                        "https://placehold.co/400x600?text=Cover+Not+Available";
                    }}
                    src={
                      data.covers
                        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
                        : "https://placehold.co/400x600?text=Cover+Not+Available"
                    }
                    alt="Cover Image"
                />
                {data.first_publish_date && (
                    <span className="book-year-badge">{data.first_publish_date}</span>
                )}
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{data.title? data.title : ""}</Card.Title>
                <Link href={`/works/${workId}`} passHref className="mt-auto">
                    <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center gap-2">
                        View Details <ArrowRightIcon />
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}
