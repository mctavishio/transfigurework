const fs = require("fs"); 
const tools = require("./tools.js");
const mills = require("./indexTransFiles.js").reverse();
const dt = new Date();
const timestamp = dt.getTime();
const datetime = dt.toDateString();
const description = "code art ::: algorithmic transfigure patterns";
const rooturl = "https://transfigure.work";
const gsurl = "https://storage.googleapis.com/bindery";
const authorurl = "https://mctavish.work";
const chosenmill = mills[tools.randominteger(0,mills.length)];
let indexhtml = `
<html>
<head>
	<title>transfigure</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<meta name="description" content="${description}"/>
	<meta name="author" content="kathy mctavish">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "transfigure",
			"breadcrumb": "core text",
			"url": "${rooturl}",
			"description": "${description}",
			"datePublished": "${datetime}",
			"image": "/apple-touch-icon.png",
			"author": "${authorurl}",
			"license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
		}
	</script>

	<link rel="stylesheet" media="screen" href="css/core.css"/>
	<style>
	:root {
		--corecolor: var(--daycolor);
	  	--corebg: var(--daybg);
	  	--coreveilbg: var(--dayveilbg); 
	}
	html {
		background-color: var(--warmblack);
	}
	body {
		background-image: url("${gsurl}/${mills[1]}/poster9x9_0000.png"); 
		background-attachment: fixed;
		background-size: auto 100%;
		background-color:var(--warmblack);
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmgray);
		background-color: var(--corebg);
	}
	h5 {
		color: var(--warmblack);
	}
	main {
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmblack);
		background-color: var(--corebg);
	}
	</style>
</head>
<body class="" >
<div id="mainflex">
<main class="expand narrow" id="top">
<header>
	<h1>trans | figure</h1>
	<h2>compiled ::: <span class="small">${datetime}</span></h2>
</header>
<nav>
	<ul>
		<li><a href="workinggroup.html">trans | figure working group</a></li>
		<li><a href="https://mctavish.work/index.html" id="homelink">go to mctavish portfolio</a></li>
		<li><a href="https://riverboxpress.com/" id="vallink">go to river box press</a></li>
		<li><a href="https://wildwoodriver.com/" id="wrlink">go to wildwoodriver press</a></li>
		<li><a href="https://datapoets.com/" id="datapoetslink">go to data poets</a></li>
		<li><a href="#videoall">sample video</a></li>
		<li><a href="#list">trans | figure sequences</a></li>
		<!--<li><a href="#about">about</a></li>-->
	</ul>
</nav>
<div class="screenreader-text">
	<p>Your feedback is always welcome.</p>
</div>
<article id="videoall">
	<header>
		<h1>sample video</h1>
	</header>
	<div id="content">
	<figure>
<video controls poster="https://storage.googleapis.com/bindery/mill20240320111334/poster9x9_0003.png">
  <source src="https://storage.googleapis.com/bindery/mill20240320111334/film9x9_sound.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<!--
	<div class="vimeowrapper16x9" >
		<iframe src="https://player.vimeo.com/video/905046109?title=0&amp;byline=0&amp;portrait=0" width="600" height="338"frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	</div>
	-->
	</figure>
	</div>
</article>

<article id="list">
	<header>
		<h1>trans | figure sequences</h1>
	</header>
	<div class="content">
		<p>These are a series of samples/experiments that can be expanded
		into longer single-channel or multi-channel
		works.</p>
	<h5>digital samples</h5>
	<ul>`
