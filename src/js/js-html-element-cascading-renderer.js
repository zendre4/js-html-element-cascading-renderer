/**
 * Renderer recursively of html elemnt
 * Developed in VanillaJS

 * @constructor
 * @author Julien Stalder
 * @version 1.0.0
 * {@link https://zendre4.github.io/js-html-element-cascading-renderer}.
 */
var JSHtmlElementCascadingRenderer = JSHtmlElementCascadingRenderer || function(type,id){

    /**
     * id of the component
     * @type {string}
     */
    this.id=null;
    if(typeof id !== "undefined"){
        this.id=id;
    }

    /**
     * type of final generate html element
     * @type {string}
     */
    this.elementType="div";
    if(typeof type !== "undefined"){
        this.elementType=type;
    }

    /**
     * css classes to apply in element
     * @type {Array}
     */
    this.cssClasses=[];

    /**
     * inline style to add in element
     * @type {Array}
     */
    this.styles={};

    /**
     * custom attribute to apply in element (other than class and style)
     * @type {Object}
     */
    this.customAttributes={};

    /**
     * sub components
     * @type {Array}
     */
    this.subComponents=[];

    /**
     * Fragment
     * @type {DocumentFragment}
     * @private
     */
    this._fragment=document.createDocumentFragment();

    /**
     * The html final element.
     *
     * This variable change when set element type.
     * IMPORANT, it'not render before call renderTo(), but the variable can be use for bind event by example.
     * @type {HTMLElement}
     */
    this.element = document.createElement(this.elementType);
    this._fragment.appendChild(this.element);


};

/**
 * Render recursively the element and his children(s)
 * @param {HTMLElement} element
 */
JSHtmlElementCascadingRenderer.prototype.renderTo = function (element) {
    if (typeof element !== "undefined") {

        var attr = {};
        var styles = [];
        var that=this;

        //parse custom attributes
        this._forEach(this.customAttributes, function (key, value) {
            attr[key] = value;
        });


        //parse styles
        this._forEach(this.styles, function (key, value) {
            styles.push(key + ":" + value);
        });


        //add style to attributes
        if (styles.length > 0) {
            attr.style = styles.join(";");
        }


        //add class to attributes
        if (this.cssClasses.length > 0) {
            attr.class = this.cssClasses.join(" ");
        }


        //render attributes in element
        this._forEach(attr, function (key, value) {
            that.element.setAttribute(key, value);
        });

        //add style to attributes
        if (this.id !==null) {
            attr.id = this.id;
        }

        //render sub content
        this._forEach(this.subComponents, function (subComponent) {
            if (subComponent instanceof JSHtmlElementCascadingRenderer) {
                subComponent.renderTo(that.element);
            } else if (typeof subComponent === "string") {
                that.element.appendChild(document.createTextNode(subComponent));
            }else{
                that.element.appendChild(subComponent);
            }

        });
        element.appendChild(this._fragment);
    }
};

/**
 * Set the element type
 * @param value
 * @todo must be tested
 */
JSHtmlElementCascadingRenderer.prototype.setElementType =function(value){
    this._fragment.removeChild(this.element);
    this.elementType=value;
    this.element=document.createElement(this.elementType);

    this._fragment.appendChild(this.element);
};

/**
 * Add a css class
 * @param {string} cssClass
 */
JSHtmlElementCascadingRenderer.prototype.addCssClass =function(cssClass){
    if(this.cssClasses.indexOf(cssClass) <0){
        this.cssClasses.push(cssClass);
    }
};

/**
 * Add multiple css class
 * @param {array} cssClass
 */
JSHtmlElementCascadingRenderer.prototype.addCssClasses =function(cssClass){

    var that=this;
    this._forEach(cssClass,function (row) {
        that.addCssClass(row);
    });
};

/**
 * Set a style to element
 * @param {string} name
 * @param {string} value
 */
JSHtmlElementCascadingRenderer.prototype.setStyle=function(name,value){
    this.styles[name]=value;
};

/**
 * Set multiple style
 * @param {object} values
 * @example
 * {
 *     'display':'none',
 *     'color':'red'
 * }
 */
JSHtmlElementCascadingRenderer.prototype.setStyles=function(values){
    var that=this;
    this._forEach(values,function (key,row) {
        that.setStyle(key,row);
    });
};


/**
 * Set an attributes to the element
 * @param name
 * @param value
 */
JSHtmlElementCascadingRenderer.prototype.setCustomAttribute =function(name,value){
    this.customAttributes[name]=value;
};

/**
 * Set multiple attributes
 * @param {object} values
 * @example
 * {
 *     'data-toto':'1',
 *     'data-tutu':'2'
 * }
 */
JSHtmlElementCascadingRenderer.prototype.setCustomAttributes=function(values){
    var that=this;
    this._forEach(values,function (key,row) {
        that.setCustomAttribute(key,row);
    });
};

/**
 * Add a sub component (children)
 * @param {JSHtmlElementCascadingRenderer|HTMLElement|DocumentFragment|string} subComponent
 */
JSHtmlElementCascadingRenderer.prototype.addSubComponent = function(subComponent){
    this.subComponents.push(subComponent);
};


/**
 * Callback for forEach function.
 *
 * This callback return only row if only one argument in real callback function, if not the function return key + row.
 * @callback JSHtmlElementCascadingRenderer~forEachCallback
 * @param {int} [key] - the index of current row
 * @param {object} row - the current row
 */

/**
 * For each implementation
 * @param {array|object} subject - the source array|object
 * @param {forEachCallback} fn -The callback that handles the response.
 * @private
 */
JSHtmlElementCascadingRenderer.prototype._forEach = function(subject, fn) {
    var fnLength = fn.length;
    if(Array.isArray(subject)){
        var i=0;
        var length = subject.length;
        for (; i < length; i++) {
            callFunction(subject[i], i);
        }
    }else if(typeof subject === "object"){
        for(var index in subject) {
            if (subject.hasOwnProperty(index)) {
                callFunction(subject[index],index);
            }
        }
    }
    function callFunction(row,key){
        if(fnLength==1){
            fn(row);
        }else{
            fn(key,row);
        }
    }
};
