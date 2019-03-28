//城域网节点数据
var cnNodesArr = {
    node1: [],
    node2: [],
    node3: [],
    edge1: [],
    edge2: []
}

var animRotate = {
    rotate: {
        accessType: "style",
        easing: "Linear",
        from: 0,
        to: 720,
        repeat: true,
        duration: 720000,
        onUpdate: function (value) {
            this.setRotation(value / 2);
        }
    },
    start: ["rotate"]
}

var animWarn0 = {
    warn0: {
        easing: "Linear",
        from: 0,
        to: 1,
        repeat: true,
        frames:10,
        onUpdate: function (value) {
            this.s("label.opacity", value);
            this.s("label.color", "#fbac38");
        }
    },
    start: ["warn0"]
}

var animWarn1 = {
    warn1: {
        easing: "Linear",
        from:0,
        to: 1,
        repeat: true,
        frames:10,
        onUpdate: function (value) {
            this.s("label.opacity", value);
            this.s("label.color", "#da281c");
        }
    },
    start: ["warn1"]
}

ht.Default.toolTipContinual=true;
ht.Default.toolTipDelay=500;
ht.Default.setImage('root1', 148, 148, 'images/topu_l1_0.png');
ht.Default.setImage('root2', 148, 148, 'images/topu_l1_1.png');
ht.Default.setImage('label', 217, 55, 'images/label_bg.png');
ht.Default.setImage('label2', 376, 62, 'images/label2_bg.png');
ht.Default.setImage('sub1', 150, 109, 'images/topu_l2.png');
ht.Default.setImage('sub2', 138, 141, 'images/topu_l3_0.png');
ht.Default.setImage('sub3', 43, 36, 'images/topu_l3_1.png');
ht.Default.scrollZoomIncrement=0;
ht.Default.zoomMax=1;
ht.Default.zoomMin=1;
function initCNTopo() {
    
    var graph = window.graph = new ht.graph.GraphView(),
        dm = window.dm = graph.dm(),
        view = graph.getView();

    //第一级节点

    var t1LabelStyle={'select.width': 0,'label.position': 17,'label.font': '21px Arial','label.color': '#50c7ff'};

    var node_t1_n1 = createNode('163','asd87687232',{'select.width': 0,'label.opacity': 0},148,148,161 + 0 * 276, 220,'root1',null,'');
    var node_t1_n2 = createNode('CN2','hgjg8768723',{'select.width': 0,'label.opacity': 0},148,148,161 + 1 * 276, 220,'root2',null,'');
    var node_t1_n3 = createNode('IDC','tyr56454214',{'select.width': 0,'label.opacity': 0},148,148,161 + 2 * 276, 220,'root1',null,'');
    var node_t1_n4 = createNode('IPTV','gdfg4234236',{'select.width': 0,'label.opacity': 0},148,148,161 + 3 * 276, 220,'root2',null,'');

    node_t1_n1.setAnimation(animRotate);
    node_t1_n2.setAnimation(animRotate);
    node_t1_n3.setAnimation(animRotate);
    node_t1_n4.setAnimation(animRotate);

    var label_t1_n1 = createNode('163','',t1LabelStyle,217,55,164 + 0 * 276, 70,'label',null,'');
    var label_t1_n2 = createNode('CN2','',t1LabelStyle,217,55,164 + 1 * 276, 70,'label',null,'');
    var label_t1_n3 = createNode('IDC','',t1LabelStyle,217,55,164 + 2 * 276, 70,'label',null,'');
    var label_t1_n4 = createNode('IPTV','',t1LabelStyle,217,55,164 + 3 * 276, 70,'label',null,'');

    cnNodesArr.node1.push(node_t1_n1,node_t1_n2,node_t1_n3,node_t1_n4);

    dm.add(node_t1_n1);
    dm.add(node_t1_n2);
    dm.add(node_t1_n3);
    dm.add(node_t1_n4);
    dm.add(label_t1_n1);
    dm.add(label_t1_n2);
    dm.add(label_t1_n3);
    dm.add(label_t1_n4);

    //第二级节点

    var t2NodeStyle={
        'select.width': 0,
        'label.position': 11,
        'label.offset.y':12,
        'label.font': '18px Arial',
        'label.color': '#2aeff9',
        //'note':'JA',
        'note.background':'transparent',
        'note.border.width':0,
        'note.position':49,
        'note.offset.y':30,
        'note.font': '13px Arial',
        'note.color': '#0495e0'
    };

    var node_t2_n1 = createNode('静安','lkjf09374832',t2NodeStyle,150,109,177 + 0 * 260, 463,'sub1',null,'');
    var node_t2_n2 = createNode('西单','lkjf09374835',t2NodeStyle,150,109,177 + 1 * 260, 463,'sub1',0,'连接超时');
    var node_t2_n3 = createNode('德外','lkjf09374833',t2NodeStyle,150,109,177 + 2 * 260, 463,'sub1',null,'');
    var node_t2_n4 = createNode('东四','lkjf09374812',t2NodeStyle,150,109,177 + 3 * 260, 463,'sub1',1,'资源不足');

    //node_t2_n2.s({'note':'XD'});
    //node_t2_n3.s({'note':'DW'});
    //node_t2_n4.s({'note':'DS'});

    cnNodesArr.node2.push(node_t2_n1,node_t2_n2,node_t2_n3,node_t2_n4);

    dm.add(node_t2_n1);
    dm.add(node_t2_n2);
    dm.add(node_t2_n3);
    dm.add(node_t2_n4);

    //三级节点
    
    var t3NodeStyle = {'select.width': 0,'shape.background': '#009cff','shape': 'rect'};

    var node_t3_n1 = createNode('','dsae09374832',t3NodeStyle,30,8,390 + 0 * 130, 650,null,null,'');
    var node_t3_n2 = createNode('','dsae09374835',t3NodeStyle,30,8,390 + 1 * 130, 650,null,null,'');
    var node_t3_n3 = createNode('','dsae09374833',t3NodeStyle,30,8,390 + 2 * 130, 650,null,null,'');
    var node_t3_n4 = createNode('','dsae09374812',t3NodeStyle,30,8,390 + 3 * 130, 650,null,null,'');
    
    cnNodesArr.node3.push(node_t3_n1,node_t3_n2,node_t3_n3,node_t3_n4);

    dm.add(node_t3_n1);
    dm.add(node_t3_n2);
    dm.add(node_t3_n3);
    dm.add(node_t3_n4);

    //三级连线
    var edge1Style={'edge.width': 1,'edge.gap': 10,'edge.dash': false,'edge.offset': 50,'edge.toggleable': false,'edge.color': '#25a139'}
    var edge2Style={'edge.width': 1,'edge.gap': 50,'edge.dash': false,'edge.offset': 50,'edge.type': 'ripple','edge.toggleable': false,'edge.color': '#25a139'}
    var edge3Style={'edge.width': 1,'edge.gap': 50,'edge.dash': false,'edge.offset': 5,'edge.toggleable': false,'edge.color': '#25a139','edge.source.offset.y': 35}
    
    
    var edge1_1 = createEdge('163-->JA','edgei23432r1',edge1Style,node_t1_n1, node_t2_n1,null,'');
    var edge1_2 = createEdge('163-->XD','edgei23432h2',edge1Style,node_t1_n1, node_t2_n2,null,'');
    var edge1_3 = createEdge('163-->DW','edgei2343h1',edge1Style,node_t1_n1, node_t2_n3,null,'');
    var edge1_4 = createEdge('163-->DS','edgei4432h1',edge1Style,node_t1_n1, node_t2_n4,null,'');

    var edge2_1 = createEdge('CN2-->JA','edgei2332r1',edge1Style,node_t1_n2, node_t2_n1,null,'');
    var edge2_2 = createEdge('CN2-->XD','edgei24432h2',edge1Style,node_t1_n2, node_t2_n2,null,'');

    var edge3_1 = createEdge('IDC-->JA','edgei2432r1',edge1Style,node_t1_n3, node_t2_n1,null,'');
    var edge3_2 = createEdge('IDC-->XD','edgeiX432h2',edge1Style,node_t1_n3, node_t2_n2,null,'');
    var edge3_3 = createEdge('IDC-->DW','edgeX343h1',edge1Style,node_t1_n3, node_t2_n3,null,'');
    var edge3_4 = createEdge('IDC-->DS','edgei4X2h1',edge1Style,node_t1_n3, node_t2_n4,null,'');

    var edge4_3 = createEdge('IPTV-->DW','edXei2343h1',edge1Style,node_t1_n4, node_t2_n3,null,'');
    var edge4_4 = createEdge('IPTV-->DS','edXei4432h1',edge1Style,node_t1_n4, node_t2_n4,null,'');

    dm.add(edge1_1);
    dm.add(edge1_2);
    dm.add(edge1_3);
    dm.add(edge1_4);
    dm.add(edge2_1);
    dm.add(edge2_2);
    dm.add(edge3_1);
    dm.add(edge3_2);
    dm.add(edge3_3);
    dm.add(edge3_4);
    dm.add(edge4_3);
    dm.add(edge4_4);
    
    cnNodesArr.node2.forEach(function (currentValue, index, arr) {
        for (var line2 = 0; line2 < cnNodesArr.node2.length; line2++) {
            if (line2 > index) {
                var edge2 = createEdge('','',edge2Style,currentValue, cnNodesArr.node2[line2],null,'');
                edge2.s({
                    'edge.source.offset.y': 15 * (line2 - index),
                    'edge.target.offset.y': 15 * (line2 - index),
                    'edge.ripple.elevation': 50 * (line2 - index) * (line2 - index) / 3,
                });
                cnNodesArr.edge1.push(edge2);
                dm.add(edge2);
            }
        }
        for (var line3 = 0; line3 < cnNodesArr.node2.length; line3++) {
            if (line3 == index) {
                var edge3 = createEdge('','',edge3Style,currentValue, cnNodesArr.node3[line3],1,'提示提示提示提示');
                cnNodesArr.edge2.push(edge3);
                dm.add(edge3);
            }
        }
    })

    var cnGroup = new ht.Group();
    cnGroup.setExpanded(true);
    cnGroup.s({
        'select.width': 0,
        'group.type': 'rect',
        'group.image': 'images/group_cn_bg.png',
        'group.padding': 10,
        'group.depth': 0,
        'group.border.width': 0,
        'group.padding.top': 48,
        'group.padding.bottom': 110,
        'group.padding.left': 146,
        'group.padding.right': 146,
        'group.toggleable': false
    })
    dm.add(cnGroup);

    var t4NodeStyle = {'select.width': 0,'label.position': 17,'label.font': '42px Arial','label.color': '#fff'};

    var node_t4_n1 = createNode('SR','fhxe09374832',t4NodeStyle,138,141,370 + 0 * 204, 780,'sub2',null,'');
    var node_t4_n2 = createNode('BAS','fhxe09374835',t4NodeStyle,138,141,370 + 1 * 204, 780,'sub2',null,'');
    var node_t4_n3 = createNode('MSE','fhxe09374833',t4NodeStyle,138,141,370 + 2 * 204, 780,'sub2',null,'');
    node_t4_n1.setParent(cnGroup);
    node_t4_n2.setParent(cnGroup);
    node_t4_n3.setParent(cnGroup);
    dm.add(node_t4_n1);
    dm.add(node_t4_n2);
    dm.add(node_t4_n3);
    
    graph.setPannable(false);
    graph.enableToolTip();
    graph.getToolTip = function(e){
        var data = this.getDataAt(e);
        if(data && data.status != null){
            return '<pre>&nbsp;' + data.toolTip + '&nbsp;</pre>';
        }
        return null;
    }; 

    view.addEventListener("click", function(e){
        var data = graph.getDataAt(e);
        if(data){
            var nodeName = data.getName();
            var $text = $('#txt');
            var $text_sub = $('#txt_sub');
            var $flowName = $('#flow_name');
            var $flowWrap = $('#flow_wrap');
            $text_sub.text(nodeName);
            $flowName.text(nodeName);
            switch(nodeName){
                case '163': 
                $text.text('骨干层');
                $flowWrap.html('<li><span>至静安出口流量</span><p id="crJa"></p></li><li><span>至静安峰值利用率</span><p id="crJas"></p></li><li><span>至西单出口流量</span><p id="crXd"></p></li><li><span>至西单峰值利用率</span><p id="crXds"></p></li><li><span>至德外出口流量</span><p id="crDw"></p></li><li><span>至德外峰值利用率</span><p id="crDws"></p></li><li><span>至东四出口流量</span><p id="crDs"></p></li><li><span>至东四峰值利用率</span><p id="crDss"></p></li><li><span>各核心至163总出口流量</span><p id="to163"></p></li><li><span>各核心至163总峰值利用率</span><p id="to163s"></p></li>');
                break;
                case 'CN2':
                $text.text('骨干层');
                $flowWrap.html('<li><span>至静安出口流量</span><p id="crJa"></p></li><li><span>至静安峰值利用率</span><p id="crJas"></p></li><li><span>至西单出口流量</span><p id="crXd"></p></li><li><span>至西单峰值利用率</span><p id="crXds"></p></li><li><span>至德外出口流量</span><p id="crDw"></p></li><li><span>至德外峰值利用率</span><p id="crDws"></p></li><li><span>至东四出口流量</span><p id="crDs"></p></li><li><span>至东四峰值利用率</span><p id="crDss"></p></li><li><span>各核心至CN2总出口流量</span><p id="toCn"></p></li><li><span>各核心至CN2总峰值利用率</span><p id="toCns"></p></li>');
                break;
                case 'IDC':
                $text.text('骨干层');
                $flowWrap.html('<li><span>至静安出口流量</span><p id="crJa"></p></li><li><span>至静安峰值利用率</span><p id="crJas"></p></li><li><span>至西单出口流量</span><p id="crXd"></p></li><li><span>至西单峰值利用率</span><p id="crXds"></p></li><li><span>至德外出口流量</span><p id="crDw"></p></li><li><span>至德外峰值利用率</span><p id="crDws"></p></li><li><span>至东四出口流量</span><p id="crDs"></p></li><li><span>至东四峰值利用率</span><p id="crDss"></p></li><li><span>各核心至IDC总出口流量</span><p id="toIdc"></p></li><li><span>各核心至IDC总峰值利用率</span><p id="toIdcs"></p></li>');
                break;
                case 'IPTV':
                $text.text('骨干层');
                $flowWrap.html('<li><span>至静安出口流量</span><p id="crJa"></p></li><li><span>至静安峰值利用率</span><p id="crJas"></p></li><li><span>至西单出口流量</span><p id="crXd"></p></li><li><span>至西单峰值利用率</span><p id="crXds"></p></li><li><span>至德外出口流量</span><p id="crDw"></p></li><li><span>至德外峰值利用率</span><p id="crDws"></p></li><li><span>至东四出口流量</span><p id="crDs"></p></li><li><span>至东四峰值利用率</span><p id="crDss"></p></li><li><span>各核心至163总出口流量</span><p id="toIptv"></p></li><li><span>各核心至163总峰值利用率</span><p id="toIptvs"></p></li>');
                break;
                case '静安':
                $text.text('核心层');
                $flowWrap.html('<li><span>至163出口流量</span><p id="to163"></p></li><li><span>至163峰值利用率</span><p id="to163s"></p></li><li><span>至CN2出口流量</span><p id="toCn"></p></li><li><span>至CN2峰值利用率</span><p id="toCns"></p></li><li><span>至IDC出口流量</span><p id="toIdc"></p></li><li><span>至IDC峰值利用率</span><p id="toIdcs"></p></li><li><span>至其他核心出口流量</span><p id="toHx"></p></li><li><span>至其他核心峰值利用率</span><p id="toHxs"></p></li><li><span>至汇聚层总出口流量</span><p id="toHj"></p></li><li><span>至汇聚层总峰值利用率</span><p id="toHjs"></p></li>');
                break;
                case '西单':
                $text.text('核心层');
                $flowWrap.html('<li><span>至163出口流量</span><p id="to163"></p></li><li><span>至163峰值利用率</span><p id="to163s"></p></li><li><span>至CN2出口流量</span><p id="toCn"></p></li><li><span>至CN2峰值利用率</span><p id="toCns"></p></li><li><span>至IDC出口流量</span><p id="toIdc"></p></li><li><span>至IDC峰值利用率</span><p id="toIdcs"></p></li><li><span>至其他核心出口流量</span><p id="toHx"></p></li><li><span>至其他核心峰值利用率</span><p id="toHxs"></p></li><li><span>至汇聚层总出口流量</span><p id="toHj"></p></li><li><span>至汇聚层总峰值利用率</span><p id="toHjs"></p></li>');
                break;
                case '德外':
                $text.text('核心层');
                $flowWrap.html('<li><span>至163出口流量</span><p id="to163"></p></li><li><span>至163峰值利用率</span><p id="to163s"></p></li><li><span>至IDC出口流量</span><p id="toIdc"></p></li><li><span>至IDC峰值利用率</span><p id="toIdcs"></p></li><li><span>至IPTV出口流量</span><p id="toIptv"></p></li><li><span>至IPTV峰值利用率</span><p id="toIptvs"></p></li><li><span>至其他核心出口流量</span><p id="toHx"></p></li><li><span>至其他核心峰值利用率</span><p id="toHxs"></p></li><li><span>至汇聚层总出口流量</span><p id="toHj"></p></li><li><span>至汇聚层总峰值利用率</span><p id="toHjs"></p></li>');
                break;
                case '东四':
                $text.text('核心层');
                $flowWrap.html('<li><span>至163出口流量</span><p id="to163"></p></li><li><span>至163峰值利用率</span><p id="to163s"></p></li><li><span>至IDC出口流量</span><p id="toIdc"></p></li><li><span>至IDC峰值利用率</span><p id="toIdcs"></p></li><li><span>至IPTV出口流量</span><p id="toIptv"></p></li><li><span>至IPTV峰值利用率</span><p id="toIptvs"></p></li><li><span>至其他核心出口流量</span><p id="toHx"></p></li><li><span>至其他核心峰值利用率</span><p id="toHxs"></p></li><li><span>至汇聚层总出口流量</span><p id="toHj"></p></li><li><span>至汇聚层总峰值利用率</span><p id="toHjs"></p></li>');
                break;
                case 'SR':
                $text.text('汇聚层');
                $flowWrap.html('<li><span>至静安出口流量</span><p id="crJa"></p></li><li><span>至静安峰值利用率</span><p id="crJas"></p></li><li><span>至西单出口流量</span><p id="crXd"></p></li><li><span>至西单峰值利用率</span><p id="crXds"></p></li><li><span>至德外出口流量</span><p id="crDw"></p></li><li><span>至德外峰值利用率</span><p id="crDws"></p></li><li><span>至东四出口流量</span><p id="crDs"></p></li><li><span>至东四峰值利用率</span><p id="crDss"></p></li>');
                break;
            }
            $('#con_idc').show();
        }
    });
    graph.setMovableFunc(function(e){})
    graph.setInteractors(null)
    dm.enableAnimation(50);
    view.className = "view";
    document.getElementById("mynetwork").appendChild(view);
    graph.enableFlow(60);
}

