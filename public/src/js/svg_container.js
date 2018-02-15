var bodymovin = require('bodymovin');

var element = document.getElementById('bodymovin');

var data_1 = {"v":"5.1.7","fr":29.9700012207031,"ip":0,"op":93.0000037879676,"w":800,"h":600,"nm":"Comp 2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[201,244.5,0],"ix":2},"a":{"a":0,"k":[-199,-55.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[97.145,102.75],"ix":2},"p":{"a":0,"k":[0,172],"ix":3},"r":{"a":0,"k":12,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.537762403488,0.972549021244,0.906052291393,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":9,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":29,"ix":1},"o":{"a":0,"k":-8,"ix":2},"m":1,"ix":4,"tr":{"ty":"tr","p":{"a":0,"k":[-21,12],"ix":2},"a":{"a":0,"k":[32,-57],"ix":1},"s":{"a":0,"k":[119,119],"ix":3},"r":{"a":0,"k":208,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"Transform"},"nm":"Repeater 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[16,20],"ix":2},"a":{"a":0,"k":[91,-55],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1.404,1.439]},"o":{"x":[0.51,0.51],"y":[0,0]},"n":["0_1p404_0p51_0","0_1p439_0p51_0"],"t":0,"s":[9.282,8.649],"e":[174.196,160.603]},{"i":{"x":[0.327,0.327],"y":[0.997,0.996]},"o":{"x":[0.253,0.253],"y":[0.582,0.631]},"n":["0p327_0p997_0p253_0p582","0p327_0p996_0p253_0p631"],"t":26,"s":[174.196,160.603],"e":[8.241,7.608]},{"t":92.0000037472368}],"ix":3},"r":{"a":0,"k":-6113,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":-18,"ix":4},"sa":{"a":0,"k":39351,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":4,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":600.000024438501,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":1,"nm":"Cyan Solid 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[400,300,0],"ix":2},"a":{"a":0,"k":[400,300,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"sw":800,"sh":600,"sc":"#22aad1","ip":0,"op":600.000024438501,"st":0,"bm":0}],"markers":[]};

var animatedObject = bodymovin.loadAnimation({
	container: element, // the dom element that will contain the animation
	renderer: 'svg',
	loop: true,
	autoplay: true,
	animationData: data_1
	// path: 'data/data.json' // the path to the animation json
});