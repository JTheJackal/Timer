/**
 * Created by J on 03/10/2014.
 */
window.onload = function() {

    var nameArray = [document.getElementById("name1"), document.getElementById("name2"), document.getElementById("name3"), document.getElementById("name4")]; //Creates an array for all the name labels.
    var timeArray = [document.getElementById("time1"), document.getElementById("time2"), document.getElementById("time3"), document.getElementById("time4")]; //Creates an array for all the time labels.
    var add = document.getElementById("addButton");             //Assign the add button to a variable.
    var start = document.getElementById("startButton");         //Assign the start button to a variable.
    var stop = document.getElementById("stopButton");           //Assign the stop button to a variable.
    var clear = document.getElementById("clearButton");         //Assign the clear button to a variable.
    var help = document.getElementById("helpButton");           //Assign the help button to a variable.
    var i = 0;                                                  //Variable used to keep track of how many items added.
    var totalTime = 1;                                          //Variable for the accumulated time.
    var running = false, positive = true;                       //Boolean variables.
    var delay;

    document.getElementById("timer").innerHTML = "Ready!";

    add.onclick = function() {                                  //This function will take in the name and time before adding them to the appropriate labels.

        if (i <= 4) {

            var name = document.getElementById("takeName");     //Assign the input box for the label name to a variable.
            var time = document.getElementById("takeTime");     //Assign the input box for the time to a variable.
            var label1Node = document.createTextNode(name.value);//Create a node for the name label.
            var label2Node = document.createTextNode(time.value);//Create a node for the time label.

            if(time.value <= -1){
                alert("Please enter a positive time in seconds");
                positive = false;
            } else{
                positive = true;
            }

            if(positive) {

                nameArray[i].appendChild(label1Node);               //Add the appropriate string to the current name label using the node.
                timeArray[i].appendChild(label2Node);               //Add the appropriate time to the current time label using the node.

                totalTime = totalTime + parseInt(time.value);        //Converts "timeValue" to an integer before adding the new time to the existing total time.

                name.value = null;                                  //Reset the name input box.
                time.value = null;                                  //Reset the time input box.
                i++;                                                //Increment the "i" variable for the if statement and array index.
            }
        }
    };

    start.onclick = function() {                                    //Begin function if the start button is pressed

        var swapped;
        var highest = 0;

        do {                                                        //Bubble sort loop to organise the labels from lowest time to highest
            swapped = false;
            for (var j = 0; j < timeArray.length - 1; j++) {
                if (parseInt(timeArray[j].innerText) > parseInt(timeArray[j + 1].innerText)) {
                    var temp = timeArray[j].innerText;
                    var temp2 = nameArray[j].innerText;
                    timeArray[j].innerText = timeArray[j + 1].innerText;
                    nameArray[j].innerText = nameArray[j + 1].innerText;
                    timeArray[j + 1].innerText = temp;
                    nameArray[j + 1].innerText = temp2;
                    swapped = true;
                }
            }
        }while(swapped);

        for (var k = 0; k <timeArray.length; k++){
            if(highest < parseInt(timeArray[k].innerText)){
                highest = parseInt(timeArray[k].innerText);
            }
        }
        totalTime = parseInt(highest);           //Make the timer equal the longest given time.

        if(!running) {                                          //Execute the countdown only if the timer isn't already running
            running = true;                                     //Indicate the time is now running.
            startCountdown();
        }
    };

    stop.onclick = function() {

        if(running){                                            //Only let the timer stop if it's running.
            running = false;                                    //Prevent the system from running.
            clearInterval(delay);                               //Stop the countdown.
        }
    };

    clear.onclick = function() {

        if(!running) {

            for(var j = 0; j < nameArray.length; j++) {         //Loop for the number of labels
                nameArray[j].innerHTML = "";                    //Clear all the name labels.
                timeArray[j].innerHTML = "";                    //Clear all the time labels.
                document.getElementById("timer").innerHTML = "Ready!";//Reset the timer display.
            }

            i = 0;                                              //Allow new times and labels to be added.
            totalTime = 0;                                      //Reset the total time.
        }
    };

    help.onclick = function(){
        window.location.href="help.html";
    }

    function startCountdown(){                                  //Begin the 1 second timer.

        delay = setInterval(mainTimer, 1000);
    }

    function mainTimer(){

        if(totalTime === 0){

            running = false;
            clearInterval(delay)
        }

        if(running) {

            totalTime = totalTime - 1;                                      //Decrease the total time by 1.
            document.getElementById("timer").innerHTML = totalTime + "s";   //Display the new total time
        }

        for(var l = 0; l <= timeArray.length; l++){
            var labelTime = parseInt(timeArray[l].innerHTML);

            if(labelTime >= 1) {
                labelTime = labelTime - 1;
                timeArray[l].innerHTML = labelTime + "s";
                if(labelTime === 0){
                    timeArray[l].innerHTML = "Finished!"
                }
            }
        }
    }
};