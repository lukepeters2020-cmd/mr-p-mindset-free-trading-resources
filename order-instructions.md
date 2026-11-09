# Read an order as an instruction

Before a practice order, write the instrument, currency, direction, quantity, order type, price conditions, session and time in force. A familiar-looking buy button does not tell you all of these things.

| Common instruction | What it attempts | What it does not promise |
|---|---|---|
| Market buy | Buy at available market prices | A specific price or immediate execution in every condition |
| Buy limit at 99 | Buy at 99 per share or lower | Any fill or a complete fill |
| Sell stop-market triggered at 90 | Activate a market sale under the broker’s trigger rules | An exit at 90 |
| Sell stop-limit, trigger 90 and limit 89 | Activate a sell limit at 89 | A sale if available bids are below the limit |

## An invented gap example

An entry is 100. A sell stop-market trigger is 90. The next available prices after a sharp gap are near 85. The order may fill near 85 or at another available price. The trigger did not reserve a buyer at 90.

If a stop-limit instead sets a minimum sale price of 89, the order may remain unfilled below 89. A limit addresses price, while an unfilled position remains exposed.

## Observation task

1. Describe which of the four instructions sets a purchase ceiling.
2. Identify which order may become a market order after triggering.
3. Explain why a candle touching a limit line does not prove your hypothetical order would fill.
4. Record whether the exercise uses generated, historical, delayed or real-time data.

Broker-specific trigger rules and permitted sessions differ. This sheet is a simplified explanation, not broker instructions.

Primary reading: [Investor.gov — Types of Orders](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders). Checked November 9, 2026. No endorsement is implied.
