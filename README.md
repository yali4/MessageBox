## Changelog
- View bugs have been fixed.
- Brought into line with all browsers.
- The use of context has become active again.
- Work has been made more than one message box.


## Supported Browsers
- Chrome, Safari, Firefox, Opera
- Internet Explorer 7,8,9,10,11


## How To Use
```javascript

$(jQuerySelector).MessageBox(event,[options],callback(response){
	//supported in the context
},preventDefault,stopPropagation);

// or

$.MessageBox([options],callback(response){
	// supported in the context
});

```


## Default Settings
```javascript

// Target Event
preventDefault = false

// Target Event
stopPropagation = false

// Modal Close Option
modalclose = false

// Usekey Option
usekey = false


```


## Returning Functions

```javascript

// Create New MessageBox
MessageBox = $.MessageBox({title:'Title',content:'Content'},function(response){
	// supported in the context
});

// Change Title Function
MessageBox.title(title);

// Change Content Function
MessageBox.content(content);

// Hide Function
MessageBox.hide();

// Show Function
MessageBox.show();

// Close Function
MessageBox.close();

```



## Options Parameters

**title**<br>
<code>String</code>

**content**<br>
<code>String</code> <code>HTML</code>

**type**<br>
<code>confirmation</code> <code>information</code>

**animate**<br>
<code>animate: { open: 'effect', close: 'effect', speed: '500' }</code>

**buttons**<br>
<code>buttons: { confirm: {title : 'Continue', style : 'continue'}, cancel: {title:'Cancel', style : 'cancel'} }</code>

**background**<br>
<code>CSS Background Code</code>

**opacity**<br>
<code>CSS Opacity Code</code>

**timeout**<br>
<code>timeout: { second : '10', screen: true }</code>

**modalclose**<br>
<code>true</code> <code>false</code>

**usekey**<br>
<code>true</code> <code>false</code>




## Effect List

**open**<br>
<code>topFade</code> <code>bottomFade</code>

**close**<br>
<code>fadeOut</code>

**global**<br>
<code>top</code> <code>left</code> <code>right</code> <code>bottom</code> <code>topLeft</code> <code>topRight</code> <code>bottomLeft</code> <code>bottomRight</code>




## Examples

[Click to go to the overview page](http://yalcinceylan.net/messagebox/)

```javascript
$('#button1').MessageBox('click',{
	title: 'Confirmation',
	content: 'Are you sure?',
	type: 'confirmation', usekey: true,
	animate: { open: 'topFade', close: 'bottom', speed: '500' },
	buttons: { confirm: {title : 'CONTINUE', style : 'continue'}, cancel: {title:'CANCEL', style : 'cancel'} }
},function(response){ });
```

```javascript
$('#button2').MessageBox('click',{
	title: 'License',
	content: 'I have read and understood.',
	type: 'information', usekey: true,
	animate: { open: 'topRight', close: 'bottomLeft', speed: '500' },
	buttons: { confirm: {title : 'OK', style : 'continue'} }
},function(response){ });
```

```javascript
$('#button3').MessageBox('click',{
	title: 'Information',
	content: 'Information Message',
	type: 'information', usekey: true,
	animate: { open : 'bottomLeft', close : 'topRight', speed: '500' },
	buttons: { confirm: {title : 'OK', style : 'continue'} }
},function(response){ });
```

```javascript
$('#button4').MessageBox('click',{
	title: 'Alert',
	content: 'You do not have sufficient authority!',
	type: 'information', usekey: true,
	animate: { open : 'left', close : 'right', speed: '500' },
	buttons: { confirm: {title : 'OK', style : 'danger'} }
},function(response){ });
```

```javascript
$('#button5').MessageBox('click',{
	title: 'Tutorial Effect',
	content: 'Coming soon...',
	type: 'information', usekey: true,
	animate: { open : 'bottomFade', close : 'fadeOut', speed: '500' },
	buttons: { confirm: {title : 'CLOSE', style : 'danger'} }
},function(response){ });
```

```javascript
$.MessageBox({
	title: 'Welcome',
	content: 'jQuery MessageBox Plugin',
	type: 'confirmation', background: '#ffcc1a',
	animate: { open : 'top', close : 'bottom', speed : '500' },
	buttons: { confirm: {title: 'NEXT', style: 'continue'}, cancel: {title: 'CANCEL', style: 'cancel' } },
	usekey: true
},function(response) {
	if (response) {
		$.MessageBox({
			title: 'Information',
			content: 'Please read the descriptions.',
			type: 'information', background: '#157FB0',
			animate: { open : 'bottom', close : 'top', speed : '500' },
			buttons: { confirm: {title : 'OK', style : 'continue'} },
			timeout: { second : '10', screen: true },
			usekey:true
		});
	}
});
```





