const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'assets');
fs.mkdirSync(assets, {recursive:true});
const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const txt = (x,y,size,s,fill,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${escape(s)}</text>`;
const mono = 'font-family="Consolas,Menlo,monospace" letter-spacing="2"';
const sans = 'font-family="Segoe UI,Arial,sans-serif"';
const palettes = {
  dark: {bg:'#10151b',fg:'#f1f0ea',sub:'#b2bdc9',line:'#2b3540',a:'#f0bd78',b:'#82cec6',panel:'#171f28',grid:'#26323c'},
  light:{bg:'#f5f3ed',fg:'#202b34',sub:'#536372',line:'#d7dad6',a:'#936024',b:'#297e79',panel:'#e9eee9',grid:'#d7dfd9'}
};
function field(p,cx,cy,scale=1) {
  let s=`<g transform="translate(${cx} ${cy}) scale(${scale})"><circle r="177" fill="${p.panel}"/><circle r="177" fill="none" stroke="${p.line}"/><circle r="151" fill="none" stroke="${p.line}" stroke-dasharray="2 7"/>`;
  for (let k=0;k<20;k++) {
    let pts=[];
    for(let j=0;j<=180;j++) {
      let t=j*Math.PI*2/180;
      let r=20+k*6.55;
      let mod=1+.095*Math.sin(3*t+k*.1)+.045*Math.cos(7*t-k*.15);
      pts.push(`${(Math.cos(t)*r*mod*.87).toFixed(2)},${(Math.sin(t)*r*mod).toFixed(2)}`);
    }
    s+=`<polyline points="${pts.join(' ')}" fill="none" stroke="${k>12?p.a:p.b}" stroke-width="${k%4===0?1.5:.85}" opacity="${.9-k*.018}"/>`;
  }
  s+=`<path d="M-197 0H197M0-197V197" stroke="${p.line}" stroke-width="1"/><circle r="5" fill="${p.a}"/><path d="M-170-150v-22h22M148-172h22v22M170 150v22h-22M-148 172h-22v-22" stroke="${p.b}" stroke-width="1.5" fill="none"/>`;
  for (const a of [0.4,2.35,4.18]) {const x=Math.cos(a)*126,y=Math.sin(a)*126;s+=`<circle cx="${x}" cy="${y}" r="5" fill="${p.bg}" stroke="${p.b}" stroke-width="2"/>`;}
  return s+'</g>';
}
function hero(theme,mobile=false) {
  const p=palettes[theme], w=mobile?640:1280,h=mobile?710:510;
  let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">Richmond Ampah-Mensah — Applied AI, medical imaging and software</title><desc id="desc">A warm editorial header with an abstract contour field inspired by image analysis. The illustration is decorative, not a medical scan.</desc><defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="${p.grid}" stroke-width=".65"/></pattern><clipPath id="clip"><rect width="${w}" height="${h}" rx="20"/></clipPath></defs><g clip-path="url(#clip)"><rect width="${w}" height="${h}" fill="${p.bg}"/>`;
  s+=`<rect x="${mobile?0:750}" y="0" width="${mobile?640:530}" height="${h}" fill="url(#grid)" opacity=".6"/>`;
  if(mobile){
    s+=field(p,487,491,.7);
    s+=`<rect x="0" y="0" width="640" height="319" fill="${p.bg}"/>`;
  } else s+=field(p,1020,245,1);
  let x=mobile?38:54;
  s+=`<rect x="${x}" y="36" width="44" height="44" rx="12" fill="${p.a}"/>`+txt(x+8,65,18,'rm',p.bg,`${sans} font-weight="700"`);
  s+=txt(x+64,65,mobile?18:16,'RESEARCH / CODE / DESIGN',p.sub,mono);
  s+=txt(x,mobile?162:177,mobile?64:76,'Richmond',p.fg,`${sans} font-weight="700" letter-spacing="-3"`);
  s+=txt(x,mobile?234:265,mobile?62:76,'Ampah-Mensah',p.fg,`${sans} font-weight="700" letter-spacing="-3"`);
  s+=txt(x,mobile?290:317,mobile?25:25,'Applied AI. Thoughtful software.',p.a,sans);
  if(mobile){
    s+=txt(x,384,18,'AREAS OF FOCUS',p.sub,mono);
    s+=txt(x,433,29,'Medical imaging',p.fg,`${sans} font-weight="600"`);
    s+=txt(x,478,29,'Computer vision',p.fg,`${sans} font-weight="600"`);
    s+=txt(x,523,29,'Mobile + web',p.fg,`${sans} font-weight="600"`);
    s+=`<path d="M38 613H602" stroke="${p.line}"/>`;
    s+=txt(x,656,17,'RICHMIZ',p.sub,mono)+txt(602,656,17,'GITHUB / SELECTED WORK',p.sub,`${mono} text-anchor="end"`);
  } else {
    s+=txt(x,366,18,'Medical imaging  /  Computer vision  /  Mobile + web',p.sub,sans);
    s+=`<path d="M54 428H1226" stroke="${p.line}"/>`;
    s+=txt(x,473,15,'RICHMIZ',p.sub,mono)+txt(1226,473,15,'MODELS, EVIDENCE & INTERFACES',p.sub,`${mono} text-anchor="end"`);
  }
  return s+'</g></svg>';
}
for(const theme of ['dark','light']) for(const mobile of [false,true]) fs.writeFileSync(path.join(assets,`header-${mobile?'mobile-':''}${theme}.svg`),hero(theme,mobile));

