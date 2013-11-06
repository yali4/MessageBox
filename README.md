# Supported Browsers
- Chrome, Safari, Firefox, Opera
- Internet Explorer 7,8,9,10,11

# Default Values
- preventDefault = false
- stopPropagation = false

# Returning Object Functions Example

```javascript
// Create New MessageBox
MessageBox = $.MessageBox({title:'Example',content:'Tutorial'},function(response){ });

// Change Title
MessageBox.title(title);

// Change Content
MessageBox.content(content);

// Hide
MessageBox.hide();

// Show
MessageBox.show();

// Close
MessageBox.close();
```
