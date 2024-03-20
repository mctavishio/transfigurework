let tools = {
	logmsg: msg => {
		try { 
			// console.log("### ::: " + msg); 
		}
		catch(err) { z.tools.logerror(err) }
	},
	logerror: error => {
		try { console.log("rusty error ... " + error); }
		catch(err) {}
	},
	randominteger: (min, max) => {
		return Math.floor( min + Math.random()*(max-min));
	},
	toFixed: (number,place) => {
		// The output of this is: 18.15
		//return Math.round((number + Number.EPSILON) * 100) / 100);
		return parseFloat(number).toFixed(place);
	},
	reifyWeightedArray: arr => {
		return arr.reduce( (acc, item, j) => {
			Array.prototype.push.apply(acc,[...Array(item[1]).keys()].reduce( (acc2,k) => { acc2.push(item[0]); return acc2 },[]) );
			return acc;
		}, []);
	},
	//Fisher-Yates (aka Knuth) Shuffle
	shufflearray: array => {
	  let currentIndex = array.length,  randomIndex;
	  // While there remain elements to shuffle...
	  while (currentIndex != 0) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex--;
	    // And swap it with the current element.
	    [array[currentIndex], array[randomIndex]] = [
	      array[randomIndex], array[currentIndex]];
	  }
	  return array;
	},
	rotate: matrix => {
		return matrix.map((row, i) =>
			row.map((val, j) => matrix[matrix.length - 1 - j][i])
		);
	},
	rotatenxnMatrix(array) {
		return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
	},
	rotateClockwise(a) {
		var n=a.length;
		for (var i=0; i<n/2; i++) {
			for (var j=i; j<n-i-1; j++) {
				var tmp=a[i][j];
				a[i][j]=a[n-j-1][i];
				a[n-j-1][i]=a[n-i-1][n-j-1];
				a[n-i-1][n-j-1]=a[j][n-i-1];
				a[j][n-i-1]=tmp;
			}
		}
		console.log(`a=${JSON.stringify(a)}`);
		return a;
	},
	hexToRGB: h => {
		let r = 0, g = 0, b = 0;
		// 3 digits
		if (h.length == 4) {
			r = "0x" + h[1] + h[1];
			g = "0x" + h[2] + h[2];
			b = "0x" + h[3] + h[3];
			// 6 digits
		} else if (h.length == 7) {
			r = "0x" + h[1] + h[2];
			g = "0x" + h[3] + h[4];
			b = "0x" + h[5] + h[6];
		}
		return {r:+r,g:+g,b:+b};
	},
	RGBToHSLA: ({r,g,b,a=1}={}) => {
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r,g,b),
			cmax = Math.max(r,g,b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0)
			h = 0;
		// Red is max
		else if (cmax == r)
			h = ((g - b) / delta) % 6;
		// Green is max
		else if (cmax == g)
			h = (b - r) / delta + 2;
		// Blue is max
		else
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		//return "hsl(" + h + "," + s + "%," + l + "%)";
		// return "hsla(" + h + "," + s + "%," +l + "%," + a + ")";
		return {h:h, s:s, l:l, a:a}
	},
	hexToRGB2:  hex => {
		let alpha = false,
			h = hex.slice(hex.startsWith('#') ? 1 : 0);
		if (h.length === 3) h = [...h].map(x => x + x).join('');
		else if (h.length === 8) alpha = true;
		h = parseInt(h, 16);
		return (
			'rgb' +
			(alpha ? 'a' : '') +
			'(' +
			(h >>> (alpha ? 24 : 16)) +
			', ' +
			((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
			', ' +
			((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
			(alpha ? `, ${h & 0x000000ff}` : '') +
			')'
		);
	},
	tween: (p1,p2,t,d) => {
		let dt = (100*t/d)/100;
		let pdt = {};
		Object.keys(p1).forEach(k=> {
			if(isNaN(p1[k])) {
				//pdt[k] = p1[k];
				//pdt[k] = t%5===0 ? p2[k] : p1[k];
				pdt[k] = tools.randominteger(0,10)<1 ? p2[k] : p1[k];
			}
			else {
				pdt[k] = (100*p1[k] + 100*(p2[k]-p1[k])*dt)/100;
			}
		});
		return pdt;
	},
	//linear tween
	//for more see: https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
	//https://spicyyoghurt.com/tools/easing-functions
	tweenParameters: (p1,p2,nsteps,t) => {
		let m = t/nsteps;
		let pt = Object.keys(p1).reduce( (ptacc,key) => {
			if(isNaN(p1[key])) {
				ptacc[key] = t>nsteps-3 ? [p1[key],p2[key]][Math.floor(Math.random() * 2)] : p1[key];
			}
			else {
				ptacc[key] = p1[key] + (p2[key] - p1[key])*m;
			}
			//console.log(`pt[${key}] = ${ptacc[key]}`);
			return ptacc;
		}, {});
		return pt;
	},
	//https://github.com/freder/bezier-spline
	interpolatePath: pts => {
	},
	getDateTime: () => {
		const datetime= new Date();
		const timestamp = datetime.getTime();
		const year = datetime.getFullYear();
		const month = datetime.getMonth();
		const date = datetime.getDate();
		const hour = datetime.getHours();
		const minute = datetime.getMinutes();
		const second = datetime.getSeconds();
		const millisecond = datetime.getMilliseconds();
		const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][datetime.getDay()];
		const str = datetime.toDateString();
		const codestr = `${year}.${month.toString().padStart(2,0)}.${date.toString().padStart(2,0)}T${hour.toString().padStart(2,0)}.${minute.toString().padStart(2,0)}.${second.toString().padStart(2,0)}.${millisecond.toString().padStart(3,0)}`;
		const ISOstr = datetime.toISOString();
		return {
			obj: datetime,timestamp,year,month,date,hour,minute,second,millisecond,day,str,codestr,ISOstr
		}
	},
	randomhighharmonic: () => {
		let multipliers = [10.0, 12.5, 13.33, 15, 20];
		return multipliers[ z.tools.randominteger( 0, multipliers.length) ];
	},
	randomharmonic: () => {
		let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
		return multipliers[ z.tools.randominteger( 0, multipliers.length) ];
	},
	randomlowharmonic: () => {
		let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
		return multipliers[ z.tools.randominteger( 0, multipliers.length) ]/2;
	},
	randomkey: (object) => {
		let keys = Object.keys(object);
		let key = keys[z.tools.randominteger(0,keys.length)];
		// z.tools.logmsg("key = " + key);
		return key;
	},
	togrid: (min=1, max=1, x=1, ndivisions=1) => {
		let dx = Math.floor( (max-min) / ndivisions );
		return Math.floor( ( x-min+dx/2)/dx )*dx + min;
	},
	shuffle: (array) => {
		copy = array.slice();
		for (var i = copy.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = copy[i];
			copy[i] = copy[j];
			copy[j] = temp;
		}
		return copy;
	},
	flatten: (arr) => {
		return arr.reduce(function (flat, item) {
			return flat.concat(Array.isArray(item) ? z.tools.flatten(item) : item);
		}, []);
	},
	jsonToHTMLFields: {
		title: value => {return "<h1>"+value+"</h1>"}, 
		subtitle: value => {return "<h2>"+value+"</h2>"}, 
		description: value => {return tools.createElementStr({tag:"div", cssclasses:["description"], value:value}) + tools.createElementCloseStr({tag:"div"})}, 
		text: value => {return tools.createElementStr({tag:"div", cssclasses:["text"], value:value}) + tools.createElementCloseStr({tag:"div"})}, 
		keywords: value => {return tools.createElementStr({tag:"div", cssclasses:["keywords"], value:value.join(", ")}) + tools.createElementCloseStr({tag:"div"})}, 
		figure: value => {return tools.createElementStr({tag:"div", cssclasses:["frame figure"], value:value}) + tools.createElementCloseStr({tag:"div"})}, 
	},
	jsonToHTMLArticle: ({article, attributes={}, cssclasses=[], cssstyles={}, ns="none"}={}) => {
		let articlestr = tools.createElementTagStr({tag:"article",attributes,cssclasses,cssstyles}); 
		//console.log("articlestr = "+articlestr);
		articlestr = articlestr + tools.createElementTagStr({tag:"header"});
		articlestr =  articlestr + tools.createElementCloseStr({tag:"article"});
		let contents = Object.keys(article).reduce( (acc,key) => {
			try {
				acc = acc + tools.jsonToHTMLFields[key](article[key]);
			}
			catch(err) {
				console.log("can't translate: "+key);
			}
			return acc;	
		},"");
		return tools.createElementStr({tag, cssclasses, value:contents});
	},
	createElementTagStr: ({tag="div", attributes={}, cssclasses=[], cssstyles={}, ns="none", value="", isEmpty=false}={}) => {
		//console.log("tag = "+tag);
		//console.log(attributes);
		let el=`<${tag} `;
		if(ns!=="none") {
			el = el + `xmlns="${ns}" `;
		}
		Object.entries(attributes).forEach( entry => {
			el = el + `${entry[0]}="${entry[1]}" `;
		});
		if(cssstyles.length>0) {
			el = el + `style=" `;
			Object.entries(cssstyles).forEach( entry => {
				el = el + `${entry[0]}:${entry[1]}; `;
			});
			el = el + `" `;
		}
		if(cssclasses.length>0) {
			el = el + `class="`;
			cssclasses.forEach( entry => {
				el = el + `${entry} `;
			});
			el = el + `" `;
		}
		if(!isEmpty) { 
			el = el + `>
				${value}
			`;
		}
		else { el = el + "/>" }
		//tools.logmsg(`element created: ${el}`);
		return el;
	},
	createElementCloseStr: (tag="div",isEmpty=false) => {
		let closeStr = isEmpty ? "/>" : `</${tag}>`;
		return closeStr; 
	},
	createElement: ({parentel=document.querySelector("body"), tag="div", attributes={}, cssclasses=[], cssstyles={}, ns="none"}={}) => {
		let el;
		if(ns!=="none") {
			el = document.createElementNS(ns, tag);
			Object.entries(attributes).forEach( entry => {
				el.setAttributeNS(null, entry[0], entry[1]);
			});
		}
		else {
			el = document.createElement(tag);
			Object.entries(attributes).forEach( entry => {
				el.setAttribute(entry[0], entry[1]);
			});
		}
		Object.entries(cssstyles).forEach( entry => {
			//z.tools.logmsg("entry = " + entry)
			el.style[entry[0]] = entry[1];
		});
		cssclasses.forEach( entry => {
			el.classList.add(entry);
		});
		parentel.appendChild(el);
		return el;
	},
	applyCSS: function(el, css, j, n) {
		var j = j || 0, n = n || 1;
		for (var key in css) {
			if (css.hasOwnProperty(key)) {
				if(typeof css[key] === "function") el.style[ key ] = css[key](j, n);
				else el.style[ key ] = css[key];
			}
		}
	},
	drawp: {
		circle: p => { return {cx:p.cx,cy:p.cy,r:p.r,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.strokecolor,fill:p.fillcolor } },
		ellipse: p => { return {cx:p.cx,cy:p.cy,rx:p.r*1.2, ry:p.r*.8, "stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.strokecolor,fill:p.fillcolor } },
		scircle: p => { return {cx:p.cx,cy:p.cy,r:p.r,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":1.0,"fill-opacity":0.0,stroke:p.strokecolor,fill:p.fillcolor } },
		fcircle: p => { return {cx:p.cx,cy:p.cy,r:p.r,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":0.0,"fill-opacity":1.0,stroke:p.strokecolor,fill:p.fillcolor } },
		rect: p => { return {x:p.cx,y:p.cy,width:p.w,height:p.h,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.strokecolor,fill:p.fillcolor } },
		//rect: p => { return {x:p.cx,y:p.cy,width:p.w,height:p.h,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.strokecolor,fill:p.fillcolor } },
		vline: p => { return {x1:p.cx,x2:p.cx,y1:0,y2:1,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,stroke:p.strokecolor } },
		hline: p => { return {x1:0,x2:1,y1:p.cy,y2:p.cy,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,stroke:p.strokecolor } },
		line: p => { return {x1:p.x1,x2:p.x2,y1:p.y1,y2:p.y2,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,stroke:p.strokecolor } },
	},

	drawf: ({width=100,height=100,min=100,max=100}={},p,tag,cssclasses=[]) => {
		let attmap = att => {
			let multiplier = height;
			if(["width","x","x1","x2","cx"].includes(att)) {
				multiplier = width;
			}
			else if(["stroke-width","stroke-dasharray","r"].includes(att)) { 
				multiplier = min;
			}
			else if(["stroke-dashoffset"].includes(att)) { 
				multiplier = max;
			}
			else if(["stroke-opacity","fill-opacity"].includes(att)) {
				multiplier = 1;
			}
			return multiplier;
		};
		let atts = Object.keys(p).reduce( (acc,key) => {
			if(isNaN(p[key])) {
				acc[key]=p[key];
			}
			else {
				acc[key] = Math.round(100*p[key]*attmap(key))/100;
				//acc[key] = 1.0*Number(p[key])*attmap(key);
			}
			return acc; 
		},{});
		//console.log("atts = "+JSON.stringify(atts));
		//console.log("drawf = "+ tools.createElementTagStr({tag:tag,attributes:atts,isEmpty:true}));
		//if(tag==="rect"){console.log(`from tools atts=${JSON.stringify(atts)}`);}
		return tools.createElementTagStr({tag:tag,attributes:atts,isEmpty:true,cssclasses});
	},
	curves: {
		init:  () => {
			// find each path, to see if it has Catmull-Rom splines in it
			var pathEls = document.documentElement.getElementsByTagName("path");
			for (var p = 0, pLen = pathEls.length; pLen > p; p++) {
				var eachPath = pathEls[ p ];
				tools.curves.parsePath( eachPath, eachPath.getAttribute("d") );
			}
		},
		parsePath: ( path, d ) => {
			var pathArray = [];
			var lastX = "";
			var lastY = "";

			//var d = path.getAttribute( "d" );
			if ( -1 != d.search(/[rR]/) ) {
				// no need to redraw the path if no Catmull-Rom segments are found
				// split path into constituent segments
				var pathSplit = d.split(/([A-Za-z])/);
				for (var i = 0, iLen = pathSplit.length; iLen > i; i++) {
					var segment = pathSplit[i];
					// make command code lower case, for easier matching
					// NOTE: this code assumes absolution coordinates, and doesn't account for relative command coordinates
					var command = segment.toLowerCase()
					if ( -1 != segment.search(/[A-Za-z]/) ) {
						var val = "";
						if ( "z" != command ) {
							i++;
							val = pathSplit[ i ].replace(/\s+$/, '');
						}

						if ( "r" == command ) {
							// "R" and "r" are the a Catmull-Rom spline segment
							var points = lastX + "," + lastY + " " + val;
							// convert Catmull-Rom spline to BÃ©zier curves
							var beziers = tools.curves.catmullRom2bezier( points );
							//insert replacement curves back into array of path segments
							pathArray.push( beziers );
						} else {
							// rejoin the command code and the numerical values, place in array of path segments
							pathArray.push( segment + val );
							// find last x, y points, for feeding into Catmull-Rom conversion algorithm
							if ( "h" == command ) {
								lastX = val;
							} else if ( "v" == command ) {
								lastY = val;
							} else if ( "z" != command ) {
								var c = val.split(/[,\s]/);
								lastY = c.pop();
								lastX = c.pop();
							}
						}
					}
				}
				// recombine path segments and set new path description in DOM
				path.setAttribute( "d", pathArray.join(" ") );
			}
		},
		catmullRom2bezier: ( points ) => {
			// alert(points)
			points = points + "";
			var crp = points.split(/[,\s]/);
			var d = "";
			for (var i = 0, iLen = crp.length; iLen - 2 > i; i+=2) {
				var p = [];
				if ( 0 == i ) {
					p.push( {x: parseFloat(crp[ i ]), y: parseFloat(crp[ i + 1 ])} );
					p.push( {x: parseFloat(crp[ i ]), y: parseFloat(crp[ i + 1 ])} );
					p.push( {x: parseFloat(crp[ i + 2 ]), y: parseFloat(crp[ i + 3 ])} );
					p.push( {x: parseFloat(crp[ i + 4 ]), y: parseFloat(crp[ i + 5 ])} );
				} else if ( iLen - 4 == i ) {
					p.push( {x: parseFloat(crp[ i - 2 ]), y: parseFloat(crp[ i - 1 ])} );
					p.push( {x: parseFloat(crp[ i ]), y: parseFloat(crp[ i + 1 ])} );
					p.push( {x: parseFloat(crp[ i + 2 ]), y: parseFloat(crp[ i + 3 ])} );
					p.push( {x: parseFloat(crp[ i + 2 ]), y: parseFloat(crp[ i + 3 ])} );
				} else {
					p.push( {x: parseFloat(crp[ i - 2 ]), y: parseFloat(crp[ i - 1 ])} );
					p.push( {x: parseFloat(crp[ i ]), y: parseFloat(crp[ i + 1 ])} );
					p.push( {x: parseFloat(crp[ i + 2 ]), y: parseFloat(crp[ i + 3 ])} );
					p.push( {x: parseFloat(crp[ i + 4 ]), y: parseFloat(crp[ i + 5 ])} );
				}
				// Catmull-Rom to Cubic Bezier conversion matrix
				//    0       1       0       0
				//  -1/6      1      1/6      0
				//    0      1/6      1     -1/6
				//    0       0       1       0
				var bp = [];
				bp.push( { x: p[1].x,  y: p[1].y } );
				bp.push( { x: ((-p[0].x + 6*p[1].x + p[2].x) / 6), y: ((-p[0].y + 6*p[1].y + p[2].y) / 6)} );
				bp.push( { x: ((p[1].x + 6*p[2].x - p[3].x) / 6),  y: ((p[1].y + 6*p[2].y - p[3].y) / 6) } );
				bp.push( { x: p[2].x,  y: p[2].y } );

				d += "C" + bp[1].x + "," + bp[1].y + " " + bp[2].x + "," + bp[2].y + " " + bp[3].x + "," + bp[3].y + " ";
			}
			return d;
		},
	},
};
module.exports = tools;
