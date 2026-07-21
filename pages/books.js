import useSWR from "swr";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/Icons";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();
  // const author = "Terry Pratchett";
  // const { data, error } =
  //   useSWR(`https://openlibrary.org/search.json?q=author:${encodeURIComponent(author)}&page=${page}&limit=10`);
  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" ");
  }

  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10`,
  );
 const author = router.query.author || "Unknown Author";
  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    setPage(page + 1);
  };
  const subtext = Object.entries(router.query).map(([key, value]) => `${key}: ${value}`).join(", ");
  const isLoading = !data;
  const hasResults = pageData?.docs?.length > 0;

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext || "All Books"} />

      <div className="table-wrap fade-in-up delay-1">
        <Table striped hover className="mb-0">
          <thead>
            <tr>
              <th>Title</th>
              <th>First Publish Year</th>
              <th className="text-end">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td><div className="skeleton skeleton-line" style={{ width: "70%" }} /></td>
                  <td><div className="skeleton skeleton-line" style={{ width: "40%" }} /></td>
                  <td></td>
                </tr>
              ))}

            {!isLoading && !hasResults && (
              <tr>
                <td colSpan={3} className="text-center text-muted-soft py-4">
                  No books matched your search. Try different criteria.
                </td>
              </tr>
            )}

            {!isLoading && pageData?.docs?.map((book) => (
              <tr
                key={book.key}
                onClick={() => router.push(`/works/${book.key.split("/").pop()}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{book.title}</td>
                <td>
                  {book.first_publish_year ? book.first_publish_year : "N/A"}
                </td>
                <td className="text-end"><ArrowRightIcon /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev onClick={previous} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={next} />
        </Pagination>
      </div>
    </>
  );
}