// function openApp() {
//     var appURL = "orderitapp://myapp/page1";
//     var fallbackURL = "https://apps.apple.com/ie/app/order-it/id6448471657"; // Redirect to web page if the app is not installed
//     window.location.href = appURL;
//     setTimeout(function() { // Check if the app is opened after 1 second
//       if (document.hidden) {
//         window.location.href = fallbackURL;
//       } else {
//         // The app is opened
//         // Set a cookie or local storage to indicate that the app is installed
//         document.cookie = "myapp_installed=true";
//         localStorage.setItem("myapp_installed", "true");
//       }
//     }, 1000);
//   }


function ios() {
		var _clickTime = +(new Date());
		var ifr = document.createElement("iframe");
		ifr.src = "orderitapp://app.orderit.ie?reset-pass"; /***打开app的协议，ios提供***/
		ifr.style.display = "none";
		document.body.appendChild(ifr);
		//启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
		var _count = 0, intHandle;
		intHandle = setInterval(function () {
			_count++;
			var elsTime = +(new Date()) - _clickTime;
			// console.log(_count, elsTime, +(new Date()), _clickTime)
			if (_count >= 100 || elsTime > 3000) {
				clearInterval(intHandle);
				document.body.removeChild(ifr);
				//检查app是否打开
				if (document.hidden || document.webkitHidden) {
					// 打开了
					window.close();
				} else {
					// 没打开
					window.location.href = 'https://apps.apple.com/ie/app/order-it/id6448471657'//下载链接
				}
			}
		}, 20);
	}
function openApp() {
		var u = window.navigator.userAgent;
// 		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
// 		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// 		if (isAndroid) {
// 			android();
// 		}
// 		if (isiOS) {
			ios();
// 		}
	}
	function android() {
		var _clickTime = new Date().getTime();
		window.location.href = ''; /***打开app的协议,同事提供***/

		//启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
		var _count = 0, intHandle;
		intHandle = setInterval(function () {
			_count++;
			var elsTime = new Date().getTime() - _clickTime;
			if (_count >= 100 || elsTime > 3000) {
				clearInterval(intHandle);
				//检查app是否打开
				if (document.hidden || document.webkitHidden) {
					// 打开了
					window.close();
				} else {
					// 没打开
					window.location.href = ''  //下载链接
				}
			}
		}, 20);

	}
