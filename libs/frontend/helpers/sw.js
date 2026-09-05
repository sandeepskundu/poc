/*--var _conf = {
		_version:'v_1724912343',
		_cacheName:'ytwpa',
		_fallback:'/pwa/index.html',
		_domains:/\.yatra\.com\/pwa|localhost\/pwa|local\.yatra\.com\/pwa/,
		_content:/\.html|\.js|\.css|\.png|\.gif|\.jpg|\.woff|\.svg/,
		_oldSwKies:['sw-precache-v3-progressive-app-v1-', '$$$toolbox-cache$$$'], 
		_swToUnregister:['/pwa/service-worker.js'],
		_ingnorFallback:['/pwa/home.html', '/pwa/home1.html', '/pwa/service-worker-pwa.js', '/chat-window.html', '/yatra-sw.js', '/pwa/cabs', '/pwa/monuments', '/pwa/manage-bookings'],
		_ingnorForCache:['/pwa/service-worker-pwa.js'],
		_urlPatters:[
		   '/pwa/index',
		   '/pwa/src/',
		   '/pwa/bower_components',
		   '/pwa/data/',
		   '/pwa/images/', 
		   '/pwa/fonts/',
		   '/content/globalcdn/airline-logo-cdn/'
		],
		_files:[
		    "/pwa/index.html?version=1724912343",
		    "/pwa/src/yt-app.html?version=1724912343",
		    "/pwa/bower_components/webcomponentsjs/custom-elements-es5-adapter.js?version=1724912343",
		    "/pwa/bower_components/webcomponentsjs/webcomponents-loader.js?version=1724912343",
		    "/pwa/src/config/dependencies-lazy/flight-be.html?version=1724912343",
		    "/pwa/src/config/dependencies-lazy/hotel-be.html?version=1724912343",
		    "/pwa/data/i18n/flight/en.json?version=1724912343",
			"/pwa/data/i18n/hotel/en.json?version=1724912343",
			"/pwa/src/app-pages/app-page-landonflights/app-page-landonflights.html?version=1724912343",
			"/pwa/src/config1/post-dependencies/main2.html?version=1724912343",
			"/content/globalcdn/airline-logo-cdn/resources/css/int.css?version=1724912343",
			"/pwa/images/banners/landing-banner.jpg?version=1724912343"
		]
	}--*/

    var _conf = {
		_version:'v_1724912343',
		_cacheName:'ytwpa',
		_fallback:'/pwa/index.html',
		_domains:/\.yatra\.com\/pwa|localhost\/pwa|local\.yatra\.com\/pwa/,
		_content:/\.html|\.js|\.css|\.png|\.gif|\.jpg|\.woff|\.svg/,
		_oldSwKies:['sw-precache-v3-progressive-app-v1-', '$$$toolbox-cache$$$'], 
		_swToUnregister:/\pwa\/service-worker\.js/,
		_ingnorFallback:/\pwa\/home\.html|\/pwa\/home1\.html|\/pwa\/service-worker-pwa\.js|\/chat-window\.html|\/yatra-sw\.js|\/pwa\/cabs|\/pwa\/monuments|\/pwa\/manage-bookings/,
		_ingnorForCache:/\pwa\/service-worker-pwa\.js/,
		_urlPatters:/\pwa\/index|\/pwa\/src\/|\/pwa\/bower_components|\/pwa\/data\/|\/pwa\/images\/|\/pwa\/fonts\/|\/content\/globalcdn\/airline-logo-cdn/,
		_files:[
		    "/pwa/src/yt-app.html?version=1724912343"
		]
	}

var _unregisterSW = {

		_isValidUrl:function(_url){
			//var _temp = ['/pwa/service-worker.js'];
			var _unRegList = _sw._conf._swToUnregister,
				_match = _url.match(_unRegList);
			if(_match && _match.length > 0 && _match['index']){
				return true;
			}
			return false;
		},

		_isValidToUnregister:function(_reg){
			var _active = _reg.active,
				_rVal = false;
			if(_active.state === 'activated' && _active.scriptURL){
				_rVal = _unregisterSW._isValidUrl(_active.scriptURL);
			};
			return _rVal;
		},

		_doUnregister:function(_self, _event, _caches, _register){
			if(_register && _register.active){
				var _shouldRemove = _unregisterSW._isValidToUnregister(_register);
				if(_shouldRemove){
					_register.unregister();
				}
			};
		},

		_init:function(_self, _event, _caches){
			if(navigator.serviceWorker){
				navigator.serviceWorker.getRegistrations().then(function (_rs) {
				    if(_rs.length){
				      for(let _r of _rs){
				    	  _unregisterSW._doUnregister(_self, _event, _caches, _r);
				      }
				    }
				});
			}
		}
}

