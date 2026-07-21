import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { HeartIcon, ExternalLinkIcon } from "@/components/Icons";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  };

  return (
    <Container className="fade-in-up">
      <Row className="g-4">
        <Col lg="4">
          <div className="book-detail-cover">
            <img
              onError={(event) => {
                event.target.onerror = null;
                event.target.src =
                  "https://placehold.co/400x600?text=Cover+Not+Available";
              }}
              src={
                book.covers
                  ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                  : "https://placehold.co/400x600?text=Cover+Not+Available"
              }
              alt="Cover Image"
            />
          </div>

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
              className="fav-btn-floating w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
            >
              <HeartIcon filled={showAdded} />
              {showAdded ? "Added to Favourites" : "Add to Favourites"}
            </Button>
          )}
        </Col>

        <Col lg="8">
          <h3>{book?.title}</h3>
          {book?.description && (
            <p className="mt-3">
              {typeof book.description === "string"
                ? book.description
                : book.description?.value}
            </p>
          )}

          {book?.subject_people && (
            <div className="mt-4">
              <div className="section-title">Characters</div>
              <div className="chip-group">
                {book.subject_people.map((person, i) => (
                  <span className="chip" key={i}>{person}</span>
                ))}
              </div>
            </div>
          )}

          {book?.subject_places && (
            <div className="mt-4">
              <div className="section-title">Settings</div>
              <div className="chip-group">
                {book.subject_places.map((place, i) => (
                  <span className="chip" key={i}>{place}</span>
                ))}
              </div>
            </div>
          )}

          {book?.links && (
            <div className="mt-4">
              <div className="section-title">More Information</div>
              <div className="chip-group">
                {book.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-pill"
                  >
                    {link.title} <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
