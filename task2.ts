let p: Record<string, number> = {};
let d: Record<string, number> = {};
let mid: Record<string, number> = {};

const pickup: string[] = ["A", "B"];
const drop: string[] = ["C", "D"];
const trips: [string, string][] = [["A", "W1"], ["B", "W2"], ["W3", "C"], ["W4", "D"]];

for (const it of pickup) p[it] = (p[it] || 0) + 1;
for (const it of drop) d[it] = (d[it] || 0) + 1;

let flag = true;
for (const it of trips) {
    if (p[it[0]] !== undefined) {
        p[it[0]]--;
        if (p[it[0]] === 0) delete p[it[0]];
    } else if (mid[it[0]] !== undefined) {
        // mid warehouse
        mid[it[0]]--;
    } else {
        flag = false; // aaj tk yaha kabhi visit ni kra toh fir pick kaise
        break;
    }

    if (d[it[1]] !== undefined) {
        d[it[1]]--;
        if (d[it[1]] === 0) delete d[it[1]];
    } else mid[it[1]] = (mid[it[1]] || 0) + 1;
}

if (!flag) console.log("Invalid");
else if (Object.keys(d).length === 0 && Object.keys(p).length === 0) console.log("Valid");
else console.log("Invalid");