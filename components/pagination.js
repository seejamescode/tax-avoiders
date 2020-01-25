import React from "react";
import styled from "styled-components";

const Span = styled.span`
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  margin: 0 0.25rem;
  padding: 0;
  text-decoration: ${({ current }) => (current ? "underline" : "none")};
`;

const Button = styled(Span).attrs({
  as: "button",
  type: "button"
})`
  cursor: pointer;
`;

const Container = styled.nav`
  display: flex;
  justify-content: center;
`;

const Pagination = ({ onClick, page, totalPages }) => {
  const delta = 1;

  let range = [];
  for (
    let i = Math.max(2, page - delta);
    i <= Math.min(totalPages - 1, page + delta);
    i += 1
  ) {
    range.push(i);
  }

  if (page - delta > 1) {
    range.unshift("...");
  }
  if (page + delta < totalPages - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (totalPages !== 1) range.push(totalPages);

  range = range.map((item, index) => {
    if (typeof item !== "number") {
      return <Span key={"..." + index}>...</Span>;
    }

    if (item === page) {
      return (
        <Span current key={item}>
          {item}
        </Span>
      );
    }

    return (
      <Button
        aria-label={`Page ${item}`}
        key={item}
        onClick={() => onClick({ page: item })}
      >
        {item}
      </Button>
    );
  });

  return <Container>{range}</Container>;
};

export default Pagination;
