var canvas1 = document.getElementById("canvas1");
var ctx = canvas1.getContext("2d");

//ctx.font = "30px Helvetica"
ctx.font = "40px Luckiest Guy"
ctx.fillStyle = "#FFff88";
//ctx.fillRect(0,200,60,20);

ctx.fillText("AI Hong Kong",20,canvas1.height - 35);

var startButton = document.getElementById('startButton');
var callButton = document.getElementById('callButton');
callButton.disabled = true;
startButton.onclick = flipCamera;
callButton.onclick = call;

start();

var localVideo = document.getElementById('localVideo');

var startTime;
var localVideo = document.getElementById('localVideo');
var canvas = fx.canvas();

localVideo.addEventListener('loadedmetadata', function() {
  trace('Local video videoWidth: ' + this.videoWidth +
    'px,  videoHeight: ' + this.videoHeight + 'px');
});


var localStream;
var pc1;
var pc2;
var offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

function getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

function gotStream(stream) {
  trace('Received local stream');
  localVideo.srcObject = stream;
  localStream = stream;
  callButton.disabled = false;
}

var front = false;
//document.getElementById('startButton').onclick = 
function flipCamera() { front = !front; };
//var constraints = { audio: false, video: true, video: { facingMode: (front? "user" : "environment") } };
var constraints = { audio: true, video: true };


function start() {
  trace('Requesting local stream');
  startButton.disabled = true;
  navigator.mediaDevices.getUserMedia({
   audio: false,
    video: true})
//  navigator.mediaDevices.getUserMedia(constraints)
  .then(gotStream)
  .catch(function(e) {
    alert('getUserMedia() error: ' + e);
  });
}




function call() {
  callButton.disabled = true;
  trace('Starting call');
  startTime = window.performance.now();
  var videoTracks = localStream.getVideoTracks();
  var audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    trace('Using video device: ' + videoTracks[0].label);
  }
  if (audioTracks.length > 0) {
    trace('Using audio device: ' + audioTracks[0].label);
  }
  var servers = null;
  pc1 = new RTCPeerConnection(servers);
  trace('Created local peer connection object pc1');
  pc1.onicecandidate = function(e) {
    onIceCandidate(pc1, e);
  };
  pc2 = new RTCPeerConnection(servers);
  trace('Created remote peer connection object pc2');
  pc2.onicecandidate = function(e) {
    onIceCandidate(pc2, e);
  };
  pc1.oniceconnectionstatechange = function(e) {
    onIceStateChange(pc1, e);
  };
  pc2.oniceconnectionstatechange = function(e) {
    onIceStateChange(pc2, e);
  };
  pc2.ontrack = gotRemoteTrack;

  startUsingDiscreetMode();
  pc1.addTrack(canvasVideoStream.getVideoTracks()[0], canvasVideoStream);
  trace('Added local stream to pc1');

  trace('pc1 createOffer start');
  pc1.createOffer(
    offerOptions
  ).then(
    onCreateOfferSuccess,
    onCreateSessionDescriptionError
  );
}

function onCreateSessionDescriptionError(error) {
  trace('Failed to create session description: ' + error.toString());
}

function onCreateOfferSuccess(desc) {
  trace('Offer from pc1\n' + desc.sdp);
  trace('pc1 setLocalDescription start');
  pc1.setLocalDescription(desc).then(
    function() {
      onSetLocalSuccess(pc1);
    },
    onSetSessionDescriptionError
  );
  trace('pc2 setRemoteDescription start');
  pc2.setRemoteDescription(desc).then(
    function() {
      onSetRemoteSuccess(pc2);
    },
    onSetSessionDescriptionError
  );
  trace('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    onCreateSessionDescriptionError
  );
}

function onSetLocalSuccess(pc) {
  trace(getName(pc) + ' setLocalDescription complete');
}

function onSetRemoteSuccess(pc) {
  trace(getName(pc) + ' setRemoteDescription complete');
}

function onSetSessionDescriptionError(error) {
  trace('Failed to set session description: ' + error.toString());
}

function gotRemoteTrack(e) {
}

function onCreateAnswerSuccess(desc) {
  trace('Answer from pc2:\n' + desc.sdp);
  trace('pc2 setLocalDescription start');
  pc2.setLocalDescription(desc).then(
    function() {
      onSetLocalSuccess(pc2);
    },
    onSetSessionDescriptionError
  );
  trace('pc1 setRemoteDescription start');
  pc1.setRemoteDescription(desc).then(
    function() {
      onSetRemoteSuccess(pc1);
    },
    onSetSessionDescriptionError
  );
}

function onIceCandidate(pc, event) {
  getOtherPc(pc).addIceCandidate(event.candidate)
  .then(
    function() {
      onAddIceCandidateSuccess(pc);
    },
    function(err) {
      onAddIceCandidateError(pc, err);
    }
  );
  trace(getName(pc) + ' ICE candidate: \n' + (event.candidate ?
      event.candidate.candidate : '(null)'));
}

function onAddIceCandidateSuccess(pc) {
  trace(getName(pc) + ' addIceCandidate success');
}

function onAddIceCandidateError(pc, error) {
  trace(getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
}

function onIceStateChange(pc, event) {
  if (pc) {
    trace(getName(pc) + ' ICE state: ' + pc.iceConnectionState);
    console.log('ICE state change event: ', event);
  }
}

var canvasVideoStream;
var drawCanvas = false;
var hexagonSize = 30;
function videoToCanvas()
{
    var texture = canvas.texture(localVideo);
    canvas.draw(texture).hexagonalPixelate(320, 239.5, hexagonSize).update();
    if (drawCanvas)
        window.requestAnimationFrame(videoToCanvas);
}

var isUpdatingHexagonSize = false;
function updateHexagonSize()
{
    if (!isUpdatingHexagonSize)
        return;
    if (hexagonSize <= 1) {
        stopUsingDiscreetMode();
        isUpdatingHexagonSize = false;
        return;
    }
    hexagonSize--;
    setTimeout(updateHexagonSize, 300);
}

function startUsingDiscreetMode()
{
    hexagonSize = 30;
    if (!canvasVideoStream)
        canvasVideoStream = canvas.captureStream();

    if (!drawCanvas) {
        drawCanvas = true;
        videoToCanvas();
    }

    if (!isUpdatingHexagonSize) {
        isUpdatingHexagonSize = true;
        updateHexagonSize();
    }
}

function stopUsingDiscreetMode()
{
    for(var sender of pc1.getSenders()) {
        if (sender.track.kind === "video") {
            sender.replaceTrack(localStream.getVideoTracks()[0]);
            return;
        }
    }
}

function trace(arg) {
  var now = (window.performance.now() / 1000).toFixed(3);
  console.log(now + ': ', arg);
}