function initIDCTopo() {

    var graph = window.graph = new ht.graph.GraphView(),
        dm = window.dm = graph.dm(),
        view = graph.getView();
    

    //第一级节点

    var t1LabelStyle={'select.width': 0,'label.position': 17,'label.font': '21px Arial','label.color': '#50c7ff'};

    var node_t1_n1 = createNode('北京电信城域网','asd87637232',{'select.width': 0,'label.opacity': 0},148,148,323, 230,'root1',null,'');
    var node_t1_n2 = createNode('中国电信IP骨干网','hgjg8168723',{'select.width': 0,'label.opacity': 0},148,148,875, 230,'root2',null,'');

    node_t1_n1.setAnimation(animRotate);
    node_t1_n2.setAnimation(animRotate);

    var label_t1_n1 = createNode('北京电信城域网','',t1LabelStyle,376,62,326, 80,'label',null,'');
    var label_t1_n2 = createNode('中国电信IP骨干网','',t1LabelStyle,376,62,878, 80,'label',null,'');

    cnNodesArr.node1.push(node_t1_n1,node_t1_n2);

    dm.add(node_t1_n1);
    dm.add(node_t1_n2);
    dm.add(label_t1_n1);
    dm.add(label_t1_n2);

    //第二级节点

    var t2NodeStyle={
        'select.width': 0,
        'label.position': 11,
        'label.offset.y':12,
        'label.font': '18px Arial',
        'label.color': '#2aeff9',
        'note':'NE50002+2集群\n2套',
        'note.background':'transparent',
        'note.border.width':0,
        'note.position':49,
        'note.offset.y':48,
        'note.font': '13px Arial',
        'note.color': '#0495e0'
    };

    var node_t2_n1 = createNode('永丰','lkjf09374832',t2NodeStyle,150,109,201 + 2 * 260, 523,'sub1',null,'');
    var node_t2_n2 = createNode('亦庄瀛海','lkjf09374835',t2NodeStyle,150,109,201 + 0 * 260, 523,'sub1',0,'连接超时');
    var node_t2_n3 = createNode('东四','lkjf09374833',t2NodeStyle,150,109,201 + 1 * 260, 523,'sub1',null,'');
    var node_t2_n4 = createNode('兆维','lkjf09374812',t2NodeStyle,150,109,201 + 3 * 260, 523,'sub1',1,'资源不足');

    node_t2_n2.s({'note':'阿朗7950\n2台'});
    node_t2_n3.s({'note':'NE500E2+2集群\n2套'});
    node_t2_n4.s({'note':'NE500E2+4集群\n2套'});

    cnNodesArr.node2.push(node_t2_n1,node_t2_n2,node_t2_n3,node_t2_n4);

    dm.add(node_t2_n1);
    dm.add(node_t2_n2);
    dm.add(node_t2_n3);
    dm.add(node_t2_n4);

    //三级节点
    
    var t3NodeStyle = {
        'select.width': 0,
        'label.position': 31,
        'label.offset.y':12,
        'label.font': '14px Arial',
        'label.color': '#ffffff'
    };

    

    var node_t3_n1 = createNode('洋桥','dsae09374801',t3NodeStyle,42,36,64 + 0 * 65, 860,'sub3',null,'');
    var node_t3_n2 = createNode('望京嘉轩','dsae09374802',t3NodeStyle,42,36,64 + 1 * 65, 860,'sub3',null,'');
    var node_t3_n3 = createNode('酒仙桥','dsae09374803',t3NodeStyle,42,36,64 + 2 * 65, 860,'sub3',null,'');
    //var node_t3_n4 = createNode('上地','dsae09374814',t3NodeStyle,42,36,64 + 3 * 55, 860,'sub3',null,'');   /*删除*/
    var node_t3_n5 = createNode('静安','dsae09374815',t3NodeStyle,42,36,64 + 3 * 65, 860,'sub3',null,'');
    var node_t3_n6 = createNode('德外','dsae09374816',t3NodeStyle,42,36,64 + 4 * 65, 860,'sub3',null,'');
    var node_t3_n7 = createNode('数字','dsae09374817',t3NodeStyle,42,36,64 + 5 * 65, 860,'sub3',null,'');
    var node_t3_n8 = createNode('亦庄','dsae09374818',t3NodeStyle,42,36,64 + 6 * 65, 860,'sub3',null,'');
    var node_t3_n9 = createNode('润泽','dsae09374819',t3NodeStyle,42,36,64 + 7 * 65, 860,'sub3',null,'');
    var node_t3_n10 = createNode('北七家','dsae09374820',t3NodeStyle,42,36,64 + 8 * 65, 860,'sub3',1,'错误提醒');
    var node_t3_n11 = createNode('大郊亭','dsae09374821',t3NodeStyle,42,36,64 + 9 * 65, 860,'sub3',null,'');
    //var node_t3_n12 = createNode('马驹桥','dsae09374822',t3NodeStyle,42,36,64 + 11 * 55, 860,'sub3',null,'');   /*删除*/
    var node_t3_n13 = createNode('永丰','dsae09374824',t3NodeStyle,42,36,64 + 10 * 65, 860,'sub3',null,'');
    var node_t3_n14 = createNode('兆维','dsae09374825',t3NodeStyle,42,36,64 + 11 * 65, 860,'sub3',null,'');
    var node_t3_n15 = createNode('东四','dsae09374826',t3NodeStyle,42,36,64 + 12 * 65, 860,'sub3',null,'');
    var node_t3_n16 = createNode('中广亚','dsae09374827',t3NodeStyle,42,36,64 + 13 * 65, 860,'sub3',null,'');
    var node_t3_n17 = createNode('瀛海','dsae09374828',t3NodeStyle,42,36,64 + 14 * 65, 860,'sub3',null,'');
    var node_t3_n18 = createNode('中兴','dsae093d4828',t3NodeStyle,42,36,64 + 15 * 65, 860,'sub3',null,'');
    var node_t3_n19 = createNode('西二旗','dsae033d4828',t3NodeStyle,42,36,64 + 16 * 65, 860,'sub3',null,'');

   

    dm.add(node_t3_n1);
    dm.add(node_t3_n2);
    dm.add(node_t3_n3);
    //dm.add(node_t3_n4);
    dm.add(node_t3_n5);
    dm.add(node_t3_n6);
    dm.add(node_t3_n7);
    dm.add(node_t3_n8);
    dm.add(node_t3_n9);
    dm.add(node_t3_n10);
    dm.add(node_t3_n11);
    //dm.add(node_t3_n12);
    dm.add(node_t3_n13);
    dm.add(node_t3_n14);
    dm.add(node_t3_n15);
    dm.add(node_t3_n16);
    dm.add(node_t3_n17);
    dm.add(node_t3_n18);
    dm.add(node_t3_n19);

    //三级连线
    var edge1Style={'label.opacity':0,'edge.width': 1,'edge.gap': 10,'edge.dash': false,'edge.offset': 50,'edge.toggleable': false,'edge.color': '#25a139'}
    var edge2Style={'label.opacity':0,'edge.width': 1,'edge.gap': 10,'edge.dash': false,'edge.offset': 30,'edge.type': 'ripple','edge.toggleable': false,'edge.color': '#25a139'}
    var edge3Style={'label.opacity':0,'edge.width': 1,'edge.gap': 50,'edge.dash': false,'edge.offset': 10,'edge.toggleable': false,'edge.color': '#25a139','edge.target.offset.y': 10}

    //第一级连线
    var edge1_1 = createEdge('兆维核心-->城域网','edgei23432r',edge1Style,node_t1_n1, node_t2_n4,null,'');
    var edge1_2 = createEdge('兆维核心-->骨干网','edgei2e432h',edge1Style,node_t1_n2, node_t2_n4,null,'');
    var edge1_3 = createEdge('永丰核心-->城域网','edgei23332r',edge1Style,node_t1_n1, node_t2_n1,null,'');
    var edge1_4 = createEdge('永丰核心-->骨干网','edgei23g32h',edge1Style,node_t1_n2, node_t2_n1,null,'');
    var edge1_5 = createEdge('东四核心-->城域网','edgei234d2r',edge1Style,node_t1_n1, node_t2_n3,null,'');
    var edge1_6 = createEdge('东四核心-->骨干网','edgei2w232h',edge1Style,node_t1_n2, node_t2_n3,null,'');
    //var edge1_7 = createEdge('瀛海核心-->城域网','edgei3as32r',edge1Style,node_t1_n1, node_t2_n2,null,'');
    var edge1_8 = createEdge('瀛海核心-->骨干网','edgei234wdh',edge1Style,node_t1_n2, node_t2_n2,null,'');

    dm.add(edge1_1);
    dm.add(edge1_2);
    dm.add(edge1_3);
    dm.add(edge1_4);
    dm.add(edge1_5);
    dm.add(edge1_6);
    //dm.add(edge1_7);
    dm.add(edge1_8);

    //第二级连线
    var edge2_1 = createEdge('兆维核心-->东四核心','',edge2Style,node_t2_n4, node_t2_n3,null,'');
    var edge2_2 = createEdge('兆维核心-->瀛海核心','',edge2Style,node_t2_n4, node_t2_n2,1,'异常提醒');
    var edge2_3 = createEdge('兆维核心-->永丰核心','',edge2Style,node_t2_n4, node_t2_n1,null,'');
    var edge2_4 = createEdge('东四核心-->瀛海核心','',edge2Style,node_t2_n3, node_t2_n2,null,'');
    var edge2_5 = createEdge('永丰核心-->东四核心','',edge2Style,node_t2_n1, node_t2_n3,null,'');

    edge2_1.s({'edge.source.offset.y': -30,'edge.target.offset.y': -30,'edge.ripple.elevation': 200 / 3,});
    edge2_2.s({'edge.source.offset.y': -35,'edge.target.offset.y': -35,'edge.ripple.elevation': 450 / 3,});
    edge2_3.s({'edge.source.offset.y': -15,'edge.target.offset.y': -15,'edge.ripple.elevation': 50 / 3,});
    edge2_4.s({'edge.source.offset.y': -15,'edge.target.offset.y': -15,'edge.ripple.elevation': 50 / 3,});
    edge2_5.s({'edge.source.offset.y': -15,'edge.target.offset.y': -15,'edge.ripple.elevation': 50 / 3,});

    dm.add(edge2_1);
    dm.add(edge2_2);
    dm.add(edge2_3);
    dm.add(edge2_4);
    dm.add(edge2_5);

    //第三级连线
    var idcEdge3={};
    idcEdge3['edge3_1'] = createEdge('望京嘉轩-->兆维核心','',edge3Style,node_t3_n2, node_t2_n4,null,'');
    idcEdge3['edge3_2'] = createEdge('中兴-->兆维核心','',edge3Style,node_t3_n18, node_t2_n4,null,'');
    idcEdge3['edge3_3'] = createEdge('北七家-->兆维核心','',edge3Style,node_t3_n10, node_t2_n4,null,'');
    idcEdge3['edge3_4'] = createEdge('兆维-->兆维核心','',edge3Style,node_t3_n14, node_t2_n4,null,'');
    idcEdge3['edge3_5'] = createEdge('西二旗-->兆维核心','',edge3Style,node_t3_n19, node_t2_n4,null,'');
    idcEdge3['edge3_6'] = createEdge('中广亚-->兆维核心','',edge3Style,node_t3_n16, node_t2_n4,null,'');
    idcEdge3['edge3_7'] = createEdge('亦庄-->兆维核心','',edge3Style,node_t3_n8, node_t2_n4,null,'');
    idcEdge3['edge3_8'] = createEdge('大郊亭-->兆维核心','',edge3Style,node_t3_n11, node_t2_n4,null,'');
    idcEdge3['edge3_9'] = createEdge('洋桥-->兆维核心','',edge3Style,node_t3_n1, node_t2_n4,null,'');
    idcEdge3['edge3_10'] = createEdge('酒仙桥-->兆维核心','',edge3Style,node_t3_n3, node_t2_n4,null,'');
    idcEdge3['edge3_11'] = createEdge('德外-->兆维核心','',edge3Style,node_t3_n6, node_t2_n4,null,'');
    idcEdge3['edge3_12'] = createEdge('润泽-->兆维核心','',edge3Style,node_t3_n9, node_t2_n4,null,'');
    idcEdge3['edge3_13'] = createEdge('静安-->兆维核心','',edge3Style,node_t3_n5, node_t2_n4,null,'');

    idcEdge3['edge3_14'] = createEdge('洋桥-->东四核心','',edge3Style,node_t3_n1, node_t2_n3,null,'');
    idcEdge3['edge3_15'] = createEdge('德外-->东四核心','',edge3Style,node_t3_n6, node_t2_n3,null,'');
    idcEdge3['edge3_16'] = createEdge('数字大厦-->东四核心','',edge3Style,node_t3_n7, node_t2_n3,null,'');
    idcEdge3['edge3_17'] = createEdge('亦庄-->东四核心','',edge3Style,node_t3_n8, node_t2_n3,null,'');
    idcEdge3['edge3_18'] = createEdge('望京嘉轩-->东四核心','',edge3Style,node_t3_n2, node_t2_n3,null,'');
    idcEdge3['edge3_19'] = createEdge('润泽-->东四核心','',edge3Style,node_t3_n9, node_t2_n3,1,'红色-异常提醒');
    idcEdge3['edge3_20'] = createEdge('大郊亭-->东四核心','',edge3Style,node_t3_n11, node_t2_n3,null,'');
    idcEdge3['edge3_21'] = createEdge('东四-->东四核心','',edge3Style,node_t3_n15, node_t2_n3,null,'');
    idcEdge3['edge3_22'] = createEdge('中广亚-->东四核心','',edge3Style,node_t3_n16, node_t2_n3,null,'');
    idcEdge3['edge3_23'] = createEdge('北七家-->东四核心','',edge3Style,node_t3_n10, node_t2_n3,null,'');
    idcEdge3['edge3_24'] = createEdge('中兴-->东四核心','',edge3Style,node_t3_n18, node_t2_n3,null,'');
    idcEdge3['edge3_25'] = createEdge('静安-->东四核心','',edge3Style,node_t3_n5, node_t2_n3,null,'');

    idcEdge3['edge3_26'] = createEdge('北七家-->永丰核心','',edge3Style,node_t3_n10, node_t2_n1,null,'');
    idcEdge3['edge3_27'] = createEdge('永丰-->永丰核心','',edge3Style,node_t3_n13, node_t2_n1,null,'');
    idcEdge3['edge3_28'] = createEdge('数字大厦-->永丰核心','',edge3Style,node_t3_n7, node_t2_n1,null,'');
    idcEdge3['edge3_29'] = createEdge('西二旗-->永丰核心','',edge3Style,node_t3_n19, node_t2_n1,null,'');

    idcEdge3['edge3_30'] = createEdge('亦庄-->瀛海核心','',edge3Style,node_t3_n8, node_t2_n2,null,'');
    idcEdge3['edge3_31'] = createEdge('瀛海-->瀛海核心','',edge3Style,node_t3_n17, node_t2_n2,null,'');

    for(key in idcEdge3){
        dm.add(idcEdge3[key]);
    }
    
    graph.setPannable(false);
    graph.enableToolTip();
    graph.getToolTip = function(e){
        var data = this.getDataAt(e);
        if(data && data.status != null){
            return '<pre>&nbsp;' + data.toolTip + '&nbsp;</pre>';
        }
        return null;
    }; 
    view.addEventListener("click", function(e){
        var data = graph.getDataAt(e);
        if(data){
            alert('点击了'+data.getName());
            $('#con_idc').show();
        }
    });
    graph.setMovableFunc(function(e){})
    graph.setInteractors(null)
    dm.enableAnimation(50);
    view.className = "view";
    document.getElementById("mynetwork_1").appendChild(view);
    graph.enableFlow(60);
}

