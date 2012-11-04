$(function() {
	
	window.prettyPrint && prettyPrint();
	$("#main_focus").focus();
	
	$("#main_menu_cell a").live('click',function()
	{
		$('#aside_container').removeAttr('style');
		$('#main_menu_cell svg').css('fill','#707070');
		
		var target_menu = $(this).data("target");
		var target_menu_visibility = $('#'+target_menu).css('display');
		
		var device_type = '';
		if($('#mobile_logo').css('display')=='block'){ device_type='mobile'; }
		if($('#tablet_logo').css('display')=='block'){ device_type='tablet'; }
		if($('#desktop_logo').css('display')=='block'){ device_type='desktop'; }
		
		if(device_type!='desktop')
		{
			$('#aside_container .side_unit').hide();
			$('.menu_arrow').remove();
			
			if(target_menu_visibility=='none')
			{
				$(this).find('svg').css('fill','#CCCCCC');
				$('#'+target_menu).css('display','inline-block');
				
				$('#modal_overlay').show();
				$('#aside_container').show();
				set_height(target_menu);
				$(".nano").nanoScroller();
				$(this).after('<div class="menu_arrow"></div>');
				//set_height($('#'+target_menu).height(),$('html').height(),$('html').width());
				
			}
			else
			{
				$('#aside_container').removeAttr('style');
				$('#modal_overlay').removeAttr('style');
			}
			
		}else{
			$('.widget_content').removeClass('highlight');
			$('#'+target_menu+' .widget_content').addClass('highlight');
		}
	});
	
	$("#menu_launcher a").live('click',function(){
		var menu_visibility = $('#main_menu_cell').css('display');
		if(menu_visibility=='none'){
			$('#title_cell').hide();
			$('#main_menu_cell').css('display','inline-block');
			$('#show_menu').hide();
			$('#hide_menu').show();
		}else{
			reset_view_Menu();
			/*$('#title_cell').css('display','inline-block');
			$('#main_menu_cell').removeAttr('style');
			$('#show_menu').show();
			$('#hide_menu').hide();*/
		}
		
	});
	
	$(window).resize(function() {
		reset_view_Menu();
	});
	
	$("#modal_overlay").live('click',function(){
		reset_view_Menu();
	});
	
	$('.pagination').jqPagination({
		paged: function(page) {
			window.location.replace('http://mytemplate.tumblr.com/page/'+page);
		}
	});
	
	$("section article").each(function(){
		postImg = $(this).find(".intro_img_path").attr("href");
    postIntro = $(this).find(".intro_text_html").html();
    				
    $(this).find(".intro_sup").html("");
    $(this).find(".intro_img").attr("src", postImg);
    $(this).find(".intro_text").html(postIntro);
  });
  $(".nano").nanoScroller();
  $("#tumblr_controls").remove();
  
  create_navigation_and_tags($("section article:first"), $("section article:first").attr('id'));
  
  $("#main_nav a").live('click',function()
	{
		$('#'+$('#main_nav').data('art-id')).find('.highlight').removeClass('highlight');
		reset_view_Menu();
		$($(this).attr('href')).addClass('highlight');
	});
  
});

function to_top() {
	$(".nano").nanoScroller({scroll:'top'});
}

function set_height(target_menu){
	var menu_height = $('#'+target_menu).height();
	var doc_height = $('html').height();
	var doc_width = $('html').width();
	
	$('#aside_container').height('');
	if(doc_height>(menu_height+62)){
		$('#aside_container').css('height',menu_height+48);
		//$('#aside_container').css('width','340px');
	}else{
		$('#aside_container').css('width',doc_width-24+'px');
		var resized_menu_height = $('#'+target_menu).height();
		if(doc_height>(resized_menu_height+62)){
			$('#aside_container').css('height',resized_menu_height+48);
		}else{
			$('#aside_container').css('bottom','12px');
		}
	}
}

function reset_view_Menu() {
	$('body').find('.highlight').removeClass('highlight');
  $('#aside_container').removeAttr('style');
  $('#main_menu_cell svg').css('fill','#707070');
	$('#modal_overlay').removeAttr('style');
	$('.side_unit').removeAttr('style');
	$('.menu_arrow').remove();
	$('#title_cell').removeAttr('style');
	$('#main_menu_cell').removeAttr('style');
	$('#menu_launcher a').removeAttr('style');
	$(".nano").nanoScroller();
}

function create_navigation_and_tags(article, article_id) {
	if($('#main_nav').data('art-id')!=article_id){
		var article_type = '';
		if(article.hasClass('text')){ article_type='text'}
		if(article.hasClass('link')){ article_type='link'}
		if(article.hasClass('photo')){ article_type='photo'}
		if(article.hasClass('chat')){ article_type='chat'}
		if(article.hasClass('quote')){ article_type='quote'}
		
		var main_nav_html=''
		
	  if(article_type=='text'||article_type=='link'){
	  	article.find(":header").addClass('post_headings');
	  	$.each($('.post_headings'), function(index, value){
	  		var headings_title = '';
	  		var headings_target = '';
	  		if($(this).children().length == 1){
	  			headings_title = $(this).find('a').html();
	  			main_nav_html +='<li class="center"><a href="#"><strong>'+headings_title+'</strong></a></li>';
	  		}else{
	  			if($(this).is('h2')){
	  				$(this).parent().parent().attr('id','post_unit_'+index);
	  				headings_title = $(this).html();
	  			}
	  			else if($(this).is('h3')){
	  				$(this).parent().attr('id','post_unit_'+index);
	  				headings_title = '&nbsp;'+$(this).html();
	  			}
	  			else{
	  				$(this).attr('id','post_unit_'+index);
	  				headings_title = '&nbsp;&nbsp;'+$(this).html();
	  			}
	  			headings_target = '#post_unit_'+index;
	  			main_nav_html +='<li><a href="'+headings_target+'">'+headings_title+'</a></li>';
	  		}
	  	});
	  }else if(article_type=='chat'){
	  	main_nav_html= '<li class="center"><a href="#"><strong>'+$('#'+article_id+' h1 a').html()+'</strong></a></li>';
	  }else if(article_type=='photo'||article_type=='quote'){
	  	if (typeof ($('#'+article_id+' .art_title').data('art-title')) !== "undefined"){
	  		main_nav_html= '<li class="center"><a href="#"><strong>'+$('#'+article_id+' .art_title').data('art-title')+'</strong></a></li>';
	  	}
	  }
	  
	  var art_tags = $.trim($('#'+article_id+' .art_tags').html());
	  
	  $('#main_nav').attr('data-art-id',article_id);
	  if(main_nav_html!=''&&main_nav_html){
	  	$('#main_nav .widget_content').html(main_nav_html);
	  }else{
	  	$('#main_nav .widget_content').html('<li class="center"><a href="#"><strong>There are no headings for this post.</strong></a></li>');
	  }
	  if(art_tags!=''&&art_tags){
	  	console.log(art_tags);
	  	$('#tags_container .widget_content').html(art_tags);
	  }else{
	  	$('#tags_container .widget_content').html('<span >There are no tags for this post.</span>');
	  }
	  
  }
}
