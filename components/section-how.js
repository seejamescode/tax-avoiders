import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Share from "./share";

const Candidate = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;

  h4 {
    padding-top: 1rem;
  }

  * {
    margin: 0 auto;
  }
`;

const Candidates = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;

  img {
    border-radius: 50%;
    width: 100%;
  }
`;

const SectionHow = ({ name, nameEncoded, url }) => (
  <>
    <h3>Does this seem unfair to you? You can do something about it.</h3>
    <p>
      Bernie Sanders and Elizabeth Warren are the only candidates at the top of
      the presidential primaries that are not accepting super-PAC support.
      <sup>2</sup>
    </p>
    <Candidates>
      <Candidate>
        <picture>
          <source srcSet="/graphics/sanders.webp" type="image/webp" />
          <source srcSet="/graphics/sanders.jpg" type="image/jpeg" />
          <img src="/graphics/sanders.jpg" alt="Portrait of Bernie Sanders" />
        </picture>
        <h4>Bernie Sanders</h4>
        <p>
          <a
            href="https://berniesanders.com/volunteer/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Volunteer
          </a>
        </p>
        <p>
          <a
            href="https://secure.actblue.com/donate/bern-site"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate
          </a>
        </p>
      </Candidate>
      <Candidate>
        <picture>
          <source srcSet="/graphics/warren.webp" type="image/webp" />
          <source srcSet="/graphics/warren.jpg" type="image/jpeg" />
          <img src="/graphics/warren.jpg" alt="Portrait of Elizabeth Warren" />
        </picture>
        <h4>Elizabeth Warren</h4>
        <p>
          <a
            href="https://elizabethwarren.com/take-action"
            rel="noopener noreferrer"
            target="_blank"
          >
            Volunteer
          </a>
        </p>
        <p>
          <a
            href="https://secure.actblue.com/donate/warren-for-president"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate
          </a>
        </p>
      </Candidate>
    </Candidates>
    <p>
      <small>
        Michael Bloomberg is self-funding his campaign, but also one of the
        largest super-PAC donors himself.<sup>4</sup> Joe Biden’s campaign has
        reversed their opposition to super-Pacs. <sup>5</sup>
      </small>
    </p>
    <p>
      Please share the results for {name} with your network to help them
      understand the problem with money in politics:
    </p>
    <Share
      imageUrl={`${url}graphics/open-graph.png`}
      title={`Tax Avoiders | ${name}`}
      url={`${url}company/${nameEncoded}`}
    />
    <Link href="/" passHref>
      <a>Search for another company?</a>
    </Link>
  </>
);

export default SectionHow;
