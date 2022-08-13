prediction1="";
prediction2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format:"jpeg",
    jpeg_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image'src='"+data_uri+"'>";

    });
} 
console.log("ml5.version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json",modelloaded);
function modelloaded(){
    console.log("MODEL IS LOADED");
}
function speak(){
    var synth=window.speechSynthesis;
    speakdata1="first prediction is"+prediction1;
    speakdata2="second prediction is"+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}

function check(){
    var img= document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){
if(error){
    console.log(error);
}
else {console.log (results);
    document.getElementById("result_emotion_name1").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label=="amazing"){
        document.getElementById("update_emoji_1").innerHTML="&#128076;";

    }
    if(results[0].label=="best"){
        document.getElementById("update_emoji_1").innerHTML="&#128077;";

        
    }
    if(results[0].label=="victory"){
        document.getElementById("update_emoji_1").innerHTML="&#9996;";

        
    }
    if(results[1].label=="amazing"){
        document.getElementById("update_emoji_2").innerHTML="&#128076;";

    }
    if(results[1].label=="best"){
        document.getElementById("update_emoji_2").innerHTML="&#128077;";

        
    }
    if(results[1].label=="victory"){
        document.getElementById("update_emoji_2").innerHTML="&#9996;";

        
    }
    

    




}
}