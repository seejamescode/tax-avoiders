import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import deficit from "../data/deficit";

const SectionWhy = () => (
  <>
    <h3>Why does this matter?</h3>
    <p>
      The 2017 Tax Cuts and Jobs Act lowered the effective tax rate for
      corporations from 35% to 21%. There are arguments that this is good: If
      companies pay less in taxes, they can hire more Americans and keep the
      economy moving upward. However, there are plenty of so-called “loopholes”
      in tax law (and have been for years) that allow companies to pay less than
      the stated rate. While one might think lowering the tax rate for companies
      will encourage them to meet their obligations to the government, it turns
      out that—just like in the past—companies have found ways to pay less than
      21%.
    </p>
    <p>
      Why? One of the biggest reasons is that companies are allowed to advocate
      for tax incentives, credits, and laws that help them pay less, by lobbying
      and giving money to PACs. Until we elect candidates that refuse to take
      corporate money—like Bernie Sanders and Elizabeth Warren—corporate
      influence on our government will continue to lead to corruption. Companies
      will continue to dodge their tax obligations as our budget deficit rapidly
      increases.<sup>5</sup>
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
  </>
);

export default SectionWhy;
