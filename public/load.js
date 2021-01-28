function Load(){
    document.getElementById("form").style.display="none";
    document.getElementById("load").style.display='block';
}
function reset(){
    document.getElementById("form").style.display="block";
    document.getElementById("load").style.display='none';
}
function kill(){
    window.location.replace("/")
}