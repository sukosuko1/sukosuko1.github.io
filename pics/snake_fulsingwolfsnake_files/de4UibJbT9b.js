if (self.CavalryLogger) { CavalryLogger.start_js(["J0Nii"]); }

__d("NotificationConstants",[],(function(a,b,c,d,e,f){e.exports={PayloadSourceType:{UNKNOWN:0,USER_ACTION:1,LIVE_SEND:2,ENDPOINT:3,INITIAL_LOAD:4,OTHER_APPLICATION:5,SYNC:6,CLIENT:7}}}),null);
__d("NotificationTokens",["CurrentUser"],(function(a,b,c,d,e,f){a={tokenizeIDs:function(a){return a.map(function(a){return b("CurrentUser").getID()+":"+a})},untokenizeIDs:function(a){return a.map(function(a){return a.split(":")[1]})}};e.exports=a}),null);
__d("NotificationUpdates",["Arbiter","LiveTimer","NotificationConstants","createObjectFrom"],(function(a,b,c,d,e,f){__p&&__p();var g={},h={},i={},j={},k=!1,l=[],m=0,n=new(b("Arbiter"))();function o(){__p&&__p();if(m)return;var a=g,b=h,c=i,d=j;g={};h={};i={};j={};(Object.keys(a).length||k)&&(k=!1,q("notifications-updated",a));Object.keys(b).length&&q("seen-state-updated",b);Object.keys(c).length&&q("read-state-updated",c);Object.keys(d).length&&q("hidden-state-updated",d);l.pop()}function p(){return l.length?l[l.length-1]:b("NotificationConstants").PayloadSourceType.UNKNOWN}function q(event,a){s.inform(event,{updates:a,source:p()})}var r=null,s={getserverTime:function(){return r},handleUpdate:function(a,c,d,e){c.servertime&&(r=c.servertime,b("LiveTimer").restart(c.servertime)),this._updateWithPayload(a,c)},_updateWithPayload:function(a,b){Object.keys(b).length&&this.synchronizeInforms(function(){l.push(a);var c=babelHelpers["extends"]({},b,{payloadsource:p()});this.inform("update-notifications",c);this.inform("update-seen",c);this.inform("update-read",c);this.inform("update-hidden",c)}.bind(this))},getArbiter:function(){return n},inform:function(event,a){return n.inform(event,a)},subscribe:function(event,a){return n.subscribe(event,a)},didUpdateNotifications:function(a){Object.assign(g,b("createObjectFrom")(a)),k=!0,o()},didUpdateSeenState:function(a){Object.assign(h,b("createObjectFrom")(a)),o()},didUpdateReadState:function(a){Object.assign(i,b("createObjectFrom")(a)),o()},didUpdateHiddenState:function(a){Object.assign(j,b("createObjectFrom")(a)),o()},synchronizeInforms:function(a){m++;try{a()}catch(a){throw a}finally{m--,o()}}};e.exports=s}),null);
__d("NotificationOptionActionWebGraphQLMutation",["WebGraphQLMutationBase"],(function(a,b,c,d,e,f){"use strict";__p&&__p();e.exports=function(){__p&&__p();var a;a=babelHelpers.inherits(c,b("WebGraphQLMutationBase"));a&&a.prototype;c.__getDocID=function(){"use strict";return"1420844941369152"};c.getQueryID=function(){"use strict";return"318967338567215"};function c(){"use strict";a.apply(this,arguments)}return c}()}),null);
__d("NotificationUserActions",["AsyncRequest","Bootloader","BusinessUserConf","CurrentUser","NotificationConstants","NotificationOptionActionWebGraphQLMutation","NotificationTokens","NotificationUpdates","WebGraphQL","createObjectFrom"],(function(a,b,c,d,e,f){__p&&__p();var g=b("NotificationConstants").PayloadSourceType.USER_ACTION,h=!1;function i(a){b("BusinessUserConf").businessUserID!=null&&(a.biz_user_id=b("BusinessUserConf").businessUserID),new(b("AsyncRequest"))("/ajax/notifications/mark_read.php").setData(a).setAllowCrossPageTransition(!0).send()}function j(a){var b={};a.forEach(function(a,c){b["alert_ids["+c+"]"]=a});return b}a={markNotificationsAsSeen:function(a){var c=document.getElementById("notificationsCountValue"),d=null;c&&(d=c.textContent);b("NotificationUpdates").handleUpdate(g,{seenState:b("createObjectFrom")(a)});c=b("NotificationTokens").untokenizeIDs(a);a=j(c);a.seen=!0;d&&(a.badgeCount=d);i(a)},setNextIsFromReadButton:function(a){h=a},markNotificationsAsRead:function(a,c){b("NotificationUpdates").handleUpdate(g,{readState:b("createObjectFrom")(a,!0)});a=b("NotificationTokens").untokenizeIDs(a);a=j(a);h&&(a.from_read_button=!0,h=!1);c&&(a.source_view=c);i(a)},markNotificationsAsUnread:function(a,c){b("NotificationUpdates").handleUpdate(g,{readState:b("createObjectFrom")(a,!1)});a=b("NotificationTokens").untokenizeIDs(a);a=j(a);h&&(a.from_read_button=!0,h=!1);a.unread=!0;c&&(a.source_view=c);i(a)},markAllNotificationsAsRead:function(){b("Bootloader").loadModules(["NotificationSeenState"],function(a){a=a.getUnreadIDs();a.length>0&&b("NotificationUpdates").handleUpdate(g,{readState:b("createObjectFrom")(a)});a={read:!0};h&&(a.from_read_button=!0,h=!1);i(a)},"NotificationUserActions")},sendNotifOption:function(a){return b("WebGraphQL").exec(new(b("NotificationOptionActionWebGraphQLMutation"))({input:{action_type:a,actor_id:b("CurrentUser").getID(),client_mutation_id:"0"}}))}};e.exports=a}),null);
__d("NotificationInterpolator",["Badge.react","React","TextWithEmoticons.react","idx"],(function(a,b,c,d,e,f){function a(a,c){var d=null;((c=c.entity)!=null?(c=c.work_foreign_entity_info)!=null?c.type:c:c)==="FOREIGN"&&(d=b("React").createElement(b("Badge.react"),{type:"work_non_coworker"}));typeof a==="string"&&(a=b("React").createElement(b("TextWithEmoticons.react"),{text:a}));return b("React").createElement("span",{className:"fwb"},a,d)}e.exports=a}),null);
__d("Spotlight",["csx","cx","Arbiter","ArbiterMixin","DOM","JSXDOM","Layer","LayerAutoFocus","LayerButtons","LayerTabIsolation","ModalLayer","Vector","classWithMixins","joinClasses","mixin"],(function(a,b,c,d,e,f,g,h){__p&&__p();var i;c=babelHelpers.inherits(a,b("classWithMixins")(b("Layer"),b("mixin")(b("ArbiterMixin"))));i=c&&c.prototype;function a(a,c){"use strict";i.constructor.call(this,a,c),this.stageMinSize=new(b("Vector"))(0,0),this.stagePadding=new(b("Vector"))(0,0)}a.prototype._buildWrapper=function(a,c){"use strict";a=b("joinClasses")("_n8"+(a.wash==="dark"||!a.wash?" _3qx":"")+(a.wash==="xui"?" _4-hy":""),a.rootClassName);return b("JSXDOM").div({className:a},b("JSXDOM").div({className:"_n9"},c))};a.prototype._getDefaultBehaviors=function(){"use strict";return i._getDefaultBehaviors.call(this).concat([j,b("LayerAutoFocus"),b("LayerButtons"),b("LayerTabIsolation"),b("ModalLayer")])};a.prototype.getContentRoot=function(){"use strict";this._content||(this._content=b("DOM").find(this.getRoot(),"div._n3"));return this._content};a.prototype.configure=function(a){"use strict";a.stageMinSize&&(this.stageMinSize=a.stageMinSize),a.stagePadding&&(this.stagePadding=a.stagePadding)};a.prototype.onContentLoaded=function(){"use strict";this.inform("content-load")};a.prototype.updatePermalink=function(a){"use strict";this.inform("permalinkchange",a)};Object.assign(a.prototype,{stageMinSize:null,stagePadding:null});function j(a){"use strict";this._layer=a}j.prototype.enable=function(){"use strict";this._subscription=this._layer.subscribe(["show","hide"],function(a,c){a==="show"?b("Arbiter").inform("layer_shown",{type:"Spotlight"}):b("Arbiter").inform("layer_hidden",{type:"Spotlight"})})};j.prototype.disable=function(){"use strict";this._subscription.unsubscribe(),this._subscription=null};Object.assign(j.prototype,{_subscription:null});e.exports=a}),null);
__d("Spotlight.react",["LayerAutoFocusReact","LayerHideOnBlur","LayerHideOnEscape","LayerRefocusOnHide","ReactLayer","Spotlight","React"],(function(a,b,c,d,e,f){__p&&__p();a=b("React").PropTypes;c=b("ReactLayer").createClass({propTypes:{causalElement:a.instanceOf(HTMLElement),onHide:a.func,rootClassName:a.string,shown:a.bool,wash:a.oneOf(["light","xui","dark"])},getDefaultEnabledBehaviors:function(){return{hideOnBlur:b("LayerHideOnBlur"),hideOnEscape:b("LayerHideOnEscape"),refocusOnHide:b("LayerRefocusOnHide"),autoFocus:b("LayerAutoFocusReact")}},createLayer:function(a){var c=this.enumerateBehaviors(this.props.behaviors);c={addedBehaviors:c,rootClassName:this.props.rootClassName,wash:this.props.wash};c=new(b("Spotlight"))(c,a);c.setCausalElement(this.props.causalElement);c.conditionShow(this.props.shown);this.props.onBeforeHide&&c.subscribe("beforehide",this.props.onBeforeHide);this.props.onHide&&c.subscribe("hide",this.props.onHide);return c},receiveProps:function(a){this.layer&&(this.layer.setCausalElement(a.causalElement),this.layer.conditionShow(a.shown))}});e.exports=c}),null);
__d("FacebookWebNotificationsSubscriptionWebGraphQLSubscription",["WebGraphQLSubscriptionHelper"],(function(a,b,c,d,e,f){"use strict";e.exports=b("WebGraphQLSubscriptionHelper").getExports({docID:"919384508186227",queryID:"207764916617463"})}),null);
__d("FacebookWebNotificationsSubscription",["invariant","BaseGraphQLSubscription","CurrentUser","FacebookWebNotificationsSubscriptionWebGraphQLSubscription","SubscriptionsHandler","WebPixelRatio","uuid"],(function(a,b,c,d,e,f,g){__p&&__p();var h="WEB_DESKTOP",i=[],j=null,k=babelHelpers["extends"]({},b("BaseGraphQLSubscription"),{_getTopic:function(a){return"gqls/"+this._getSubscriptionCallName()+"/actor_id_"+a.actorID+"_environment_"+h},_getQueryID:function(){return b("FacebookWebNotificationsSubscriptionWebGraphQLSubscription").getDocID()},_getQueryParameters:function(a){return{input:JSON.stringify({client_subscription_id:b("uuid")(),environment:h}),is_work_user:b("CurrentUser").isWorkUser(),scale:b("WebPixelRatio").get()}},_getSubscriptionCallName:function(){return"web_notification_receive_subscribe"}});function l(a){__p&&__p();a=a.web_notification_receive_subscribe;var b=a.aggregated_notification,c=a.notification,d=a.pinned_conversation,e=a.should_play_sound,f=a.should_show_beeper;i.forEach(function(a){switch(a.event){case"NEW_BEEPER":c!=null&&f===!0&&a.callback({notification:c,should_play_sound:!!e});break;case"NEW_NOTIFICATION":b!=null&&a.callback(b);break;case"NEW_PINNED_CONVERSATION":d!=null&&a.callback(d);break}})}e.exports={subscribe:function(a){__p&&__p();i.push(a);j===null&&(j=new(b("SubscriptionsHandler"))(),j.addSubscriptions(k.subscribe({actorID:b("CurrentUser").getID()},l)));var c=!1;return{remove:function(){if(c===!0)return;j!=null||g(0);c=!0;i.splice(i.indexOf(a),1);i.length===0&&(j.release(),j=null)}}}}}),null);
__d("XUIBadge",["cx","invariant","CSS","DOM","formatNumber"],(function(a,b,c,d,e,f,g,h){__p&&__p();function i(a){return parseInt(a,10)===a}function a(a){"use strict";this.target=a.target,this.count=a.count,this.maxcount=a.maxcount}a.prototype.getCount=function(){"use strict";return this.count};a.prototype.setCount=function(a){"use strict";i(a)||h(0),a>=0||h(0),this.count=a,b("CSS").conditionClass(this.target,"hidden_elem",this.count===0),b("DOM").setContent(this.target,b("formatNumber").withMaxLimit(a,this.maxcount)),a>this.maxcount?b("CSS").addClass(this.target,"_5ugi"):b("CSS").removeClass(this.target,"_5ugi")};a.prototype.setLegacyContent=function(a){"use strict";typeof a==="string"?(b("CSS").conditionClass(this.target,"hidden_elem",a==0),b("DOM").setContent(this.target,a),b("CSS").removeClass(this.target,"_5ugi")):this.setCount(a)};a.prototype.increment=function(){"use strict";this.setCount(this.getCount()+1)};e.exports=a}),null);
__d("arrayStableSort",[],(function(a,b,c,d,e,f){function a(a,b){return a.map(function(a,b){return{data:a,index:b}}).sort(function(a,c){return b(a.data,c.data)||a.index-c.index}).map(function(a){return a.data})}e.exports=a}),null);
__d("RangedCallbackManager",["CallbackManagerController","arrayStableSort","createObjectFrom"],(function(a,b,c,d,e,f){__p&&__p();function a(a,c,d){"use strict";this.$1=[],this.$2=!1,this.$3=!1,this.$4={},this.$5=new(b("CallbackManagerController"))(this.$6.bind(this)),this.$7=a,this.$8=c,this.$9=d}a.prototype.executeOrEnqueue=function(a,b,c,d,e){"use strict";return this.$5.executeOrEnqueue({start:a,limit:b},c,{strict:!!d,skipOnStrictHandler:e})};a.prototype.unsubscribe=function(a){"use strict";this.$5.unsubscribe(a)};a.prototype.getUnavailableResources=function(a){"use strict";__p&&__p();a=this.$5.getRequest(a);var b=[];if(a&&!this.$2){var c=a.request;a=this.$10(a.options);c=c.start+c.limit;for(var a=a.length;a<c;a++)b.push(a)}return b};a.prototype.addResources=function(a){"use strict";a.forEach(function(a){this.$4[a]||(this.$4[a]=!0,this.$1.push(a),this.$3=null)}.bind(this)),this.resortResources(),this.$5.runPossibleCallbacks()};a.prototype.addResourcesWithoutSorting=function(a,c){"use strict";var d=this.$1.slice(0,c);d=d.concat(a);d=d.concat(this.$1.slice(c));this.$1=d;Object.assign(this.$4,b("createObjectFrom")(a,!0));this.$3=null;this.$5.runPossibleCallbacks()};a.prototype.removeResources=function(a){"use strict";a.forEach(function(a){if(this.$4[a]){this.$4[a]=!1;a=this.$1.indexOf(a);a!=-1&&this.$1.splice(a,1)}}.bind(this))};a.prototype.removeAllResources=function(){"use strict";this.$1=[],this.$4={}};a.prototype.resortResources=function(){"use strict";this.$1=b("arrayStableSort")(this.$1,function(a,b){return this.$8(this.$7(a),this.$7(b))}.bind(this))};a.prototype.setReachedEndOfArray=function(){"use strict";this.$2||(this.$2=!0,this.$3=null,this.$5.runPossibleCallbacks())};a.prototype.hasReachedEndOfArray=function(){"use strict";return this.$2};a.prototype.forceRunCallbacks=function(){"use strict";this.$5.runPossibleCallbacks({force:!0})};a.prototype.setError=function(a){"use strict";this.$3!==a&&(this.$3=a,this.$5.runPossibleCallbacks())};a.prototype.getError=function(a,b,c){"use strict";c=this.$10({strict:c});return a+b>c.length?this.$3:null};a.prototype.hasResource=function(a){"use strict";return this.$4[a]};a.prototype.getResourceAtIndex=function(a){"use strict";return this.$1[a]};a.prototype.getAllResources=function(){"use strict";return this.$1.concat()};a.prototype.getCurrentArraySize=function(a){"use strict";return this.$10(a).length};a.prototype.$10=function(a){"use strict";var b=this.$1;if(a&&a.strict){a=a.skipOnStrictHandler||this.$9;a&&(b=b.filter(a))}return b};a.prototype.$6=function(a,b){"use strict";__p&&__p();var c=this.$10(b),d=a.start;a=a.start+a.limit;b=!!(b&&b.force);if(!b&&!this.$2&&!this.$3&&a>c.length)return!1;else{b=c.slice(d,a);d=a>c.length?this.$3:null;return[b,d]}};a.prototype.getElementsUntil=function(a){"use strict";var b=[];for(var c=0;c<this.$1.length;c++){var d=this.$7(this.$1[c]);if(this.$8(d,a)>0)break;b.push(this.$1[c])}return b};e.exports=a}),null);
__d("once",[],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a){var b=g(a);for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b}function g(a){__p&&__p();var b=a,c=void 0;a=function(){if(b){for(var a=arguments.length,d=Array(a),e=0;e<a;e++)d[e]=arguments[e];c=b.apply(this,d);b=null}return c};return a}e.exports=a}),null);
__d("NotifTestIDs",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({REACT_BLUE_BAR_JEWEL:"react_blue_bar_jewel",NON_REACT_BLUE_BAR_JEWEL:"non_react_blue_bar_jewel",REACT_NOTIF_LIST:"react_notif_list",NOTIF_LIST_ITEM:"notif_list_item",SEE_ALL_LIST:"see_all_list",REACT_NOTIF_JEWEL_FLYOUT:"react_notif_jewel_flyout",NON_REACT_NOTIF_JEWEL_FLYOUT:"non_react_notif_jewel_flyout",CHEVRON:"chevron",REACT_MARK_ALL_AS_READ_LINK:"react_mark_all_as_read_link",NON_REACT_MARK_ALL_AS_READ_LINK:"non_react_mark_all_as_read_link",NOTIFICATION_SOUND_SETTING:"notifiation_sound_setting",NOTIFICATION_SOUND_SETTING_SELECTOR:"notifiation_sound_setting_selector",MESSAGE_SOUND_SETTING:"message_sound_setting",MESSAGE_SOUND_SETTING_SELECTOR:"message_sound_setting_selector",CLOSE_FRIEND_ACTIVITY_SELECTOR:"close_friend_activity_selector",BIRTHDAY_SELECTOR:"birthday_selector",ON_THIS_DAY_SELECTOR:"on_this_day_selector",TAGS_SELECTOR:"tags_selector",LIVE_VIDEO_SELECTOR:"live_video_selector",REACT_BADGE_COUNT_CONTAINER:"react_badge_count_container",NON_REACT_BADGE_COUNT_CONTAINER:"non_react_badge_count_container",BEEPER_LIST:"beeper_list",NON_REACT_SETTING_LINK:"non_react_setting_link",REACT_SETTING_LINK:"react_setting_link",GEOGRAPHIC_SUBSCRIPTION_SELECTOR:"geographic_subscription_selector"})}),null);