indexhtml = indexhtml + mills.map( name=>name.slice(4) ).map( name=>{
	return	`
		<li><a href="index${name}.html">trans|figure sequence ${name}</a></li>`;
}).join("");
indexhtml = indexhtml + ` 
	</ul>
	</div>
</article>
<!--
<article id="about">
	<header>
		<h1>notes</h1>
	</header>
	<div class="content">
	<p>This is part of a larger research project into the sequences ::: the continuums
	<ul>
		<li>tonal fragements => sound threads</li>
		<li>frame sequence => film</li>
		<li>list of text & image blocks => book</li>
		<li>list of vectors => composite image</li>
		<li>list of composite images => prints</li>
		<li>list of media packages => index</li>
	</ul>
	</p>
	<p>I am also interested in the act of tweening ::: that discrete
	set of bridges from one moment to the next.</p>
	</div>
</article>
-->
<article id="thanks">
	<header>
		<h1>project support</h1>
	</header>
	<div class="content">
		<p>trans | figure annual working conferences are funded by the blue window foundation.</p>
	</div>
</article>
</main>
</div>
</body>
</html>`;
mills.map( mill=> {
	let s = mill.substring(4);
	let year = s.substring(0,4);
	let month = s.substring(4,6)-1;
	let date = s.substring(6,8);
	let hour = s.substring(8,10);
	let minute = s.substring(10,12);
	let dt = new Date(year,month,date,hour,minute);
	return {
		name: mill,
		suffix: mill.substring(4),
		//datetime: dt.toString(),
		datetime: dt.toDateString(),
		posters9x9: [
			`poster9x9_0000.png`,
			`poster9x9_0001.png`,
			`poster9x9_0002.png`,
			`poster9x9_0003.png`,
			`poster9x9_0004.png`,
		],
		posters16x9: [
			`poster16x9_0000.png`,
			`poster16x9_0001.png`,
			`poster16x9_0002.png`,
			`poster16x9_0003.png`,
			`poster16x9_0004.png`,
		],
		title: `trans | figure ${s}`,
		subtitle: `${year}.${month}.${date} ${hour}:${minute}`, 
		url: `index${s}.html`,
	}
}).forEach( mill => {
	let head = `
<head>
	<title>${mill.title}</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<meta name="description" content="${description}"/>
	<meta name="author" content="kathy mctavish">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "${mill.title}",
			"breadcrumb": "core text",
			"url": "${rooturl}/${mill.url}",
			"description": "${description}",
			"datePublished": "${mill.datetime}",
			"image": "/apple-touch-icon.png",
			"author": "${authorurl}",
			"license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
		}
	</script>

	<link rel="stylesheet" media="screen" href="css/core.css"/>
	<style>
	:root {
		--corecolor: var(--daycolor);
	  	--corebg: var(--daybg);
	  	--coreveilbg: var(--dayveilbg); 
	}
	body {
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmlightwhite);
		background-color: var(--corebg);
		background-image: url("${gsurl}/${mill.name}/${mill.posters16x9[tools.randominteger(0,3)]}"); 
		background-attachment: fixed;
		background-size: auto 100%;
		}
	main {
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmblack);
		background-color: var(--corebg);
	}
	</style>
</head>
`
	let html = `<html>${head}
<body class="" >
<div id="mainflex">
<main class="expand wide" id="top">`;
	html = html + `
<header>
	<h1>trans | figure sequence</h1>
	<h2>created ::: ${mill.datetime}</h2>
</header>
<nav>
	<ul>
		<li><a href="index.html" id="indexlink">back to transfigure index</a></li>
		<li><a href="https://mctavish.work/index.html" id="homelink">go to mctavish portfolio</a></li>
		<li><a href="#audio">audio tracks</a></li>
		<li><a href="#books">books</a></li>
		<li><a href="#prints">prints</a></li>
	</ul>
</nav>
<div class="screenreader-text">
	<p>Your feedback is always welcome.</p>
</div>
<article id="video">
	<header>
		<h1>video</h1>
	</header>
	<div class="content">
<h5>2 minute 9x9 animation</h5>
<figure>
<video controls poster="${gsurl}/${mill.name}/${mill.posters9x9[tools.randominteger(0,4)]}">
  <source src="${gsurl}/${mill.name}/film9x9_sound.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</figure>

<h5>2 minute 16x9 animation</h5>
<figure>
<video controls poster="${gsurl}/${mill.name}/${mill.posters16x9[tools.randominteger(0,4)]}">
  <source src="${gsurl}/${mill.name}/film16x9_sound.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</figure>
<!--
${gsurl}/${mill.name}/film9x9_1min_sound.mp4
${gsurl}/${mill.name}/film9x9_15sec_sound.mp4
${gsurl}/${mill.name}/film9x9_15sec_v_sound.mp4
${gsurl}/${mill.name}/film16x9_1min_sound.mp4
${gsurl}/${mill.name}/film16x9_15sec_sound.mp4
${gsurl}/${mill.name}/film16x9_15sec_v_sound.mp4
-->

	</div>
</article>

<article id="audio">
	<header>
		<h1>raw sound files</h1>
	</header>
	<div class="content">
	<h5>~ 4min</h5>
	<p>
		<audio loop=true controls="true" id="soundscape" src="${gsurl}/${mill.name}/tf_raw_4_sound.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>
	</p>
	<h5>~ 2min</h5>
	<p>
		<audio loop=true controls="true" id="soundscape" src="${gsurl}/${mill.name}/tf_raw_2_sound.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>
	</p>
	<!--
	<h5>sound files</h5>
	<p>
	<ul>
		<li><a href="${gsurl}/${mill.name}/tf_raw_4_sound.mp3">raw ~4min</a></li>
		<li><a href="${gsurl}/${mill.name}/tf_raw_2_sound.mp3">raw ~2min</a></li>
		<li><a href="${gsurl}/${mill.name}/tf_02:00_sound.mp3">fade to 2min</a></li>
		<li><a href="${gsurl}/${mill.name}/tf_01:00_sound.mp3">fade to 1min</a></li>
		<li><a href="${gsurl}/${mill.name}/tf_00:15_sound.mp3">fade to 15sec</a></li>
	</ul>
	</p>
	-->
	</div>
</article>
<article id="books">
	<header>
		<h1>books</h1>
	</header>
	<div class="content">
	<ul>
		<li><a href="printbook${mill.suffix}.html">html version</a></li>
		<li><a href="${gsurl}/${mill.name}/printbook.pdf">illustrated book (pdf)</a></li>
		<li><a href="${gsurl}/${mill.name}/printpicturebook.pdf">picture book (pdf)</a></li>
		<li><a href="${gsurl}/${mill.name}/printpostcardbook.pdf">postcard book (pdf)</a></li>
	</ul>
	</div>
</article>
<article id="prints">
	<header>
		<h1>prints</h1>
		<p>click on image to get larger version</p>
	</header>
	<div class="content">
	<div class="gallery"  id="here"></div>
	</div>
</article>
<article id="notes">
	<header>
		<h1>notes</h1>
	</header>
	<div class="content">
	<p>code package @ ${mill.name}</p>
	</div>
</article>
</main>
</div>
</body>
<script>
	let createEl = (parent, tagname, attributes, events) => {
		let el = document.createElement(tagname);
		Object.entries(attributes).forEach( att => {
			el.setAttribute(att[0], att[1]);
		});
		Object.entries(events).forEach( evt => {
			el.addEventListener(evt[0], evt[1]);
		})
		parent.appendChild(el);
	}
	let photos = [
		{"filename": "picture003.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0003.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0003.png"},
		{"filename": "picture004.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0004.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0004.png"},
		{"filename": "picture005.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0005.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0005.png"},
		{"filename": "picture006.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0006.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0006.png"},
		{"filename": "picture007.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0007.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0007.png"},
		{"filename": "picture008.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0008.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0008.png"},
		{"filename": "picture009.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0009.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0009.png"},
		{"filename": "picture010.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0010.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0010.png"},
		{"filename": "picture011.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0011.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0011.png"},
		{"filename": "picture012.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0012.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0012.png"},
		{"filename": "picture013.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0013.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0013.png"},
		{"filename": "picture014.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0014.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0014.png"},
		{"filename": "picture015.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0015.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0015.png"},
		{"filename": "picture016.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0016.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0016.png"},
		{"filename": "picture017.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0017.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0017.png"},
		{"filename": "picture018.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0018.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0018.png"},
		{"filename": "picture019.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0019.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0019.png"},
		{"filename": "picture020.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0020.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0020.png"},
		{"filename": "picture021.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0021.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0021.png"},
		{"filename": "picture022.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0022.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0022.png"},
		{"filename": "picture023.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0023.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0023.png"},
		{"filename": "picture024.jpg", "uri_small": "https://storage.googleapis.com/bindery/${mill.name}/size400/picture0024.png", "uri_large": "https://storage.googleapis.com/bindery/${mill.name}/picture0024.png"},
	];
	window.addEventListener('load', e => {
		let here = document.querySelector('#here');
		photos.forEach( (img,j) => {
			createEl(here, "img", {src: img.uri_small}, {click: e => {window.open(img.uri_large);} });
		});
	});
</script>
</html>`;
	console.log(`${mill.url}`);
	console.log(`${JSON.stringify(mill.posters9x9)}`);
	fs.writeFileSync(`${mill.url}`, html, (err) => {
		if (err)
			console.log(err);
		else {
			console.log(`${mill.url} written successfully\n`);
		}
	});
});
fs.writeFileSync(`index.html`, indexhtml, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`index.html written successfully\n`);
	}
});
//console.log(`prince ${filename} -o ./print.pdf`);
//console.log(`open ./print.pdf`);
