import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";
import Error from "next/error";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Container, Row, Col } from "react-bootstrap";

export default function Work() {
  const router = useRouter();

  const { workId } = router.query;
  const {data, error, isLoading} = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if(isLoading){
    return (
      <Container>
        <div className="skeleton skeleton-line" style={{ width: "50%", height: "3rem", borderRadius: "16px", marginBottom: "2rem" }} />
        <Row className="g-4">
          <Col lg="4">
            <div className="skeleton skeleton-cover" />
          </Col>
          <Col lg="8">
            <div className="skeleton skeleton-line" style={{ width: "60%", height: "1.6rem" }} />
            <div className="skeleton skeleton-line" style={{ width: "100%" }} />
            <div className="skeleton skeleton-line" style={{ width: "100%" }} />
            <div className="skeleton skeleton-line" style={{ width: "80%" }} />
          </Col>
        </Row>
      </Container>
    );
  }

  if(error){
    return <Error statusCode={404} />;
  }

  return(
    <>
        <PageHeader text={data.title} />
        <BookDetails book={data} workId={workId} />
    </>
  );
}