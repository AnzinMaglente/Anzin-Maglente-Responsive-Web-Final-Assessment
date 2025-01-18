let check = true;

function Darkmode(){

    if (check == true){
        document.body.style.backgroundColor = "black";
        check = false;
    }else{
        document.body.style.backgroundColor = "white";
        check = true;
    }
}