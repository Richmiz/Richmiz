// Original animated SVG artwork; dependency-free and deterministic.
const fs=require('node:fs'),path=require('node:path');
const out=path.join(__dirname,'..','assets');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const text=(x,y,size,s,c,a='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${c}" ${a}>${esc(s)}</text>`;
const mono='font-family="Consolas,Menlo,monospace" letter-spacing="1.8"';
const palettes={dark:{bg:'#080b18',fg:'#f4f4ff',sub:'#a5abc4',line:'#292d49',panel:'#11162a',a:'#c1ff72',b:'#66ddff',c:'#bd96ff'},light:{bg:'#f2f0ff',fg:'#201638',sub:'#625a77',line:'#cec7e4',panel:'#e8e2fa',a:'#416d0b',b:'#046f9d',c:'#7845cf'}};
const css=`<style>
svg{font-family:Segoe UI,Arial,sans-serif}.spin{animation:spin 24s linear infinite;transform-box:fill-box;transform-origin:center}.reverse{animation-direction:reverse;animation-duration:36s}.pulse{animation:pulse 3s ease-in-out infinite}.flow{stroke-dasharray:9 20;animation:flow 3s linear infinite}.scan{animation:scan 5s ease-in-out infinite}.float{animation:float 5s ease-in-out infinite}.marquee{animation:marquee 26s linear infinite}.role{opacity:0;animation:role 16s infinite}.r2{animation-delay:4s}.r3{animation-delay:8s}.r4{animation-delay:12s}.mask{animation:mask 5s ease-in-out infinite}.static{display:none}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes flow{to{stroke-dashoffset:-116}}@keyframes scan{0%,100%{transform:translateY(-105px)}50%{transform:translateY(105px)}}@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@keyframes marquee{to{transform:translateX(-1200px)}}@keyframes role{0%,22%{opacity:1}25%,100%{opacity:0}}@keyframes mask{0%,100%{opacity:.2}50%{opacity:.85}}
@media(prefers-reduced-motion:reduce){*{animation:none!important}.motion{display:none}.static{display:inline}.role{opacity:0}.r1{opacity:1}.mask{opacity:.65}}
</style>`;
function svg(w,h,title,desc,b){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>${css}${b}</svg>\n`;}
function defs(p,w,h){return `<defs><radialGradient id="halo"><stop stop-color="${p.c}" stop-opacity=".23"/><stop offset="1" stop-color="${p.c}" stop-opacity="0"/></radialGradient><linearGradient id="beam" x2="0" y2="1"><stop stop-color="${p.b}" stop-opacity="0"/><stop offset="1" stop-color="${p.b}" stop-opacity=".2"/></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${p.line}" stroke-width=".65"/></pattern><clipPath id="bounds"><rect width="${w}" height="${h}" rx="20"/></clipPath></defs>`;}
function torusPath(ring,angle){let s='';for(let i=0;i<=56;i++){const u=i/56*Math.PI*2,v=ring/18*Math.PI*2,r=1+.36*Math.cos(v);let x=r*Math.cos(u),y=r*Math.sin(u),z=.36*Math.sin(v)+.22*Math.sin(u*3);const xx=x*Math.cos(angle)+z*Math.sin(angle),zz=-x*Math.sin(angle)+z*Math.cos(angle),yy=y*.76-zz*.65,depth=y*.65+zz*.76,f=3.7/(3.7-depth);s+=`${i?'L':'M'}${(xx*f*135).toFixed(1)} ${(yy*f*135).toFixed(1)}`;}return s;}
function sculpture(p,cx,cy,scale){
 let b=`<g transform="translate(${cx} ${cy}) scale(${scale})"><circle r="277" fill="url(#halo)"/><circle r="227" fill="none" stroke="${p.line}"/><circle r="205" fill="none" stroke="${p.line}" stroke-dasharray="1 9"/><g class="spin"><circle r="227" fill="none" stroke="${p.b}" stroke-width="2" stroke-dasharray="110 602"/><circle cx="227" r="5" fill="${p.a}"/></g><g class="spin reverse"><ellipse rx="248" ry="95" transform="rotate(-35)" fill="none" stroke="${p.c}" stroke-opacity=".5"/><circle cx="-201" cy="123" r="4" fill="${p.c}"/></g>`;
 for(let k=0;k<18;k++){const d=torusPath(k,.5),values=Array.from({length:25},(_,f)=>torusPath(k,.5+f/24*Math.PI*2)).join(';');b+=`<path class="motion" d="${d}" fill="none" stroke="${[p.a,p.b,p.c][k%3]}" stroke-width="${k%3===0?1.45:.85}" opacity=".8"><animate attributeName="d" dur="18s" values="${values}" repeatCount="indefinite"/></path><path class="static" d="${d}" fill="none" stroke="${k%2?p.b:p.c}" stroke-width="1"/>`;}
 return b+`<g fill="none" stroke="${p.sub}"><path d="M-246-182v-20h20M226-202h20v20M246 182v20h-20M-226 202h-20v-20M-263 0h20M243 0h20M0-243v20M0 223v20"/></g><circle r="4" fill="${p.a}" class="pulse"/></g>`;
}
function hero(p,mobile){
 const w=mobile?720:1280,h=mobile?990:650,x=mobile?42:54;
 let b=defs(p,w,h)+`<g clip-path="url(#bounds)"><rect width="${w}" height="${h}" fill="${p.bg}"/><rect x="${mobile?0:675}" width="${mobile?w:605}" height="${h}" fill="url(#grid)" opacity=".6"/><rect x="${x}" y="32" width="45" height="45" rx="13" fill="${p.a}"/>`+text(x+7,62,22,'rm',p.bg,'font-weight="800"')+text(x+63,61,mobile?22:23,'Richmond Ampah-Mensah',p.fg,'font-weight="600"');
 if(!mobile)b+=text(1180,60,13,'@RICHMIZ',p.sub,`${mono} text-anchor="end"`);
 b+=`<path d="M${x} 100H${w-x}" stroke="${p.line}"/>`+text(x,148,mobile?13:14,'RESEARCHER + SOFTWARE DEVELOPER',p.sub,mono);
 const size=mobile?76:88,bold='font-weight="750" letter-spacing="-3"';
 b+=text(x,245,size,'Teaching',p.fg,bold)+text(x,337,size,'machines',p.fg,bold)+text(x,429,size,'to see.',p.a,bold)+`<g transform="translate(${x} 466)">`+text(0,22,22,'>',p.a,mono);
 ['MEDICAL IMAGING','COMPUTER VISION','DOCUMENT INTELLIGENCE','SOFTWARE ENGINEERING'].forEach((r,i)=>b+=`<g class="role r${i+1}">`+text(32,22,mobile?17:18,r,p.b,mono)+'</g>');b+='</g>';
 if(!mobile)b+=text(x,535,17,'From medical images and document evidence',p.sub)+text(x,561,17,'to practical mobile and web applications.',p.sub)+sculpture(p,964,324,1)+text(964,577,12,'VISION / REPRESENTATION / REASONING',p.sub,`${mono} text-anchor="middle"`);
 else b+=sculpture(p,360,714,.78)+text(360,926,13,'VISION / REPRESENTATION / REASONING',p.sub,`${mono} text-anchor="middle"`);
 const foot=h-42;b+=`<rect y="${foot}" width="${w}" height="42" fill="${p.a}"/><svg y="${foot}" width="${w}" height="42"><g class="marquee">`;
 for(let i=0;i<3;i++)b+=text(i*1200+24,27,14,'MEDICAL IMAGING   /   APPLIED AI   /   COMPUTER VISION   /   DOCUMENT AI   /   SOFTWARE   /   RESEARCH   /',p.bg,mono);
 return svg(w,h,'Richmond Ampah-Mensah | Teaching machines to see','Animated original 3D wire sculpture and rotating research areas. Applied AI, medical imaging, computer vision, document AI, and software engineering. Motion respects reduced-motion preferences.',b+'</g></svg></g>');
}
function medArt(p){
 let b=`<rect x="26" y="26" width="418" height="328" rx="16" fill="${p.panel}"/><svg x="26" y="26" width="418" height="328" viewBox="0 0 418 328"><rect width="418" height="328" fill="url(#grid)"/>`;
 // Synthetic illustration: no patient imagery or implied clinical result.
 for(let k=0;k<17;k++){let pts=[];for(let j=0;j<=90;j++){const t=j/90*Math.PI*2,r=29+k*5.2,m=1+.15*Math.sin(t*3+.5)+.075*Math.cos(t*5+k*.08);pts.push(`${(208+Math.cos(t)*r*m*1.15).toFixed(1)},${(158+Math.sin(t)*r*m).toFixed(1)}`);}b+=`<polyline points="${pts.join(' ')}" fill="none" stroke="${k<5?p.c:p.b}" stroke-width="${k%3===0?1.6:.65}" opacity="${.8-k*.025}"/>`;}
 b+=`<path class="mask" d="M186 105C220 78 275 116 274 152C307 202 244 221 208 209C154 214 139 173 164 148C159 126 168 115 186 105Z" fill="${p.a}" fill-opacity=".35" stroke="${p.a}" stroke-width="2"/><g class="scan"><rect x="48" y="127" width="322" height="38" fill="url(#beam)"/><path d="M48 165H370" stroke="${p.b}" stroke-width="2"/><circle cx="370" cy="165" r="4" fill="${p.a}"/></g>`+text(18,27,10,'SYNTHETIC VISUAL / SEGMENTATION',p.sub,mono)+text(18,306,10,'IMAGE → MASK → EVALUATION',p.b,mono);
 return b+'</svg>';
}
function docArt(p){
 let b=`<rect x="26" y="26" width="418" height="328" rx="16" fill="${p.panel}"/>`;
 for(let i=0;i<3;i++){const x=58+i*38,y=82-i*13;b+=`<g ${i===2?'class="float"':''}><rect x="${x}" y="${y}" width="140" height="198" rx="10" fill="${p.bg}" stroke="${p.line}" stroke-width="2"/>`;for(let j=0;j<6;j++)b+=`<rect x="${x+17}" y="${y+27+j*21}" width="${j%3===0?74:105}" height="5" rx="2" fill="${j===2?p.b:p.sub}" opacity="${j===2?1:.35}"/>`;if(i===2)b+=`<rect x="${x+10}" y="${y+61}" width="120" height="37" rx="4" fill="${p.b}" fill-opacity=".12" stroke="${p.b}"/>`;b+='</g>';}
 return b+`<path d="M277 141H323V208H354" fill="none" stroke="${p.c}" stroke-width="2" class="flow"/><rect x="307" y="212" width="100" height="76" rx="13" fill="${p.bg}" stroke="${p.c}"/>`+text(322,244,12,'EVIDENCE',p.c,mono)+`<path d="M323 260h54M323 270h37" stroke="${p.b}" stroke-width="3"/><circle cx="357" cy="196" r="6" fill="${p.a}" class="pulse"/>`+text(45,54,10,'QUESTION → RETRIEVAL → ANSWER',p.sub,mono);
}
function project(p,kind){
 const med=kind==='med',a=med?p.a:p.b;
 let b=defs(p,1200,380)+`<g clip-path="url(#bounds)"><rect width="1200" height="380" fill="${p.bg}"/>`+(med?medArt(p):docArt(p));
 b+=text(494,67,13,med?'01 / MEDICAL IMAGE SEGMENTATION':'02 / DOCUMENT INTELLIGENCE',a,mono)+text(492,136,48,med?'Seeing the':'Finding the',p.fg,'font-weight="700" letter-spacing="-1.8"')+text(492,193,48,med?'structure within.':'evidence within.',p.fg,'font-weight="700" letter-spacing="-1.8"')+text(494,240,18,med?'Adapt the teacher. Distill the student.':'Text, vision, and hybrid retrieval.',p.sub)+text(494,269,18,med?'Measure what compression changes.':'Trace the evidence behind an answer.',p.sub)+`<path d="M494 302H1150" stroke="${p.line}"/>`+text(494,338,12,med?'MEDSAM-STYLE · LORA · ONNX · INT8':'DOCVQA · MULTIMODAL RETRIEVAL · VLMs',a,mono)+text(1130,342,28,'↗',a);
 return svg(1200,380,med?'Medical image segmentation research':'Document evidence retrieval research',med?'Animated synthetic image and segmentation overlay. Research on adaptation, distillation, and compression; not a clinical demonstration.':'Animated document pages and flowing evidence. Controlled text, visual, and hybrid retrieval experiments.',b+'</g>');
}
function stack(p){let b=defs(p,1200,160)+`<g clip-path="url(#bounds)"><rect width="1200" height="160" fill="${p.bg}"/>`;[['Py','Python','RESEARCH'],['λ','PyTorch','DEEP LEARNING'],['↗','LoRA','ADAPTATION'],['◇','ONNX','INFERENCE'],['</>','React / Next.js','WEB'],['◎','React Native','MOBILE']].forEach(([icon,label,desc],i)=>{const x=i*200,a=[p.a,p.b,p.c][i%3];if(i)b+=`<path d="M${x} 24V136" stroke="${p.line}"/>`;b+=text(x+100,55,27,icon,a,'text-anchor="middle" font-weight="600"')+text(x+100,93,18,label,p.fg,'text-anchor="middle" font-weight="600"')+text(x+100,122,10,desc,p.sub,`${mono} text-anchor="middle"`);});return svg(1200,160,'Python, PyTorch, LoRA, ONNX, React and Next.js, React Native','Research, model adaptation, inference, web, and mobile development.',b+'</g>');}
function footer(p){let b=defs(p,1200,190)+`<g clip-path="url(#bounds)"><rect width="1200" height="190" fill="${p.bg}"/>`;for(let i=0;i<48;i++){const x=818+i*7,h=12+Math.pow(Math.sin(i*.19),2)*65;b+=`<rect x="${x}" y="${95-h/2}" width="3" height="${h}" rx="2" fill="${i%2?p.c:p.b}" class="pulse" style="animation-delay:-${(i*.11).toFixed(2)}s"/>`;}b+=text(42,45,11,'RESEARCH QUESTIONS. REAL APPLICATIONS.',p.a,mono)+text(40,105,43,"Let's build something useful.",p.fg,'font-weight="700" letter-spacing="-1.5"')+text(42,150,17,'ampahmensahrich@gmail.com',p.sub)+text(1130,110,38,'↗',p.a);return svg(1200,190,"Let's build something useful. Email Richmond.",'Animated signal bars beside a collaboration invitation.',b+'</g>');}
function mobileProject(p,k){
 const med=k==='med',a=med?p.a:p.b;
 let b=defs(p,720,650)+`<g clip-path="url(#bounds)"><rect width="720" height="650" fill="${p.bg}"/><g transform="translate(125 0)">`+(med?medArt(p):docArt(p))+'</g>';
 b+=text(42,398,13,med?'01 / MEDICAL IMAGE SEGMENTATION':'02 / DOCUMENT INTELLIGENCE',a,mono)+text(40,450,45,med?'Seeing the structure':'Finding the evidence',p.fg,'font-weight="700" letter-spacing="-1.5"')+text(40,501,45,'within.',p.fg,'font-weight="700" letter-spacing="-1.5"')+text(42,542,20,med?'Adapt. Distill. Measure what changes.':'Text, vision, and hybrid retrieval.',p.sub)+`<path d="M42 578H678" stroke="${p.line}"/>`+text(42,613,13,med?'MEDSAM-STYLE · LORA · ONNX · INT8':'DOCVQA · MULTIMODAL RETRIEVAL',a,mono)+text(657,619,30,'↗',a);
 return svg(720,650,med?'Medical image segmentation research':'Document evidence retrieval research','Animated conceptual illustration and research overview.',b+'</g>');
}
function mobileStack(p){
 let b=defs(p,720,290)+`<g clip-path="url(#bounds)"><rect width="720" height="290" fill="${p.bg}"/>`;
 [['Py','Python'],['λ','PyTorch'],['↗','LoRA'],['◇','ONNX'],['</>','React / Next.js'],['◎','React Native']].forEach(([icon,label],i)=>{const x=120+i%3*240,y=i<3?0:140;b+=text(x,y+61,32,icon,[p.a,p.b,p.c][i%3],'text-anchor="middle"')+text(x,y+104,22,label,p.fg,'text-anchor="middle"');});
 return svg(720,290,'Python, PyTorch, LoRA, ONNX, React and Next.js, React Native','Core research and development tools.',b+'</g>');
}
function mobileFooter(p){
 let b=defs(p,720,240)+`<g clip-path="url(#bounds)"><rect width="720" height="240" fill="${p.bg}"/>`+text(35,43,12,'RESEARCH QUESTIONS. REAL APPLICATIONS.',p.a,mono)+text(33,106,39,"Let's build something",p.fg,'font-weight="700" letter-spacing="-1.5"')+text(33,153,39,'useful.',p.fg,'font-weight="700" letter-spacing="-1.5"')+text(35,205,20,'ampahmensahrich@gmail.com',p.sub);
 for(let i=0;i<20;i++){const h=10+Math.sin(i*.19)**2*45;b+=`<rect x="${490+i*8}" y="${153-h/2}" width="3" height="${h}" fill="${p.b}" class="pulse" style="animation-delay:-${i*.12}s"/>`;}
 return svg(720,240,"Let's build something useful. Email Richmond.",'Animated signal bars and contact address.',b+'</g>');
}
for(const [name,p] of Object.entries(palettes)){
 fs.writeFileSync(path.join(out,`kinetic-hero-${name}.svg`),hero(p,false));fs.writeFileSync(path.join(out,`kinetic-hero-mobile-${name}.svg`),hero(p,true));
 for(const k of ['med','doc']){fs.writeFileSync(path.join(out,`kinetic-${k}-${name}.svg`),project(p,k));fs.writeFileSync(path.join(out,`kinetic-${k}-mobile-${name}.svg`),mobileProject(p,k));}
 for(const [key,fn,mobileFn] of [['stack',stack,mobileStack],['footer',footer,mobileFooter]]){fs.writeFileSync(path.join(out,`kinetic-${key}-${name}.svg`),fn(p));fs.writeFileSync(path.join(out,`kinetic-${key}-mobile-${name}.svg`),mobileFn(p));}
}
console.log('Generated 20 responsive SVGs with animation, light/dark palettes, and reduced-motion fallbacks.');
