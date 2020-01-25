import App from "next/app";
import React from "react";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Background from "../components/background";

Router.events.on("routeChangeStart", url => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
  window.scrollTo(0, 0);
});
Router.events.on("routeChangeError", () => NProgress.done());

const theme = {
  colors: {
    libertyGreen: "rgb(183, 228, 207)",
    navyBlue: "rgb(35, 36, 68)"
  },
  type: {
    a: "2.441rem",
    b: "1.563rem",
    c: "1.25rem"
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Playfair Display', serif;
    margin: 0;
  }

  body {
    color: ${({ theme }) => theme.colors.navyBlue};
    padding: 2rem;
  }

  h2 {
    font-size: ${({ theme }) => theme.type.a};
  }

  h3 {
    font-size: ${({ theme }) => theme.type.c};
    padding-top: 4rem;
  }

  h1, h2, h3, p {
    max-width: 24rem;
  }

  a {
    text-underline-position: under;
    color: inherit;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${({ theme }) => theme.colors.navyBlue};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 4px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
`;

const Name = styled.a`
  display: block;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <nav>
          <h1>
            <Link href="/" passHref>
              <Name>Tax Avoiders</Name>
            </Link>
          </h1>
        </nav>
        <Component {...pageProps} />
        <GlobalStyle whiteColor />
        <div
          style={{
            height: "100%",
            left: 0,
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: -1
          }}
        >
          <Background />
        </div>
      </ThemeProvider>
    );
  }
}
