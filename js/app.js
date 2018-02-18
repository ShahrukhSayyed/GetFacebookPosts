 // main document ready function to check if dom is loaded fully or not
$( document ).ready(function() {



    //Classes added for NavBar
    $('ul li').click(function(){
        $("li").removeClass("active");
        $(this).addClass("active");
    });

    //Hiding the containers on load
    $("#mianContainer").hide();
    $("#loader").hide();
    $("#containerCoverPic").hide();



    $("#linkBasicDetails").on('click',function(){ //animation to Navbar
        $("#basicDetailsCard").show(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });//end function

    $("#linkAbout").on('click',function(){


        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").show(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });

    $("#linkEducation").on('click',function(){

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").show(1000);
        $("#workCard").hide(1000);
        $("#postsCard").hide(1000);
    
    });


    $("#linkWork").on('click',function(){

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").show(1000);
        $("#postsCard").hide(1000);
    
    });


    $("#linkPosts").on('click',function(){

        $("#basicDetailsCard").hide(1000);
        $("#aboutCard").hide(1000);
        $("#educationCard").hide(1000);
        $("#workCard").hide(1000);
        $("#postsCard").show(1000);
    
    }); //End function





    //Functions for retrieving the data
	
    	
	function getFacebookInfo(){

        	var myFacebookToken = $("#tokenText").val();
		localStorage.setItem("Token", myFacebookToken); //storing coockies for Token 
		
        	$.ajax('https://graph.facebook.com/me?fields=id,name,cover,education,work,birthday,gender,interested_in,languages,quotes,email,address,picture.width(300).height(300),friends&access_token='+myFacebookToken,{

                success : function(response){
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
                        $("#myName").text("");
                    }

                    if(response.name != undefined && response.name != null ){
                        $("#myBirthday").text(response.birthday);
                    }    
                    else{
                        $("#myName").text("");
                    }
                    if(response.name != undefined && response.name != null ){
                        $("#myGender").text(response.gender);
                    }    
                    else{
                        $("#myGender").text("");
                    }
                    if(response.name != undefined && response.name != null ){
                        $("#myInterest").text(response.interested_in);
                    }    
                    else{
                        $("#myInterest").text("");
                    }



                    var lang = $.map(response.languages, function(index) {
                        return index.name;
                    });
                    $("#myLanguages").text(lang);

                    //About

                    if(response.quotes != undefined && response.quotes != null ){
                        $("#myQoutes").text(response.quotes);
                    }    
                    else{
                        $("#myQoutes").text("");
                    }

                    

                    $("#myEmail").text(response.email);

                    var friends = $.map(response.friends.data, function(index,value) {
                        return index.name;
                    });
                    
                    var friendsCounts = response.friends.summary.total_count ;

                    $("#myFriends").text(friends + "+" + friendsCounts + " more" ); 

                    

                    //Work 

                    var employer = $.map(response.work, function(index,value) {
                        if(index.employer != undefined && index.employer!= null ){
                            return (index.employer.name );
                        }
                        else{
                            return "N/A";
                        }
                    });

                    var position = $.map(response.work, function(index,value) {
                        if(index.position != undefined && index.position != null){
                            return (index.position.name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(employer, function(i, item) {
                        if(employer[i] != null && position[i] != null)
                            $("#myEmployer").append("Company : " + "<strong>" + employer[i] + "</strong><br>" + "Position : " + position[i] + "<hr>" );
                    });
                    //End Work


                    //Education

                    var colleges = $.map(response.education, function(index,value) {
                        if(index.school != undefined && index.school != null ){
                            return index.school.name;
                        }
                        else{
                            return "N/A";
                        }
                    });

                    var concentration = $.map(response.education, function(index,value) {
                        if(index.concentration != undefined && index.concentration != null){
                            return (index.concentration[0].name);
                            //console.log(index.concentration[0].name);
                        }
                        else{
                            return "N/A";
                        }
                    });

                    $.each(colleges, function(i, item) {
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
                beforeSend: function () { //Displaying loader
                    $('#loader').delay(1500).show();
                    $("#mianContainer").hide();

                },
                complete: function () {
                    $('#loader').delay(1500).hide(); // hide the loader on screen 

                },

                error: function (req, status, error) { // error function for showing the error on console and giving warining to users via alert
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
