app.filter('scoreFilter', function(){
    return function(x) {
        var uniqList = [];
        for(var i=0;i<x.length;i++) {
            if(uniqList.indexOf(x[i])<0) {
                uniqList.push(x[i]);
            }
            
        }
    }
});