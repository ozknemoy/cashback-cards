$(document).ready(function(){

	$('.form-group.label-floating .form-control').focusin(function(){
		$(this).parent().addClass('is-focused');
	});
	$('.form-group.label-floating .form-control').focusout(function(){
		$(this).parent().removeClass('is-focused');
	});
	$('.form-group.label-floating .form-control').change(function(){
		var v = $(this).val();
		var email = $("input[type='email']").val();
		if(v.length > 0) {
			$(this).parent().removeClass('is-empty');
		} else {
			$(this).parent().addClass('is-empty');
		}
		if ((!validEmail(email)) && $(this).is('.required')) {
			$(this).parent().addClass('has-error');
			return false;
		} else {
			$(this).parent().removeClass('has-error');
		}
		
	})
	function validEmail(v) {
		var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
		return (v.match(r) == null) ? false : true;
	}

	var w = $(window).width();

	wow = new WOW();
	wow.init();	

	$('.btn-down').click(function(){
		$('html,body').animate().scrollTo('#slide2', 400);
	});
	
	$('#form').submit(function(e){
		var email = $("input[type='email']").val();
		if (!email.length>0) {
			e.preventDefault();
			$("input[type='email'].required").parent().addClass('has-error');
		} else {
			$("input[type='email'].required").parent().removelass('has-error');
		}
	});
});