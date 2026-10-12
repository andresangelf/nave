import subprocess
V=1.2; spb=60/104
ini=dict(arr=0,man=4.615,nave=13.846,que=19.615,cli=33.462,ofe=43.846,mod=57.692,par=66.923,val=76.154,est=88.846,des=110.769)
T=lambda e,b: (ini[e]+b*spb)/V
ev=[]  # (archivo, t, dB, pitch)
def a(f,e,b,db,p=1.0): ev.append((f,T(e,b),db,p))
a('pop','arr',0.5,-12); a('beep','arr',1.76,-14); a('beep','arr',2.26,-14); a('datos','arr',2.4,-20); a('warp','arr',5.4,-18)
a('riser','man',1.0,-22,0.7)
for i in range(3): a('pop','man',6.4+0.55*i,-14,1+0.08*i)
a('granular','man',10.8,-14)
a('granular','nave',0.4,-10)
flash=T('nave',3.5); ev.append(('riser',flash-2.86,-12,1.0)); a('boom','nave',3.5,-6)
for i in range(4): a('clic','nave',5.5+0.22*i,-16,1+0.05*i)
a('datos','nave',6.6,-20)
a('datos','que',0.6,-16)
for i in range(3): a('warp','que',9.4+1.5*i,-22)
for i in range(3): a('clic','que',18+0.5*i,-12,1+0.06*i)
a('confirma','que',21,-16)
a('flap','cli',1.4,-18); a('flap','cli',5.0,-18)
a('flap','ofe',1.5,-22); a('flap','ofe',6.0,-24); a('confirma','ofe',12,-10); a('warp','ofe',22.4,-12); a('boom','ofe',24,-14)
a('pop','mod',1.9,-12,0.8); a('pop','mod',2.2,-12,0.8); a('granular','mod',2.0,-20); a('pop','mod',3.2,-12)
for i in range(3): a('clic','mod',4.3+1.1*i,-12,1+0.05*i)
a('datos','mod',7,-22)
for i in range(7): a('pop','par',2+1.25*i,-14,1+0.06*i)
for i in range(7): a('confirma','val',3.4+2.2*i,-15,1+0.03*i)
for i in range(5): a('pop','est',1.6+0.35*i,-16,1+0.07*i)
for i in range(5): a('warp','est',4+5.6*i,-24)
a('pop','est',32.3,-14,0.9); a('pop','est',32.7,-14,0.95); a('granular','est',36,-16)
for k,b in enumerate((6,7,8)): a('beep','des',b,-10)
a('confirma','des',9,-8,0.8); ev.append(('riser',T('des',9.6)-2.86,-12,1.0)); a('cohete','des',9.6,-5); a('rumble','des',9.6,-8); a('boom','des',11.2,-6)
for e,b in (('nave',8.4),('que',22.4),('cli',16.6),('mod',14.4),('par',14.4),('val',20.4)): a('whoosh',e,b,-10)
D=121.154/V
ins=['-i','musica2.wav']; f=[f"[0:a]atrim=0:{D:.2f},asetpts=PTS-STARTPTS,afade=t=in:d=1.2,afade=t=out:st={D-4.5:.2f}:d=4.5,volume=-7dB[mus]"]; sl=[]
for j,(nm,t,db,p) in enumerate(ev):
    ins+=['-i',f'{nm}.wav']
    pitch=f",asetrate=48000*{p},aresample=48000" if p!=1.0 else ""
    extra=",atrim=0:2.6,afade=t=out:st=2.0:d=0.6" if nm=='flap' else ""
    ms=int(max(0,t)*1000)
    f.append(f"[{j+1}:a]aresample=48000,aformat=channel_layouts=stereo{pitch}{extra},volume={db}dB,adelay={ms}|{ms}[s{j}]"); sl.append(f"[s{j}]")
f.append("[mus]"+"".join(sl)+f"amix=inputs={1+len(sl)}:normalize=0,atrim=0:{D:.2f},alimiter=limit=0.9,loudnorm=I=-14:TP=-1.2:LRA=9[out]")
subprocess.run(['ffmpeg','-y','-loglevel','error']+ins+['-filter_complex',';'.join(f),'-map','[out]','-ar','48000','-c:a','pcm_s16le','mezcla_rapida.wav'],check=True)
print(len(ev),'efectos', round(D,2),'s')
