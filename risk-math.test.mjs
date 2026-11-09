import test from 'node:test';
import assert from 'node:assert/strict';
import {plannedStockSize,maximumDrawdown,recoveryGain} from './risk-math.mjs';
const base={equity:10000,riskFraction:.01,entry:50,stop:48,roundTripCostPerShare:.10,cashAvailable:10000,entryCostPerShare:.05};
test('worksheet example includes costs and rounds whole shares down',()=>{
 const x=plannedStockSize(base);assert.equal(x.quantity,47);assert.equal(x.cashQuantity,199);assert.equal(x.notional,2350);assert.ok(Math.abs(x.modelledLossAtAssumedExit-98.7)<1e-9);
 assert.ok(x.modelledLossAtAssumedExit<=x.budget);assert.ok(x.estimatedEntryCash<=base.cashAvailable);
});
test('cash availability can be tighter than planned-risk quantity',()=>{
 const x=plannedStockSize({...base,cashAvailable:1000});assert.equal(x.quantity,19);assert.ok(x.estimatedEntryCash<=1000);
 assert.equal(plannedStockSize({...base,cashAvailable:0}).quantity,0);
});
test('wider distance reduces quantity when cash is not binding',()=>{
 assert.ok(plannedStockSize({...base,stop:46}).quantity<plannedStockSize(base).quantity);
});
test('missing, malformed and inconsistent inputs are rejected',()=>{
 assert.throws(()=>plannedStockSize());
 for(const value of [undefined,NaN,Infinity,-1,'10000',null])assert.throws(()=>plannedStockSize({...base,equity:value}));
 assert.throws(()=>plannedStockSize({...base,stop:50}));assert.throws(()=>plannedStockSize({...base,riskFraction:2}));
 assert.throws(()=>plannedStockSize({...base,roundTripCostPerShare:-.1}));assert.throws(()=>plannedStockSize({...base,entryCostPerShare:.2}));
});
test('maximum drawdown retains an earlier decline after a new high',()=>{
 assert.equal(maximumDrawdown([10000,11000,9900,10500,8800,11500]),.2);
 assert.equal(maximumDrawdown([100,110,120]),0);assert.equal(maximumDrawdown([100,0]),1);
 assert.throws(()=>maximumDrawdown([]));assert.throws(()=>maximumDrawdown([0,100]));assert.throws(()=>maximumDrawdown([100,NaN]));
});
test('recovery uses the reduced capital base and identifies complete loss',()=>{
 assert.equal(recoveryGain(.5),1);assert.equal(recoveryGain(.2),.25);assert.equal(recoveryGain(0),0);assert.equal(recoveryGain(1),null);
 assert.throws(()=>recoveryGain(2));assert.throws(()=>recoveryGain(-.1));
});
