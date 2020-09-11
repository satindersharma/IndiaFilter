var selectdistrict = document.getElementById("district");
var selectcity = document.getElementById("city");
var selectpincode = document.getElementById("pincode");
var result = document.querySelector(".result");
// var distclick = document.querySelector(".citems");
var uniquedistrict = new Set();
var uniquecity = new Set();
var uniquepin = new Set();
var uniquedistrictandcity = new Set();
var cityitems = document.querySelectorAll(".citems");
var cityid = document.querySelector(".cityclass");
var pincode_result = document.querySelector(".pincodeclass");
var finaldistrictvalue = "";
var frompinreq = false;
var fromdistreq = false;
var fromcityreq = false;

async function fetchdata(dist, city, pincode) {
  city = city || "";
  pincode = pincode || "";
  $.ajax({
    method: "GET",
    url: `/search/?district=${dist}&city=${city}&pincode=${pincode}`,
    dataType: "json",
    success: function (data) {
      Data = data;
      if (dist == "" && city == "" && pincode && frompinreq) {
        console.log("fill from pin data run");
        FillFromPin(Data);
      } else if (city == "" && pincode == "") {
        console.log("disrtict run");
        districtdrop(Data);
      } else if (pincode == "" && dist) {
        console.log("city run");
        finaldistrictvalue = dist;
        cityid.innerHTML = "";
        citydrop(Data);
      } else if (fromcityreq && !fromdistreq && !frompinreq) {
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

// function for District on typing
selectdistrict.addEventListener("keyup", (event) => {
  if (event.target.value.length > 2) {
    result.innerHTML = "";
    uniquedistrict.clear();
    fetchdata(event.target.value, (city = ""));
    fromdistreq = true;
    frompinreq = false;
    fromcityreq = false;
  }
});

// function for District to fill data on click on dropdown
function fillonclickDistrict(element) {
  console.log(element);
  selectdistrict.value = element;
  result.innerHTML = "";
  selectcity.value = "";
  selectpincode.value = "";

  if (fromdistreq && !frompinreq && !fromcityreq) {
    fetchdata((dist = element), (city = "city"));
  }
}

// function for District to handle click event
function distselectfunction() {
  result.addEventListener("click", (event) => {
    fillonclickDistrict(event.target.value);
  });
}

// function for District to add data to dropdown
function districtdrop(Data) {
  console.log("data for district", Data);
  Data.forEach(function (x, i) {
    uniquedistrict.add(x["districtname"]);
  });
  // console.log(uniquedistrict);
  result.innerHTML = "";
  uniquedistrict.forEach(function (t, y) {
    result.innerHTML += `<option class="dropdown-item citems" value="${t}">${t}</option>`;
    // selectdistrict.insertAdjacentHTML('afterend',`<option class="dropdown-item ditems" value="${t}">${t}</option>`);
  });
  uniquedistrict.clear();

  distselectfunction();
}

// function for City fill data on click on dropdown
function fillonclickCity(element) {
  console.log(element);

  if (fromcityreq && !fromdistreq && !frompinreq) {
    console.log("city split run");
    cityid.innerHTML = "";
    selectdistrict.value = extractLastfun(element);
    selectcity.value = splitfun(element).slice(0, -1).join(" ");
    console.log(splitfun(element));
    selectpincode.value = "";
    fromcityreq = false;
    fetchdata(
      (dist = selectdistrict.value),
      (city = selectcity.value),
      (pincode = "pincode")
    );
  } else if (fromdistreq && !frompinreq && !fromcityreq) {
    selectcity.value = element;
    cityid.innerHTML = "";
    console.log("run from disrtrict");

    fetchdata(
      (dist = finaldistrictvalue),
      (city = element),
      (pincode = "pincode")
    );
  } else {
    selectcity.value = element;
    cityid.innerHTML = "";
    console.log("fecthed after city");
  }
}

// function for City on click event
function cityselectfunction() {
  cityid.addEventListener("click", (event) => {
    // console.log("runn");
    fillonclickCity(event.target.value);
    // cityid.innerHTML = "";
  });
}

// function for City to add data to dropdown
function citydrop(Data) {
  uniquecity.clear();
  uniquedistrictandcity.clear();
  console.log("data for city", Data);
  Data.forEach(function (p, o) {
    uniquecity.add(p["taluk"]);
    uniquedistrictandcity.add(`${p["taluk"]}, ${p["districtname"]}`);
    // console.log(p["taluk"])
  });
  // console.log("taluk" + uniquecity.values());
  // uniquecity.clear();
  if (fromcityreq && !fromdistreq && !frompinreq) {
    // console.log("CITY" + Data["districtname"]);
    uniquedistrictandcity.forEach(function (d, f) {
      cityid.innerHTML += `<option class="dropdown-item citems" value="${f}">${d}</option>`;
    });
  } else {
    uniquecity.forEach(function (u, v) {
      cityid.innerHTML += `<option class="dropdown-item citems" value="${u}">${u}</option>`;
    });
  }

  uniquecity.clear();
  uniquedistrictandcity.clear();
  cityselectfunction();
}

// function for City on typing
selectcity.addEventListener("keyup", (event) => {
  // searchfilterlist();
  if (event.target.value.length > 2) {
    result.innerHTML = "";
    cityid.innerHTML = "";
    uniquecity.clear();
    uniquedistrictandcity.clear();
    uniquedistrict.clear();
    fromdistreq = false;
    frompinreq = false;
    fromcityreq = true;
    if (fromcityreq && !fromdistreq && !frompinreq) {
      fetchdata((dist = ""), (city = event.target.value), (pincode = ""));
    } else {
      // fetchdata((dist = ""), (city = event.target.value), (pincode = ""));
    }
  }
});

// function for pincode to fill on click
function fillonclickPin(element) {
  console.log(element);
  selectpincode.value = element;
  pincode_result.innerHTML = "";
  selectpincode.style.color = "";
  // fetchdata((dist = element), (city = "city"),(pincode='pincode'));
}

// function for pincode for on click event
function pinselectfunction() {
  pincode_result.addEventListener("click", (event) => {
    fillonclickPin(event.target.value);
  });
}

// function for pincode to add data to dropdown
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

// function for pincode on typing when data enter via pincode input
selectpincode.addEventListener("keyup", (event) => {
  if (event.target.value.length === 6) {
    result.innerHTML = "";
    cityid.innerHTML = "";
    fromdistreq = false;
    fromcityreq = false;
    frompinreq = true;
    fetchdata((dist = ""), (city = ""), (pincode = event.target.value));
  }
});

// function for pincode when data enter via pincode input
function FillFromPin(Data) {
  console.log("fill pin da", Data);
  console.log(Data.length);
  if (Data.length) {
    console.log("1 part run");
    selectdistrict.value = "";
    selectcity.value = "";
    cityid.innerHTML = "";
    selectpincode.style.color = "";
    selectdistrict.value = Data[0]["districtname"] || "";
    selectcity.value = Data[0]["taluk"] || "";

    if (Data.length > 1) {
      cityid.innerHTML = "";
      uniquecity.clear();
      uniquedistrictandcity.clear();
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

    li.forEach((x, t) => {
      if (x.toUpperCase().indexOf(filter) > -1) {
        x.style.display = "";
      } else {
        x.style.display = "none";
      }
    });
  }
}

// function to split string from , and convert to array
function splitfun(val) {
  return val.split(/,\s*/);
}
// function to return last array element
function extractLastfun(term) {
  return splitfun(term).pop();
}

$(document).ready(function () {
  // $('.js-example-basic-multiple').select2();
});
