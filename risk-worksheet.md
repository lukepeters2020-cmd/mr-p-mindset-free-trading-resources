# A planned-risk worksheet

This model is for an invented cash-only long stock position with whole shares. Values use a single currency. It does not calculate a universally safe trade size.

| Input | Hypothetical value |
|---|---:|
| Account equity | 10,000 |
| Teaching risk fraction | 0.01 (1%) |
| Entry price | 50 |
| Intended stop price | 48 |
| Estimated round-trip cost per share | 0.10 |
| Available cash | 10,000 |
| Estimated entry cost per share | 0.05 |

Planned budget = 10,000 × 0.01 = 100.

Modelled loss per share = (50 − 48) + 0.10 = 2.10.

Risk-based quantity = floor(100 ÷ 2.10) = 47 whole shares.

Cash-based quantity = floor(10,000 ÷ 50.05) = 199 shares.

The tighter constraint gives 47 shares. Modelled loss at the assumed exit is 47 × 2.10 = 98.70. The purchase value before entry costs is 47 × 50 = 2,350. Planned loss and purchase value are different measures.

If the exit occurs at 45, the price loss alone is 47 × 5 = 235. Actual costs or execution can make the outcome worse. A stop does not guarantee a loss ceiling.

## Review before changing an input

- Is the stop below the entry for this long-position example?
- Are all prices and cash values in the same currency?
- Are costs estimates or actual observed charges?
- Does available cash impose a tighter constraint?
- Could correlated positions lose together?
- What would a gap past the planned stop do?

For options, futures, short sales, leverage and foreign currencies, additional mechanics and risks apply. Do not reuse this simple formula without modelling those differences.

The accompanying `tools/risk-math.mjs` implements precisely this example and rejects missing, non-finite and inconsistent inputs. The risk fraction is an input, not a recommendation.

Primary reading on order limitations: [Investor.gov — Types of Orders](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders).
