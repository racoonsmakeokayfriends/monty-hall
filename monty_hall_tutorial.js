$(document).ready(function()	{
  // If you change the tutorials at all, change them here!
  var tut_list = ['#more_doors', '#bayes', '#vos_savant', '#carlton', '#adams_and_devlin', '#the_economist', '#simulations', '#cp_tree', '#vos_savant_ext', '#more_doors_text'];
  var tut_id = tut_list[Math.floor(Math.random()*tut_list.length)];
  //tut_id = tut_list[0];
  var N = 10;   // change for number of doors used

  function init_tutorial()  {
    $(tut_id).show();
    if (tut_id===tut_list[0])  // lots of doors
    {    
      for (var i=0; i<10; i++) {
        $d = $('<div class="door" id="door'+i.toString()+'" value='+i.toString()+'></div>');
        $d.css('background-image', 'url(small_door' + (i+1).toString()+ '.png)')
        $('#door_wrapper').append($d);
      }
      play_N_doors();
    }

    if (tut_id===tut_list[2])  // math
    {
      play_bayes();
    }
  };

  init_tutorial();


  function open_bad_door_small(position) {
    // Opens the door at this position (1 being leftmost, N being rightmost)
    // and reveal a goat or bear...
    var bad_door_id = '#door' + position.toString();
    $(bad_door_id).css('color', 'red');
    $(bad_door_id).css('font-size','84pt');
    $(bad_door_id).html('');
    $(bad_door_id).css('background-image','url(small_goat.png)');
  };

  function open_good_door_small(position) {
    // Opens the door at this position (1 being leftmost, N being rightmost)
    // and reveal a goat or bear...
    var bad_door_id = '#door' + position.toString();
    $(bad_door_id).css('color', '#00CCD6');
    $(bad_door_id).css('font-size','20pt');
    $(bad_door_id).html('you win! :}');
    $(bad_door_id).css('background-image','url(small_car.png)');
  };

  function player_pick(position)  {
    // Makes it clear which door the player picked!
    var bad_door_id = '#door' + position.toString();
    $(bad_door_id).css('color', '#333333');
    $(bad_door_id).css('font-size','12pt');
    $(bad_door_id).html('you picked me! :}');
  };

  function player_lose() {
    $('#door_wrapper').append('<h1>You lose :(</h1>');
  };

  function open_N_doors(door_picked, win_door)
  {
    extra_door = win_door;
    if (door_picked === win_door)   // need to pick extra door
    {
      extra_door = Math.floor(Math.random()*N);
      while (extra_door === door_picked)
      {
        extra_door = Math.floor(Math.random()*N);
      }
    }

    for (var i=0; i<N; i++)
    {
      if (i !== door_picked && i !== extra_door)
      {
        open_bad_door_small(i);
      }          
    }
    return extra_door;
  };

  function remove_doors()  {
    $('#more_doors').remove('.door');
  };

  function show_play_again() {
    $('#play_again_wrapper').show();
  };

  function update_score_card(move, result)  {
    var stay_win = parseInt($('#stay_win').html());
    var stay_lose = parseInt($('#stay_lose').html());
    var switch_win = parseInt($('#switch_win').html());
    var switch_lose = parseInt($('#switch_lose').html());

    if (move === 'stay')  {
      if (result === 'win') {
        $('#stay_win').html(stay_win+=1);
      }
      if (result === 'lose') {
        $('#stay_lose').html(stay_lose+=1);
      }
    }
    if (move === 'switch')  {
      if (result === 'win') {
        $('#switch_win').html(switch_win+=1);
      }
      if (result === 'lose') {
        $('#switch_lose').html(switch_lose+=1);
      }
    }

    // for avoiding dividing by 0
    var stay_total = stay_win + stay_lose;
    var switch_total = switch_win + switch_lose;
    if (stay_total === 0)
      stay_total = 1;
    if (switch_total === 0)
      switch_total = 1;

    var stay_win_percent = Math.round(stay_win * 100 / stay_total);
    var switch_win_percent = Math.round(switch_win * 100 / switch_total);
    $('#switch_percent').html('switching has won ' + switch_win_percent + '% of the time');
    $('#stay_percent').html('staying has won ' + stay_win_percent + '% of the time');
  };


  // This will implement the tutorial with lots of doors
  function play_N_doors() {
    $('#to_test').hide()
    var step = 1;
    var win_door = Math.floor(Math.random()*N);
    var first_pick;
    var extra_door;     // this is the remaining unopened door

    // @@@ FOR DEBUGGING @@@
    //$('#door'+win_door.toString()).css('background-color','pink');

    $('.door').click(function() {
      door_picked = parseInt($(this).attr('value'));
      if (step === 1)        // player has picked their first doors
      {
        first_pick = door_picked;
        player_pick(first_pick);
        extra_door = open_N_doors(first_pick, win_door);
        step += 1;
      }
      else if (step === 2)   // player needs to switch or stay
      {
        if (door_picked === first_pick)   // player stayed
        {
          if (door_picked === win_door)   // player stayed and won (unlikely)
          {
            open_good_door_small(win_door);
            update_score_card('stay', 'win');
          }
          else                            // player stayed and lost (likely)
          {
            open_bad_door_small(door_picked);
            update_score_card('stay', 'lose');
            player_lose();
          }
        }
        if (door_picked === extra_door)     // player switched
        {
          if (door_picked === win_door)     // player switched and won (likely)
          {
            open_good_door_small(win_door);
            update_score_card('switch', 'win');
          }
          else                              // player switched and lost (unlikely)
          {
            open_bad_door_small(door_picked);
            update_score_card('switch', 'lose');
            player_lose();
          }          
        }
        show_play_again();
        step += 1;
        // if the player picked any other door, then nothing happens
      }      
    });

    $('#play_again').click(function() {
        $('#door_wrapper').empty();
        $('#play_again_wrapper').hide();
        init_tutorial();
    });
    
    $('#done_game').click(function()  {
      $('#tutorial').hide();
      $('#test').show();
    });


  };

  // This will implement the tutorial with the bayes theroem
  function play_bayes() {
    
  };

  $("#to_test").click(function()  {
    $('#tutorial').hide();
    $('#test').show();
    $('#to_test').hide();
  });

  /*
    TO DO:
      First Trial:
        { } First Page
        { } Link to tutorial page
        { } Do regular trial
        { } Store results of regular trial
        
      Tutorial: Lotsa Doors
        { } Perhaps keep record of switch/staying and winning/losing
            { } Round to not have insane numbers
        { } Perhaps allow students to choose the number of doors
            + Might give students an extra push to understand the relation
            - It is slightly more difficult to draw a varied number of doors
        { } Brainstorm more ideas for goat/car 
            (it should be more clear of the 'good' door and the 'bad' door)
        { } Maybe have triangle indicating unopened door for more clarity
            
      Test:
        { } How exactly are we going to test knowledge?

      Database:
        { } Record the tutorial given
        { } Record the results of the test

  */

});
