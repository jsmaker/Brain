Brain
=====

little devtools helper 



you can set the Brain Map with this code and open the devtools elements panel
you will see a Knowledge pane in the sidebar with the information. 

```javascript
__Brain__.Map = {
  "tagName":{
    "body":{
      "style.cssText": {
        as_abs: 'cssText'
      }
    },
    "div":{
      "className": {
        adapt: "$ && $.split(' ')"
      }
    },
    "a":{
      "href": true,
      "target": {
        "display_only_if" : "!!$"
      }
    }
  }
}
```

you can update this object any time you want...and see the results.

how the Map works
```javascript
{
  "An attribute/property of an HtmlElement or code that will be evaluated like this $0.{yourcode}" : {
      "a regexp exprestion to match the value form the previous operation":{
        "if there is a match this code will be evaluated like this $0.{yourcode}":{
            "*this is a configuration object"
        },
        "anther one":{
            "*this is a configuration object"
        }
      },
      "a regexp exprestion to match the value form the previous operation":{
        "if there is a match this code will be evaluated like this $0.{yourcode}":{
            "*this is a configuration object"
        }
      }
  }
}
```

```javascript
* : {
  as: 'the long path display text {attr.regexp.as}',
  as_abs: 'display absolute name {as_abs}',
  adapt:'gets $ as param and modify it when $ is the value from the previous operation'
  display_only_if:'gets $ as param and returns true/false when $ is the value from the previous operation'
}
```
