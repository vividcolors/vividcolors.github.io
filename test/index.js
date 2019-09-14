const medias = {audio : false, video : true},
      video  = document.getElementById("video");
var localStream = null;

navigator.getUserMedia(medias, successCallback, errorCallback);

function successCallback(stream) {
  video.srcObject = stream;
  localStream = stream;
  startReadQR();
};

function errorCallback(err) {
  alert(err);
};

function decodeImageFromBase64(data, callback) {
    qrcode.callback = callback;
    qrcode.decode(data);
}

function startReadQR() {
    setInterval('decode()', 500);
}

function decode() {
    if (localStream) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.getElementById('img');
        var h;
        var w;

        w = video.offsetWidth;
        h = video.offsetHeight;

        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        ctx.drawImage(video, 0, 0, w, h);

        decodeImageFromBase64(canvas.toDataURL('image/png'), function (decodeInformation) {
            var input = document.getElementById('qr');
            if (!(decodeInformation instanceof Error)) {
                input.value = decodeInformation;
            }
        });
    }
}