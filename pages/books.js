import useSWR from "swr";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

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
  console.log("SWR Data:", data);
  console.log("State PageData:", pageData);
  const subtext = Object.entries(router.query).map(([key, value]) => `${key}: ${value}`).join(", ");
  return (
    <>
      <PageHeader text="Search Results" subtext={subtext || "All Books"} />
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Publish Year</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(`/works/${book.key.split("/").pop()}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.title}</td>
              <td>
                {book.first_publish_year ? book.first_publish_year : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}