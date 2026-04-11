import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { set } from "react-hook-form";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
      // setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(workId));
      // setShowAdded(true);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={
              book.covers
                ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                : "https://placehold.co/400x600?text=Cover+Not+Available"
            }
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        <Col lg="8">
          <h3>{book?.title}</h3>
          {book?.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description?.value}
            </p>
          )}
          <br />
          {book?.subject_people && (
            <>
              <h5>Characters</h5>
              <p>{book.subject_people.join(", ")}</p>
            </>
          )}
          <br />
          <br />
          {book?.subject_places && (
            <>
              <h5>Settings</h5>
              <p>{book.subject_places.join(", ")}</p>
            </>
          )}
          <br />
          <br />
          {book?.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}
          <br />

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          )}
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  );
}
