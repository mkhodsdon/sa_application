// Track a new page using setPath:
// Update the path stored in the tracker:
var _hsq = window._hsq = window._hsq || [];
_hsq.push(['setPath', '/#/new-page']);
// Track the page view for the new page
_hsq.push(['trackPageView']);


// Track a new page by updating the browser state:
// Update the browser state, showing "updated.html" in the browser address bar
var stateObj = { foo: 'updated' };
history.pushState(stateObj, "updated page", "www.mikehodsdon.com");
//Track the page view for the new page, '/updated.html'
var _hsq = window._hsq = window._hsq || [];
_hsq.push(['trackPageView']);
