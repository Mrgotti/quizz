const r= async(BoT, msg, dob, A, S, M)=> {

	let rep= await msg.channel.send('pong');

	rep.edit({"embed":{

		"title": "\ud83c\udfd3 Pong!",

		"color": (BoT.ping>100)?((BoT.ping>150)?16711680:16760576):4387918,

		"thumbnail": {"url": "https://cdn.discordapp.com/attachments/538510846176002048/538511040493649921/pingpong.png"},

		"fields": [{

			"name": "\ud83d\udcf6 Latence moyenne\u003a",

			"value": `\u0060\u0060\u0060js\n${Number(Math.round(BoT.ping+'e2')+'e-2')}ms\u0060\u0060\u0060`,

			"inline": true

		},{

			"name": "\ud83d\udcbe Edit\u0027 latence\u003a",

			"value": `\u0060\u0060\u0060js\n${rep.createdTimestamp-msg.createdTimestamp}ms\u0060\u0060\u0060`,

			"inline": true

		},{

			"name": "\ud83e\udd5d Derni\u00e8res latences\u003a",

			"value": `\u0060\u0060\u0060js\n${BoT.pings.map((a,b)=>{return Number(Math.round(a+'e2')+'e-2')}).join('ms, ')}ms\u0060\u0060\u0060`,

			"inline": true

		}]

	}});

};

const n= 'ping';

const a= [];

const d= 'Pong!';

const h= "... juste dit ping et tu vera :3";

module.exports= {r, n, a, d, h};