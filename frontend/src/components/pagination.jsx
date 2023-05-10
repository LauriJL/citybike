// Packages
import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";

// Assets
import "../css/styles.css";

const Pagination = (props) => {
  const [nextURL, setNextURL] = useState(props.next);
  const [prevURL, setPrevURL] = useState();
  const [count, setCount] = useState();

  const handlePageClick = async (data) => {
    let link = props.link + `/?page=${data.selected + 1}`;
    let response = await (await fetch(link)).json();
    setNextURL(response.next);
    setPrevURL(response.previous);
    setCount(response.count);
    props.setData(response.results);
  };

  return (
    <Container className="pagination">
      <Container className="flex-wrap justify-content-between align-items-center py-2 my-4">
        <ReactPaginate
          previousLabel={" << "}
          nextLabel={" >> "}
          breakLabel={"..."}
          pageCount={props.totalPages}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        />
      </Container>
    </Container>
  );
};

export default Pagination;
