/**
 * time 期限 
 * pastime 通过时间
 */
export const formatTime = (time,passtime) =>{

    //格式化时间
    let newDate = new Date(passtime.replace(/-/g,'/'));
    newDate.setDate(newDate.getDate()+parseInt(time));

    let _this = this;

    let timeOf = newDate.getTime() - new Date().getTime();

    if(timeOf<=0){
        // alert('该项目已结束');
        return false;
    }


    let date3 = newDate.getTime() - new Date().getTime();
    let days=Math.floor(date3/(24*3600*1000));
    //计算出小时数
    let leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000));
    //计算相差秒数
    let leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3/1000);

    let app = [];
    app[0] = days;
    app[1] = hours;
    app[2] = minutes;
    app[3] = seconds;

    if(date3 <= 0){
        // alert('该项目已结束');
        return false;
    }else{
    	return app;
    }

}

/**
 * 写入cookie
 */

export const setCookie = (name,value) => {
    var Days = 1;
    var exp = new Date();
    //b保存cookie一段时间
   //exp.setTime(exp.getTime() + Days*24*60*60*1000);
    //exp.setTime(exp.getTime());
    //document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();

    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    exp.setTime(exp.getTime());
    //默认过期时间为本次回话结束
    document.cookie = name + "="+ escape (value);
}
/**
 * 读取cookie
 */
export const getCookie = (name,value) => {



    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}




/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

