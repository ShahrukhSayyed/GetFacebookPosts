 // main document ready function to check if dom is loaded fully or not
$( document ).ready(() =>{


    //Hiding the containers on load
    $("#mianContainer").hide();
    $("#loader").hide();
    $("#containerCoverPic").hide();


    //Classes added for NavBar
    $('ul li').click(() => {
        $("li").removeClass("active");
        $(this).addClass("active");
    });


    $("#linkBasicDetails").on('click',() => { //animation to Navbar
        $("#basicDetailsCard").show(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });//end function

    $("#linkAbout").on('click',() => {
        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").show(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });

    $("#linkEducation").on('click',() =>{

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").show(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });


    $("#linkWork").on('click',() => {

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").show(1000);
        $("#postsCard").hide(1000);
    
    });


    $("#linkPosts").on('click',() =>{

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").show(1000);
    
    }); //End function





    //Functions for retrieving the data
	
    	
	let getFacebookInfo =  () => {

        	let myFacebookToken = $("#tokenText").val();
		    localStorage.setItem("Token", myFacebookToken); //storing coockies for Token 
		
        	$.ajax('https://graph.facebook.com/me?fields=id,name,cover,education,work,birthday,gender,interested_in,languages,quotes,email,address,picture.width(300).height(300),friends&access_token='+myFacebookToken,{

                success : (response) => {
  //                  console.log(response);
  //                  console.log(typeof(response));
                    
                    //Cover and Profile pic
                    if(response.picture.data != undefined && response.picture.data!= null ){
                        $("#profilePic").attr("src", "" + response.picture.data.url + "");                        
                    }
                    else{
                        $("#profilePic").attr("src", "images/Avatar.png");                           
                    }

                    if(response.cover != undefined && response.cover != null ){
                        $("#coverPic").attr("src", "" + response.cover.source + "");
                    }    
                    else{
                        $("#coverPic").attr("src", "images/default-cover.jpg");
                    }
                    

                    //Basic Details
                    if(response.name != undefined && response.name != null ){
                        $("#myName").text(response.name);
                    }    
                    else{
                        $("#myName").text("Not available in facebook");
                    }

                    if(response.birthday != undefined && response.birthday != null ){
                        $("#myBirthday").text(response.birthday);
                    }    
                    else{
                        $("#myBirthday").text("Not available in facebook");
                    }
			
                    if(response.gender != undefined && response.gender != null ){
                        $("#myGender").text(response.gender);
                    }    
                    else{
                        $("#myGender").text("Not available in facebook");
                    }
                    
                    if(response.interested_in != undefined && response.interested_in != null ){
                        $("#myInterest").text(response.interested_in);
                    }    
                    else{
                        $("#myInterest").text("Not available in facebook");
                    }



                    let lang = $.map(response.languages, (index) => {
                        return index.name;
                    });

                    if(lang == null ){
                        $("#myLanguages").text("Not available in facebook");
                    }    
                    else{
                        $("#myLanguages").text(lang);
                    }



                    //About

                    if(response.quotes != undefined && response.quotes != null ){
                        $("#myQoutes").text(response.quotes);
                    }    
                    else{
                        $("#myQoutes").text("Not available in facebook");
                    }

                    
                    if(response.email != undefined && response.email != null ){
                        $("#myEmail").text(response.email);
                    }    
                    else{
                        $("#myEmail").text("Not available in facebook");
                    }


                    let friends = $.map(response.friends.data, (index,value) =>{
                        return index.name;
                    });
                    
                    let friendsCounts = response.friends.summary.total_count ;

                    $("#myFriends").text(friends + "+" + friendsCounts + " more" ); 

                    

                    //Work 

                    let employer = $.map(response.work, (index,value) => {
                        if(index.employer != undefined && index.employer!= null ){
                            return (index.employer.name );
                        }
                        else{
                            return "N/A";
                        }
                    });

                    let position = $.map(response.work, (index,value) =>{
                        if(index.position != undefined && index.position != null){
                            return (index.position.name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(employer, (i, item) => {
                        if(employer[i] != null && position[i] != null)
                            $("#myEmployer").append("Company : " + "<strong>" + employer[i] + "</strong><br>" + "Position : " + position[i] + "<hr>" );
                    });
                    //End Work


                    //Education

                    let colleges = $.map(response.education, (index,value) => {
                        if(index.school != undefined && index.school != null ){
                            return index.school.name;
                        }
                        else{
                            return "N/A";
                        }
                    });

                    let concentration = $.map(response.education, (index,value) => {
                        if(index.concentration != undefined && index.concentration != null){
                            return (index.concentration[0].name);
                            //console.log(index.concentration[0].name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(colleges, (i, item) => {
                        if(concentration[i] != null && colleges[i] != null)
                            //console.log(colleges[i]);
                            $("#myEducation").append("School Name : " + "<strong>" + colleges[i] + "</strong><br>" + "Concentration : "+ concentration[i] + "<hr>" );
                    });

                    //End Education

                    $("#mianContainer").show();
                    $("#basicDetailsCard").show(1000);
                    $("#aboutCard").hide(1000);
                    $("#educationCard").hide(1000);
                    $("#workCard").hide(1000);
                    $("#postsCard").hide(1000);
                    $("#containerCoverPic").show(1000);

                },

                timeout: 1500, // keeping the timeout for 1.5 sec 
                beforeSend: () => { //Displaying loader
                    $('#loader').delay(1500).show();
                    $("#mianContainer").hide();

                },
                complete: () => {
                    $('#loader').delay(1500).hide(); // hide the loader on screen 

                },

                error: (req, status, error) => { // error function for showing the error on console and giving warining to users via alert
                    $('#loader').delay(1500).hide(); // hide the loader on screen 
                    $("#mianContainer").hide();
                    $("#containerCoverPic").hide();


                    console.log("Error occured", status, error);
                        alert("Invalid Token or Server Timeout");    
                    
                }

            }//end argument list 
        );// end ajax call 

    }// end get facebook info

 


   $("#facebookBtn").on('click',getFacebookInfo); // calling getFacebookInfo method to retrieve the data




});
