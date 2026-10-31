import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimateFinance } from '../src/lib/finance.mjs';
test('zero interest divides the principal evenly without adding interest',()=>{const result=estimateFinance(60000,20,0,48);assert.equal(result.monthly,1000);assert.equal(result.deposit,12000);assert.equal(result.total,60000);assert.equal(result.interest,0);});
test('amortised payment repays the loan over the selected term',()=>{const r=estimateFinance(85000,20,7.9,48);let balance=r.principal;for(let i=0;i<48;i++)balance=balance*(1+7.9/1200)-r.monthly;assert.ok(Math.abs(balance)<0.00001);assert.ok(r.monthly>r.principal/48);assert.ok(Math.abs(r.total-(r.monthly*48+r.deposit))<0.00001);});
test('a full deposit leaves no monthly payment or interest',()=>{const r=estimateFinance(100000,100,9.9,60);assert.equal(r.monthly,0);assert.equal(r.interest,0);assert.equal(r.total,100000);});
test('rejects invalid terms and non-finite inputs',()=>{for(const args of [[-1,20,7,48],[85000,120,7,48],[85000,20,-1,48],[85000,20,7,0],[85000,20,7,2.5],[NaN,20,7,48]])assert.throws(()=>estimateFinance(...args),RangeError);});
