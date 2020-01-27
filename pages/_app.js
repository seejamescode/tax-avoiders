import App from "next/app";
import React from "react";
import Link from "next/link";
import Router from "next/router";
import withGA from "next-ga";
import NProgress from "nprogress";
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
    badRed: "#a0282d",
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

  h1 {
    display: flex;
  }

  h2 {
    font-size: ${({ theme }) => theme.type.a};
  }

  h3 {
    font-size: ${({ theme }) => theme.type.c};
    padding-top: 4rem;
  }

  a {
    color: inherit;
    text-underline-position: under;
    transition: box-shadow 0.1s ease-in-out;

    :hover {
      box-shadow: inset 0 0px 0 white, inset 0 -3px 0 ${({ theme }) =>
        theme.colors.libertyGreen};
      text-decoration-color: ${({ theme }) => theme.colors.libertyGreen};
    }
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
  display: inline-block;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

class MyApp extends App {
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

export default withGA("UA-43808769-16", Router)(MyApp);