var _sw = {
		_conf:{
			_v:_conf._version,
			_cn:_conf._cacheName,
			_cK:_conf._cacheName+_conf._version,
			_preFetch:_conf._files,
			_fallback:_conf._fallback,
			_domains:_conf._domains,
			_content:_conf._content,
			_urlPatters:_conf._urlPatters,
			_oldSwKies:_conf._oldSwKies, 
			_swToUnregister:_conf._swToUnregister,
			_ingnorFallback:_conf._ingnorFallback,
			_ingnorForCache:_conf._ingnorForCache
		},

		_log:console.log.bind(console),
		
		_getCacheName:function(){
			return this._conf._cn+'_'+this._conf._v;
		},
		
		_isValidProto:function(_url){
	    	if(_url && (_url.indexOf('https:') > -1 || _url.indexOf('http://localhost') > -1 )){
	    		return true;
	    	};
	    	return false;
		},
		
		_isValidPWAPattern:function(_url){
			var _urlPatters = this._conf._urlPatters,
				_match = _url.match(_urlPatters);
			if(_match && _match.length > 0 && _match['index']){
				return true;
			}
			return false;
		},
		
		_isAbsolute:function(_url){
			return this._isValidPWAPattern(_url);
		},
		
		_isValidDomain:function(_url){
			if(_url){
				if(this._isAbsolute(_url)){
					return true;
				}else{
					var _domains = this._conf._domains,
						_match = _url.match(_domains),
						_url = _url.split('?');
					if(_match && _match.length > 0 && _match['index']){
						return true;
					}
				};
			};
			
			return false;
			
		},
		
		_copyRequest: function(_r, _arg){
			try {
				return new Request(_r, _arg);
			}
			catch(e) {
				return _r;
			}
		},
		
		_getRequestUrl:function(_url){
			var _isValid = this._isValidDomain(_url);
			if(_isValid){
				return _sw._copyRequest(_url, {});
			}else{
				return _sw._copyRequest(_url, {mode:'no-cors'});
			}
		},
		
		_hasNoSkip:function(_url){
			var _qObj = this._helper._getQparamObj(_url);
			
			if(_qObj.swSkip && (_qObj.swSkip === true || _qObj.swSkip === 'true')){
				return false;
			};
			return true;
		},
		
		_isValidContentType:function(_url){
			var _content = this._conf._content,
				_match = _url.match(_content);
			if(_match && _match.length > 0 && _match['index']){
				return true;
			}
			return false;
		},
		
		_urlShouldIgnorForFallback:function(_url){
			var _ingList = _sw._conf._ingnorFallback,
				_match = _url.match(_ingList);
			if(_match && _match.length > 0 && _match['index']){
				return false;
			}
			return true;
		},
		
		_isCacheTrue:function(_url){
			var _ingList = _sw._conf._ingnorForCache,
				_match = _url.match(_ingList);
			if(_match && _match.length > 0 && _match['index']){
				return false;
			}
			return true;
		},
		
		_printTime:function(){
			var _date = new Date();
			return _date.getMinutes()+":"+_date.getSeconds()+":"+_date.getMilliseconds();
		},
		
		_isOffline:function(_request){
			if(_request.mode === 'navigate' && _sw._urlShouldIgnorForFallback(_request.url)){
				return true;
			}
			return false;
		},
		
		_isValidRequest:function(_request){
			var _url = _request.url,
				_validDomain = this._isValidDomain(_url),
				_validPattern = this._isValidPWAPattern(_url),
				_isValidProto = this._isValidProto(_url);
			
			if(this._isOffline(_request) && _validDomain){
				return _sw._conf._fallback;
			};
			
			if(_request.url && _validDomain && _validPattern){
				var _doCache = this._hasNoSkip(_url),
					_validType = this._isValidContentType(_url),
					_isCacheTrue = this._isCacheTrue(_url);
				if(_request && _request.method === 'GET' && _doCache && _validType && _isCacheTrue && _isValidProto){
					return this._getRequestUrl(_url);
				};
			}
			return false;
		},
		
		_deleteOldCacheKies:function(_self, _event, _caches){
			var _oldSwK = _sw._conf._oldSwKies;
			for(var a in _oldSwK){
				this._deleteCacheByKey(_self, _event, _caches, _oldSwK[a]);
			};
		},
		
		_deleteCacheByKey:function(_self, _event, _caches, _key){
			_event.waitUntil(_caches.keys().then(function(keyList) {
				return Promise.all(keyList.map(function(key) {
					if (key.indexOf(_key) > -1) {
						return _caches.delete(key);
					};
				}));
			}));
		},
		
		_updateCache:function(_self, _event, _caches){
			_event.waitUntil(_caches.keys().then(function(keyList){
				return Promise.all(keyList.map(function(key) {
					if (key.indexOf(_sw._conf._cn) == 0 && key != _sw._conf._cK) {
						return _caches.delete(key);
					}
				}));
			}));
		},
		
		_deleteAllCache:function(message) {
			return new Promise(function(_resolve, _reject){
				if(navigator.serviceWorker && navigator.serviceWorker.controller){
					var messageChannel = new MessageChannel();
						messageChannel.port1.onmessage = function(event){
							if(event.data.error) {
								_reject(event.data.error);
							}else{
								_resolve(event.data);
							}
						};
						navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
				}else{
					_reject("This page isn't currently controlled by a service worker.");
				}
	        });
	    },
	    
	    _clearCache:function(){
	    	_sw._deleteAllCache({command: 'delete_all'}).then(function(){
	            console.log('All caches deleted.');
	        }).catch(function(error) {
	            console.error('Caches not deleted:', error);
	        });
	    },
		
		_helper:{
			
			_getQparamObj : function(_url) {
				var _qObj = {},
					_query = _url.substring(1);
						
				if(_url){
					var _temp = _url.split('?');
						_query = _temp[0]
					if(_temp.length>1){
						_query = _temp[1];
					};
				};
			            
				var vars = _query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if ( typeof _qObj[pair[0]] === "undefined") {
						_qObj[pair[0]] = decodeURIComponent(pair[1]);
					} else if ( typeof _qObj[pair[0]] === "string") {
						var arr = [_qObj[pair[0]], decodeURIComponent(pair[1])];
						_qObj[pair[0]] = arr;
					} else {
						_qObj[pair[0]].push(decodeURIComponent(pair[1]));
					}
				};
				
				return _qObj;
			}
		}
	};

