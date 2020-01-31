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
  /* cyrillic-ext */
  @font-face {
    font-family: 'Lora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Lora Regular'), local('Lora-Regular'), url(/fonts/0QIvMX1D_JOuMwf7I_FMl_GW8g.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Lora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Lora Regular'), local('Lora-Regular'), url(/fonts/0QIvMX1D_JOuMw77I_FMl_GW8g.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Lora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Lora Regular'), local('Lora-Regular'), url(/fonts/0QIvMX1D_JOuMwX7I_FMl_GW8g.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Lora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Lora Regular'), local('Lora-Regular'), url(/fonts/0QIvMX1D_JOuMwT7I_FMl_GW8g.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Lora';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Lora Regular'), local('Lora-Regular'), url(/fonts/0QIvMX1D_JOuMwr7I_FMl_E.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  * {
    font-family: 'Lora', serif;
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
