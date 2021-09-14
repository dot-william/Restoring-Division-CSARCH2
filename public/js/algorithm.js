function findTwoscomplement(str) {
    var n = str.length;

    // Traverse the string to get first '1' from
    // the last of string
    var i;
    for (i = n - 1; i >= 0; i--)
        if (str.charAt(i) == '1')
            break;

    // If there exists no '1' concat 1 at the
    // starting of string
    if (i == -1)
        return "1" + str;

    // Continue traversal after the position of
    // first '1'
    for (k = i - 1; k >= 0; k--) {
        // Just flip the values
        if (str.charAt(k) == '1')
            str = str.substring(0,k)+"0"+str.substring(k+1, str.length);
        else
            str = str.substring(0,k)+"1"+str.substring(k+1, str.length);
    }

    // return the modified string
    return str.toString();
}

function leftShifting(s, leftShifts) {
    return s.substring(leftShifts) + s.substring(0, leftShifts);
}

const addBinary = (str1, str2) => {
    let carry = 0;
    const res = [];
    let l1 = str1.length, l2 = str2.length;
    for (let i = l1 - 1, j = l2 - 1; 0 <= i || 0 <= j; --i, --j) {
       let a = 0 <= i ? Number(str1[i]) : 0,
       b = 0 <= j ? Number(str2[j]) : 0;
       res.push((a + b + carry) % 2);
       carry = 1 < a + b + carry;
    };
    if (carry){
       res.push(1);
    }
    return res.reverse().join('');
 };

var Q = "0111";
var M = "0011";
var A = "0";

M = "0" + M;

for (let i = 0; i < Q.length; i++) {
    A = A + "0";
}

A = A + Q;

var negM = findTwoscomplement(M);

// START LOOP HERE FOR STEP BY STEP ------ ///
var temp = leftShifting(A, 1);
temp = temp.slice(0, -1);

//console.log(temp);

A = "00001"
var B = addBinary(A, negM);
var Msb = B.charAt(0);

if (Msb == 1){    
    temp = temp + 'a';
}

console.log(temp);