self.addEventListener('install', event => {
	event.waitUntil(self.skipWaiting());
	_unregisterSW._init(self, event, caches);
	_sw._deleteOldCacheKies(self, event, caches);
	_sw._updateCache(self, event, caches);
	caches.open(_sw._getCacheName()).then(function(cache){
		return cache.addAll(_sw._conf._preFetch.map(function(_url){
			var _temp = _sw._getRequestUrl(_url),
				_request = _sw._isValidRequest(_temp);
				//_sw._log("Prefetch URL : " + _temp.url + (new Date()).getTime());
				if(_request){
					return _sw._getRequestUrl(_url);
				}
				return false;
		}));
	});
});



self.addEventListener('fetch', function(event) {
	var _request = _sw._isValidRequest(event.request);
	if(_request){
		event.respondWith(
			caches.open(_sw._getCacheName()).then(function(cache) {
				return cache.match(event.request).then(function(response) {
	        if (response) {
	          // console.log(' Found response in cache:', response);
						return response;
	        }
	        // console.log(' No response for %s found in cache. About to fetch ' +
	          // 'from network...', event.request.url);
	        return fetch(event.request.clone()).then(function(response) {
	          // console.log('  Response for %s from network is: %O',
	            // event.request.url, response);
   						// console.log('  Caching the response to', event.request.url);
	            cache.put(event.request, response.clone());
	          return response;
	        });
	      }).catch(function(error) {
	        // console.error('  Error in fetch handler:', error);
 					throw error;
	      });
			}));
	}
});

self.addEventListener('activate', function(event) {
	event.waitUntil(self.clients.claim());
	//_sw._deleteOldCacheKies(self, event, caches);
	//_sw._updateCache(self, event, caches);
});

importScripts("https://ssl.widgets.webengage.com/js/service-worker-yt.js?_="+Math.floor(Date.now()/86400000));