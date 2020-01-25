import React, { useState, useEffect, useRef } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import Pagination from "../components/pagination";
import getUrl from "../utils/get-url";

const Companies = styled(animated.div)`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  width: 100%;

  @media (min-width: 27rem) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
`;

const Company = styled.div`
  background: ${({ theme }) => theme.colors.navyBlue};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
  padding-bottom: 100%;
  position: relative;
  transition: box-shadow 0.125s cubic-bezier(0.2, 0, 0.38, 0.9),
    transform 0.125s cubic-bezier(0.2, 0, 0.38, 0.9);
  transform: translateY(0) scale(1);
  width: 100%;

  &:focus-within {
    outline: 0.25rem solid ${({ theme }) => theme.colors.libertyGreen};
    outline-offset: -0.25rem;

    *:focus {
      outline: none;
    }
  }

  :hover {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
      0 6px 6px rgba(0, 0, 0, 0.11), 0 10px 10px rgba(0, 0, 0, 0.11),
      0 18px 18px rgba(0, 0, 0, 0.11), 0 34px 34px rgba(0, 0, 0, 0.11);
    transform: translateY(-3px) scale(1.05);
  }
`;

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const Content = styled.a`
  box-sizing: border-box;
  color: white;
  height: 100%;
  padding: 1rem;
  position: absolute;
  text-decoration: none;
  width: 100%;
  word-break: break-word;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-color: ${({ theme }) => theme.colors.navyBlue};
  font-size: inherit;
  padding: 0.5rem;
  transition: outline 0.125s cubic-bezier(0.2, 0, 0.38, 0.9);

  &:focus {
    outline: 0.25rem solid ${({ theme }) => theme.colors.libertyGreen};
    outline-offset: -0.25rem;
  }
`;

const Intro = styled.section`
  display: grid;
  grid-gap: 1rem;
  justify-self: center;
`;

const Title = styled.h2`
  text-align: center;
`;

function Page({
  apiUrl,
  companies: initialCompanies,
  page: initialPage,
  query: initialQuery,
  totalPages: initialTotalPages
}) {
  const didMountRef = useRef(false);
  const [companies, setCompanies] = useState(initialCompanies);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedValue] = useDebounce(searchTerm, 1000);

  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: "translateY(5rem)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(5rem)" },
    unique: true,
    reset: true
  });

  const handleSubmit = async event => {
    event.preventDefault();
    if ("URLSearchParams" in window) {
      const searchParams = new URLSearchParams(window.location.search);
      let newRelativePathQuery = window.location.pathname;
      if (searchTerm.length) {
        searchParams.set("query", searchTerm);
        newRelativePathQuery =
          window.location.pathname + "?" + searchParams.toString();
      } else {
        searchParams.delete("query");
      }
      history.pushState(null, "", newRelativePathQuery);
    }
    search({ page: 1, value: searchTerm });
  };

  const search = async ({ page, value = "" }) => {
    setShow(false);
    const res = await fetch(
      `${apiUrl}${
        value.length ? `search?query=${value}&page=${page}` : `random`
      }`
    );
    const {
      companies: newCompanies,
      totalPages: newTotalPages
    } = await res.json();
    setCompanies(
      newCompanies.map(item => ({
        ...item,
        key: `${item.name}-${Math.random()
          .toString(36)
          .substr(2, 5)}`
      }))
    );
    setPage(page);
    setTotalPages(newTotalPages);
  };

  useEffect(() => {
    if (didMountRef.current) {
      search({ page: 1, value: debouncedValue });
    } else {
      didMountRef.current = true;
    }
  }, [debouncedValue]);

  useEffect(() => {
    setShow(true);
  }, [companies]);

  return (
    <Container>
      <NextSeo
        description={"You always pay taxes, but do companies?"}
        openGraph={{
          description: "You always pay taxes, but do companies?",
          images: [
            {
              alt: "You always pay taxes, but do companies? TaxAvoiders.org",
              height: 630,
              url: "https://taxavoiders.org/graphics/open-graph.png",
              width: 1200
            }
          ],
          site_name: "Tax Avoiders",
          title: "Tax Avoiders",
          type: "website",
          url: "https://taxavoiders.org"
        }}
        title="Tax Avoiders"
        twitter={{
          cardType: "summary_large_image"
        }}
      />
      <Intro>
        <Title>Did your company pay taxes?</Title>
        <p>
          The Institute on Taxation and Economic Policy examined the 2018
          financial filings of Fortune 500 companies. Search to see how much a
          company paid in taxes under President Trump’s Tax Cuts and Jobs Act.
        </p>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="search">
            <small>Company Name</small>
          </label>
          <Input
            type="text"
            id="search"
            onChange={({ target: { value } }) => setSearchTerm(value)}
            placeholder="IBM"
            value={searchTerm}
          />
        </Form>
      </Intro>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Companies key={key} style={props}>
              {companies.map(item => (
                <Company key={item.name}>
                  <Link
                    as={`/company/${encodeURIComponent(
                      item.name.split("&").join("[ampersand]")
                    )}`}
                    href="/company/[name]"
                    passHref
                  >
                    <Content>{item.name}</Content>
                  </Link>
                </Company>
              ))}
            </Companies>
          )
      )}
      {totalPages > 1 ? (
        <Pagination onClick={search} page={page} totalPages={totalPages} />
      ) : null}
    </Container>
  );
}

Page.getInitialProps = async ctx => {
  const apiUrl = getUrl({ ctx, isApi: true });
  const res = await fetch(`${apiUrl}random`);
  const { companies, page, totalPages } = await res.json();

  return {
    apiUrl,
    companies: companies.map(item => ({
      ...item,
      key: `${item.name}-${Math.random()
        .toString(36)
        .substr(2, 9)}`
    })),
    page,
    query: "",
    totalPages
  };
};

export default Page;
