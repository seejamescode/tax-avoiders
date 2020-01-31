import React from "react";
import fetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import SectionHow from "../../components/section-how";
import SectionWhy from "../../components/section-why";
import formatMoney from "../../utils/format-money";
import getUrl from "../../utils/get-url";

const Answer = styled.p`
  color: ${({ bad, theme }) => (bad ? theme.colors.badRed : "inherit")};
  font-size: ${({ theme }) => theme.type.c};
  margin: 0 auto;
  text-align: center;
`;

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  max-width: 30rem;
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
  const { details, name, profit, tax, url } = props;
  const isDonatingToPacs =
    details && details.gave_to_pac && details.gave_to_pac > 0;
  const isLobbying = details && details.lobbying && details.lobbying > 0;
  const isLobbyingAndPacs = isDonatingToPacs && isLobbying;
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
      : rate >= 0.07
      ? "No."
      : rate > 0
      ? "Not even close."
      : rate === 0
      ? "No. They didn’t pay any taxes in 2018."
      : "No. In fact, they got a tax refund!";
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
          their fair share.
        </p>
        <p>
          Still, 324 of Fortune 500 companies are not paying their fair share.
        </p>

        <SectionWhy />
        <SectionHow name={name} nameEncoded={nameEncoded} url={url} />
      </>
    ) : rate >= 0.18 ? (
      <>
        <p>
          Turns out, {name} is a decent corporate citizen. But the federal
          corporate tax rate is 21% so they missed the mark by{" "}
          {formatMoney((0.21 - rate) * profit)}. Imagine how that much more
          money could contribute to the public good or pay down our federal
          budget deficit.
        </p>
        <p>
          Still, 324 of Fortune 500 companies are not paying their fair share.
        </p>
        <SectionWhy />
        <SectionHow name={name} nameEncoded={nameEncoded} url={url} />
      </>
    ) : (
      <>
        <h3>What’s going on here?</h3>
        <p>
          Companies aren’t required to release their full tax returns, so it’s
          hard to know exactly why {name}’s effective tax rate was{" "}
          {rateFormatted}. However, corporations have access to myriad tax
          credits or abatements that affect their effective tax rate, making it
          possible to avoid paying the flat 21% tax rate. Some federal tax
          credits are progressive—they’re given to incentivize behavior meant to
          keep jobs in the US, protect the environment, and contribute to local
          communities (though there’s debate about how much “good” these
          actually do). However, others seem highly unfair, like the commonly
          used option to take a tax deferral, which can incentivize companies to
          keep profits in countries outside the U.S. to avoid paying taxes on
          them.
        </p>
        {isLobbyingAndPacs ? (
          <>
            <h3>But also...</h3>
            <Answer bad>
              We know that {name} spent {formatMoney(details.lobbying)} lobbying
              and donated an additional {formatMoney(details.gave_to_pac)} to
              Political Action Committees for the {details.cycle} election
              cycle.
              <sup>8</sup>
            </Answer>
            <p>
              For corporations, lobbying literally means hiring people to go to
              Washington, meet with politicians, and seek to influence their
              votes and decision-making. Lobbying is both complex and subtle;
              you can learn more about{" "}
              <a
                href="https://en.wikipedia.org/wiki/Lobbying_in_the_United_States#Lobbying_as_a_business"
                rel="noopener noreferrer"
                target="_blank"
              >
                lobbying as a business
              </a>
              . And, it’s entirely legal. PACs are another way companies seek to
              influence politics—by legally donating money to help or hurt
              politicians' election campaigns.
            </p>
          </>
        ) : isLobbying ? (
          <>
            <h3>But also...</h3>
            <Answer bad>
              We know that {name} spent {formatMoney(details.lobbying)} lobbying
              for the {details.cycle} election cycle.<sup>8</sup>
            </Answer>
            <p>
              For corporations, lobbying literally means hiring people to go to
              Washington, meet with politicians, and seek to influence their
              votes and decision-making. Lobbying is both complex and subtle;
              you can learn more about it{" "}
              <a
                href="https://en.wikipedia.org/wiki/Lobbying_in_the_United_States#Lobbying_as_a_business"
                rel="noopener noreferrer"
                target="_blank"
              >
                lobbying as a business
              </a>
              . And, it’s entirely legal.
            </p>
          </>
        ) : isDonatingToPacs ? (
          <>
            <h3>But also...</h3>
            <Answer bad>
              We know that {name} donated {formatMoney(details.gave_to_pac)} to
              Political Action Committees for the {details.cycle} election
              cycle.
              <sup>8</sup>
            </Answer>
            <p>
              For corporations, PACs are another way companies seek to influence
              politics—by legally donating money to help or hurt politicians'
              election campaigns.
            </p>
          </>
        ) : (
          ""
        )}
        {(isLobbying || isDonatingToPacs) && details.source ? (
          <p>
            If you want a sense of how much {name} spent on{" "}
            {isLobbyingAndPacs
              ? "lobbying and PACs"
              : isLobbying
              ? "lobbying"
              : "PACs"}{" "}
            for tax breaks specifically, you’ll have to{" "}
            <a
              href={`https://${details.source
                .replace("https://", "")
                .replace("http://", "")}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              dig in and do a little research yourself
            </a>
            . (The data is provided by the Center for Responsive Politics, using
            reports from the Senate Office of Public Records).
          </p>
        ) : (
          ""
        )}
        <SectionHow name={name} nameEncoded={nameEncoded} url={url} />
        <SectionWhy />
      </>
    );

  return (
    <Container>
      <NextSeo
        description={`You pay your taxes. But is ${name} paying their fair share? See who’s paying, who’s not, and how much they’re spending to influence the rules.`}
        openGraph={{
          description: `You pay your taxes. But is ${name} paying their fair share? See who’s paying, who’s not, and how much they’re spending to influence the rules.`,
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
          url: `${url}company/${nameEncoded}`
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
        In 2018, {name} reported a net profit of {profitFormatted}
      </p>
      <Answer bad={isRateShort}>
        {answerMath} That’s an effective tax rate of {rateFormatted}.
        <sup>1</sup>
      </Answer>
      {answerMathExplaination}
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
        {isLobbying || isDonatingToPacs ? (
          <Source>
            <a
              href="https://opensecrets.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Open Secrets for lobbying and PAC activity
            </a>
          </Source>
        ) : null}
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
