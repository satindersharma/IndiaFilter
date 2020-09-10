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
function fetchdata(dist, city,pincode) {
  city = city || "";
  pincode = pincode || "";
  $.ajax({
    method: "GET",
    url: `/search/?district=${dist}&city=${city}&pincode=${pincode}`,
    dataType: "json",
    success: function (data) {
      Data = data;

      // console.log(data[0]["districtname"]);
      // uniqueitems.add(Data['districtname'])
      if (city == "" && pincode == "") {
        districtdrop(Data);
      } else if(pincode == "") {
        cityid.innerHTML = ''
        citydrop(Data);
      }
      else{
        pincodedrop(Data);
      }

      // result.textContent = data[0]['districtname']

      // parent.append(data[0]['districtname'])

      // citydrop(Data);
    },
    error: function (error_data) {
      console.log(error_data);
    },
  });
}

function districtdrop(Data) {
  // var talukdata = Data[]

  Data.forEach(function (x, i) {
    uniqueitems.add(x["districtname"]);
  });
  console.log(uniqueitems);
  result.innerHTML = "";
  uniqueitems.forEach(function (t, y) {
    result.innerHTML += `<option class="dropdown-item citems" value="${t}">${t}</option>`;
    // selectdistrict.insertAdjacentHTML('afterend',`<option class="dropdown-item citems" value="${t}">${t}</option>`);
  });
  uniqueitems.clear();
  distselectfunction();
}

function citydrop(Data) {
  Data.forEach(function (p, o) {
    uniquecity.add(p["taluk"]);
    // console.log(p["taluk"])
  });
  // console.log("taluk" + uniquecity.values());
  // uniquecity.clear();
  uniquecity.forEach(function (u, v) {
    // console.log("CITY" + Data["districtname"]);
    cityid.innerHTML += `<option class="dropdown-item" value="${u}">${u}</option>`;
  });
  uniquecity.clear();
}

function pincodedrop(Data) {
  Data.forEach(function (p, o) {
    uniquepin.add(p["pincode"]);
    // console.log(p["taluk"])
  });
  // console.log("taluk" + uniquecity.values());
  // uniquecity.clear();
  uniquepin.forEach(function (u, v) {
    // console.log("CITY" + Data["districtname"]);
    pincode_result.innerHTML += `<option class="dropdown-item" value="${u}">${u}</option>`;
  });
  uniquepin.clear();
}



selectdistrict.addEventListener("keyup", (event) => {
  // result.textContent = event.target.value
  result.innerHTML = "";
  // if(cityitems){
  //   cityitems.forEach(function(c,t){
  //     c.parentNode.removeChild(c);
  //   });

  // }

  uniqueitems.clear();
  // console.log(event.target.value)
  fetchdata(event.target.value, (city = ""));
});

function fillonclickDistrict(element) {
  console.log(element);
  selectdistrict.value = element;
  result.innerHTML = "";
  fetchdata((dist = element), (city = "city"));
}

function fillonclickCity(element) {
  console.log(element);
  selectcity.value = element;
  cityid.innerHTML = "";
  fetchdata((dist = element), (city = "city"),(pincode='pincode'));
}

function fillonclickPin(element) {
  console.log(element);
  selectpincode.value = element;
  pincode_result.innerHTML = "";
  // fetchdata((dist = element), (city = "city"),(pincode='pincode'));
}

function pinselectfunction(){
  pincode_result.addEventListener("click",(event)=>{
    fillonclickPin(event.target.value)
  })
}


function cityselectfunction(){
  cityid.addEventListener("click",(event)=>{
    fillonclickCity(event.target.value)
  })
}

// selectdistrict.addEventListener('change',updatevalue);
function distselectfunction() {
  result.addEventListener("click", (event) => {
    // console.log(event.target.value)
    fillonclickDistrict(event.target.value);
  });

  // if(cityitems != null){
  // console.log(cityitems)
  //   cityitems.forEach(function (x,y) {
  //     x.addEventListener('onclick',(event)=>{
  //       console.log(event)
  //     })
  //   })
  // }
  // Array.from(distclick).forEach(function(element) {
  //   element.addEventListener('click', console.log(element));
  // });

  // distclick.addEventListener('onclick',(event) =>
  // {
  //   console.log(event.target.value);
  // });
}

function updatevalue(e) {
  result.textContent = e.target.value;
}

$(document).ready(function () {
  // $('.js-example-basic-multiple').select2();
});
