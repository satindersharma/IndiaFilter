var selectdistrict = document.getElementById("district");
var selectcity = document.getElementById("city");
var selectpincode = document.getElementById("pincode");
var result = document.querySelector(".result");
// var distclick = document.querySelector(".citems");
var uniqueitems = new Set();
var uniquecity = new Set();
var uniquepin = new Set();
var cityitems = document.querySelectorAll(".citems");
var cityid = document.querySelector(".cityclass");
var pincode_result = document.querySelector(".pincodeclass");
var finaldistrictvalue = "";
var frompinreq = true;
var fromdistreq = true;
var fromcityreq = true;

function fetchdata(dist, city, pincode) {
  city = city || "";
  pincode = pincode || "";
  $.ajax({
    method: "GET",
    url: `/search/?district=${dist}&city=${city}&pincode=${pincode}`,
    dataType: "json",
    success: function (data) {
      Data = data;
      if (dist == "" && city == "" && pincode) {
        console.log("fill from data run");
        FillFromPin(Data);
      } else if (city == "" && pincode == "") {
        console.log("disrtict run");
        districtdrop(Data);
      } else if (pincode == "" && dist) {
        console.log("city run");
        finaldistrictvalue = dist;
        cityid.innerHTML = "";
        citydrop(Data);
      } else {
        console.log("pin run");
        pincodedrop(Data);
      }
    },
    error: function (error_data) {
      console.log(error_data);
    },
  });
}

selectdistrict.addEventListener("keyup", (event) => {
  if (event.target.value.length > 2) {
    result.innerHTML = "";
    uniqueitems.clear();
    fetchdata(event.target.value, (city = ""));
    frompinreq = true;
  }
});

function fillonclickDistrict(element) {
  console.log(element);
  selectdistrict.value = element;
  result.innerHTML = "";
  selectcity.value = "";
  selectpincode.value = "";
  if (frompinreq) {
    fetchdata((dist = element), (city = "city"));
  }
}

function distselectfunction() {
  result.addEventListener("click", (event) => {
    fillonclickDistrict(event.target.value);
  });
}

function districtdrop(Data) {
  console.log("data for district", Data);
  Data.forEach(function (x, i) {
    uniqueitems.add(x["districtname"]);
  });
  // console.log(uniqueitems);
  result.innerHTML = "";
  uniqueitems.forEach(function (t, y) {
    result.innerHTML += `<option class="dropdown-item citems" value="${t}">${t}</option>`;
    // selectdistrict.insertAdjacentHTML('afterend',`<option class="dropdown-item ditems" value="${t}">${t}</option>`);
  });
  uniqueitems.clear();

  distselectfunction();
}

function fillonclickCity(element) {
  console.log(element);
  selectcity.value = element;
  cityid.innerHTML = "";
  if (frompinreq) {
    console.log("fecthed after city");

    fetchdata(
      (dist = finaldistrictvalue),
      (city = element),
      (pincode = "pincode")
    );
  }
}

function cityselectfunction() {
  cityid.addEventListener("click", (event) => {
    // console.log("runn");
    fillonclickCity(event.target.value);
  });
}

function citydrop(Data) {
  console.log("data for city", Data);
  Data.forEach(function (p, o) {
    uniquecity.add(p["taluk"]);
    // console.log(p["taluk"])
  });
  // console.log("taluk" + uniquecity.values());
  // uniquecity.clear();
  uniquecity.forEach(function (u, v) {
    // console.log("CITY" + Data["districtname"]);
    cityid.innerHTML += `<option class="dropdown-item citems" value="${u}">${u}</option>`;
  });
  uniquecity.clear();
  cityselectfunction();
}

selectcity.addEventListener("keyup", (event) => {
  searchfilterlist();
  if (event.target.value.length > 3) {
    result.innerHTML = "";
    cityid.innerHTML = "";
    uniqueitems.clear();
    fetchdata((dist = ""), (city = event.target.value), (pincode = ""));
  }
});

function fillonclickPin(element) {
  console.log(element);
  selectpincode.value = element;
  pincode_result.innerHTML = "";
  // fetchdata((dist = element), (city = "city"),(pincode='pincode'));
}

function pinselectfunction() {
  pincode_result.addEventListener("click", (event) => {
    fillonclickPin(event.target.value);
  });
}

function pincodedrop(Data) {
  console.log("data for pin", Data);
  Data.forEach(function (e, o) {
    uniquepin.add(e["pincode"]);
  });

  pincode_result.innerHTML = "";
  uniquepin.forEach(function (k, v) {
    if (k !== undefined) {
      pincode_result.innerHTML += `<option class="dropdown-item pitems" value="${k}">${k}</option>`;
    }
  });
  uniquepin.clear();
  pinselectfunction();
}

selectpincode.addEventListener("keyup", (event) => {
  if (event.target.value.length === 6) {
    result.innerHTML = "";
    cityid.innerHTML = "";
    fromdistreq = false;
    fetchdata((dist = ""), (city = ""), (pincode = event.target.value));
  }
});

function FillFromPin(Data) {
  console.log("fill pin da", Data);
  console.log(Data.length);
  if (Data.length) {
    console.log("1 part run");
    selectdistrict.value = "";
    selectcity.value = "";
    selectpincode.style.color = "";
    selectdistrict.value = Data[0]["districtname"] || "";
    selectcity.value = Data[0]["taluk"] || "";
    if (Data.length > 1) {
      frompinreq = false;
      citydrop(Data);
    }
  } else {
    selectdistrict.value = "";
    selectcity.value = "";
    console.log("else part run");
    selectpincode.style.color = "red";

    // selectpincode.addEventListener("focus", (e) => {
    //   e.target.style.borderColor = '#ff8080';
    //   e.target.style.boxShadow = '0 0 0 0.2rem rgb(255 0 0 / 25%)';
    // });
  }
}

function setcolorpincode() {
  selectpincode.style.borderColor = "#ff8080";
  selectpincode.style.boxShadow = "0 0 0 0.2rem rgb(255 0 0 / 25%)";
}

function searchfilterlist() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  if (selectcity.value !== undefined) {
    filter = selectcity.value.toUpperCase();
    ul = document.getElementById("city-result");
    li = ul.getElementsByTagName("option");
    console.log(li);
    console.log(li.value);
    // Loop through all list items, and hide those who don't match the search query
    // for (i = 0; i < li.length; i++) {
    //   // a = li[i].getElementsByTagName("a")[0];
    //   txtValue = li.value.textContent || li.value.innerText;
    //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //     li[i].style.display = "";
    //   } else {
    //     li[i].style.display = "none";
    //   }
    // }

    // li.forEach((x,t)=>{
    //     if(x.toUpperCase().indexOf(filter) > -1){
    //       x.style.display = '';
    //     }else{
    //       x.style.display = "none";
    //     }
    // })
  }
}

$(document).ready(function () {
  // $('.js-example-basic-multiple').select2();
});
