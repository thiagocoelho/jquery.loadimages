(function($)
{
	/*
	 * Author: Giulian Drimba & Thiago Coelho
	 * 
	*/
	
	$.fn.loadImages = function(callback, scope)
	{
		var images = $(this).find("img");

		var bg_images_elements = $(this).find("*");

		for (var i = 0; i < bg_images_elements.length; i++)
		{
			var bg_el = $(bg_images_elements[i]).css("background-image");

			if (bg_el !== "none")
			{
				var pattern = /url\("{0,1}([^"]*)"{0,1}\)/;
				var url = pattern.exec(bg_el)[1];

				var img = new Image();
				img.src = url;

				images.push(img);
			}
		}

		var totalImages = images.length;
		var imagesLoaded = 0;

		//console.log("totalImages", totalImages);

		var self = this;

		if(scope)
			self = scope;

		for (var i = 0; i < totalImages; i++)
		{
			var img = images[i];

			var simg = $(img);

			var currImage = new Image();
			currImage.src = simg.attr("src");

			//console.log(currImage.width);

			if (currImage.width > 0)
			{
				onLoadImage();
			}
			else
			{
				$(img).load(function(){
				//	console.log("onLoadImage");
					onLoadImage();
				});	
			}
		}

		function onLoadImage()
		{
			imagesLoaded++;

			//console.log("imagesLoaded", imagesLoaded);

			if(imagesLoaded >= totalImages)
			{
				//console.log("callback function", callback);

				if(callback)
				{
					callback.call(self,callback);
					//console.log("callback");
				}
			}
		}
	}

})(jQuery);