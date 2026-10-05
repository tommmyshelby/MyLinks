'use strict';
(() => {
  const USER_ID='881206091009122406', API=`https://api.lanyard.rest/v1/users/${USER_ID}`, dot=document.getElementById('online-dot'), box=document.getElementById('presence'), status=document.getElementById('presence-status'), activity=document.getElementById('presence-activity'), activityText=document.getElementById('presence-activity-text');
  if(!dot||!box||!activity)return;
  const labels={de:{online:'Online',idle:'Abwesend',dnd:'Bitte nicht stören',offline:'Offline',playing:'Spielt',streaming:'Streamt',watching:'Schaut',competing:'Wettkampf',listening:'Hört'},en:{online:'Online',idle:'Away',dnd:'Do not disturb',offline:'Offline',playing:'Playing',streaming:'Streaming',watching:'Watching',competing:'Competing',listening:'Listening to'}};
  let data=null;
  const t=k=>(labels[document.documentElement.lang==='en'?'en':'de'][k]||k);
  function getActivity(){
    const list=Array.isArray(data?.activities)?data.activities:[];
    const a=list.find(x=>[0,1,3,5].includes(x.type));
    if(a)return `${t({0:'playing',1:'streaming',3:'watching',5:'competing'}[a.type])} ${a.name}`;
    if(data?.listening_to_spotify&&data.spotify)return `${t('listening')} ${data.spotify.song} · ${data.spotify.artist||''}`;
    const custom=list.find(x=>x.type===4&&x.state); return custom?.state||'';
  }
  function render(){
    const s=['online','idle','dnd'].includes(data?.discord_status)?data.discord_status:'offline';
    dot.dataset.status=s; box.dataset.status=s; status.textContent=t(s); box.hidden=false;
    const a=getActivity(); activity.hidden=!a; if(a)activityText.textContent=a;
  }
  async function load(){try{const r=await fetch(API,{cache:'no-store'});if(!r.ok)return;const j=await r.json();data=j?.success?j.data:null;render()}catch(e){console.warn('Lanyard nicht erreichbar',e)}}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)load()});
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  load(); setInterval(()=>{if(!document.hidden)load()},30000);
})();
