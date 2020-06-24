import $ from'jquery';

//Handles Has most used functions to reduce redundancy 
//and therefore error tracking and errors themselves too

export default class CaxhHelper {

    constructor(){
        //this flag controls and tries to prevent duplicate requests
        //requests only run if no other request is running
        this.isAjaxRunning = false;
    }


    preventDefault(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("Event default and propagation behaviours have been stopped!");
        console.log(e.currentTarget.value);
    }

    isEmpty(data){
        //check for what you dont want it to be and return a bool value
        let iE = data !== false && data !== "false" && data !== null && data !== "null" && data !== undefined 
            && data !== "undefined" && data !== 0 && data !="0"
            ? false : true; 

        return iE;//isEmpty
    }
	
	send(data, url, successCallback, errorCallback){
        console.log('CaxhHelper.send fuction was reached!')
        //Make sure none of these values are empty
        //protect against code injections later
        if(data && url && successCallback && errorCallback && this.isAjaxRunning === false){

            //set the isAjaxRunning flag to prevent duplicate requests
            //then reset it when the request is done
            this.isAjaxRunning = true;

            //auth Function
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "json",
                success: (results) => {
                    console.log(`SUCCESS: request for ${url} was a success`);
                    console.log(results);
                    //CALLBACK
                    if(results.length > 0){ successCallback(results) }else{ errorCallback(results) }

                    //allow other request to run when this one is done
                    this.isAjaxRunning = false;
                },
                error: (error) => {

                    //CALLBACK
                    errorCallback(error);
                    console.log("ERROR: request for " + url +" was a failure");
                    console.log(error);

                    //allow other request to run when this one is done
                    this.isAjaxRunning = false;
                }
            });

        }else{
            console.log('Sorry, request parameters cannot be empty. Please double check them.');
            alert('Sorry, request parameters cannot be empty. Please double check them.');
            return;
        }

        return;
	}

}