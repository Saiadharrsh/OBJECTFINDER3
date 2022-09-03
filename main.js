objects = [];
statuss = "";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
    objectname = document.getElementById("nameobject").value;

}

function modelLoaded() {
    console.log("Model loaded");
    statuss = true;

}
function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
 objects= results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (statuss!= "") {
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="objects detected";
            fill('#FF0000');
            noFill();
            stroke('#FF0000');
            confpercent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + confpercent + "%", objects[i].x+15, object.y+15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == objectname) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("found").innerHTML=" mentioned object found";
                synthspeech=window.speechSynthesis;
              utterThis=new SpeechSynthesisUtterance("object mentioned found");
              synthspeech.speak(utterThis);
            }
            else{
                document.getElementById("found").innerHTML=" mentioned object not found"; 
            }
        }
    }
}

