$(document).ready(function () {
  $(".container-js").delay(500).fadeIn("slow");

  /* FUNCTIONS */

  //NOTE: Did not include M and -M (initialization) so we can use for step-by-step in case
  function displayPass(tA, tQ, sAM, pA, pQ, pass) {
    $("#solDiv").append(
      `<div class=container-fluid>
      <label class="label">Pass Number: ${pass}</label>    
      <div class="p-1" style="background-color:lavender;">   
        <div class="columns m-2">
          <div class="column m-0 p-0"> A : ${tA} </div>
          <div class="column m-0 p-0"> Q : ${tQ} </div>
        </div>

        <div class="columns m-2">         
          <div class="column m-0 p-0"> 
            <p style="color: red;"> A : ${sAM} </p>
          </div>
        </div>

        <div class="columns m-2">
          <div class="column m-0 p-0"> A : ${pA} </div>
          <div class="column m-0 p-0"> Q : ${pQ} </div>
        </div>
      </div>
    </div>
    <div class="mb-5"></div>`
    );
  }

  function findTwoscomplement(str) {
    var n = str.length;

    // Traverse the string to get first '1' from
    // the last of string
    var i;
    for (i = n - 1; i >= 0; i--) if (str.charAt(i) == "1") break;

    // If there exists no '1' concat 1 at the
    // starting of string
    if (i == -1) return "1" + str;

    // Continue traversal after the position of
    // first '1'
    for (k = i - 1; k >= 0; k--) {
      // Just flip the values
      if (str.charAt(k) == "1")
        str = str.substring(0, k) + "0" + str.substring(k + 1, str.length);
      else str = str.substring(0, k) + "1" + str.substring(k + 1, str.length);
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
    let l1 = str1.length,
      l2 = str2.length;
    for (let i = l1 - 1, j = l2 - 1; 0 <= i || 0 <= j; --i, --j) {
      let a = 0 <= i ? Number(str1[i]) : 0,
        b = 0 <= j ? Number(str2[j]) : 0;
      res.push((a + b + carry) % 2);
      carry = 1 < a + b + carry;
    }
    return res.reverse().join("");
  };

  $("#show-all").click(function () {
    $("#solDiv").remove(); //clear previous solution

    // Append div containing the solution
    $("#formCont").append(`<div id="solDiv" class=container-fluid>  
    </div>`);

    /* START OF RESTORING DIVISION CODE */

    var Q = $("#dividend").val();
    var M = $("#divisor").val();
    var A = "0";

    if (Q.length >= M.length) {
      QMlen = Q.length - M.length + 1;

      for (let i = 0; i < QMlen; i++) {
        M = "0" + M;
      }
    }

    for (let i = 0; i < Q.length; i++) {
      A = A + "0";
    }

    var AQ = A + Q;

    var negM = findTwoscomplement(M);

    console.log("-M : " + negM);
    console.log(" A : " + A + "\t" + " Q : " + Q);
    console.log(" M : " + M + "\n\n");

    //Append initialization step on solDiv
    $("#solDiv").append(
      `<div class=container-fluid>
        <label class="label">Initialization</label>     
        
        <div class="p-1" style="background-color:lavender;">        
          <div class="columns m-2">         
            <div class="column m-0 p-0"> -M : ${negM} </div>
          </div>

          <div class="columns m-2">
            <div class="column m-0 p-0"> A : ${A} </div>
            <div class="column m-0 p-0"> Q : ${Q} </div>
          </div>

          <div class="columns m-2">         
            <div class="column m-0 p-0"> M : ${M} </div>
          </div>
        </div>
        
        <div class="mb-5"></div>`
    );

    /* START LOOP HERE FOR STEP BY STEP */
    for (let i = 1; i <= Q.length; i++) {
      tempAQ = leftShifting(AQ, 1);
      tempAQ = tempAQ.slice(0, -1);

      tempA = tempAQ.slice(0, M.length);
      tempQ = "";

      for (let j = tempA.length; j < tempAQ.length; j++) {
        tempQ = tempQ + tempAQ.charAt(j);
      }

      console.log(
        " A : " + tempA + "\t" + " Q : " + tempQ + "\t" + "Pass: " + i
      );

      var dispA = tempA; //for output

      subAM = addBinary(tempA, negM);
      console.log(" A : " + subAM);

      Msb = subAM.charAt(0);

      if (Msb == 0) {
        // if its positive
        tempA = subAM;
        tempAQ = subAM + tempQ + "1";
      } else {
        tempAQ = tempAQ + "0";
      }

      AQ = tempAQ;

      passA = AQ.slice(0, M.length);
      passQ = "";

      for (let k = passA.length; k < AQ.length; k++) {
        passQ = passQ + AQ.charAt(k);
      }

      console.log(" A : " + passA + "\t" + " Q : " + passQ + "\n");
      displayPass(dispA, tempQ, subAM, passA, passQ, i); //for every loop, display pass
      $("#dividend").val(""); //clear input field
      $("#divisor").val("");
    }
  });

  /*******************    STEP-BY-STEP     *********************/
  $("#show-step").click(function () {
    $("#solDiv").remove(); //clear previous solution

    // Append div containing the solution
    $("#formCont").append(`<div id="solDiv" class=container-fluid>  
    </div>`);

    /* START OF RESTORING DIVISION CODE */

    var Q = $("#dividend").val();
    var M = $("#divisor").val();
    var A = "0";

    if (Q.length >= M.length) {
      QMlen = Q.length - M.length + 1;

      for (let i = 0; i < QMlen; i++) {
        M = "0" + M;
      }
    }

    for (let i = 0; i < Q.length; i++) {
      A = A + "0";
    }

    var AQ = A + Q;

    var negM = findTwoscomplement(M);

    console.log("-M : " + negM);
    console.log(" A : " + A + "\t" + " Q : " + Q);
    console.log(" M : " + M + "\n\n");

    //Append initialization step on solDiv
    $("#solDiv").append(
      `<div class=container-fluid>
        <label class="label">Initialization</label>     
        
        <div class="p-1" style="background-color:lavender;">        
          <div class="columns m-2">         
            <div class="column m-0 p-0"> -M : ${negM} </div>
          </div>

          <div class="columns m-2">
            <div class="column m-0 p-0"> A : ${A} </div>
            <div class="column m-0 p-0"> Q : ${Q} </div>
          </div>

          <div class="columns m-2">         
            <div class="column m-0 p-0"> M : ${M} </div>
          </div>
        </div>
        
        <div class="mb-5"></div>`
    );

    var btn = document.createElement("BUTTON");
    btn.className = `next-button`;
    btn.id = `nextBtnID`;
    btn.innerHTML = "Next step";
    $("#solDiv").append(btn);
    document.getElementById("nextBtnID").disabled = false;
    var clickCtr = 1;

    $("#nextBtnID").click(function () {
      /* START LOOP HERE FOR STEP BY STEP */
      if (clickCtr <= Q.length) {
        i = clickCtr;
        //while (i <= Q.length) {
        tempAQ = leftShifting(AQ, 1);
        tempAQ = tempAQ.slice(0, -1);

        tempA = tempAQ.slice(0, M.length);
        tempQ = "";

        for (let j = tempA.length; j < tempAQ.length; j++) {
          tempQ = tempQ + tempAQ.charAt(j);
        }

        console.log(
          " A : " + tempA + "\t" + " Q : " + tempQ + "\t" + "Pass: " + i
        );

        var dispA = tempA; //for output

        subAM = addBinary(tempA, negM);
        console.log(" A : " + subAM);

        Msb = subAM.charAt(0);

        if (Msb == 0) {
          // if its positive
          tempA = subAM;
          tempAQ = subAM + tempQ + "1";
        } else {
          tempAQ = tempAQ + "0";
        }

        AQ = tempAQ;

        passA = AQ.slice(0, M.length);
        passQ = "";

        for (let k = passA.length; k < AQ.length; k++) {
          passQ = passQ + AQ.charAt(k);
        }

        console.log(" A : " + passA + "\t" + " Q : " + passQ + "\n");

        displayPass(dispA, tempQ, subAM, passA, passQ, i); //for every loop, display pass
        $("#dividend").val(""); //clear input field
        $("#divisor").val("");
        clickCtr++;
        //}
      } else {
        document.getElementById("nextBtnID").disabled = true; // if all steps are displayed, disable button
      }
    });
  });
});
