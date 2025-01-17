(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[37],{6601:function(){},1075:function(e,n,t){"use strict";t.d(n,{r2:function(){return g},Ce:function(){return w},e5:function(){return N},GT:function(){return k},zo:function(){return S}});var s=t(7437),a=t(5408),r=t(4024),l=t(6695),i=t(9827),c=t(2265),o=t(7254),d=t(6928),u=t(3742),x=t(1197),h=t(3816),m=t(6593),p=t(1770),b=t(9064);function j(e){let{address:n}=e,{connection:t}=(0,h.R)();return(0,m.a)({queryKey:["get-balance",{endpoint:t.rpcEndpoint,address:n}],queryFn:()=>t.getBalance(n)})}function f(e){let{address:n}=e,{connection:t}=(0,h.R)(),s=(0,o.pg)(),a=(0,i.NL)();return(0,p.D)({mutationKey:["airdrop",{endpoint:t.rpcEndpoint,address:n}],mutationFn:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,[s,a]=await Promise.all([t.getLatestBlockhash(),t.requestAirdrop(n,e*r.LAMPORTS_PER_SOL)]);return await t.confirmTransaction({signature:a,...s},"confirmed"),a},onSuccess:e=>(s(e),Promise.all([a.invalidateQueries({queryKey:["get-balance",{endpoint:t.rpcEndpoint,address:n}]}),a.invalidateQueries({queryKey:["get-signatures",{endpoint:t.rpcEndpoint,address:n}]})]))})}async function v(e){let{publicKey:n,destination:t,amount:s,connection:a}=e,l=await a.getLatestBlockhash(),i=[r.SystemProgram.transfer({fromPubkey:n,toPubkey:t,lamports:s*r.LAMPORTS_PER_SOL})],c=new r.TransactionMessage({payerKey:n,recentBlockhash:l.blockhash,instructions:i}).compileToLegacyMessage();return{transaction:new r.VersionedTransaction(c),latestBlockhash:l}}function g(e){let{address:n}=e,t=j({address:n});return(0,s.jsx)("div",{children:(0,s.jsxs)("h1",{className:"text-5xl font-bold cursor-pointer",onClick:()=>t.refetch(),children:[t.data?(0,s.jsx)(C,{balance:t.data}):"..."," SOL"]})})}function N(){let{publicKey:e}=(0,a.O)();return e?(0,s.jsx)(y,{address:e}):null}function y(e){let{address:n}=e,{cluster:t}=(0,d.xu)(),a=f({address:n}),r=j({address:n});return r.isLoading?null:r.isError||!r.data?(0,s.jsxs)("div",{className:"alert alert-warning text-warning-content/80 rounded-none flex justify-center",children:[(0,s.jsxs)("span",{children:["You are connected to ",(0,s.jsx)("strong",{children:t.name})," but your account is not found on this cluster."]}),(0,s.jsx)("button",{className:"btn btn-xs btn-neutral",onClick:()=>a.mutateAsync(1).catch(e=>console.log(e)),children:"Request Airdrop"})]}):null}function w(e){var n,t;let{address:r}=e,l=(0,a.O)(),{cluster:i}=(0,d.xu)(),[o,u]=(0,c.useState)(!1),[x,h]=(0,c.useState)(!1),[m,p]=(0,c.useState)(!1);return(0,s.jsxs)("div",{children:[(0,s.jsx)(A,{hide:()=>u(!1),address:r,show:o}),(0,s.jsx)(P,{address:r,show:x,hide:()=>h(!1)}),(0,s.jsx)(E,{address:r,show:m,hide:()=>p(!1)}),(0,s.jsxs)("div",{className:"space-x-2",children:[(0,s.jsx)("button",{disabled:null===(n=i.network)||void 0===n?void 0:n.includes("mainnet"),className:"btn btn-xs lg:btn-md btn-outline",onClick:()=>u(!0),children:"Airdrop"}),(0,s.jsx)("button",{disabled:(null===(t=l.publicKey)||void 0===t?void 0:t.toString())!==r.toString(),className:"btn btn-xs lg:btn-md btn-outline",onClick:()=>p(!0),children:"Send"}),(0,s.jsx)("button",{className:"btn btn-xs lg:btn-md btn-outline",onClick:()=>h(!0),children:"Receive"})]})]})}function k(e){var n,t,a;let{address:r}=e,[d,p]=(0,c.useState)(!1),b=function(e){let{address:n}=e,{connection:t}=(0,h.R)();return(0,m.a)({queryKey:["get-token-accounts",{endpoint:t.rpcEndpoint,address:n}],queryFn:async()=>{let[e,s]=await Promise.all([t.getParsedTokenAccountsByOwner(n,{programId:x.H_}),t.getParsedTokenAccountsByOwner(n,{programId:x.nA})]);return[...e.value,...s.value]}})}({address:r}),j=(0,i.NL)(),f=(0,c.useMemo)(()=>{var e;return d?b.data:null===(e=b.data)||void 0===e?void 0:e.slice(0,5)},[b.data,d]);return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("div",{className:"justify-between",children:(0,s.jsxs)("div",{className:"flex justify-between",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold",children:"Token Accounts"}),(0,s.jsx)("div",{className:"space-x-2",children:b.isLoading?(0,s.jsx)("span",{className:"loading loading-spinner"}):(0,s.jsx)("button",{className:"btn btn-sm btn-outline",onClick:async()=>{await b.refetch(),await j.invalidateQueries({queryKey:["getTokenAccountBalance"]})},children:(0,s.jsx)(l.Z,{size:16})})})]})}),b.isError&&(0,s.jsxs)("pre",{className:"alert alert-error",children:["Error: ",null===(n=b.error)||void 0===n?void 0:n.message.toString()]}),b.isSuccess&&(0,s.jsx)("div",{children:0===b.data.length?(0,s.jsx)("div",{children:"No token accounts found."}):(0,s.jsxs)("table",{className:"table border-4 rounded-lg border-separate border-base-300",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Public Key"}),(0,s.jsx)("th",{children:"Mint"}),(0,s.jsx)("th",{className:"text-right",children:"Balance"})]})}),(0,s.jsxs)("tbody",{children:[null==f?void 0:f.map(e=>{let{account:n,pubkey:t}=e;return(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("div",{className:"flex space-x-2",children:(0,s.jsx)("span",{className:"font-mono",children:(0,s.jsx)(u.Q1,{label:(0,o.ZB)(t.toString()),path:"account/".concat(t.toString())})})})}),(0,s.jsx)("td",{children:(0,s.jsx)("div",{className:"flex space-x-2",children:(0,s.jsx)("span",{className:"font-mono",children:(0,s.jsx)(u.Q1,{label:(0,o.ZB)(n.data.parsed.info.mint),path:"account/".concat(n.data.parsed.info.mint.toString())})})})}),(0,s.jsx)("td",{className:"text-right",children:(0,s.jsx)("span",{className:"font-mono",children:n.data.parsed.info.tokenAmount.uiAmount})})]},t.toString())}),(null!==(a=null===(t=b.data)||void 0===t?void 0:t.length)&&void 0!==a?a:0)>5&&(0,s.jsx)("tr",{children:(0,s.jsx)("td",{colSpan:4,className:"text-center",children:(0,s.jsx)("button",{className:"btn btn-xs btn-outline",onClick:()=>p(!d),children:d?"Show Less":"Show All"})})})]})]})})]})}function S(e){var n,t,a;let{address:r}=e,i=function(e){let{address:n}=e,{connection:t}=(0,h.R)();return(0,m.a)({queryKey:["get-signatures",{endpoint:t.rpcEndpoint,address:n}],queryFn:()=>t.getSignaturesForAddress(n)})}({address:r}),[d,x]=(0,c.useState)(!1),p=(0,c.useMemo)(()=>{var e;return d?i.data:null===(e=i.data)||void 0===e?void 0:e.slice(0,5)},[i.data,d]);return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)("div",{className:"flex justify-between",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold",children:"Transaction History"}),(0,s.jsx)("div",{className:"space-x-2",children:i.isLoading?(0,s.jsx)("span",{className:"loading loading-spinner"}):(0,s.jsx)("button",{className:"btn btn-sm btn-outline",onClick:()=>i.refetch(),children:(0,s.jsx)(l.Z,{size:16})})})]}),i.isError&&(0,s.jsxs)("pre",{className:"alert alert-error",children:["Error: ",null===(n=i.error)||void 0===n?void 0:n.message.toString()]}),i.isSuccess&&(0,s.jsx)("div",{children:0===i.data.length?(0,s.jsx)("div",{children:"No transactions found."}):(0,s.jsxs)("table",{className:"table border-4 rounded-lg border-separate border-base-300",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Signature"}),(0,s.jsx)("th",{className:"text-right",children:"Slot"}),(0,s.jsx)("th",{children:"Block Time"}),(0,s.jsx)("th",{className:"text-right",children:"Status"})]})}),(0,s.jsxs)("tbody",{children:[null==p?void 0:p.map(e=>{var n;return(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"font-mono",children:(0,s.jsx)(u.Q1,{path:"tx/".concat(e.signature),label:(0,o.ZB)(e.signature,8)})}),(0,s.jsx)("td",{className:"font-mono text-right",children:(0,s.jsx)(u.Q1,{path:"block/".concat(e.slot),label:e.slot.toString()})}),(0,s.jsx)("td",{children:new Date((null!==(n=e.blockTime)&&void 0!==n?n:0)*1e3).toISOString()}),(0,s.jsx)("td",{className:"text-right",children:e.err?(0,s.jsx)("div",{className:"badge badge-error",title:JSON.stringify(e.err),children:"Failed"}):(0,s.jsx)("div",{className:"badge badge-success",children:"Success"})})]},e.signature)}),(null!==(a=null===(t=i.data)||void 0===t?void 0:t.length)&&void 0!==a?a:0)>5&&(0,s.jsx)("tr",{children:(0,s.jsx)("td",{colSpan:4,className:"text-center",children:(0,s.jsx)("button",{className:"btn btn-xs btn-outline",onClick:()=>x(!d),children:d?"Show Less":"Show All"})})})]})]})})]})}function C(e){let{balance:n}=e;return(0,s.jsx)("span",{children:Math.round(n/r.LAMPORTS_PER_SOL*1e5)/1e5})}function P(e){let{hide:n,show:t,address:a}=e;return(0,s.jsxs)(o.l6,{title:"Receive",hide:n,show:t,children:[(0,s.jsx)("p",{children:"Receive assets by sending them to your public key:"}),(0,s.jsx)("code",{children:a.toString()})]})}function A(e){let{hide:n,show:t,address:a}=e,r=f({address:a}),[l,i]=(0,c.useState)("2");return(0,s.jsx)(o.l6,{hide:n,show:t,title:"Airdrop",submitDisabled:!l||r.isPending,submitLabel:"Request Airdrop",submit:()=>r.mutateAsync(parseFloat(l)).then(()=>n()),children:(0,s.jsx)("input",{disabled:r.isPending,type:"number",step:"any",min:"1",placeholder:"Amount",className:"input input-bordered w-full",value:l,onChange:e=>i(e.target.value)})})}function E(e){let{hide:n,show:t,address:l}=e,d=(0,a.O)(),u=function(e){let{address:n}=e,{connection:t}=(0,h.R)(),s=(0,o.pg)(),r=(0,a.O)(),l=(0,i.NL)();return(0,p.D)({mutationKey:["transfer-sol",{endpoint:t.rpcEndpoint,address:n}],mutationFn:async e=>{let s="";try{let{transaction:a,latestBlockhash:l}=await v({publicKey:n,destination:e.destination,amount:e.amount,connection:t});return s=await r.sendTransaction(a,t),await t.confirmTransaction({signature:s,...l},"confirmed"),console.log(s),s}catch(e){console.log("error","Transaction failed! ".concat(e),s);return}},onSuccess:e=>(e&&s(e),Promise.all([l.invalidateQueries({queryKey:["get-balance",{endpoint:t.rpcEndpoint,address:n}]}),l.invalidateQueries({queryKey:["get-signatures",{endpoint:t.rpcEndpoint,address:n}]})])),onError:e=>{b.ZP.error("Transaction failed! ".concat(e))}})}({address:l}),[x,m]=(0,c.useState)(""),[j,f]=(0,c.useState)("1");return l&&d.sendTransaction?(0,s.jsxs)(o.l6,{hide:n,show:t,title:"Send",submitDisabled:!x||!j||u.isPending,submitLabel:"Send",submit:()=>{u.mutateAsync({destination:new r.PublicKey(x),amount:parseFloat(j)}).then(()=>n())},children:[(0,s.jsx)("input",{disabled:u.isPending,type:"text",placeholder:"Destination",className:"input input-bordered w-full",value:x,onChange:e=>m(e.target.value)}),(0,s.jsx)("input",{disabled:u.isPending,type:"number",step:"any",min:"1",placeholder:"Amount",className:"input input-bordered w-full",value:j,onChange:e=>f(e.target.value)})]}):(0,s.jsx)("div",{children:"Wallet not connected"})}},6928:function(e,n,t){"use strict";t.d(n,{ClusterProvider:function(){return f},xu:function(){return v},zv:function(){return a}});var s,a,r=t(7437),l=t(4024),i=t(3915),c=t(2964),o=t(5312),d=t(2265),u=t(9064);(s=a||(a={})).Mainnet="mainnet-beta",s.Testnet="testnet",s.Devnet="devnet",s.Custom="custom";let x=[{name:"devnet",endpoint:(0,l.clusterApiUrl)("devnet"),network:"devnet"},{name:"local",endpoint:"http://localhost:8899"},{name:"testnet",endpoint:(0,l.clusterApiUrl)("testnet"),network:"testnet"}],h=(0,o.O4)("solana-cluster",x[0]),m=(0,o.O4)("solana-clusters",x),p=(0,i.cn)(e=>{let n=e(m),t=e(h);return n.map(e=>({...e,active:e.name===t.name}))}),b=(0,i.cn)(e=>{let n=e(p);return n.find(e=>e.active)||n[0]}),j=(0,d.createContext)({});function f(e){let{children:n}=e,t=(0,c.Dv)(b),s=(0,c.Dv)(p),a=(0,c.b9)(h),i=(0,c.b9)(m),o={cluster:t,clusters:s.sort((e,n)=>e.name>n.name?1:-1),addCluster:e=>{try{new l.Connection(e.endpoint),i([...s,e])}catch(e){u.ZP.error("".concat(e))}},deleteCluster:e=>{i(s.filter(n=>n.name!==e.name))},setCluster:e=>a(e),getExplorerUrl:e=>"https://explorer.solana.com/".concat(e).concat(function(e){let n="";switch(e.network){case"devnet":n="devnet";break;case"mainnet-beta":n="";break;case"testnet":n="testnet";break;default:n="custom&customUrl=".concat(encodeURIComponent(e.endpoint))}return n.length?"?cluster=".concat(n):""}(t))};return(0,r.jsx)(j.Provider,{value:o,children:n})}function v(){return(0,d.useContext)(j)}},3742:function(e,n,t){"use strict";t.d(n,{M0:function(){return m},Q1:function(){return u},_7:function(){return p},oB:function(){return h},us:function(){return x}});var s=t(7437),a=t(3816),r=t(2596),l=t(6593),i=t(2265),c=t(7254),o=t(6928),d=t(4024);function u(e){let{path:n,label:t,className:a}=e,{getExplorerUrl:r}=(0,o.xu)();return(0,s.jsx)("a",{href:r(n),target:"_blank",rel:"noopener noreferrer",className:a||"link font-mono",children:t})}function x(e){let{children:n}=e,{cluster:t}=(0,o.xu)(),{connection:r}=(0,a.R)(),i=(0,l.a)({queryKey:["version",{cluster:t,endpoint:r.rpcEndpoint}],queryFn:()=>r.getVersion(),retry:1});return i.isLoading?null:i.isError||!i.data?(0,s.jsxs)("div",{className:"alert alert-warning text-warning-content/80 rounded-none flex justify-center",children:[(0,s.jsxs)("span",{children:["Error connecting to cluster ",(0,s.jsx)("strong",{children:t.name})]}),(0,s.jsx)("button",{className:"btn btn-xs btn-neutral",onClick:()=>i.refetch(),children:"Refresh"})]}):n}function h(){let{clusters:e,setCluster:n,cluster:t}=(0,o.xu)();return(0,s.jsxs)("div",{className:"dropdown dropdown-end",children:[(0,s.jsx)("label",{tabIndex:0,className:"btn btn-primary rounded-btn",children:t.name}),(0,s.jsx)("ul",{tabIndex:0,className:"menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4",children:e.map(e=>(0,s.jsx)("li",{children:(0,s.jsx)("button",{className:"btn btn-sm ".concat(e.active?"btn-primary":"btn-ghost"),onClick:()=>n(e),children:e.name})},e.name))})]})}function m(e){let{hideModal:n,show:t}=e,{addCluster:a}=(0,o.xu)(),[r,l]=(0,i.useState)(""),[u,x]=(0,i.useState)(),[h,m]=(0,i.useState)("");return(0,s.jsxs)(c.l6,{title:"Add Cluster",hide:n,show:t,submit:()=>{try{new d.Connection(h),r?(a({name:r,network:u,endpoint:h}),n()):console.log("Invalid cluster name")}catch(e){console.log("Invalid cluster endpoint")}},submitLabel:"Save",children:[(0,s.jsx)("input",{type:"text",placeholder:"Name",className:"input input-bordered w-full",value:r,onChange:e=>l(e.target.value)}),(0,s.jsx)("input",{type:"text",placeholder:"Endpoint",className:"input input-bordered w-full",value:h,onChange:e=>m(e.target.value)}),(0,s.jsxs)("select",{className:"select select-bordered w-full",value:u,onChange:e=>x(e.target.value),children:[(0,s.jsx)("option",{value:void 0,children:"Select a network"}),(0,s.jsx)("option",{value:o.zv.Devnet,children:"Devnet"}),(0,s.jsx)("option",{value:o.zv.Testnet,children:"Testnet"}),(0,s.jsx)("option",{value:o.zv.Mainnet,children:"Mainnet"})]})]})}function p(){let{clusters:e,setCluster:n,deleteCluster:t}=(0,o.xu)();return(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"table border-4 border-separate border-base-300",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Name/ Network / Endpoint"}),(0,s.jsx)("th",{className:"text-center",children:"Actions"})]})}),(0,s.jsx)("tbody",{children:e.map(e=>{var a;return(0,s.jsxs)("tr",{className:(null==e?void 0:e.active)?"bg-base-200":"",children:[(0,s.jsxs)("td",{className:"space-y-2",children:[(0,s.jsx)("div",{className:"whitespace-nowrap space-x-2",children:(0,s.jsx)("span",{className:"text-xl",children:(null==e?void 0:e.active)?e.name:(0,s.jsx)("button",{title:"Select cluster",className:"link link-secondary",onClick:()=>n(e),children:e.name})})}),(0,s.jsxs)("span",{className:"text-xs",children:["Network: ",null!==(a=e.network)&&void 0!==a?a:"custom"]}),(0,s.jsx)("div",{className:"whitespace-nowrap text-gray-500 text-xs",children:e.endpoint})]}),(0,s.jsx)("td",{className:"space-x-2 whitespace-nowrap text-center",children:(0,s.jsx)("button",{disabled:null==e?void 0:e.active,className:"btn btn-xs btn-default btn-outline",onClick:()=>{window.confirm("Are you sure?")&&t(e)},children:(0,s.jsx)(r.Z,{size:16})})})]},e.name)})})]})})}},8946:function(e,n,t){"use strict";t.d(n,{SolanaProvider:function(){return u},T:function(){return d}});var s=t(7437),a=t(4968),r=t(8800),l=t(5041),i=t(166),c=t(2265),o=t(6928);t(2060);let d=(0,i.default)(async()=>(await t.e(288).then(t.bind(t,3288))).WalletMultiButton,{loadableGenerated:{webpack:()=>[null]},ssr:!1});function u(e){let{children:n}=e,{cluster:t}=(0,o.xu)(),i=(0,c.useMemo)(()=>t.endpoint,[t]),d=(0,c.useCallback)(e=>{console.error(e)},[]);return(0,s.jsx)(a.U,{endpoint:i,children:(0,s.jsx)(r.n,{wallets:[],onError:d,autoConnect:!0,children:(0,s.jsx)(l.s,{children:n})})})}},7254:function(e,n,t){"use strict";t.d(n,{UiLayout:function(){return u},ZB:function(){return m},l6:function(){return x},pg:function(){return p},x0:function(){return h}});var s=t(7437),a=t(7648),r=t(9376),l=t(2265),i=t(9064),c=t(1075),o=t(3742),d=t(8946);function u(e){let{children:n,links:t}=e,u=(0,r.usePathname)();return(0,s.jsxs)("div",{className:"h-full flex flex-col",children:[(0,s.jsxs)("div",{className:"navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0",children:[(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)(a.default,{className:"btn btn-ghost normal-case text-xl",href:"/",children:(0,s.jsx)("img",{className:"h-4 md:h-6",alt:"Logo",src:"/logo.png"})}),(0,s.jsx)("ul",{className:"menu menu-horizontal px-1 space-x-2",children:t.map(e=>{let{label:n,path:t}=e;return(0,s.jsx)("li",{children:(0,s.jsx)(a.default,{className:u.startsWith(t)?"active":"",href:t,children:n})},t)})})]}),(0,s.jsxs)("div",{className:"flex-none space-x-2",children:[(0,s.jsx)(d.T,{}),(0,s.jsx)(o.oB,{})]})]}),(0,s.jsx)(o.us,{children:(0,s.jsx)(c.e5,{})}),(0,s.jsxs)("div",{className:"flex-grow mx-4 lg:mx-auto",children:[(0,s.jsx)(l.Suspense,{fallback:(0,s.jsx)("div",{className:"text-center my-32",children:(0,s.jsx)("span",{className:"loading loading-spinner loading-lg"})}),children:n}),(0,s.jsx)(i.x7,{position:"bottom-right"})]}),(0,s.jsx)("footer",{className:"footer footer-center p-4 bg-base-300 text-base-content",children:(0,s.jsx)("aside",{children:(0,s.jsxs)("p",{children:["Generated by"," ",(0,s.jsx)("a",{className:"link hover:text-white",href:"https://github.com/solana-developers/create-solana-dapp",target:"_blank",rel:"noopener noreferrer",children:"create-solana-dapp"})]})})})]})}function x(e){let{children:n,title:t,hide:a,show:r,submit:i,submitDisabled:c,submitLabel:o}=e,d=(0,l.useRef)(null);return(0,l.useEffect)(()=>{d.current&&(r?d.current.showModal():d.current.close())},[r,d]),(0,s.jsx)("dialog",{className:"modal",ref:d,children:(0,s.jsxs)("div",{className:"modal-box space-y-5",children:[(0,s.jsx)("h3",{className:"font-bold text-lg",children:t}),n,(0,s.jsx)("div",{className:"modal-action",children:(0,s.jsxs)("div",{className:"join space-x-2",children:[i?(0,s.jsx)("button",{className:"btn btn-xs lg:btn-md btn-primary",onClick:i,disabled:c,children:o||"Save"}):null,(0,s.jsx)("button",{onClick:a,className:"btn",children:"Close"})]})})]})})}function h(e){let{children:n,title:t,subtitle:a}=e;return(0,s.jsx)("div",{className:"hero py-[64px]",children:(0,s.jsx)("div",{className:"hero-content text-center",children:(0,s.jsxs)("div",{className:"max-w-2xl",children:["string"==typeof t?(0,s.jsx)("h1",{className:"text-5xl font-bold",children:t}):t,"string"==typeof a?(0,s.jsx)("p",{className:"py-6",children:a}):a,n]})})})}function m(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return e.length>30?e.substring(0,n)+".."+e.substring(e.length-n,e.length):e}function p(){return e=>{i.ZP.success((0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"text-lg",children:"Transaction sent"}),(0,s.jsx)(o.Q1,{path:"tx/".concat(e),label:"View Transaction",className:"btn btn-xs btn-primary"})]}))}}}}]);