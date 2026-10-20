import test from 'node:test';import assert from 'node:assert/strict';import {validate,parseEntries} from './core.js';
const good={id:'1',champion:'Garen',opponent:'Darius',role:'Top',date:'2026-10-20',cs10:'62',cs15:'94',gold:'-300',deaths:'1',notes:'Overtraded.',next:'Let the wave come in.'};
test('valid entry and optional gold',()=>{assert.equal(validate(good),null);assert.equal(validate({...good,gold:''}),null);});
test('invalid numeric and calendar data are rejected',()=>{for(const change of [{cs15:'20'},{cs10:'-1'},{deaths:'1.5'},{gold:'oops'},{date:'2026-02-31'},{role:'Other'},{champion:''}])assert.ok(validate({...good,...change}));});
test('corrupted storage cannot inject invalid entries',()=>{assert.deepEqual(parseEntries('bad'),[]);assert.deepEqual(parseEntries('{}'),[]);assert.deepEqual(parseEntries('[null,{}]'),[]);assert.deepEqual(parseEntries(JSON.stringify([good,{...good,cs10:'bad'}])),[good]);});
