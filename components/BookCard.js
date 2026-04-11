import Books from "@/pages/books";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";

export default function BookCard({workId}){
    const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);
    if (error || (data && !data.title)) {
        return <Error statusCode={404} />;
    }
    if (!data) {
        return null;
    }
    return(
     <>
        <Card>
            <Card.Img 
                variant="top"
                onError={(event) => {
                  event.target.onerror = null; // Remove the event handler to prevent infinite loop
                  event.target.src =
                    "https://placehold.co/400x600?text=Cover+Not+Available";
                }}
                className="img-fluid w-100"
                src={
                  data.covers
                    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
                    : "https://placehold.co/400x600?text=Cover+Not+Available"
                }
                alt="Cover Image"
            />
            <Card.Body> 
                <Card.Title>{data.title? data.title : ""}</Card.Title>
                <Card.Text>{data.first_publish_date? data.first_publish_date : "N/A"}</Card.Text>
                <Link href={`/works/${workId}`} passHref>
                    <Button variant="primary">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
     </>
    )
}