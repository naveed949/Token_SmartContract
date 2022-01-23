// build/index.js
var MyToken;
$(document).ready(function () {
  $.getJSON('../contracts/Token.json').then(function (data) {
    var MyTokenContract = TruffleContract(data)
    MyTokenContract.setProvider(window.ethereum)
    MyTokenContract.deployed().then(function (instance) {
      console.log('Contract instance: ', instance);
      MyToken = instance;
      updateTotalSupply();
    })
  })
})

function updateTotalSupply() {
    MyToken.totalSupply().then(function (data) {
      $('#total-supply').html(data.toString());
    })
  }