var ConnectBtn = document.querySelector(".connectBtn");
ConnectBtn.addEventListener('click', function(event) {
  event.preventDefault();
  var ip = [];
  var ips = [].slice.call(document.querySelectorAll(".ip"));
  ip = ips.map(function(ip) {
    return ip.value; 
  });
  controller.connect(ip.join('.'));
  controller.action();
});
var triBtn = document.querySelector(".triggerPepper");
triBtn.addEventListener('click', function(event) {
  controller.action();
});

var controller = {
  bw: {},
  connect: function (ip) {
    this.bw.session = new QiSession(ip);
    this.bw.session
          .socket()
          .on('connect', function () {
            this._initPepperTrigger();
          }.bind(this))
  },
  action: function () {
    this.bw.session.service("ALMemory").done(function (ALMemory) {
      ALMemory.raiseEvent("jsTriggerEvent");
    });

    session.service("ALMemory").done(function (ALMemory) {
      var myData = ALMemory.getData("MyApplication/MyData");
      document.querySelector(".returnData").innerHTML = myData.toString();
    });

  },
  _initPepperTrigger: function () {
    var triBtn = document.querySelector(".triggerPepper");
    triBtn.disabled = false;
  }
};