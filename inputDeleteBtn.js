/**
 * Created by bjw on 2017/4/6.
 * 为input添加一键删除按钮
 *
 * 用法：
 * 1.对需要的input 添加class：inputHost
 * 2.需要给deleteBtn定义css样式
 */
(function (global,$,doc) {
    'use strict';
    //辅助函数
    var utils={
        hide:function (el) {
            $(el).removeClass('show');
            $(el).addClass('hidden');
        },
        show:function (el) {
            $(el).removeClass('hidden');
            $(el).addClass('show');
        },
        getHeight:function (el) {
            var heightNew = $(el).height() + 'px';
            $(el).css('height',heightNew);
            return $(el).innerHeight() +'px';
        },
        getWidth:function (el) {
            var WidthNew = $(el).width()+ 'px';
            // 去除padding，重新给input赋值，防止百分比重新render
            $(el).css('width',WidthNew);
            return $(el).innerWidth() +'px';
        }
    };

    var inputDeleteBtn = function (options) {
        options = options || {};
        //静态属性
        this.color = 'white';
        this.pos ={};
        //设置eventmap
        this.eventsMaps = {
            'input .inputHost': 'showDeleteBtn',
            'click .deleteBtn': 'clearInput',
        };
        this.initEls();
        this.init();
    };

    inputDeleteBtn.els = {
        inputContainer:'.inputContainer',
        inputHost: '.inputHost',
        deleteBtn: '.deleteBtn'
    };
    inputDeleteBtn.prototype = {
        constructor :inputDeleteBtn,
        init:function () {
            console.log('init');
            this.bindEvent(this.eventsMaps);
            this.checkInputValue();
        },
        bindEvent:function (maps) {
            this._scanEventsMap(maps,true);
        },
        unbindEvent:function () {
        },
        initEls:function () {
            var els = inputDeleteBtn.els;
            for (var name in els){
                if(els.hasOwnProperty(name)){
                    this[name] = $(els[name]);
                }
            }
            this.buildContainer();
            this.buildBtn();
        },
        uninitEls:function () {
        },
        destroy:function () {
            this.unbindEvent(this.eventsMaps);
            this.uninitEls();
        },
        _scanEventsMap:function (maps,isOn) {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            var bind = isOn ? this._delegate: this._undelegate;
            for (var key in maps){
                if(maps.hasOwnProperty(key)){
                    var matches = key.match(delegateEventSplitter);
                    bind(matches[1],matches[2],this[maps[key]].bind(this));
                }
            }
        },
        _delegate:function (name,selector,func) {
            doc.on(name,selector,func);
        },
        _undelegate:function (name,selector,func) {
            doc.off(name,selector,func);
        },
        //事件
        showDeleteBtn:function (e) {
            var input = e.target;
            var deleteBtn = $(input).parent().find('.deleteBtn');
            utils.show(deleteBtn);
        },
        buildBtn:function () {
            var str ='';
            str += '<div class="deleteBtn hidden" ></div>';
            var inputContainer = $('.inputContainer');
            inputContainer.append(str);

        },
        buildContainer:function () {
            var input = this.inputHost;
            var inputHeight,inputWidth;
            for(var i =0;i<input.length;i++){
                inputHeight = utils.getHeight(input[i]);
                inputWidth = utils.getWidth(input[i]);
                var str = '';
                str += '<div class="inputContainer" style="height: '+inputHeight+';width: '+inputWidth+';position: relative;display: inline-block;"></div>';
                $(input[i]).wrap(str);
            }
        },
        clearInput:function (e) {
            var target = e.target;
            var input = $(target).parent().find('.inputHost');
            input.val('');
            utils.hide(target);
        },
        checkInputValue:function () {
            var input = this.inputHost;
            var deleteBtn = $(input).parent().find('.deleteBtn');
            for(var i = 0;i<input.length;i++){
                if($(input[i]).val()){
                    utils.show(deleteBtn[i]);
                }
            }
        }
    };

    global.inputDeleteBtn = inputDeleteBtn;
    
    $(function () {
        new inputDeleteBtn();
    })
        
})(this,this.jQuery,$(document));