(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[346],{6601:function(){},6944:function(e,t,n){Promise.resolve().then(n.bind(n,2872))},2872:function(e,t,n){"use strict";n.d(t,{default:function(){return s}});var r=n(7437),c=n(5408),o=n(8946),a=n(9376);function s(){let{publicKey:e}=(0,c.O)();return e?(0,a.redirect)("/account/".concat(e.toString())):(0,r.jsx)("div",{className:"hero py-[64px]",children:(0,r.jsx)("div",{className:"hero-content text-center",children:(0,r.jsx)(o.T,{})})})}},6928:function(e,t,n){"use strict";n.d(t,{ClusterProvider:function(){return b},xu:function(){return C},zv:function(){return c}});var r,c,o=n(7437),a=n(4024),s=n(3915),u=n(2964),l=n(5312),i=n(2265),d=n(9064);(r=c||(c={})).Mainnet="mainnet-beta",r.Testnet="testnet",r.Devnet="devnet",r.Custom="custom";let f=[{name:"devnet",endpoint:(0,a.clusterApiUrl)("devnet"),network:"devnet"},{name:"local",endpoint:"http://localhost:8899"},{name:"testnet",endpoint:(0,a.clusterApiUrl)("testnet"),network:"testnet"}],m=(0,l.O4)("solana-cluster",f[0]),v=(0,l.O4)("solana-clusters",f),p=(0,s.cn)(e=>{let t=e(v),n=e(m);return t.map(e=>({...e,active:e.name===n.name}))}),h=(0,s.cn)(e=>{let t=e(p);return t.find(e=>e.active)||t[0]}),x=(0,i.createContext)({});function b(e){let{children:t}=e,n=(0,u.Dv)(h),r=(0,u.Dv)(p),c=(0,u.b9)(m),s=(0,u.b9)(v),l={cluster:n,clusters:r.sort((e,t)=>e.name>t.name?1:-1),addCluster:e=>{try{new a.Connection(e.endpoint),s([...r,e])}catch(e){d.ZP.error("".concat(e))}},deleteCluster:e=>{s(r.filter(t=>t.name!==e.name))},setCluster:e=>c(e),getExplorerUrl:e=>"https://explorer.solana.com/".concat(e).concat(function(e){let t="";switch(e.network){case"devnet":t="devnet";break;case"mainnet-beta":t="";break;case"testnet":t="testnet";break;default:t="custom&customUrl=".concat(encodeURIComponent(e.endpoint))}return t.length?"?cluster=".concat(t):""}(n))};return(0,o.jsx)(x.Provider,{value:l,children:t})}function C(){return(0,i.useContext)(x)}},8946:function(e,t,n){"use strict";n.d(t,{SolanaProvider:function(){return d},T:function(){return i}});var r=n(7437),c=n(4968),o=n(8800),a=n(5041),s=n(166),u=n(2265),l=n(6928);n(2060);let i=(0,s.default)(async()=>(await n.e(288).then(n.bind(n,3288))).WalletMultiButton,{loadableGenerated:{webpack:()=>[null]},ssr:!1});function d(e){let{children:t}=e,{cluster:n}=(0,l.xu)(),s=(0,u.useMemo)(()=>n.endpoint,[n]),i=(0,u.useCallback)(e=>{console.error(e)},[]);return(0,r.jsx)(c.U,{endpoint:s,children:(0,r.jsx)(o.n,{wallets:[],onError:i,autoConnect:!0,children:(0,r.jsx)(a.s,{children:t})})})}}},function(e){e.O(0,[358,814,615,971,117,744],function(){return e(e.s=6944)}),_N_E=e.O()}]);