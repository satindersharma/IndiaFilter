var unique_distict = new Set();
var unique_city = new Set();
var unique_pincode = new Set();
var mapp = {};
var $example = $(".js-example-programmatic").select2();
var $exampleMulti = $("#city-select").select2();

$("#district-select").on("click", function (e) {
  console.log(e.params.data.text);
  $("#city-select").select2("open");
  $("#city-select").select2("data", {
    district: e.params.data.text,
    city: "city",
  });
});

$(document).ready(function () {
  $("#district-select").select2({
    placeholder: "district",
    theme: "classic",
    ajax: {
      url: `/search/`,
      dataType: "json",
      delay: 250,
      data: function (params) {
        var query = {
          district: params.term,
          //   type: "public",
        };

        // Query parameters will be ?search=[term]&type=public
        console.log(query);
        return query;
      },
      processResults: function (data) {
        // Transforms the top-level key of the response object from 'items' to 'results'
        console.log(data);
        unique_distict.clear();
        // pp = 0;
        // console.log(data.items)
        // var ff = new Set(data)
        data.map((items, i) => ({
          id: i,
          text: unique_distict.add(items.districtname),
        }));

        return {
          results: [...unique_distict].map((x, i) => ({
            id: i,
            text: x,
          })),
        };
      },

      cache: true,
    },
  });

  $("#city-select").select2({
    placeholder: "city",
    theme: "classic",
    ajax: {
      url: `/search/`,
      dataType: "json",
      delay: 250,
      data: function (params) {
        //   if($("#district-select option:selected").text()){
        //       dfs = $("#district-select option:selected").text()
        //       citt = ""
        //   }else{
        //     dfs = ""
        //     citt = params.term
        //   }
        var query = {
          district: "",
          city: params.term,
          //   type: "public",
        };

        // Query parameters will be ?search=[term]&type=public
        console.log(query);
        return query;
      },
      processResults: function (data) {
        // Transforms the top-level key of the response object from 'items' to 'results'
        console.log(data);
        unique_city.clear();
        // pp = 0;
        // console.log(data.items)

        data.map((items, i) => ({
          id: i,
          text: unique_city.add(items.taluk),
        }));

        //   console.log(ff)
        // console.table([...ff].map((items, i) => ({
        //     id: i,
        //     text: items.taluk,
        //   })))
        //   console.table(ff)
        return {
          results: [...unique_city].map((x, i) => ({
            id: i,
            text: x,
          })),
        };
      },

      cache: true,
    },
  });
  $("#pincode-select").select2({
    placeholder: "pincode",
    theme: "classic",
    ajax: {
      url: `/search/`,
      dataType: "json",
      delay: 250,
      data: function (params) {
        var query = {
          pincode: params.term,
          //   type: "public",
        };

        // Query parameters will be ?search=[term]&type=public
        console.log(query);
        return query;
      },
      processResults: function (data) {
        // Transforms the top-level key of the response object from 'items' to 'results'
        console.log(data);
        unique_pincode.clear();
        // pp = 0;
        // console.log(data.items)
        data.map((items, i) => ({
          id: i,
          text: unique_pincode.add(items.pincode),
        }));
        return {
          results: [...unique_pincode].map((x, i) => ({
            id: i,
            text: x,
          })),
        };
      },

      cache: true,
    },
  });
});
