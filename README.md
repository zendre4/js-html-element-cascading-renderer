# js-fixed-header

Create fixed header in your table. Write in Vanilla JS.

## Installation

### Bower
<pre>
bower install js-html-element-cascading-renderer
</pre>

## How to use 

### Example

#### Javascript

```javascript
var topElement = new JSHtmlElementCascadingRenderer("div","id1");
topElement.addCssClasses(["class-1","class-2"]);
topElement.setCustomAttributes({
    'data-attribute-1':'1',
    'data-attribute-2':'2'
});



var subElement = new JSHtmlElementCascadingRenderer("span","id2");
topElement.addSubComponent(subElement);
subElement.setStyles({
    'color':'#f00',
    'display':'block'
});
subElement.addSubComponent("Hello world !");//a text inside the sub component

topElement.renderTo(document.body)//htmlElementToRender must be a valid html element 
```
#### Result

``` html
<div data-attribute-1="1" data-attribute-2="2" class="class-1 class-2">
    <span style="color:#f00;display:block">Hello world !</span>
</div>
```