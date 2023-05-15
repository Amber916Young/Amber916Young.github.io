function openApp() {
    var appURL = "myapp://myapp/page1";
    var fallbackURL = "https://example.com/myapp/page1"; // Redirect to web page if the app is not installed
    window.location.href = appURL;
    setTimeout(function() { // Check if the app is opened after 1 second
      if (document.hidden) {
        window.location.href = fallbackURL;
      } else {
        // The app is opened
        // Set a cookie or local storage to indicate that the app is installed
        document.cookie = "myapp_installed=true";
        localStorage.setItem("myapp_installed", "true");
      }
    }, 1000);
  }