//新建节点方法(name,id,样式,宽,高,横坐标,纵坐标,图片,状态,异常提示)
function createNode(name,id,s,width,height,x,y,image,status,toolTip){
    var node = new ht.Node();
    if(name != ''){
        node.setName(name);
    }
    if(id != ''){
        node.setId(id);
    }
    node.s(s);
    node.status=status;
    node.toolTip=toolTip;

    if(status == 0){
        node.setAnimation(animWarn0);
    }else if(status == 1){
        node.setAnimation(animWarn1);
    }

    node.setSize(width, height);
    node.setImage(image);
    node.setPosition(x, y);
    return node;
} 
//新建连线方法(name,id,样式,起始节点,结束节点,状态,异常提示)
function createEdge(name,id,s,node1,node2,status,toolTip){
    var edge = new ht.Edge(node1,node2);
    if(name != ''){
        edge.setName(name);
    }
    if(id != ''){
        edge.setId(id);
    }
    edge.s(s);
    edge.status=status;
    edge.toolTip=toolTip;

    if(status==0){
        edge.s({
            'edge.color':'#f08619'
        })
    }else if(status==1){
        edge.s({
            'edge.color':'#da281c'
        })
    }
    edge.setStyle("flow",true)
    edge.s("flow", true);
    edge.s("flow.element.max", 4);
    edge.s("flow.element.shadow.max", 10);
    edge.s("flow.element.shadow.min", 1);
    edge.s("flow.reverse", true);
    edge.s("flow.autoreverse", true);
    // edge.s("flow.element.background", "rgba(255, 0, 0, 0.4)");
    // edge.s("flow.element.shadow.begincolor", "rgba(194, 62, 0, 0.3)");
    // edge.s("flow.element.shadow.endcolor", "rgba(194, 62, 0, 0)");
    // edge.setAnimation({
    //     flowing: {
    //         property: 'edge.dash.offset',
    //         accessType: 'style',
    //         easing: 'Linear',
    //         from: 0,
    //         to: 1000,
    //         frames: 500,
    //         interval: 30,
    //         onComplete: function () {
    //             this.s('edge.dash.offset', 0);
    //         },
    //         next: 'flowing'
    //     },
    //     start: ['flowing']
    // });

    return edge;
}
$(function(){
    initCNTopo();
})