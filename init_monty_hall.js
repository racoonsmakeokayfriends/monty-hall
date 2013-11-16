$(document).ready(function()	{

  var car_door_id;     // id of door with a car  
  var door_picked_id;  // id of door picked
  var goat_door;       // id of door monty will show
  var round1 = true;   // set false after user picks a door
  var switched;        // stores whether the player switched or not
  var game_over;       // stores whether the player won or not

  function initialize_round()  {
    car_door_id = '#door' + (Math.floor(Math.random()*3)+1).toString();
    $('#door1').css('background-image','url(big_door1.png)');
    $('#door2').css('background-image','url(big_door2.png)');
    $('#door3').css('background-image','url(big_door3.png)');
    // for debugging, we show the car door with green outline
    //$(car_door_id).css('border', '5px solid green');
  };

  function open_bad_door(door_id) {
    // Opens the door at this position (1 being leftmost, N being rightmost)
    // and reveal a goat
    //var bad_door_id = '#door' + position.toString();
    $(door_id).css('color', 'red');
    $(door_id).css('font-size','84pt');
    $(door_id).html('X');
    $(door_id).css('background-image','url(big_goat.png)');
  };

  function open_good_door(door_id) {
    // Opens the door at this position (1 being leftmost, N being rightmost)
    // and reveal a car
    //var bad_door_id = '#door' + position.toString();
    $(door_id).css('color', 'yellow');
    $(door_id).css('font-size','34pt');
    $(door_id).html('you win!');
    $(door_id).css('background-image','url(big_car.png)');
  };

  function player_pick(door_id)  {
    // Makes it clear which door the player picked!
    //var bad_door_id = '#door' + position.toString();
    $(door_id).css('color', '#333333');
    $(door_id).css('font-size','24pt');
    $(door_id).html('first choice :}');
  };

  // normal monty assumptions
  function pick_door_to_show()  {
    if (door_picked_id === '#door1' || car_door_id === '#door1')
    {      
      if (door_picked_id === '#door2' || car_door_id === '#door2')
        goat_door = '#door3';
      else if (door_picked_id === '#door3' || car_door_id === '#door3')
        goat_door = '#door2';
      else
      {
        var randnum = Math.floor(Math.random())*2+2;
        goat_door = '#door' + randnum.toString();        
      }
    }
    else if (door_picked_id === '#door2' || car_door_id === '#door2')
    {
      if (door_picked_id === '#door3' || car_door_id === '#door3')
        goat_door = '#door1';
      else
      {
        var randnum = Math.floor(Math.random())*2;
        if (randnum === 1)
          goat_door = '#door1';
        else
          goat_door = '#door3';
      }        
    }
    else
    {
      var randnum = Math.floor(Math.random())*2+1;
      goat_door = '#door' + randnum.toString()
    }
    
    open_bad_door(goat_door);
  };

  initialize_round();


  $('.door').click(function() {
    if (game_over)  {
      return;
    }
    if (round1)
    {
      door_picked_id = '#' + $(this).attr('id');
      player_pick(door_picked_id);
      pick_door_to_show();
      $('#title').html("Do you wish to stay with your choice or switch?");
      round1 = false;
    }
    else
    {      
      var new_choice = '#' + $(this).attr('id');
      // user picked the goat door, which was a boo-boo
      if (new_choice === goat_door)
      {
        $('#title').html("Would you really rather have a goat than a car?");
      }
      else
      {        
        if (door_picked_id === new_choice)  // user stayed
        {
          switched = false;
        }
        else                                // user switched
        {
          switched = true;
        }

        $(new_choice).html("");
        if (new_choice === car_door_id)   // user won
        {
          $('#title').html("You won a car!");
          $(new_choice).css('background-image','url(big_car.png)');
          game_over = true;          
        }
        else                              // user lost
        {
          $('#title').html("You lost, I hear goats bite...");
          $(new_choice).css('background-image','url(big_goat.png)');
        }        
        game_over = true;
        $('#init_footer').show();  
      }
    }   
  });

  /*
  $('#' + car_door).click(function()  {
    door_picked = $('#' + car_door).attr('id');
    $('#' + car_door).fadeOut('slow');
  });
  */

  /* make door disappear when clicked 
  $(document).on('click','.door', function()  {
    $(this).fadeOut('slow');
  });
  */

  /*
    TO DO:
    Basic
    {+}  establish the door with a car
    {+}  get user's first choice
    {+}  using user's first choice and car door, show goat (normal Monty)
    {+}  get user's new choice
    {+}  store whether they switched or stayed
    
    Errors
    { }  deal with extra clicks from user

    Different Monties
    { }  establish which Monty we're using
    { }  write code to be able to handle 3 different Monties
    { }  write code for mean monty
    { }  write code for neutral monty

    Better-fy
    { }  write a function for displaying goat doors
    { }  write a function for displaying car doors
  */

  $('#to_tutorial').click(function()  {
    window.location.replace("monty_hall_tutorial.html");
  });

});
