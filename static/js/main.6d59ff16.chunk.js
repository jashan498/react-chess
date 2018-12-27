(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),l=a.n(i),o=(a(15),a(17),a(8)),c=a(1),s=a(2),u=a(4),h=a(3),b=a(5),f=function(){return r.a.createElement("nav",{className:"navbar navbar-inverse navbar-fixed-top"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"navbar-header"},r.a.createElement("a",{href:"."},r.a.createElement("h2",{style:{color:"white"}},"React Chess"))),r.a.createElement("a",{href:"https://github.com/jashan498/react-chess",className:"mr-auto"}," ",r.a.createElement("button",{className:"btn btn-sm btn-outline-secondary pull-left mr-auto navButton",type:"button"},"Code")),r.a.createElement("a",{href:"https://github.com/jashan498"},r.a.createElement("p",{className:"navText nav ml-auto"},"jashan498"))))},p=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).highlight=function(e){return e?"highlight ":""},a.check=function(e){return e?"check ":""},a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("button",{className:this.check(this.props.check)+this.highlight(this.props.high)+"square "+this.props.shade,style:this.props.style,onClick:function(){return e.props.handleClick(e.props.id)}})}}]),t}(n.Component),v=function e(t,a){Object(c.a)(this,e),this.player=t,this.style={backgroundImage:"url('"+a+"')"}},m=function(e){function t(e){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).call(this,e,1===e?"https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg":"https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"isMovePossible",value:function(e,t){return e-9===t||e-8===t||e-7===t||e+1===t||e+9===t||e+8===t||e+7===t||e-1===t}},{key:"getPath",value:function(e,t){return[]}}]),t}(v),d=function(e){function t(e){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).call(this,e,1===e?"https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg":"https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"isMovePossible",value:function(e,t){var a=e%8,n=8-a;return Math.abs(e-t)%9===0||Math.abs(e-t)%7===0||Math.abs(e-t)%8===0||t>=e-a&&t<e+n}},{key:"getPath",value:function(e,t){var a,n,r,i=[];e>t?(a=t,n=e):(a=e,n=t),Math.abs(e-t)%8===0?(r=8,a+=8):Math.abs(e-t)%9===0?(r=9,a+=9):Math.abs(e-t)%7===0?(r=7,a+=7):(r=1,a+=1);for(var l=a;l<n;l+=r)i.push(l);return i}}]),t}(v),w=function(e){function t(e){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).call(this,e,1===e?"https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg":"https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"isMovePossible",value:function(e,t){return Math.abs(e-t)%9===0||Math.abs(e-t)%7===0}},{key:"getPath",value:function(e,t){var a,n,r,i=[];e>t?(a=t,n=e):(a=e,n=t),Math.abs(e-t)%9===0?(r=9,a+=9):(r=7,a+=7);for(var l=a;l<n;l+=r)i.push(l);return i}}]),t}(v),k=function(e){function t(e){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).call(this,e,1===e?"https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg":"https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"isMovePossible",value:function(e,t){return e-17===t||e-10===t||e+6===t||e+15===t||e-15===t||e-6===t||e+10===t||e+17===t}},{key:"getPath",value:function(){return[]}}]),t}(v),j=function(e){function t(e){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).call(this,e,1===e?"https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg":"https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"isMovePossible",value:function(e,t){var a=e%8,n=8-a;return Math.abs(e-t)%8===0||t>=e-a&&t<e+n}},{key:"getPath",value:function(e,t){var a,n,r,i=[];e>t?(a=t,n=e):(a=e,n=t),Math.abs(e-t)%8===0?(r=8,a+=8):(r=1,a+=1);for(var l=a;l<n;l+=r)i.push(l);return i}}]),t}(v),y=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e,1===e?"https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg":"https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"))).initialPos=[[48,49,50,51,52,53,54,55],[8,9,10,11,12,13,14,15]],a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"isMovePossible",value:function(e,t,a){if(1===this.player){if(t===e-8&&!a||t===e-16&&-1!==this.initialPos[0].indexOf(e))return!0;if(a&&(t===e-9||t===e-7))return!0}else if(2===this.player){if(t===e+8&&!a||t===e+16&&-1!==this.initialPos[1].indexOf(e))return!0;if(a&&(t===e+9||t===e+7))return!0}return!1}},{key:"getPath",value:function(e,t){return t===e-16?[e-8]:t===e+16?[e+8]:[]}}]),t}(v),O=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(i)))).renderSquare=function(e,t){return r.a.createElement(p,{id:e,shade:t,high:e===a.props.source?1:0,check:a.props.chessBoard[e]instanceof m&&a.props.chessBoard[e].player===a.props.underCheck?1:0,style:a.props.chessBoard[e]?a.props.chessBoard[e].style:null,handleClick:a.props.handleClick})},a.buildBoard=function(){for(var e=[],t=0;t<8;t++){for(var n=[],i=0;i<8;i++){var l=0===(1&(t^i))?"square-white":"square-black";n.push(a.renderSquare(8*t+i,l))}e.push(r.a.createElement("div",{className:"board-row"},n))}return e},a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"board"},this.buildBoard())}}]),t}(n.Component),g=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.show?"modal display-block":"modal display-none";return r.a.createElement("div",{className:e},r.a.createElement("section",{className:"modal-main"},r.a.createElement("h1",{className:"mtext"},this.props.winner," is victorious!"),r.a.createElement("button",{className:"btn btn-primary mbutton",onClick:this.props.handleClose},"Rematch")))}}]),t}(n.Component);function C(){for(var e=Array(64).fill(null),t=8;t<16;t++)e[t]=new y(2),e[t+40]=new y(1);return e[4]=new m(2),e[60]=new m(1),e[3]=new d(2),e[59]=new d(1),e[0]=new j(2),e[7]=new j(2),e[56]=new j(1),e[63]=new j(1),e[1]=new k(2),e[6]=new k(2),e[57]=new k(1),e[62]=new k(1),e[2]=new w(2),e[5]=new w(2),e[58]=new w(1),e[61]=new w(1),e}var M=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={chessBoard:C(),player:1,source:-1,kings:[60,4],underCheck:-1,winner:null,show:!1},a.showModal=function(){a.setState({show:!0})},a.hideModal=function(){var e={chessBoard:C(),player:1,source:-1,kings:[60,4],underCheck:-1,winner:null,show:!1},t=e.chessBoard,n=e.player,r=e.source,i=e.kings,l=e.underCheck,o=e.winner,c=e.show;a.setState({chessBoard:t,player:n,source:r,kings:i,underCheck:l,winner:o,show:c})},a.handleClick=function(e){if(!a.state.winner)if(-1===a.state.source){var t=a.state.chessBoard[e];if(t){if(a.state.player!==t.player)return;a.setState({source:e})}}else{var n=a.state.chessBoard,r=a.state.source,i=n[r],l=n[e],c=i.isMovePossible(r,e);if(i instanceof y){var s=l;c=i.isMovePossible(r,e,s)}if(c)if(!i.getPath(r,e).every(function(e){return null===n[e]})||l&&l.player===i.player)a.setState({source:-1});else{var u=Object(o.a)(a.state.kings);i instanceof m&&(u[1===i.player?0:1]=e);var h=a.state.underCheck,b=1===i.player?2:1;n[e]=n[r],n[r]=null,(h=a.checkKing(n,a.state.player,u[b-1])?b:-1)===a.state.player&&(a.checkKing(n,b,u[a.state.player-1])||(h=-1)),a.checkKing(n,b,u[a.state.player-1])&&(h=a.state.player),r=-1;var f=1===a.state.player?2:1;a.setState({chessBoard:n,player:f,source:r,kings:u,underCheck:h})}else a.setState({source:-1})}},a.checkKing=function(e,t,a){for(var n=!1,r=0;r<64;r++){if(null!==e[r]&&e[r].player===t&&e[r].isMovePossible(r,a))if(e[r].getPath(r,a).every(function(t){return null===e[t]})){n=!0;break}}return n},a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"componentDidUpdate",value:function(){var e=this.state.chessBoard.filter(function(e){return e instanceof m});this.state.winner||1!==e.length||this.setState({show:!0,winner:1===e[0].player?"White":"Black"})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f,null),r.a.createElement(g,{show:this.state.show,handleClose:this.hideModal,winner:this.state.winner}),r.a.createElement(O,{chessBoard:this.state.chessBoard,source:this.state.source,underCheck:this.state.underCheck,handleClick:this.handleClick}))}}]),t}(n.Component);l.a.render(r.a.createElement(M,null),document.getElementById("root"))},9:function(e,t,a){e.exports=a(19)}},[[9,2,1]]]);
//# sourceMappingURL=main.6d59ff16.chunk.js.map