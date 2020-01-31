# [taxavoiders.org](taxavoiders.org)

Did you know that 324 Fortune 500 companies did not pay their fair share of taxes in 2018?

We built a quick tool to help regular people understand the influence of corporate money in politics. As two politically interested, civically engaged people, we want people to better understand how corporate lobbying and PACs are connected to tax incentives, and, in turn, to vote for candidates who won’t take corporate money. Use this tool to see the connection between Fortune 500 companies how much or how little they pay in taxes, which aren’t, and how much money they’re spending to influence politicians with lobbying and PAC donations.

And because companies aren’t required to release their full tax returns, it’s hard to know exactly which tax credits, deferrals, or other incentives each company is taking. But there are patterns that suggest what we all know: Money talks in politics.

## What’s going on here?

One of the biggest reasons companies don’t pay their fair share (which went down to 21% from 35% with Trump’s 2017 Tax Cuts and Jobs Act) is they’re legally allowed to advocate for tax incentives, credits, and laws that help them pay less.

## What can we do about it?

Until we elect candidates that refuse to take corporate money—like Bernie Sanders and Elizabeth Warren—corporate influence on our government will continue to lead to corruption. Companies will continue to dodge their tax obligations and our budget deficit will rapidly increase.

## Where’s our data from?

Static tax data came from the Institute on Taxation and Economic Policy. Lobbying and PAC donation data came from the Open Secrets API.

## Development

Dev mode requires the installation of Node and a `.env` file in the root with your Open Secrets API key:

```
OPEN_SECRETS_API_KEY=
```

Run `npm i` once to install third-party packages. Then `npm run dev` anytime you want to develop at http://localhost:3000.
