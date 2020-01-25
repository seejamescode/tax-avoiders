import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import Share from "../../components/share";
import deficit from "../../data/deficit";
import formatMoney from "../../utils/format-money";
import getUrl from "../../utils/get-url";

const Answer = styled.p`
  color: ${({ bad }) => (bad ? "#a0282d" : "inherit")};
  font-size: ${({ theme }) => theme.type.c};
  margin: 0 auto;
  text-align: center;
`;

const Candidate = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

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

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  max-width: 23rem;
  width: 100%;

  a,
  h2,
  h3,
  h4 {
    margin: 0 auto;
    text-align: center;
  }
`;

const Source = styled.li`
  margin-top: 1rem;

  :first-child {
    margin-top: 0;
  }
`;

function Page(props) {
  const { name, profit, tax, url } = props;
  const nameEncoded = encodeURIComponent(name.split("&").join("[ampersand]"));
  const rateRough = tax / profit;
  const rate =
    rateRough.toString().length >= 4
      ? Math.round((rateRough + Number.EPSILON) * 100) / 100
      : rateRough;
  const rateFormatted = `${(rate * 100).toFixed(2).replace(".00", "")}%`;

  const isRateShort = rate < 21;
  const profitFormatted = formatMoney(profit);
  const taxFormatted = formatMoney(tax);
  const answerMain =
    rate >= 0.21
      ? "Yes!"
      : rate >= 0.18
      ? "Almost."
      : rate >= 0.12
      ? "Not quite."
      : rate >= 0
      ? "Not even close."
      : "No. In fact, they got a tax refund! What in the world...";
  const answerMath =
    tax > 0 ? (
      `And they paid ${taxFormatted} in taxes.`
    ) : tax === 0 ? (
      "And they paid nothing in taxes."
    ) : (
      <>
        But they received a tax refund of{" "}
        <span style={{ whiteSpace: "nowrap" }}>
          {taxFormatted.replace("-", "")}.
        </span>
      </>
    );

  const answerMathExplaination =
    rate >= 0.21 ? (
      <>
        <p>
          Turns out, {name} is a good corporate citizen when it comes to paying
          their fair share. Woohoo!
        </p>
        <p>
          But, there are plenty of companies that aren’t, unfortunately.{" "}
          <Link href="/" passHref>
            <a>Research more of them here</a>
          </Link>
          .
        </p>
      </>
    ) : rate >= 0.18 ? (
      <p>
        Turns out, {name} is a decent corporate citizen. But the corporate tax
        rate is 21% so they missed the mark by{" "}
        {formatMoney((0.21 - rate) * profit)}. There’s more work to be done!
      </p>
    ) : (
      <>
        <h3>But how did this happen?</h3>
        <p>
          The current corporate tax rate is 21%. (This means that companies
          should pay 21% of their profits back to the government to support
          infrastructure, national defense, and government services for all of
          us, among other things. Just like you do when you collect a
          paycheck—you contribute some of that money back to the government, at
          a particular rate.)
        </p>
        <p>
          However, there are plenty of loopholes in tax law. Loopholes are when
          laws are written loosely enough that companies can creatively
          interpret their meaning.
        </p>
        <h3>
          Why is tax law being written that way? Doesn’t the government want
          their money?
        </h3>
        <p>
          Sort of. But don’t forget that the government is made up of
          politicians, who are real people with their own motives (to be
          re-elected, make money, win favor, for example) that aren’t always
          aligned with our best interests. So companies spend money lobbying
          politicians for laws that favor the company and their best interests.
          They literally ask for the loopholes. In meetings. Or swanky parties.
          With politicians in Washington.
        </p>
      </>
    );
  console.log(url);
  return (
    <Container>
      <NextSeo
        description={`Did ${name} pay their fair share of taxes?`}
        openGraph={{
          description: `Did ${name} pay their fair share of taxes?`,
          images: [
            {
              alt: "You always pay taxes, but do companies? TaxAvoiders.org",
              height: 630,
              url: "https://taxavoiders.org/graphics/open-graph.png",
              width: 1200
            }
          ],
          site_name: "Tax Avoiders",
          title: `${name} | Tax Avoiders`,
          type: "website",
          url: `${url}company/${encodeURIComponent(
            name.split("&").join("[ampersand]")
          )}`
        }}
        title={`${name} | Tax Avoiders`}
        twitter={{
          cardType: "summary_large_image"
        }}
      />
      <h2>Did {name} pay their fair share of taxes?</h2>
      <Answer bad={isRateShort}>{answerMain}</Answer>
      <h3>Here’s the math:</h3>
      <p>
        In 2018, {name} had a net profit of {profitFormatted}
      </p>
      <Answer bad={isRateShort}>
        {answerMath} That’s an effective tax rate of {rateFormatted}.
        <sup>1</sup>
      </Answer>
      {answerMathExplaination}
      <h3>What can you do about this?</h3>
      <p>
        Bernie Sanders and Elizabeth Warren are the only candidates at the top
        of the presidential primaries that are not accepting super-PAC support.
        <sup>2</sup> Help them now:
      </p>
      <Candidates>
        <Candidate>
          <picture>
            <source srcSet="/graphics/sanders.webp" type="image/webp" />
            <source srcSet="/graphics/sanders.jpg" type="image/jpeg" />
            <img src="/graphics/sanders.jpg" alt="Portrait of Bernie Sanders" />
          </picture>
          <h4>Bernie Sanders</h4>
          <a
            href="https://berniesanders.com/volunteer/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Volunteer
          </a>
          <a
            href="https://secure.actblue.com/donate/bern-site"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate
          </a>
        </Candidate>
        <Candidate>
          <picture>
            <source srcSet="/graphics/warren.webp" type="image/webp" />
            <source srcSet="/graphics/warren.jpg" type="image/jpeg" />
            <img
              src="/graphics/warren.jpg"
              alt="Portrait of Elizabeth Warren"
            />
          </picture>
          <h4>Elizabeth Warren</h4>
          <a
            href="https://elizabethwarren.com/take-action"
            rel="noopener noreferrer"
            target="_blank"
          >
            Volunteer
          </a>
          <a
            href="https://secure.actblue.com/donate/warren-for-president"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate
          </a>
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
        Please share the results for {name} with your friends and family to help
        them understand the problem with money in politics:
      </p>
      <Share
        imageUrl={`${url}graphics/open-graph.png`}
        title={`Tax Avoiders | ${name}`}
        url={`${url}company/${nameEncoded}`}
      />
      <Link href="/" passHref>
        <a>Search for another company?</a>
      </Link>
      <h3>Why does this matter?</h3>
      <p>
        The 2017 Tax Cuts and Jobs Act lowered the effective tax rate for
        corporations from 35% to 21%. There are arguments to be made for both
        sides: If companies pay less in taxes, they can hire more Americans and
        keep the economy moving upward. On the other side, companies have been
        finding loopholes in the tax laws for years. While one might think
        lowering the tax rate for companies will encourage them to meet their
        obligations to the government, it turns out that—just like in the
        past—companies have found loopholes in the new tax laws that help them
        pay less than 21%.
      </p>
      <p>
        Why? One of the biggest reasons is that companies are actively
        advocating for these tax loopholes! They spend huge sums to lobby
        government officials and contribute funds to Political Action Committees
        (PACs) that align with their interests. Basically, companies are able to
        directly fund politicians that align with their interests, not the
        American people’s interests.
      </p>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        domainPadding={{ x: 10, y: 10 }}
        padding={{ bottom: 50, left: 50, top: 0 }}
      >
        <VictoryAxis
          crossAxis
          label="US Budget Deficit"
          style={{
            axisLabel: { padding: 30 },
            tickLabels: { color: "white", fontSize: 12 }
          }}
          // tickFormat specifies how ticks should be displayed
          tickFormat={x => `${x}`}
        />
        <VictoryAxis
          crossAxis
          dependentAxis
          style={{
            axis: { stroke: "white" },
            grid: { stroke: "grey" },
            tickLabels: { fontSize: 12 }
          }}
          tickValues={[0, 500, 1000]}
          // tickFormat specifies how ticks should be displayed
          tickFormat={y => (y > 0 ? `$${y}b` : 0)}
        />
        <VictoryBar
          data={deficit}
          // data accessor for x values
          x="year"
          // data accessor for y values
          y="amount"
        />
      </VictoryChart>
      <p>
        Until we elect candidates that refuse to take corporate money—Bernie
        Sanders and Elizabeth Warren—corporate influence on our government will
        continue to lead to corruption. Companies will continue to dodge their
        tax obligations as our budget deficit rapidly increases. Note the jump
        between 2018 and 2019 in the budget deficit.<sup>5</sup>
      </p>
      <Link href="/" passHref>
        <a>Search for another company?</a>
      </Link>
      <h3>Sources</h3>
      <ol>
        <Source>
          <a
            href="https://itep.org/corporate-tax-avoidance-in-the-first-year-of-the-trump-tax-law/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Institute on Taxation and Economic Policy: Corporate Tax Avoidance
            in the First Year of the Trump Tax Law
          </a>
        </Source>
        <Source>
          <a
            href="https://www.vox.com/policy-and-politics/2019/6/24/18656919/2020-democratic-presidential-candidates-campaign-donations-finance-pledges"
            rel="noopener noreferrer"
            target="_blank"
          >
            Vox: 2020 Democrats’ campaign finance pledges, explained
          </a>
        </Source>
        <Source>
          <a
            href="https://www.nytimes.com/2019/10/24/us/politics/joe-biden-super-pac.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            The New York Times: Biden Campaign Drops Opposition to Super PAC
            Support
          </a>
        </Source>
        <Source>
          <a
            href="https://www.citizen.org/article/oligarch-overload/?eType=EmailBlastContent&eId=33ce6cd2-22f1-49a4-bc83-d7f0ae5a1d41"
            rel="noopener noreferrer"
            target="_blank"
          >
            Oligarch Overload: How Ultra-Rich Donors Have Flooded American
            Politics With Cash Since Citizens United
          </a>
        </Source>
        <Source>
          <a
            href="https://www.thebalance.com/us-deficit-by-year-3306306"
            rel="noopener noreferrer"
            target="_blank"
          >
            US Budget Deficit by Year Compared to GDP, Debt Increase, and Events
          </a>
        </Source>
        <Source>
          <a
            href="https://commons.wikimedia.org/wiki/File:Bernie_Sanders_July_2019_(cropped).jpg"
            rel="noopener noreferrer"
            target="_blank"
          >
            Wikimedia Commons: Photograph of Bernie Sanders
          </a>
        </Source>
        <Source>
          <a
            href="https://elizabethwarren.com/faqs/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Elizabeth Warren Campaign: Photograph of Elizabeth Warren
          </a>
        </Source>
      </ol>
    </Container>
  );
}

Page.getInitialProps = async ctx => {
  const apiUrl = getUrl({ ctx, isApi: true });
  const url = getUrl({ ctx });

  const res = await fetch(`${apiUrl}company?name=${ctx.query.name}`);
  const company = await res.json();

  return { ...company, url };
};

export default Page;
