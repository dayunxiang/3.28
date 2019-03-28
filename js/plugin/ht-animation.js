!function(b){"use strict";var p="ht",C=b[p],G=C.Default,q="prototype",D=C.DataModel[q],B=C.Data[q],A=null,d=function(I){return"set"+I.charAt(0).toUpperCase()+I.slice(1)};G.getEasing=function(b){var h=A;return b.indexOf(".")>=0?(b=b.split("."),h=c[b[0]][b[1]]):h=c[b],function(v){return h(v,0,1,1)}},G.getCommonEasing=function(K){var x=A;return K.indexOf(".")>=0?(K=K.split("."),x=c[K[0]][K[1]]):x=c[K],x},B.setAnimation=function(X){var U=this._animation;this._animation=X,this.fp("animation",U,X)},B.getAnimation=function(){return this._animation},B.pauseAnimation=function(){this._pauseAnimation=!0,this._pauseTime=Date.now()},B.resumeAnimation=function(){delete this._pauseAnimation},b.requestAnimFrame=function(){return b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(R){b.setTimeout(R,1e3/60)}}();var j=b.requestAnimFrame,U=b.setInterval;D.setAnimationInterval=function(r){var o=this;o.$2a=r,o.$1a!=A&&(clearInterval(o.$1a),delete o.$1a,o.enableAnimation(r))},D.getAnimationInterval=function(){return this.$2a||"animationFrame"},D.getDataAnimation=function(Y){return Y.getAnimation()},D.enableAnimation=function(y){var c=this,t=c.getDatas();if(c.$1a==A){y&&c.setAnimationInterval(y),y=c.getAnimationInterval();var Q=function(){var h=c.getAnimationInterval();t.each(function(f){var l=c.getDataAnimation(f);if(f.setAnimation(l),l&&!f._pauseAnimation){var I=l.start;f._animationstatus=f._animationstatus||{},f._animationprocess=f._animationprocess||I.slice(0);for(var L=f._animationstatus,e=f._animationprocess,b=0;b<e.length;b++){var Y;Y=L[b]?L[b]:L[b]={$5a:0,$6a:0,$7a:0,$8a:0};var Q=l[e[b]],t=Q.property,s=Q.accessType,D=Q.from,g=Q.to,o=Q.easing||"Quad.easeOut",S=Y.$5a,u=Q.frames||60,k=Q.repeat||0,a=Q.duration,_=Q.delay||0,X=Q.interval,F=Y.$6a,C=Q.onUpdate,n=Q.onComplete,p=!1,y=function(){var T;T=a!=A?G.getCommonEasing(o)(Date.now()-Y._startTime,D,g-D,a):G.getCommonEasing(o)(S,D,g-D,u),C?C.call(f,T):s?"style"===s?f.s(t,T):"attr"===s?f.a(t,T):"field"===s&&(f[t]=T):f[d(t)](T),p=!0},j=function(){Y._startTime==A&&(Y._startTime=Date.now());var w=f._pauseTime;w!=A&&(Y._startTime+=Date.now()-w),b==e.length-1&&delete f._pauseTime,X!=A?Y.$7a>=X?(Y.$7a=0,y()):Y.$7a+=isNaN(h)?16.6666:h:y()};_?Y.$8a>=_?j():Y.$8a+=isNaN(h)?16.6666:h:j(),p&&(a!=A?Date.now()-Y._startTime>a&&(k===!0?Y._startTime=Date.now():(F=Y.$6a=F+1,F>k&&(n&&n.call(f),Q.next?(L[b]=A,e[b]=Q.next):(f.setAnimation(A),f._animationstatus=A,f._animationprocess=A,f._pauseTime=A)))):(S=Y.$5a=S+1,S>u&&(k===!0?S=Y.$5a=0:(F=Y.$6a=F+1,F>k&&(n&&n.call(f),Q.next?(L[b]=A,e[b]=Q.next):(f.setAnimation(A),f._animationstatus=A,f._animationprocess=A))))))}}}),"animationFrame"===h&&c.$1a!=A&&(c.$1a=j(Q))};c.$1a="animationFrame"===y?j(Q):U(Q,y)}},D.disableAnimation=function(){var v=this,r=v.getAnimationInterval();"animationFrame"===r||clearInterval(v.$1a),delete v.$1a};var c={Linear:function(c,x,u,W){return u*c/W+x},Quad:{easeIn:function(F,r,$,R){return $*(F/=R)*F+r},easeOut:function(h,w,J,m){return-J*(h/=m)*(h-2)+w},easeInOut:function(J,f,x,P){return(J/=P/2)<1?x/2*J*J+f:-x/2*(--J*(J-2)-1)+f}},Cubic:{easeIn:function(x,p,W,c){return W*(x/=c)*x*x+p},easeOut:function(R,j,s,W){return s*((R=R/W-1)*R*R+1)+j},easeInOut:function(S,o,B,b){return(S/=b/2)<1?B/2*S*S*S+o:B/2*((S-=2)*S*S+2)+o}},Quart:{easeIn:function(m,n,u,z){return u*(m/=z)*m*m*m+n},easeOut:function(L,$,b,E){return-b*((L=L/E-1)*L*L*L-1)+$},easeInOut:function(a,E,e,O){return(a/=O/2)<1?e/2*a*a*a*a+E:-e/2*((a-=2)*a*a*a-2)+E}},Quint:{easeIn:function(V,P,r,I){return r*(V/=I)*V*V*V*V+P},easeOut:function(j,M,S,f){return S*((j=j/f-1)*j*j*j*j+1)+M},easeInOut:function(Y,q,b,T){return(Y/=T/2)<1?b/2*Y*Y*Y*Y*Y+q:b/2*((Y-=2)*Y*Y*Y*Y+2)+q}},Sine:{easeIn:function(Z,V,l,e){return-l*Math.cos(Z/e*(Math.PI/2))+l+V},easeOut:function(I,G,b,q){return b*Math.sin(I/q*(Math.PI/2))+G},easeInOut:function(D,F,b,d){return-b/2*(Math.cos(Math.PI*D/d)-1)+F}},Expo:{easeIn:function(P,C,A,q){return 0==P?C:A*Math.pow(2,10*(P/q-1))+C},easeOut:function(W,t,P,X){return W==X?t+P:P*(-Math.pow(2,-10*W/X)+1)+t},easeInOut:function(s,d,v,h){return 0==s?d:s==h?d+v:(s/=h/2)<1?v/2*Math.pow(2,10*(s-1))+d:v/2*(-Math.pow(2,-10*--s)+2)+d}},Circ:{easeIn:function(W,O,V,y){return-V*(Math.sqrt(1-(W/=y)*W)-1)+O},easeOut:function(N,K,Y,E){return Y*Math.sqrt(1-(N=N/E-1)*N)+K},easeInOut:function(Y,E,z,q){return(Y/=q/2)<1?-z/2*(Math.sqrt(1-Y*Y)-1)+E:z/2*(Math.sqrt(1-(Y-=2)*Y)+1)+E}},Elastic:{easeIn:function(f,m,d,x,t,E){var S;return 0==f?m:1==(f/=x)?m+d:("undefined"==typeof E&&(E=.3*x),!t||t<Math.abs(d)?(S=E/4,t=d):S=E/(2*Math.PI)*Math.asin(d/t),-(t*Math.pow(2,10*(f-=1))*Math.sin((f*x-S)*2*Math.PI/E))+m)},easeOut:function(F,U,Z,K,t,q){var D;return 0==F?U:1==(F/=K)?U+Z:("undefined"==typeof q&&(q=.3*K),!t||t<Math.abs(Z)?(t=Z,D=q/4):D=q/(2*Math.PI)*Math.asin(Z/t),t*Math.pow(2,-10*F)*Math.sin((F*K-D)*2*Math.PI/q)+Z+U)},easeInOut:function(L,R,U,$,A,g){var p;return 0==L?R:2==(L/=$/2)?R+U:("undefined"==typeof g&&(g=$*.3*1.5),!A||A<Math.abs(U)?(A=U,p=g/4):p=g/(2*Math.PI)*Math.asin(U/A),1>L?-.5*A*Math.pow(2,10*(L-=1))*Math.sin((L*$-p)*2*Math.PI/g)+R:.5*A*Math.pow(2,-10*(L-=1))*Math.sin((L*$-p)*2*Math.PI/g)+U+R)}},Back:{easeIn:function(w,h,L,t,g){return"undefined"==typeof g&&(g=1.70158),L*(w/=t)*w*((g+1)*w-g)+h},easeOut:function(N,P,l,p,x){return"undefined"==typeof x&&(x=1.70158),l*((N=N/p-1)*N*((x+1)*N+x)+1)+P},easeInOut:function(v,K,u,B,i){return"undefined"==typeof i&&(i=1.70158),(v/=B/2)<1?u/2*v*v*(((i*=1.525)+1)*v-i)+K:u/2*((v-=2)*v*(((i*=1.525)+1)*v+i)+2)+K}},Bounce:{easeIn:function(k,U,w,j){return w-c.Bounce.easeOut(j-k,0,w,j)+U},easeOut:function(b,d,Y,S){return(b/=S)<1/2.75?Y*7.5625*b*b+d:2/2.75>b?Y*(7.5625*(b-=1.5/2.75)*b+.75)+d:2.5/2.75>b?Y*(7.5625*(b-=2.25/2.75)*b+.9375)+d:Y*(7.5625*(b-=2.625/2.75)*b+.984375)+d},easeInOut:function(w,r,e,S){return S/2>w?.5*c.Bounce.easeIn(2*w,0,e,S)+r:.5*c.Bounce.easeOut(2*w-S,0,e,S)+.5*e+r}}}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);