const btns = document.querySelectorAll('#attack-toggle');
if (!localStorage.getItem('attackMode')) localStorage.setItem('attackMode','off');
btns.forEach(b=>b.addEventListener('click',()=>{
  const m = localStorage.getItem('attackMode')==='on'?'off':'on';
  localStorage.setItem('attackMode',m); update();
}));
function update(){
  const m=localStorage.getItem('attackMode');
  btns.forEach(b=>{ b.textContent='Attack: '+m.toUpperCase(); b.className=m==='on'?'bg-green-500 text-white':'bg-red-500 text-white'; });
}
update();