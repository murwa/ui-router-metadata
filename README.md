[![Build Status](https://travis-ci.org/murwa/ui-router-metadata.svg?branch=master)](https://travis-ci.org/murwa/ui-router-metadata)

## UI-Router Metadata

An angularjs module for setting page metadata

### Installation

Bower:

~~~javascript
bower install ui-router-metadata
~~~

In your page, add:

~~~html
<script src="bower_components/ui-router-metadata/dist/ui-router-metadata.min.js"></script>
~~~

### Usage

#### Load module

Add the module as a dependency to your app:

~~~javascript
var app = angular.module('app', ['ui-router-metadata']
~~~

#### State Definition

Add a `$meta` key in your state's resolve

~~~javascript
    var state = {
        name: 'state',
        resolve: {
            $meta: [function(){
                return {
                    title: 'Page title',
                    description: 'Page description'
                }
            }]
        }
    }
~~~