function artwork(kind) {
  const c={med:'#82cec6',face:'#b7afe5',doc:'#f0bd78',audit:'#a1c7f0',catalog:'#efb39c'}[kind];
  let s=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="204" viewBox="0 0 720 204" role="img" aria-labelledby="t d"><title id="t">${{med:'Medical segmentation',face:'Vision model adaptation',doc:'Document evidence retrieval',audit:'Reproducible experiment auditing',catalog:'Catalog operations'}[kind]}</title><desc id="d">Conceptual project illustration; no measured results or application screenshots.</desc><rect width="720" height="204" rx="10" fill="#161d25"/><defs><pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#26323c" stroke-width=".6"/></pattern></defs><rect width="720" height="204" rx="10" fill="url(#g)"/><g stroke="${c}" fill="none" stroke-width="1.5">`;
  if(kind==='med') {
    for(let i=0;i<3;i++) {
      const x=115+i*238;
      s+=`<rect x="${x-65}" y="43" width="130" height="120" rx="10" stroke="#42505e"/><ellipse cx="${x}" cy="102" rx="43" ry="45" stroke="#6c7b86"/><path d="M${x-24} 86Q${x-2} 66 ${x+22} 88Q${x+44} 107 ${x+16} 129Q${x-5} 144 ${x-29} 120Q${x-42} 103 ${x-24} 86Z" fill="${i>0?c:'#273743'}" fill-opacity="${i>0?.24:1}" stroke="${i>0?c:'#637c8b'}"/>`;
      if(i===2)s+=`<path d="M${x-47} 66h-8v8m94-8h8v8m0 62v8h-8m-86-8v8h8"/>`;
      if(i<2)s+=`<path d="M${x+87} 103h37m-7-7 7 7-7 7"/>`;
    }
  }
  if(kind==='face') {
    s+=`<rect x="51" y="40" width="124" height="124" rx="12" stroke="#52606e"/><ellipse cx="113" cy="99" rx="33" ry="43"/><path d="M84 92l18-9 23 4 17 10-11 27-33-1Zm18-9 7 29 16-25M98 123l11-11 22 12"/>`;
    for(const [x,y] of [[84,92],[102,83],[125,87],[142,97],[131,124],[98,123],[109,112]])s+=`<circle cx="${x}" cy="${y}" r="3.5" fill="${c}"/>`;
    s+=`<path d="M207 103h66m-7-7 7 7-7 7"/>`;
    for(let i=0;i<4;i++)s+=`<rect x="${306+i*19}" y="${54+i*8}" width="95" height="90" rx="6" fill="#1f2735" stroke="${i===3?c:'#546071'}"/>`;
    s+=`<path d="M490 103h55m-7-7 7 7-7 7"/>`;
    for(let i=0;i<9;i++)s+=`<rect x="${576+i*10}" y="${72+(i%3)*10}" width="5" height="${61-(i%3)*20}" fill="${c}" opacity="${.3+i*.075}" stroke="none"/>`;
  }
  if(kind==='doc') {
    for(let i=0;i<3;i++) {
      let x=52+i*37,y=45+i*10;
      s+=`<rect x="${x}" y="${y}" width="82" height="96" rx="6" fill="#1b2630" stroke="${i===2?c:'#5f6a76'}"/><path d="M${x+16} ${y+23}h47M${x+16} ${y+35}h36M${x+16} ${y+63}h43M${x+16} ${y+75}h30" stroke="#75818a"/><rect x="${x+16}" y="${y+43}" width="49" height="12" fill="${c}" opacity=".25" stroke="none"/>`;
    }
    s+=`<path d="M238 103h65m-7-7 7 7-7 7"/><circle cx="375" cy="98" r="38"/><circle cx="375" cy="98" r="24" opacity=".4"/><path d="m403 126 24 23M467 103h53m-7-7 7 7-7 7"/><rect x="552" y="49" width="115" height="105" rx="9" stroke="#5f6a76"/><path d="M570 76h78M570 96h56M570 117h65M570 137h41" stroke-width="5"/>`;
  }
  if(kind==='audit') {
    for(let i=0;i<4;i++){
      let x=68+i*166;
      s+=`<rect x="${x}" y="51" width="91" height="101" rx="8" fill="#1b2630" stroke="${i===3?c:'#627181'}"/><path d="M${x+20} 75h51M${x+20} 89h40" opacity=".55"/><path d="m${x+23} 119 12 11 30-29"/>`;
      if(i<3)s+=`<path d="M${x+109} 101h38m-7-7 7 7-7 7" stroke="#627181"/>`;
    }
  }
  if(kind==='catalog') {
    s+=`<rect x="50" y="34" width="620" height="137" rx="10" fill="#19232d" stroke="#4f5a66"/><path d="M50 60h620M166 60v111" stroke="#4f5a66"/>`;
    for(let i=0;i<3;i++)s+=`<circle cx="${65+i*12}" cy="47" r="2.5" fill="${c}" stroke="none"/>`;
    for(let i=0;i<4;i++)s+=`<rect x="68" y="${78+i*20}" width="${i===0?75:51}" height="7" rx="3" fill="${i===0?c:'#596879'}" stroke="none"/>`;
    for(let i=0;i<3;i++){
      let x=187+i*156;
      s+=`<rect x="${x}" y="78" width="134" height="74" rx="6" stroke="#4f5a66"/><rect x="${x+11}" y="90" width="27" height="25" rx="4" fill="${c}" opacity="${.25+i*.15}" stroke="none"/><path d="M${x+49} 95h70M${x+49} 107h43M${x+11} 133h77" stroke="#85919d"/><circle cx="${x+116}" cy="132" r="5" fill="${c}" stroke="none"/>`;
    }
  }
  return s+'</g></svg>';
}
for(const k of ['med','face','doc','audit','catalog'])fs.writeFileSync(path.join(assets,`project-${k}.svg`),artwork(k));
console.log('Generated 4 responsive headers and 5 project illustrations.');
