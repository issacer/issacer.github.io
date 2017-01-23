+function(){
	Modal = function(){
	};
	Modal.prototype = {
	};

	$.fn.show = function(){
		$(this).addClass('in');
	};
	$.fn.hide = function(){
		$(this).removeClass('in');
	}
	$.fn.close = function(){
		$(this).hide();
	};
	$.fn.modal = function(){
		$(this).show();
	};
	$('.modal .modal-dialog').on('click', function(e){
		e.stopPropagation();
	});
	$('.modal').on('click', function(){
		$(this).hide();
	})
}();