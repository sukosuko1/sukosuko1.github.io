if (self.CavalryLogger) { CavalryLogger.start_js(["1gbMF"]); }

__d("PrivacyConst",[],(function(a,b,c,d,e,f){e.exports={BaseValue:{FRIEND_LIST:129,FRIENDS_PLUS_GAMER_FRIENDS:128,FRIENDS_MINUS_ACQUAINTANCES:127,FACEBOOK_EMPLOYEES:112,CUSTOM:111,EVERYONE:80,NETWORKS_FRIENDS_OF_FRIENDS:60,NETWORKS_FRIENDS:55,FRIENDS_OF_FRIENDS:50,ALL_FRIENDS:40,SELF:10,NOBODY:0},CustomPrivacyTokens:{FRIENDS:247124075410460,FRIENDS_OF_FRIENDS:498125493540100},FriendsValue:{EVERYONE:80,NETWORKS_FRIENDS:55,FRIENDS_OF_FRIENDS:50,ALL_FRIENDS:40,SOME_FRIENDS:30,SELF:10,NO_FRIENDS:0},PostParam:{EVERYONE:300645083384735,NETWORKS_FRIENDS:123780391104836,FRIENDS_OF_FRIENDS:275425949243301,FRIENDS:291667064279714,FRIENDS_MINUS_ACQUAINTANCES:284920934947802,ONLY_ME:286958161406148,FB_ONLY:411331705596297,EVENT_PUBLIC:1493271774218406,EVENT_INVITE_ONLY:599950423437029},PrivacyField:{CURRENT_COMPOSER:8787670733,DEFAULT_COMPOSER:875106179167765,TIMELINE_TAGGED_CONTENT_VISIBILITY:8787530733,WALL_POSTS:8787370733,TAG_EXPANDED_CONTENT:8787795733,SEARCH_BY_PHONE:8787815733,SEARCH_BY_EMAIL:8787820733,CAN_FRIEND:8787540733,DEPRECATED_APP_DEFAULT:8787700733,SEARCH_BY_NAME:8787755733,SEARCH_BY_CONTACT_INFO:8787760733,SCREENNAME:8787335733,CURRENT_ADDRESS:8787355733,FRIENDS:8787365733,WEBSITE:8787375733,STATUS_UPDATES:8787395733,BIRTHDAY:8787510733,BIRTHYEAR:8787805733,CAN_COMMENT:8787535733,CAN_MESSAGE:8787545733,RELATIONSHIPS:8787550733,PROFILE_PICTURE_ALBUM:8787565733,DASHBOARD_ACTIVITY:8787575733,FAMILY:8787585733,INTERESTED_IN_LOOKING_FOR:8787590733,PLACES:8787620733,NAME_DAY:8787810733,LANGUAGES:8787625733,QUOTATIONS:8787630733,ABOUT_ME:8787635733,POLITICAL:8787640733,RELIGIOUS:8787645733,CURRENT_CITY:8787650733,HOMETOWN:8787655733,PROFILE_LIKES_AND_INTERESTS:8787660733,BLURB:8787665733,OTHER_LIKES_AND_INTERESTS:8787680733,SUBSCRIBERS:8787690733,SUBSCRIBED_TO:8787695733,PERSONAL_CONTACT_DEFAULT:8787765733,PAGE_CONTACT_DEFAULT:8787770733,AUTO_GENERATED_FB_EMAIL:8787775733,SKILLS:8787780733,CUSTOM_GENDERS:237760973066217,LOCATION_DO_NOT_WRITE_DIRECTLY:8787785733,SOCIAL_ADS:7719929599,PLATFORM_ADS:126540474531,BASS_ADS:183468681673909,ACTIVITIES:144331422306930,INTERESTS:113693108715766,MUSIC:172372399483077,BOOKS:100725463352700,GAMES:199298603444535,MOVIES:201146206594049,TV_SHOWS:129665560441221,SPORTS_PLAYED:129991670408857,FAVORITE_TEAMS:225288534151802,FAVORITE_ATHLETES:203380763033334,PEOPLE_I_ADMIRE:210380795648667,FAVORITE_FOODS:585935528106425,FAVORITE_RESTAURANTS:172588449584647,FAVORITE_WEBSITES:180412195459106,CLOTHING_BRANDS:397391233714082,LAST_POST_PRIVACY:314763985364212,SECOND_TO_LAST_POST_PRIVACY:321179124722698,PREVIOUS_SECONDARY_COMPOSER:864562253561430,RECENT_COMPOSER:358304524327898,COMPOSER_CUSTOM_INCLUSION:1067668039947624,COMPOSER_CUSTOM_EXCLUSION:1082068668536535,CAN_LIKE_AND_COMMENT_PUBLIC_PROFILE_MEDIA:1269423589794183,CAN_TAG_PUBLIC_PROFILE_MEDIA:260920744319731,CAN_DOWNLOAD_PUBLIC_PROFILE_MEDIA:410249702663051,CAN_SHARE_PUBLIC_PROFILE_MEDIA:1648969422065270,NOW_COMPOSER:421290164697736,BACKSTAGE_PRIVACY:809506612451171,FACEREC_ENROLLMENT:1709697052669794,DEVICE_PHOTO_PROCESSING:1798505450455620,SPACES_VR_OFFLINE_VISIT_PRIVACY:351913698615451,RESHARES_ON_TIMELINE_VISIBILITY:230094651068076},TagExpansion:{NONE:0,TAGGEES:1,FRIENDS_OF_TAGGEES:2},ExpansionType:{NONE:0,TAGS_ONLY:1}}}),null);
__d("DOMClone",[],(function(a,b,c,d,e,f){a={shallowClone:function(a){return g(a,!1)},deepClone:function(a){return g(a,!0)}};function g(a,b){a=a.cloneNode(b);typeof a.__FB_TOKEN!=="undefined"&&delete a.__FB_TOKEN;typeof a.__FB_STORE!=="undefined"&&delete a.__FB_STORE;return a}e.exports=a}),null);
__d("FileInput",["cx","ArbiterMixin","DOM","DOMClone","Event","Focus","Keys","UserAgent_DEPRECATED","mixin"],(function(a,b,c,d,e,f,g){__p&&__p();var h,i=b("UserAgent_DEPRECATED").ie();c=babelHelpers.inherits(a,b("mixin")(b("ArbiterMixin")));h=c&&c.prototype;function a(a,c,d){"use strict";__p&&__p();h.constructor.call(this);this.container=a;this.control=c;a=b("DOM").scry(this.container,"a")[0];a&&a.removeAttribute("href");c=b("DOM").create("div",{className:"_3jk"},d);b("DOM").appendContent(this.control,c);this._boundHandleChange=this._handleChange.bind(this);i&&(this._boundHandleIEKeyDown=this._handleIEKeyDown.bind(this));this._setInputElement(d)}a.prototype.getValue=function(){"use strict";return this.input.value};a.prototype.getInput=function(){"use strict";return this.input};a.prototype.getContainer=function(){"use strict";return this.container};a.prototype.getControl=function(){"use strict";return this.control};a.prototype.clear=function(){"use strict";this.input.value="";if(this.input.value!==""){var a=b("DOMClone").deepClone(this.input);b("DOM").replace(this.input,a);this._setInputElement(a)}};a.prototype.destroy=function(){"use strict";this._focus.remove(),this._focus=null,this._listener.remove(),this._listener=null,i&&(this._IEKeyDownListener.remove(),this._IEKeyDownListener=null),this.container=null,this.control=null,this.input=null};a.prototype._setInputElement=function(a){"use strict";this.input=a,this._focus&&this._focus.remove(),this._focus=b("Focus").relocate(a,this.control),this._listener&&this._listener.remove(),this._listener=b("Event").listen(a,"change",this._boundHandleChange),i&&(this._IEKeyDownListener&&this._IEKeyDownListener.remove(),this._IEKeyDownListener=b("Event").listen(a,"keydown",this._boundHandleIEKeyDown))};a.prototype._handleChange=function(event){"use strict";this.inform("change",event);if(this.input){var a=this.input.form;a&&i<9&&b("Event").fire(a,"change",event)}};a.prototype._handleIEKeyDown=function(event){"use strict";if(event.keyCode===b("Keys").RETURN){event.preventDefault();var a=document.createEvent("MouseEvents");a.initEvent("click",!0,!0);this.input.dispatchEvent(a)}};e.exports=a}),null);
__d("highlight",["Animation","Style"],(function(a,b,c,d,e,f){function a(a,c,d,e){new(b("Animation"))(a).from("background",e||"#fff9d7").to("background",d||"#fff").ease(b("Animation").ease.both).duration(2e3).ondone(function(){b("Style").set(a,"background",""),c&&c()}).go()}e.exports=a}),null);
__d("PrivacySelectorNewDispatcher",["Dispatcher_DEPRECATED"],(function(a,b,c,d,e,f){__p&&__p();var g,h="selector";g=babelHelpers.inherits(a,b("Dispatcher_DEPRECATED"));g&&g.prototype;a.prototype.handleUpdateFromSelector=function(a){"use strict";this.dispatch(babelHelpers["extends"]({payloadSource:h},a))};function a(){"use strict";g.apply(this,arguments)}c=new a();e.exports=c}),null);
__d("ReactComposerActions",["ReactComposerActionTypes","ReactComposerDispatcher","ReactComposerStore"],(function(a,b,c,d,e,f){__p&&__p();b("ReactComposerStore");var g=void 0;a={initConfig:function(a,c,d,e,f,g,h){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").INIT_CONFIG,loggingConfig:c,lazySproutsExpand:d,activateOnInit:e===!0,sproutsConfig:f,promotedSprout:g,triggeredFrom:h})},schedule:function(a,c){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").SCHEDULE,scheduleDate:c})},postError:function(a,c){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").POST_ERROR,response:c})},postIntended:function(a,c){setTimeout(function(){(!g||g(a,c.actorID,c.config,c.targetID))&&b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").POST_INTENDED,actorID:c.actorID,config:c.config,targetID:c.targetID})},0)},registerPostIntendedHandler:function(a){g=a},postStarted:function(a,c){var d=c.actorID,e=c.composerType,f=c.config,g=c.onPostSuccess,h=c.targetID,i=babelHelpers.objectWithoutProperties(c,["actorID","composerType","config","onPostSuccess","targetID"]);setTimeout(function(){return b("ReactComposerDispatcher").dispatch({composerID:a,composerType:e,type:b("ReactComposerActionTypes").POST_STARTED,actorID:d,config:f,targetID:h,onPostSuccess:g,otherData:i})},0)},createJobsOpeningFormatPostStarted:function(a){setTimeout(function(){return b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").POST_STARTED})},0)},postSucceeded:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").POST_SUCCEEDED})},postFinally:function(a,c){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").POST_FINALLY,response:c})},publishStarted:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").PUBLISH_STARTED})},postPreprocessing:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").POST_PREPROCESSING})},reset:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").COMPOSER_RESET})},expandSprouts:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").EXPAND_SPROUTS})},collapseSprouts:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").COLLAPSE_SPROUTS})},setLoggedSproutPromotionView:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").SET_LOGGED_SPROUT_PROMOTION_VIEW})},setFinishedSproutPromotion:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").SET_FINISHED_SPROUT_PROMOTION})},setQueueFinishedSproutPromotion:function(a){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").SET_QUEUE_FINISHED_SPROUT_PROMOTION})},setShouldShowVoiceSwitcherNux:function(a,c){b("ReactComposerDispatcher").dispatch({composerID:a,type:b("ReactComposerActionTypes").SET_SHOULD_SHOW_VOICE_SWITCHER_NUX,value:c})}};e.exports=a}),null);
__d("XSproutPromotionUpdateController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/react_composer/sprouts/promotions/update/",{promotion_id:{type:"Int"},increment_view:{type:"Exists",defaultValue:!1},end_promotion:{type:"Exists",defaultValue:!1},current_promotion:{type:"Exists",defaultValue:!1}})}),null);
__d("ReactComposerSproutBadgePromotionUtils",["AsyncRequest","XSproutPromotionUpdateController","ReactComposerActions"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={initWWWPromotion:function(a){a=b("XSproutPromotionUpdateController").getURIBuilder().setInt("promotion_id",a).setExists("current_promotion",!0).getURI();new(b("AsyncRequest"))().setURI(a).send()},addView:function(a,c){a=b("XSproutPromotionUpdateController").getURIBuilder().setInt("promotion_id",a).setExists("increment_view",!0).getURI();new(b("AsyncRequest"))().setURI(a).setHandler(function(a){a.payload&&a.payload.clear_badge_on_next_composer&&b("ReactComposerActions").setQueueFinishedSproutPromotion(c)}).send();b("ReactComposerActions").setLoggedSproutPromotionView(c)},endPromotion:function(a,c){a=b("XSproutPromotionUpdateController").getURIBuilder().setInt("promotion_id",a).setExists("end_promotion",!0).getURI();new(b("AsyncRequest"))().setURI(a).send();b("ReactComposerActions").setFinishedSproutPromotion(c)}};e.exports=a}),null);
__d("PUWApplications",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({WEB_SIMPLE:"web_simple",WEB_FLASH:"web_flash",WEB_HTML5:"web_html5",WEB_COMPOSER:"web_composer",WEB_ARCHIVE:"web_archive",WEB_MESSENGER:"web_messenger",WEB_OMNIPICKER:"web_omnipicker",WEB_MUSE_OMNIPICKER:"web_muse_omnipicker",WEB_SAY_THANKS:"web_say_thanks",WEB_GOODWILL_CAMPAIGN_OMNIPICKER:"web_goodwill_campaign_omnipicker",WEB_PRODUCT_PHOTO_OMNIPICKER:"web_product_photo_omnipicker",WEB_PAGES_MESSENGER:"web_pages_messenger",WEB_M_ZERO:"web_m_zero",WEB_M_BASIC:"web_m_basic",WEB_M_TOUCH:"web_m_touch",WEB_REACT_COMPOSER:"web_react_composer",MOBILE_FB4IOS:"mobile_fb4ios",MOBILE_FB4IOS_SNAP:"mobile_fb4ios_snap",MOBILE_FB4A:"mobile_fb4a",MOBILE_PMA_ANDROID:"mobile_pma_android",MOBILE_PMA_IOS:"mobile_pma_ios",THIRD_PARTY:"third_party"})}),null);
__d("PUWSteps",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CLIENT_FLOW_BEGIN:"client_flow_begin",CLIENT_SELECT_BEGIN:"client_select_begin",CLIENT_SELECT_SUCCESS:"client_select_success",CLIENT_SELECT_CANCEL:"client_select_cancel",CLIENT_SELECT_FAIL:"client_select_fail",CLIENT_FLOW_POST:"client_flow_post",CLIENT_TRANSFER_BATCH_BEGIN:"client_transfer_batch_begin",CLIENT_UPLOAD_BEGIN:"client_upload_begin",CLIENT_ATTACH_PHOTO:"client_attach_photo",CLIENT_PROCESS_BEGIN:"client_process_begin",CLIENT_PROCESS_SUCCESS:"client_process_success",CLIENT_PROCESS_CANCEL:"client_process_cancel",CLIENT_PROCESS_SKIP:"client_process_skip",CLIENT_PROCESS_FAIL:"client_process_fail",CLIENT_PROCESS_UNAVAILABLE:"client_process_unavailable",CLIENT_SPHERICAL_CHECK_SUCCESS:"client_spherical_check_success",CLIENT_SPHERICAL_CHECK_FAIL:"client_spherical_check_fail",CLIENT_TRANSFER_ENQUEUE:"client_transfer_enqueue",CLIENT_TRANSFER_BEGIN:"client_transfer_begin",CLIENT_TRANSFER_SUCCESS:"client_transfer_success",CLIENT_TRANSFER_CANCEL:"client_transfer_cancel",CLIENT_TRANSFER_FAIL:"client_transfer_fail",CLIENT_TRANSFER_MANUAL_RETRY:"client_transfer_manual_retry",CLIENT_UPLOAD_SUCCESS:"client_upload_success",CLIENT_UPLOAD_FAIL:"client_upload_fail",CLIENT_UPLOAD_CANCEL:"client_upload_cancel",CLIENT_UPLOAD_REMOVE:"client_upload_remove",CLIENT_FACEREC_BEGIN:"client_facerec_begin",CLIENT_FACEREC_SUCCESS:"client_facerec_success",CLIENT_FACEREC_FAIL:"client_facerec_fail",CLIENT_PHOTO_PREVIEW_OPEN:"client_photo_preview_open",CLIENT_PHOTO_PREVIEW_CLOSE:"client_photo_preview_close",CLIENT_TRANSFER_BATCH_SUCCESS:"client_transfer_batch_success",CLIENT_TRANSFER_BATCH_CANCEL:"client_transfer_batch_cancel",CLIENT_TRANSFER_BATCH_FAIL:"client_transfer_batch_fail",CLIENT_PUBLISH_ENQUEUE:"client_publish_enqueue",CLIENT_PUBLISH_BEGIN:"client_publish_begin",CLIENT_PUBLISH_SUCCESS:"client_publish_success",CLIENT_PUBLISH_FAIL:"client_publish_fail",CLIENT_ATTEMPT_FAIL:"client_attempt_fail",CLIENT_FLOW_SUCCESS:"client_flow_success",CLIENT_FLOW_FATAL:"client_flow_fatal",CLIENT_FLOW_GIVEUP:"client_flow_giveup",CLIENT_FLOW_CANCEL:"client_flow_cancel",CLIENT_FLOW_FAIL:"client_flow_fail",CLIENT_FLOW_INCOMPLETE:"client_flow_incomplete",CLIENT_ATTEMPT_INCOMPLETE:"client_attempt_incomplete",CLIENT_FLOW_RETRY:"client_flow_retry",CLIENT_ATTEMPT_RETRY:"client_attempt_retry",CLIENT_DIAGNOSTIC:"client_diagnostic",CLIENT_QUALITY_SWITCH:"client_quality_switch",CLIENT_CANCEL_SURVEY:"client_cancel_survey",CLIENT_PHOTO_EDIT_BEGIN:"client_photo_edit_begin",CLIENT_PHOTO_EDIT_SUCCESS:"client_photo_edit_success",SERVER_UPLOAD_BEGIN:"server_upload_begin",SERVER_UPLOAD_SUCCESS:"server_upload_success",SERVER_UPLOAD_FAIL:"server_upload_fail",SERVER_PUBLISH_BEGIN:"server_publish_begin",SERVER_PUBLISH_SUCCESS:"server_publish_success",SERVER_PUBLISH_FAIL:"server_publish_fail",SERVER_RECEIVER_BEGIN:"server_receiver_begin",SERVER_RECEIVER_PUBLISH_BEGIN:"server_receiver_publish_begin",SERVER_SENTRY_RESTRICTION:"server_sentry_restriction"})}),null);
__d("ShareModeConst",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({SELF_PAGE:"selfpage",PAGE:"page",SELF_POST:"self",FRIEND:"friend",GROUP:"group",FUNDRAISER:"fundraiser",ALBUM:"album",MESSAGE:"message",ONE_CLICK:"oneclick",EVENT:"event",UNKNOWN:"unknown",SILENT_DISCO:"silent_disco",OWN_POST:"own"})}),null);
__d("PhotosUploadWaterfallXMixin",["invariant","AsyncSignal","Banzai","PhotosUploadWaterfallXConfig","randomInt"],(function(a,b,c,d,e,f,g){__p&&__p();var h=new Map();function i(a,c){var d={};a.client_time=Math.round(Date.now()/1e3);b("PhotosUploadWaterfallXConfig").retryBanzai&&(d.retry=!0,a.nonce=b("randomInt")(4294967296));b("Banzai").post(b("PhotosUploadWaterfallXConfig").banzaiRoute,a,d);c&&setTimeout(c,0)}function j(a,c){if(b("PhotosUploadWaterfallXConfig").useBanzai)i(a,c);else{a=new(b("AsyncSignal"))(b("PhotosUploadWaterfallXConfig").loggingEndpoint,{data:JSON.stringify(a)}).setHandler(c);b("PhotosUploadWaterfallXConfig").timeout&&a.setTimeout(10*1e3);a.send()}}e.exports={logStep:function(a,b,c){var d=this.getWaterfallID&&this.getWaterfallID(),e=this.getWaterfallAppName&&this.getWaterfallAppName();if(!d||!e)return;j(babelHelpers["extends"]({step:a,qn:d,uploader:e,ref:this.getWaterfallSource&&this.getWaterfallSource()},b),c)},logPUWStep:function(a,b,c,d,e,f,g){if(f&&f.logOncePerSession){h.has(b)||h.set(b,new Set());if(h.get(b).has(a))return;h.get(b).add(a)}j(Object.assign({step:a,qn:b,uploader:c,ref:d},e),g)}}}),null);
__d("XPrivacyCustomDialogController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/privacy/custom_dialog/",{id:{type:"String",required:!0},option_id:{type:"String",required:!0},autosave:{type:"Bool",defaultValue:!1},explain_tags:{type:"Bool",defaultValue:!1},limit_community:{type:"Bool",defaultValue:!1},limit_facebook:{type:"Bool",defaultValue:!1},limit_fof:{type:"Bool",defaultValue:!1},limit_tagexpand:{type:"Bool",defaultValue:!1},is_new_privacy_selector:{type:"Bool",defaultValue:!1},render_location_enum:{type:"Enum",enumType:1},content_type:{type:"String"},post_param:{type:"String"},privacy_data:{type:"String"},source:{type:"String"},tags:{type:"IntVector"},saved_custom_opt_in:{type:"Bool",defaultValue:!1},__asyncDialog:{type:"Int"}})}),null);